/* ==========================================================================
 *  ███████╗████████╗██████╗ ███████╗███╗   ██╗ ██████╗ ████████╗██╗  ██╗
 *  ██╔════╝╚══██╔══╝██╔══██╗██╔════╝████╗  ██║██╔════╝ ╚══██╔══╝██║  ██║
 *  ███████╗   ██║   ██████╔╝█████╗  ██╔██╗ ██║██║  ███╗   ██║   ███████║
 *  ╚════██║   ██║   ██╔══██╗██╔══╝  ██║╚██╗██║██║   ██║   ██║   ██╔══██║
 *  ███████║   ██║   ██║  ██║███████╗██║ ╚████║╚██████╔╝   ██║   ██║  ██║
 *  ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
 * --------------------------------------------------------------------------
 * STRENGTH CALCULATOR
 * --------------------------------------------------------------------------
 * Computes the Shannon entropy of a password and classifies it into a
 * categorical tier (Weak / Medium / Strong / Very Strong).
 * ========================================================================== */

import {
  CHARACTER_SETS,
  CHARACTER_SET_KEYS,
  STRENGTH_LEVELS,
  STRENGTH_THRESHOLDS,
} from './constants';

/**
 * @description Determines which character sets a string draws from.
 * @param   {string} passwordSubject  Password to inspect.
 * @returns {number}                  Effective alphabet size in bits-of-entropy terms.
 */
export const calculateEffectivePoolSize = (passwordSubject) => {
  // Defensive guard — non-string or empty input yields zero pool.
  if (typeof passwordSubject !== 'string' || passwordSubject.length === 0) {
    return 0;
  }

  // Probe every defined character class for at least one match.
  let cumulativePoolSize = 0;
  Object.values(CHARACTER_SET_KEYS).forEach((setKey) => {
    const setAlphabet = CHARACTER_SETS[setKey];
    const characterMatchFound = passwordSubject
      .split('')
      .some((character) => setAlphabet.includes(character));
    if (characterMatchFound) {
      cumulativePoolSize += setAlphabet.length;
    }
  });
  return cumulativePoolSize;
};


/**
 * @description Computes Shannon entropy in bits — `length × log2(poolSize)`.
 * @param   {string} passwordSubject  Password to measure.
 * @returns {number}                  Entropy in bits (>= 0).
 */
export const calculatePasswordEntropy = (passwordSubject) => {
  // Defensive guard — empty input yields zero entropy.
  if (typeof passwordSubject !== 'string' || passwordSubject.length === 0) {
    return 0;
  }
  const effectivePoolSize = calculateEffectivePoolSize(passwordSubject);
  if (effectivePoolSize <= 1) {
    return 0;
  }
  return passwordSubject.length * Math.log2(effectivePoolSize);
};


/**
 * @description Maps an entropy value to a categorical strength tier.
 * @param   {number} entropyInBits  Pre-calculated entropy.
 * @returns {string}                One of `STRENGTH_LEVELS` values.
 */
export const mapEntropyToStrengthLevel = (entropyInBits) => {
  // Defensive guard — non-numeric input maps to Weak.
  if (typeof entropyInBits !== 'number' || Number.isNaN(entropyInBits)) {
    return STRENGTH_LEVELS.WEAK;
  }
  if (entropyInBits >= STRENGTH_THRESHOLDS.VERY_STRONG_MIN_ENTROPY) {
    return STRENGTH_LEVELS.VERY_STRONG;
  }
  if (entropyInBits >= STRENGTH_THRESHOLDS.STRONG_MIN_ENTROPY) {
    return STRENGTH_LEVELS.STRONG;
  }
  if (entropyInBits >= STRENGTH_THRESHOLDS.MEDIUM_MIN_ENTROPY) {
    return STRENGTH_LEVELS.MEDIUM;
  }
  return STRENGTH_LEVELS.WEAK;
};


/**
 * @typedef {Object} StrengthEvaluation
 * @property {number} entropyInBits  The computed entropy value.
 * @property {string} strengthLevel  The categorical tier.
 */

/**
 * @description Combines entropy calculation and tier mapping in one call.
 * @param   {string} passwordSubject  Password to evaluate.
 * @returns {StrengthEvaluation}      Combined evaluation object.
 * @example
 *   evaluatePasswordStrength('aB3!aB3!aB3!aB3!');
 *   // → { entropyInBits: 104.87..., strengthLevel: 'Very Strong' }
 */
export const evaluatePasswordStrength = (passwordSubject) => {
  // Compute entropy first — keep tier mapping side-effect free.
  const entropyInBits = calculatePasswordEntropy(passwordSubject);
  const strengthLevel = mapEntropyToStrengthLevel(entropyInBits);
  return {
    entropyInBits,
    strengthLevel,
  };
};

