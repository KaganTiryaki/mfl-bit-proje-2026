/* ==========================================================================
 * USE-THEME-STATE HOOK
 * --------------------------------------------------------------------------
 * Encapsulates light/dark theme state for the entire application.
 * Returns the current mode, the resolved colour palette, and a toggle action.
 * ========================================================================== */

import { useState } from 'react';

import { COLORS, THEME_MODES } from '../utils/constants';

/**
 * @typedef {Object} ThemeStateApi
 * @property {string}   themeMode       Either `'light'` or `'dark'`.
 * @property {Object}   palette         Resolved colour palette for the active mode.
 * @property {boolean}  isDarkMode      Convenience boolean for dark mode.
 * @property {Function} toggleThemeMode Switches the theme between light and dark.
 */

/**
 * @description Provides theme-state management for the host component tree.
 * @param   {string} [initialThemeMode=THEME_MODES.DARK]  Starting theme.
 * @returns {ThemeStateApi}                               Theme API.
 * @example
 *   const { palette, toggleThemeMode } = useThemeState();
 */
const useThemeState = (initialThemeMode = THEME_MODES.DARK) => {
  // Active theme identifier — drives palette resolution below.
  const [themeMode, setThemeMode] = useState(initialThemeMode);

  /**
   * @description Toggles the active theme.
   */
  const toggleThemeMode = () => {
    setThemeMode((previousMode) =>
      previousMode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK,
    );
  };

  // Resolve the palette via lookup against the central colour map.
  const palette = COLORS[themeMode] ?? COLORS[THEME_MODES.DARK];
  const isDarkMode = themeMode === THEME_MODES.DARK;

  return {
    themeMode,
    palette,
    isDarkMode,
    toggleThemeMode,
  };
};

export default useThemeState;

