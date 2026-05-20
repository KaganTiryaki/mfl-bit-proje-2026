/* ==========================================================================
 * GENERATOR SCREEN
 * --------------------------------------------------------------------------
 * Primary work surface — wires up the password generator hook with the
 * presentational components for length selection, options, strength,
 * history, and the generation call-to-action.
 * ========================================================================== */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Card from '../components/Card';
import HistoryList from '../components/HistoryList';
import LengthSelector from '../components/LengthSelector';
import PasswordDisplay from '../components/PasswordDisplay';
import PrimaryButton from '../components/PrimaryButton';
import StrengthIndicator from '../components/StrengthIndicator';
import ToggleSwitch from '../components/ToggleSwitch';
import usePasswordGenerator from '../hooks/usePasswordGenerator';
import {
  CHARACTER_SET_KEYS,
  COPY,
} from '../utils/constants';

/**
 * @description Static list driving the character-option toggles.
 *              Defined once at module scope to avoid re-allocation on render.
 */
const CHARACTER_OPTION_ROWS = [
  { optionKey: CHARACTER_SET_KEYS.UPPERCASE, label: COPY.TOGGLE_LABEL_UPPERCASE },
  { optionKey: CHARACTER_SET_KEYS.LOWERCASE, label: COPY.TOGGLE_LABEL_LOWERCASE },
  { optionKey: CHARACTER_SET_KEYS.NUMBERS, label: COPY.TOGGLE_LABEL_NUMBERS },
  { optionKey: CHARACTER_SET_KEYS.SYMBOLS, label: COPY.TOGGLE_LABEL_SYMBOLS },
];

/**
 * @typedef {Object} GeneratorScreenProps
 * @property {Object} themeApi
 */

/**
 * @description Renders the generator screen.
 * @param   {GeneratorScreenProps} generatorScreenProps
 * @returns {JSX.Element}
 */
const GeneratorScreen = ({ themeApi }) => {
  const { palette, isDarkMode } = themeApi;

  // Surface the entire generator API into local scope for readability.
  const {
    passwordLength,
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
  } = usePasswordGenerator();

  /**
   * @description Builds the toggle row for a single character-option entry.
   * @param   {{optionKey: string, label: string}} optionDescriptor
   * @returns {JSX.Element}
   */
  const renderCharacterOptionRow = (optionDescriptor) => (
    <ToggleSwitch
      key={`character-option-${optionDescriptor.optionKey}`}
      label={optionDescriptor.label}
      isEnabled={characterOptions[optionDescriptor.optionKey]}
      onToggle={() => toggleCharacterOption(optionDescriptor.optionKey)}
      palette={palette}
    />
  );

  return (
    <SafeAreaView
      style={[
        styles.screenContainer,
        { backgroundColor: palette.background },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------------- Section: current password + copy ---------------- */}
        <Card palette={palette} title="Generated password">
          <PasswordDisplay
            passwordValue={generatedPassword}
            wasJustCopied={wasJustCopied}
            onCopyPressed={() => handleCopyPassword(undefined)}
            palette={palette}
          />
        </Card>

        {/* ---------------- Section: strength indicator -------------------- */}
        <Card palette={palette} title={COPY.LABEL_STRENGTH}>
          <StrengthIndicator
            strengthLevel={strengthEvaluation.strengthLevel}
            entropyInBits={strengthEvaluation.entropyInBits}
            palette={palette}
          />
        </Card>

        {/* ---------------- Section: length selector ----------------------- */}
        <Card palette={palette} title={COPY.LABEL_LENGTH}>
          <LengthSelector
            value={passwordLength}
            onIncrement={incrementPasswordLength}
            onDecrement={decrementPasswordLength}
            palette={palette}
          />
        </Card>

        {/* ---------------- Section: character options --------------------- */}
        <Card palette={palette} title={COPY.LABEL_OPTIONS}>
          {CHARACTER_OPTION_ROWS.map(renderCharacterOptionRow)}
        </Card>

        {/* ---------------- Section: history list -------------------------- */}
        <Card palette={palette} title={COPY.LABEL_HISTORY}>
          <HistoryList
            historyEntries={passwordHistory}
            onCopyEntry={handleCopyPassword}
            palette={palette}
          />
        </Card>

        {/* ---------------- Section: generate CTA -------------------------- */}
        <View style={styles.ctaContainer}>
          <PrimaryButton
            label={COPY.CTA_GENERATE}
            onPress={handleGeneratePassword}
            palette={palette}
          />
        </View>

        <Text style={[styles.footerNote, { color: palette.textSecondary }]}>
          Passwords are generated locally on your device.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  ctaContainer: {
    width: '100%',
    marginTop: 4,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
    fontStyle: 'italic',
  },
});


export default GeneratorScreen;

