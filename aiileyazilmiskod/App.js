/* ==========================================================================
 *   █████╗ ██████╗ ██████╗
 *  ██╔══██╗██╔══██╗██╔══██╗
 *  ███████║██████╔╝██████╔╝
 *  ██╔══██║██╔═══╝ ██╔═══╝
 *  ██║  ██║██║     ██║
 *  ╚═╝  ╚═╝╚═╝     ╚═╝
 * --------------------------------------------------------------------------
 * APPLICATION ROOT
 * --------------------------------------------------------------------------
 * Composes the theme state, navigation container, and root navigator.
 * ========================================================================== */

import React from 'react';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AppNavigator from './src/navigation/AppNavigator';
import useThemeState from './src/hooks/useThemeState';

/**
 * @description Adapts the project palette into the shape expected by
 *              React Navigation's theming layer.
 * @param   {Object}  palette
 * @param   {boolean} isDarkMode
 * @returns {Object}
 */
const buildNavigationTheme = (palette, isDarkMode) => {
  const baseTheme = isDarkMode
    ? NavigationDarkTheme
    : NavigationLightTheme;
  return {
    ...baseTheme,
    dark: isDarkMode,
    colors: {
      ...baseTheme.colors,
      primary: palette.accent,
      background: palette.background,
      card: palette.surface,
      text: palette.textPrimary,
      border: palette.border,
      notification: palette.warning,
    },
  };
};


/**
 * @description Application root component.
 * @returns {JSX.Element}
 */
const App = () => {
  // Source the theme state once at the root so every descendant sees the same
  // values without resorting to context.
  const themeApi = useThemeState();
  const navigationTheme = buildNavigationTheme(
    themeApi.palette,
    themeApi.isDarkMode,
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={themeApi.isDarkMode ? 'light' : 'dark'} />
      <AppNavigator themeApi={themeApi} />
    </NavigationContainer>
  );
};


export default App;

