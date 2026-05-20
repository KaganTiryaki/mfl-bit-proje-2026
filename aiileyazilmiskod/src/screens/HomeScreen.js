/* ==========================================================================
 * HOME SCREEN
 * --------------------------------------------------------------------------
 * Welcome surface that introduces the application and provides the entry
 * point into the generator screen alongside a theme toggle.
 * ========================================================================== */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import ToggleSwitch from '../components/ToggleSwitch';
import { COPY, ROUTE_NAMES } from '../utils/constants';

/**
 * @typedef {Object} HomeScreenProps
 * @property {Object}   navigation
 * @property {Object}   themeApi
 */

/**
 * @description Renders the welcome screen.
 * @param   {HomeScreenProps} homeScreenProps
 * @returns {JSX.Element}
 */
const HomeScreen = ({ navigation, themeApi }) => {
  const { palette, isDarkMode, toggleThemeMode } = themeApi;

  /**
   * @description Navigation handler — opens the generator screen.
   */
  const handleOpenGenerator = () => {
    navigation.navigate(ROUTE_NAMES.GENERATOR);
  };

  return (
    <SafeAreaView
      style={[
        styles.screenContainer,
        { backgroundColor: palette.background },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.contentContainer}>
        <View style={styles.headerBlock}>
          <Text style={[styles.brandMark, { color: palette.accent }]}>
            🔐
          </Text>
          <Text style={[styles.headlineText, { color: palette.textPrimary }]}>
            {COPY.WELCOME_HEADLINE}
          </Text>
          <Text
            style={[styles.subheadlineText, { color: palette.textSecondary }]}
          >
            {COPY.WELCOME_SUBHEADLINE}
          </Text>
        </View>

        <Card palette={palette} title="Preferences">
          <ToggleSwitch
            label={COPY.TOGGLE_LABEL_THEME}
            isEnabled={isDarkMode}
            onToggle={toggleThemeMode}
            palette={palette}
          />
        </Card>

        <View style={styles.actionFooter}>
          <PrimaryButton
            label={COPY.CTA_OPEN_GENERATOR}
            onPress={handleOpenGenerator}
            palette={palette}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  headerBlock: {
    alignItems: 'center',
    marginTop: 32,
  },
  brandMark: {
    fontSize: 56,
    marginBottom: 12,
  },
  headlineText: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 34,
  },
  subheadlineText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  actionFooter: {
    width: '100%',
    paddingBottom: 12,
  },
});


export default HomeScreen;

