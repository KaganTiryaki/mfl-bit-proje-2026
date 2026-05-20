/* ==========================================================================
 * USE-PASSWORD-GENERATOR HOOK
 * --------------------------------------------------------------------------
 * Top-level state container for the generator screen. Owns:
 *   • The desired password length.
 *   • The enabled character-set options.
 *   • The current generated password and its strength evaluation.
 *   • A bounded history of recently produced passwords.
 *   • Copy-feedback state for transient UI hints.
 * ========================================================================== */

import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  DEFAULT_CHARACTER_OPTIONS,
  DEFAULT_PASSWORD_LENGTH,
  COPY,
  MAX_HISTORY_ENTRIES,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  STRENGTH_LEVELS,
} from '../utils/constants';
import {
  generatePassword,
  collectEnabledSetKeys,
} from '../utils/passwordGenerator';
import { evaluatePasswordStrength } from '../utils/strengthCalculator';
import { copyTextToClipboard } from '../utils/clipboardHelper';

/**
 * @description Clamps a length value into the allowed bounds.
 * @param   {number} candidateLength
 * @returns {number}
 */
const clampPasswordLength = (candidateLength) => {
  if (typeof candidateLength !== 'number' || Number.isNaN(candidateLength)) {
    return DEFAULT_PASSWORD_LENGTH;
  }
  if (candidateLength < MIN_PASSWORD_LENGTH) {
    return MIN_PASSWORD_LENGTH;
  }
  if (candidateLength > MAX_PASSWORD_LENGTH) {
    return MAX_PASSWORD_LENGTH;
  }
  return Math.round(candidateLength);
};


/**
 * @typedef {Object} GeneratorApi
 * @property {number}   passwordLength
 * @property {Function} setPasswordLengthSafely
 * @property {Function} incrementPasswordLength
 * @property {Function} decrementPasswordLength
 * @property {Object}   characterOptions
 * @property {Function} toggleCharacterOption
 * @property {string}   generatedPassword
 * @property {Object}   strengthEvaluation
 * @property {Array}    passwordHistory
 * @property {boolean}  wasJustCopied
 * @property {Function} handleGeneratePassword
 * @property {Function} handleCopyPassword
 */

/**
 * @description Custom hook orchestrating the password generator workflow.
 * @returns {GeneratorApi}
 */
const usePasswordGenerator = () => {
  /* ----------------------------------------------------------------------
   * STATE — primary inputs.
   * ---------------------------------------------------------------------- */
  const [passwordLength, setPasswordLength] = useState(
    DEFAULT_PASSWORD_LENGTH,
  );
  const [characterOptions, setCharacterOptions] = useState({
    ...DEFAULT_CHARACTER_OPTIONS,
  });

  /* ----------------------------------------------------------------------
   * STATE — derived/output values.
   * ---------------------------------------------------------------------- */
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [strengthEvaluation, setStrengthEvaluation] = useState({
    entropyInBits: 0,
    strengthLevel: STRENGTH_LEVELS.WEAK,
  });
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [wasJustCopied, setWasJustCopied] = useState(false);

  /* ----------------------------------------------------------------------
   * EFFECT — re-evaluate strength whenever the current password changes.
   * ---------------------------------------------------------------------- */
  useEffect(() => {
    // Empty password resolves to a baseline weak evaluation.
    if (!generatedPassword) {
      setStrengthEvaluation({
        entropyInBits: 0,
        strengthLevel: STRENGTH_LEVELS.WEAK,
      });
      return;
    }
    const nextEvaluation = evaluatePasswordStrength(generatedPassword);
    setStrengthEvaluation(nextEvaluation);
  }, [generatedPassword]);

  /* ----------------------------------------------------------------------
   * EFFECT — clear copy-feedback after a short delay.
   * ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!wasJustCopied) {
      return undefined;
    }
    const resetCopyFeedbackTimeoutId = setTimeout(() => {
      setWasJustCopied(false);
    }, 1500);
    // Cleanup avoids leaked timers on rapid re-copies or unmount.
    return () => clearTimeout(resetCopyFeedbackTimeoutId);
  }, [wasJustCopied]);

  /* ----------------------------------------------------------------------
   * HANDLERS — length controls.
   * ---------------------------------------------------------------------- */
  const setPasswordLengthSafely = (candidateLength) => {
    setPasswordLength(clampPasswordLength(candidateLength));
  };

  const incrementPasswordLength = () => {
    setPasswordLength((previousLength) =>
      clampPasswordLength(previousLength + 1),
    );
  };

  const decrementPasswordLength = () => {
    setPasswordLength((previousLength) =>
      clampPasswordLength(previousLength - 1),
    );
  };

  /* ----------------------------------------------------------------------
   * HANDLERS — character options.
   * ---------------------------------------------------------------------- */
  const toggleCharacterOption = (optionKey) => {
    setCharacterOptions((previousOptions) => {
      // Compute the next value first so we can validate before committing.
      const nextOptions = {
        ...previousOptions,
        [optionKey]: !previousOptions[optionKey],
      };
      // Defensive rule — refuse to disable the last enabled option.
      const remainingEnabledKeys = collectEnabledSetKeys(nextOptions);
      if (remainingEnabledKeys.length === 0) {
        Alert.alert(
          COPY.ERROR_NO_OPTIONS_TITLE,
          COPY.ERROR_NO_OPTIONS_MESSAGE,
        );
        return previousOptions;
      }
      return nextOptions;
    });
  };

  /* ----------------------------------------------------------------------
   * HANDLERS — generation.
   * ---------------------------------------------------------------------- */
  const handleGeneratePassword = () => {
    try {
      const nextPassword = generatePassword(passwordLength, characterOptions);
      setGeneratedPassword(nextPassword);

      // Push to history, deduplicate, and trim to the configured maximum.
      setPasswordHistory((previousHistory) => {
        const deduplicatedHistory = previousHistory.filter(
          (entry) => entry !== nextPassword,
        );
        const nextHistory = [nextPassword, ...deduplicatedHistory];
        return nextHistory.slice(0, MAX_HISTORY_ENTRIES);
      });
    } catch (generationError) {
      console.error('[usePasswordGenerator] generation failed:', generationError);
      Alert.alert(
        COPY.ERROR_GENERATION_TITLE,
        generationError?.message ?? COPY.ERROR_GENERATION_MESSAGE,
      );
    }
  };

  /* ----------------------------------------------------------------------
   * HANDLERS — clipboard.
   * ---------------------------------------------------------------------- */
  const handleCopyPassword = async (overridePayload) => {
    const clipboardPayload =
      typeof overridePayload === 'string' && overridePayload.length > 0
        ? overridePayload
        : generatedPassword;
    if (!clipboardPayload) {
      // No-op silently when there is nothing to copy.
      return;
    }
    try {
      const wasCopied = await copyTextToClipboard(clipboardPayload);
      if (!wasCopied) {
        Alert.alert(COPY.ERROR_COPY_TITLE, COPY.ERROR_COPY_MESSAGE);
        return;
      }
      setWasJustCopied(true);
    } catch (clipboardError) {
      console.error('[usePasswordGenerator] copy failed:', clipboardError);
      Alert.alert(COPY.ERROR_COPY_TITLE, COPY.ERROR_COPY_MESSAGE);
    }
  };

  return {
    passwordLength,
    setPasswordLengthSafely,
    incrementPasswordLength,
    decrementPasswordLength,
    characterOptions,
    toggleCharacterOption,
    generatedPassword,
    strengthEvaluation,
    passwordHistory,
    wasJustCopied,
    handleGeneratePassword,
    handleCopyPassword,
  };
};

export default usePasswordGenerator;

