/* ==========================================================================
 *   ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗████████╗
 *  ██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║╚══██╔══╝
 *  ██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║   ██║
 *  ██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║   ██║
 *  ╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║   ██║
 *   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝
 * --------------------------------------------------------------------------
 * APPLICATION CONSTANTS
 * --------------------------------------------------------------------------
 * Centralised, immutable definitions consumed across the application.
 * Every magic value (number, string, colour) must live here.
 * ========================================================================== */

/* --------------------------------------------------------------------------
 * Character pools used for password composition.
 * -------------------------------------------------------------------------- */
export const ASCII_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ASCII_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
export const NUMERIC_DIGITS = '0123456789';
export const SPECIAL_SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>?/|';

/* --------------------------------------------------------------------------
 * Character-set option identifiers (used as keys in the options state).
 * -------------------------------------------------------------------------- */
export const CHARACTER_SET_KEYS = Object.freeze({
  UPPERCASE: 'uppercase',
  LOWERCASE: 'lowercase',
  NUMBERS: 'numbers',
  SYMBOLS: 'symbols',
});

/* --------------------------------------------------------------------------
 * Mapping between option key and its underlying character pool.
 * -------------------------------------------------------------------------- */
export const CHARACTER_SETS = Object.freeze({
  [CHARACTER_SET_KEYS.UPPERCASE]: ASCII_UPPERCASE,
  [CHARACTER_SET_KEYS.LOWERCASE]: ASCII_LOWERCASE,
  [CHARACTER_SET_KEYS.NUMBERS]: NUMERIC_DIGITS,
  [CHARACTER_SET_KEYS.SYMBOLS]: SPECIAL_SYMBOLS,
});

/* --------------------------------------------------------------------------
 * Password-length bounds and defaults.
 * -------------------------------------------------------------------------- */
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 32;
export const DEFAULT_PASSWORD_LENGTH = 16;
export const LENGTH_STEP = 1;

/* --------------------------------------------------------------------------
 * History configuration.
 * -------------------------------------------------------------------------- */
export const MAX_HISTORY_ENTRIES = 5;

/* --------------------------------------------------------------------------
 * Strength evaluation levels.
 * Each level uses an entropy threshold (bits) — score above the threshold
 * promotes the password into the corresponding tier.
 * -------------------------------------------------------------------------- */
export const STRENGTH_LEVELS = Object.freeze({
  WEAK: 'Weak',
  MEDIUM: 'Medium',
  STRONG: 'Strong',
  VERY_STRONG: 'Very Strong',
});

export const STRENGTH_THRESHOLDS = Object.freeze({
  MEDIUM_MIN_ENTROPY: 40,
  STRONG_MIN_ENTROPY: 60,
  VERY_STRONG_MIN_ENTROPY: 80,
});

/* --------------------------------------------------------------------------
 * Navigation route names.
 * -------------------------------------------------------------------------- */
export const ROUTE_NAMES = Object.freeze({
  HOME: 'Home',
  GENERATOR: 'Generator',
});

/* --------------------------------------------------------------------------
 * Theme identifiers.
 * -------------------------------------------------------------------------- */
export const THEME_MODES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
});

/* --------------------------------------------------------------------------
 * Theme colour palettes.
 * Each tier of the strength indicator owns a dedicated colour.
 * -------------------------------------------------------------------------- */
export const COLORS = Object.freeze({
  light: Object.freeze({
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceAlt: '#F1F5F9',
    border: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textInverted: '#FFFFFF',
    accent: '#2563EB',
    accentMuted: '#DBEAFE',
    danger: '#DC2626',
    warning: '#F59E0B',
    success: '#16A34A',
    strengthWeak: '#DC2626',
    strengthMedium: '#F59E0B',
    strengthStrong: '#0EA5E9',
    strengthVeryStrong: '#16A34A',
  }),
  dark: Object.freeze({
    background: '#0F172A',
    surface: '#1E293B',
    surfaceAlt: '#334155',
    border: '#334155',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textInverted: '#0F172A',
    accent: '#60A5FA',
    accentMuted: '#1E3A8A',
    danger: '#F87171',
    warning: '#FBBF24',
    success: '#4ADE80',
    strengthWeak: '#F87171',
    strengthMedium: '#FBBF24',
    strengthStrong: '#38BDF8',
    strengthVeryStrong: '#4ADE80',
  }),
});

