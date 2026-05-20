/* ==========================================================================
 *  ██████╗  █████╗ ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██████╗
 *  ██╔══██╗██╔══██╗██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██╔══██╗
 *  ██████╔╝███████║███████╗███████╗██║ █╗ ██║██║   ██║██████╔╝██║  ██║
 *  ██╔═══╝ ██╔══██║╚════██║╚════██║██║███╗██║██║   ██║██╔══██╗██║  ██║
 *  ██║     ██║  ██║███████║███████║╚███╔███╔╝╚██████╔╝██║  ██║██████╔╝
 *  ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝
 * --------------------------------------------------------------------------
 * PASSWORD GENERATOR
 * --------------------------------------------------------------------------
 * Provides pure, side-effect-free utilities for assembling secure, random
 * passwords from the configured character sets.
 * ========================================================================== */

import {
  CHARACTER_SETS,
  CHARACTER_SET_KEYS,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from './constants';

/**
 * @typedef {Object} CharacterOptions
 * @property {boolean} uppercase  Whether ASCII uppercase letters are enabled.
 * @property {boolean} lowercase  Whether ASCII lowercase letters are enabled.
 * @property {boolean} numbers    Whether numeric digits are enabled.
 * @property {boolean} symbols    Whether special symbols are enabled.
 */

/**
 * @description Validates that the supplied length sits within the accepted bounds.
 * @param   {number} requestedLength  The length the caller wishes to generate.
 * @returns {boolean}                 True when the length is within bounds.
 * @example
 *   validatePasswordLength(12); // → true
 *   validatePasswordLength(2);  // → false
 */
export const validatePasswordLength = (requestedLength) => {
  // Defensive guard — reject non-numeric, non-integer or out-of-range values.
  if (typeof requestedLength !== 'number') {
    return false;
  }
  if (!Number.isInteger(requestedLength)) {
    return false;
  }
  return (
    requestedLength >= MIN_PASSWORD_LENGTH &&
    requestedLength <= MAX_PASSWORD_LENGTH
  );
};


/**
 * @description Filters the option map into the list of enabled character-set keys.
 * @param   {CharacterOptions} characterOptions
 * @returns {string[]}                         An array of enabled set keys.
 */
export const collectEnabledSetKeys = (characterOptions) => {
  // Defensive guard — invalid input yields an empty enabled set.
  if (!characterOptions || typeof characterOptions !== 'object') {
    return [];
  }
  // Iterate the canonical key list to guarantee deterministic ordering.
  const enabledSetKeys = Object.values(CHARACTER_SET_KEYS).filter(
    (setKey) => characterOptions[setKey] === true,
  );
  return enabledSetKeys;
};


/**
 * @description Concatenates every enabled character pool into a single string.
 * @param   {string[]} enabledSetKeys  The list of enabled set keys.
 * @returns {string}                   The combined character pool.
 */
export const buildCharacterPool = (enabledSetKeys) => {
  // Defensive guard — empty input yields an empty pool.
  if (!Array.isArray(enabledSetKeys) || enabledSetKeys.length === 0) {
    return '';
  }
  // Reduce keys into the concatenated alphabet.
  const characterPool = enabledSetKeys.reduce((accumulatedPool, setKey) => {
    const setAlphabet = CHARACTER_SETS[setKey] ?? '';
    return accumulatedPool + setAlphabet;
  }, '');
  return characterPool;
};


/**
 * @description Returns a uniformly distributed random integer in [0, upperBoundExclusive).
 * @param   {number} upperBoundExclusive  The exclusive upper bound.
 * @returns {number}                      A random integer in the requested range.
 */
export const generateRandomIntegerInRange = (upperBoundExclusive) => {
  // Defensive guard — guarantee a positive integer bound.
  if (!Number.isInteger(upperBoundExclusive) || upperBoundExclusive <= 0) {
    return 0;
  }
  return Math.floor(Math.random() * upperBoundExclusive);
};


/**
 * @description Picks a single random character from the supplied alphabet.
 * @param   {string} alphabet  The string from which to draw.
 * @returns {string}           A single-character string.
 */
export const pickRandomCharacter = (alphabet) => {
  // Defensive guard — empty alphabet yields an empty character.
  if (typeof alphabet !== 'string' || alphabet.length === 0) {
    return '';
  }
  const randomIndex = generateRandomIntegerInRange(alphabet.length);
  return alphabet.charAt(randomIndex);
};


/**
 * @description Shuffles a string using the Fisher–Yates algorithm.
 * @param   {string} subjectString  The string to shuffle.
 * @returns {string}                The shuffled output.
 */
export const shuffleString = (subjectString) => {
  // Defensive guard — short-circuit on falsy or single-character input.
  if (typeof subjectString !== 'string' || subjectString.length <= 1) {
    return subjectString ?? '';
  }
  const characterArray = subjectString.split('');
  // Walk the array from right to left swapping with a random earlier index.
  for (
    let currentIndex = characterArray.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const swapIndex = generateRandomIntegerInRange(currentIndex + 1);
    const temporaryCharacter = characterArray[currentIndex];
    characterArray[currentIndex] = characterArray[swapIndex];
    characterArray[swapIndex] = temporaryCharacter;
  }
  return characterArray.join('');
};


/**
 * @description Generates a password matching the supplied length and option set.
 *              Guarantees the presence of at least one character from every
 *              enabled set whenever the requested length allows it.
 * @param   {number}            requestedLength    Desired password length.
 * @param   {CharacterOptions}  characterOptions   Enabled character classes.
 * @returns {string}                               The generated password.
 * @throws  {Error}                                When validation fails.
 * @example
 *   generatePassword(16, { uppercase: true, lowercase: true,
 *                          numbers: true, symbols: false });
 */
export const generatePassword = (requestedLength, characterOptions) => {
  // Step 1 — validate the length parameter.
  if (!validatePasswordLength(requestedLength)) {
    throw new Error(
      `Requested length (${requestedLength}) is outside the accepted range ` +
        `[${MIN_PASSWORD_LENGTH}, ${MAX_PASSWORD_LENGTH}].`,
    );
  }

  // Step 2 — determine which sets are enabled.
  const enabledSetKeys = collectEnabledSetKeys(characterOptions);
  if (enabledSetKeys.length === 0) {
    throw new Error('At least one character set must be enabled.');
  }

  // Step 3 — build the combined alphabet used for the bulk fill.
  const characterPool = buildCharacterPool(enabledSetKeys);
  if (characterPool.length === 0) {
    throw new Error('Resolved character pool is empty.');
  }

  // Step 4 — guarantee one character per enabled set (mandatory characters).
  const mandatoryCharacters = enabledSetKeys.map((setKey) =>
    pickRandomCharacter(CHARACTER_SETS[setKey]),
  );

  // Step 5 — fill the remainder of the password from the combined pool.
  const remainingCount = requestedLength - mandatoryCharacters.length;
  const filledRemainder = Array.from({ length: remainingCount }, () =>
    pickRandomCharacter(characterPool),
  );

  // Step 6 — concatenate mandatory characters with the filler, then shuffle so
  // that mandatory characters do not always appear at the start.
  const unshuffledPassword =
    mandatoryCharacters.join('') + filledRemainder.join('');
  return shuffleString(unshuffledPassword);
};

