/* ==========================================================================
 * TOGGLE-SWITCH COMPONENT
 * --------------------------------------------------------------------------
 * Themed row exposing a label and a native Switch. Used for character-set
 * options and the theme toggle.
 * ========================================================================== */

import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

/**
 * @typedef {Object} ToggleSwitchProps
 * @property {string}   label
 * @property {boolean}  isEnabled
 * @property {Function} onToggle
 * @property {Object}   palette
 */

/**
 * @description Themed toggle row rendering a label alongside a native switch.
 * @param   {ToggleSwitchProps} toggleSwitchProps
 * @returns {JSX.Element}
 */
const ToggleSwitch = ({ label, isEnabled, onToggle, palette }) => {
  return (
    <View style={[styles.rowContainer, { borderColor: palette.border }]}>
      <Text style={[styles.labelText, { color: palette.textPrimary }]}>
        {label}
      </Text>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
        trackColor={{
          false: palette.surfaceAlt,
          true: palette.accent,
        }}
        thumbColor={isEnabled ? palette.textInverted : palette.textSecondary}
        ios_backgroundColor={palette.surfaceAlt}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
  },
});


export default ToggleSwitch;