/* --------------------------------------------------------------------------
 * Strength tier → colour palette key mapping.
 * -------------------------------------------------------------------------- */
export const STRENGTH_COLOR_KEYS = Object.freeze({
  [STRENGTH_LEVELS.WEAK]: 'strengthWeak',
  [STRENGTH_LEVELS.MEDIUM]: 'strengthMedium',
  [STRENGTH_LEVELS.STRONG]: 'strengthStrong',
  [STRENGTH_LEVELS.VERY_STRONG]: 'strengthVeryStrong',
});

/* --------------------------------------------------------------------------
 * Strength tier → fill ratio (0..1) for the progress bar.
 * -------------------------------------------------------------------------- */
export const STRENGTH_FILL_RATIO = Object.freeze({
  [STRENGTH_LEVELS.WEAK]: 0.25,
  [STRENGTH_LEVELS.MEDIUM]: 0.5,
  [STRENGTH_LEVELS.STRONG]: 0.75,
  [STRENGTH_LEVELS.VERY_STRONG]: 1.0,
});

/* --------------------------------------------------------------------------
 * User-facing copy.
 * -------------------------------------------------------------------------- */
export const COPY = Object.freeze({
  APP_TITLE: 'Password Generator',
  WELCOME_HEADLINE: 'Generate Bulletproof Passwords',
  WELCOME_SUBHEADLINE:
    'Create cryptographically diverse credentials with adjustable length and complexity in a single tap.',
  CTA_OPEN_GENERATOR: 'Open Generator',
  CTA_GENERATE: 'Generate Password',
  CTA_COPY: 'Copy',
  CTA_COPIED: 'Copied!',
  LABEL_LENGTH: 'Password length',
  LABEL_OPTIONS: 'Character options',
  LABEL_STRENGTH: 'Strength',
  LABEL_HISTORY: 'Recent passwords',
  LABEL_EMPTY_HISTORY: 'No passwords generated yet.',
  LABEL_NO_PASSWORD: 'Tap "Generate" to create a password.',
  TOGGLE_LABEL_UPPERCASE: 'Uppercase (A-Z)',
  TOGGLE_LABEL_LOWERCASE: 'Lowercase (a-z)',
  TOGGLE_LABEL_NUMBERS: 'Numbers (0-9)',
  TOGGLE_LABEL_SYMBOLS: 'Symbols (!@#$)',
  TOGGLE_LABEL_THEME: 'Dark mode',
  ERROR_NO_OPTIONS_TITLE: 'Invalid configuration',
  ERROR_NO_OPTIONS_MESSAGE:
    'At least one character set must be enabled to generate a password.',
  ERROR_LENGTH_TITLE: 'Invalid length',
  ERROR_LENGTH_MESSAGE: `Length must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH}.`,
  ERROR_COPY_TITLE: 'Clipboard error',
  ERROR_COPY_MESSAGE: 'Failed to copy password to the clipboard.',
  ERROR_GENERATION_TITLE: 'Generation failed',
  ERROR_GENERATION_MESSAGE:
    'An unexpected error occurred while generating the password.',
});

/* --------------------------------------------------------------------------
 * Default character-set option state used on generator initialisation.
 * -------------------------------------------------------------------------- */
export const DEFAULT_CHARACTER_OPTIONS = Object.freeze({
  [CHARACTER_SET_KEYS.UPPERCASE]: true,
  [CHARACTER_SET_KEYS.LOWERCASE]: true,
  [CHARACTER_SET_KEYS.NUMBERS]: true,
  [CHARACTER_SET_KEYS.SYMBOLS]: false,
});

