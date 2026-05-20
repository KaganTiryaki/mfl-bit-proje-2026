/* ==========================================================================
 * PRIMARY-BUTTON COMPONENT
 * --------------------------------------------------------------------------
 * Themed press-target used for primary call-to-action surfaces. Supports a
 * `secondary` visual variant and a disabled state.
 * ========================================================================== */

import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

/**
 * @typedef {Object} PrimaryButtonProps
 * @property {string}   label            Visible label.
 * @property {Function} onPress          Press handler.
 * @property {Object}   palette          Resolved theme palette.
 * @property {string}   [variant]        'primary' (default) or 'secondary'.
 * @property {boolean}  [isDisabled]     Whether the button is non-interactive.
 */

/**
 * @description Themed, accessible button used across the application.
 * @param   {PrimaryButtonProps} primaryButtonProps
 * @returns {JSX.Element}
 */
const PrimaryButton = ({
  label,
  onPress,
  palette,
  variant = 'primary',
  isDisabled = false,
}) => {
  // Resolve colours conditionally based on the variant and disabled state.
  const isSecondaryVariant = variant === 'secondary';
  const backgroundFill = isSecondaryVariant
    ? palette.surfaceAlt
    : palette.accent;
  const labelTint = isSecondaryVariant
    ? palette.textPrimary
    : palette.textInverted;

  /**
   * @description Adapts the pressable's style based on press feedback.
   * @param   {Object}  pressableState
   * @param   {boolean} pressableState.pressed
   * @returns {Object[]}
   */
  const resolvePressableStyle = ({ pressed }) => [
    styles.pressableBase,
    {
      backgroundColor: backgroundFill,
      borderColor: isSecondaryVariant ? palette.border : 'transparent',
      opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1,
    },
  ];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      style={resolvePressableStyle}
    >
      <Text style={[styles.labelBase, { color: labelTint }]}>{label}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  pressableBase: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelBase: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});


export default PrimaryButton;

