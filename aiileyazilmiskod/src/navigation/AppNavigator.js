/* ==========================================================================
 * APP NAVIGATOR
 * --------------------------------------------------------------------------
 * Configures the native-stack navigator and forwards the shared theme API
 * to each screen via the function-as-children pattern.
 * ========================================================================== */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GeneratorScreen from '../screens/GeneratorScreen';
import HomeScreen from '../screens/HomeScreen';
import { COPY, ROUTE_NAMES } from '../utils/constants';

const NativeStack = createNativeStackNavigator();

/**
 * @typedef {Object} AppNavigatorProps
 * @property {Object} themeApi  Theme state surface from `useThemeState`.
 */

/**
 * @description Renders the navigation tree.
 * @param   {AppNavigatorProps} appNavigatorProps
 * @returns {JSX.Element}
 */
const AppNavigator = ({ themeApi }) => {
  const { palette } = themeApi;

  /**
   * @description Builds the shared screen options object.
   * @returns {Object}
   */
  const buildScreenOptions = () => ({
    headerStyle: { backgroundColor: palette.surface },
    headerTintColor: palette.textPrimary,
    headerTitleStyle: { fontWeight: '700' },
    contentStyle: { backgroundColor: palette.background },
  });

  /**
   * @description Wraps the home screen with the theme prop.
   * @param   {Object} routeProps  Props injected by React Navigation.
   * @returns {JSX.Element}
   */
  const renderHomeScreen = (routeProps) => (
    <HomeScreen {...routeProps} themeApi={themeApi} />
  );

  /**
   * @description Wraps the generator screen with the theme prop.
   * @param   {Object} routeProps  Props injected by React Navigation.
   * @returns {JSX.Element}
   */
  const renderGeneratorScreen = (routeProps) => (
    <GeneratorScreen {...routeProps} themeApi={themeApi} />
  );

  return (
    <NativeStack.Navigator
      initialRouteName={ROUTE_NAMES.HOME}
      screenOptions={buildScreenOptions()}
    >
      <NativeStack.Screen
        name={ROUTE_NAMES.HOME}
        options={{ title: COPY.APP_TITLE, headerShown: false }}
      >
        {renderHomeScreen}
      </NativeStack.Screen>

      <NativeStack.Screen
        name={ROUTE_NAMES.GENERATOR}
        options={{ title: COPY.APP_TITLE }}
      >
        {renderGeneratorScreen}
      </NativeStack.Screen>
    </NativeStack.Navigator>
  );
};


export default AppNavigator;

