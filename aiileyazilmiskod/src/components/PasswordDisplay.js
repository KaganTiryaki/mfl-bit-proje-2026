/* ==========================================================================
 * PASSWORD-DISPLAY COMPONENT
 * --------------------------------------------------------------------------
 * Renders the most recently generated password in a monospace style, with an
 * adjacent copy button that flips its label after a successful copy.
 * ========================================================================== */

import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { COPY } from '../utils/constants';

/**
 * @typedef {Object} PasswordDisplayProps
 * @property {string}   passwordValue
 * @property {boolean}  wasJustCopied
 * @property {Function} onCopyPressed
 * @property {Object}   palette
 */

/**
 * @description Renders the password block with copy affordance.
 * @param   {PasswordDisplayProps} passwordDisplayProps
 * @returns {JSX.Element}
 */
const PasswordDisplay = ({
  passwordValue,
  wasJustCopied,
  onCopyPressed,
  palette,
}) => {
  // Resolve which copy to render in the value area and on the button.
  const hasPassword = typeof passwordValue === 'string' && passwordValue.length > 0;
  const valueText = hasPassword ? passwordValue : COPY.LABEL_NO_PASSWORD;
  const valueTextStyle = [
    styles.passwordText,
    {
      color: hasPassword ? palette.textPrimary : palette.textSecondary,
      fontStyle: hasPassword ? 'normal' : 'italic',
    },
  ];
  const copyButtonLabel = wasJustCopied ? COPY.CTA_COPIED : COPY.CTA_COPY;

  /**
   * @description Adapts copy-button styling to its press state.
   */
  const resolveCopyButtonStyle = ({ pressed }) => [
    styles.copyButton,
    {
      backgroundColor: wasJustCopied ? palette.success : palette.accentMuted,
      opacity: !hasPassword ? 0.4 : pressed ? 0.7 : 1,
    },
  ];

  return (
    <View
      style={[
        styles.containerColumn,
        {
          backgroundColor: palette.surfaceAlt,
          borderColor: palette.border,
        },
      ]}
    >
      <Text
        selectable
        numberOfLines={3}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        style={valueTextStyle}
      >
        {valueText}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={copyButtonLabel}
        disabled={!hasPassword}
        onPress={onCopyPressed}
        style={resolveCopyButtonStyle}
      >
        <Text
          style={[
            styles.copyButtonLabel,
            {
              color: wasJustCopied
                ? palette.textInverted
                : palette.accent,
            },
          ]}
        >
          {copyButtonLabel}
        </Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  containerColumn: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'stretch',
  },
  passwordText: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 1.4,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
  },
  copyButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButtonLabel: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});


export default PasswordDisplay;

