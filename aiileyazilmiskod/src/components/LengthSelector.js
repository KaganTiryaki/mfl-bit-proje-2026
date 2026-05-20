/* ==========================================================================
 * LENGTH-SELECTOR COMPONENT
 * --------------------------------------------------------------------------
 * Stepper-style control for choosing the desired password length. Uses two
 * pressable "−" / "+" buttons that wrap a centred numeric display.
 * ========================================================================== */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../utils/constants';

/**
 * @typedef {Object} LengthSelectorProps
 * @property {number}   value
 * @property {Function} onIncrement
 * @property {Function} onDecrement
 * @property {Object}   palette
 */

/**
 * @description Determines whether a stepper edge has been reached.
 * @param   {number} currentValue
 * @param   {number} edgeValue
 * @returns {boolean}
 */
const isAtEdge = (currentValue, edgeValue) => currentValue === edgeValue;

/**
 * @description Renders the length stepper.
 * @param   {LengthSelectorProps} lengthSelectorProps
 * @returns {JSX.Element}
 */
const LengthSelector = ({ value, onIncrement, onDecrement, palette }) => {
  // Derive disabled state for the two edge cases.
  const isDecrementDisabled = isAtEdge(value, MIN_PASSWORD_LENGTH);
  const isIncrementDisabled = isAtEdge(value, MAX_PASSWORD_LENGTH);

  /**
   * @description Resolves the style of a stepper button for the given state.
   * @param   {boolean} isDisabled
   * @returns {Function}
   */
  const buildButtonStyle = (isDisabled) => ({ pressed }) => [
    styles.stepperButton,
    {
      backgroundColor: palette.surfaceAlt,
      borderColor: palette.border,
      opacity: isDisabled ? 0.4 : pressed ? 0.7 : 1,
    },
  ];

  return (
    <View style={styles.containerRow}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrease password length"
        disabled={isDecrementDisabled}
        onPress={onDecrement}
        style={buildButtonStyle(isDecrementDisabled)}
      >
        <Text style={[styles.stepperLabel, { color: palette.textPrimary }]}>
          −
        </Text>
      </Pressable>

      <View style={styles.valueDisplay}>
        <Text style={[styles.valueText, { color: palette.textPrimary }]}>
          {value}
        </Text>
        <Text style={[styles.valueCaption, { color: palette.textSecondary }]}>
          characters
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase password length"
        disabled={isIncrementDisabled}
        onPress={onIncrement}
        style={buildButtonStyle(isIncrementDisabled)}
      >
        <Text style={[styles.stepperLabel, { color: palette.textPrimary }]}>
          +
        </Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  stepperButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperLabel: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: -2,
  },
  valueDisplay: {
    flex: 1,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 44,
  },
  valueCaption: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 4,
  },
});


export default LengthSelector;

