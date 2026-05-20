/* ==========================================================================
 * STRENGTH-INDICATOR COMPONENT
 * --------------------------------------------------------------------------
 * Visualises the categorical strength tier as a coloured progress bar and a
 * textual label.
 * ========================================================================== */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  STRENGTH_COLOR_KEYS,
  STRENGTH_FILL_RATIO,
} from '../utils/constants';

/**
 * @typedef {Object} StrengthIndicatorProps
 * @property {string} strengthLevel
 * @property {number} entropyInBits
 * @property {Object} palette
 */

/**
 * @description Formats the entropy value with two-decimal precision.
 * @param   {number} entropyInBits
 * @returns {string}
 */
const formatEntropyLabel = (entropyInBits) => {
  if (typeof entropyInBits !== 'number' || Number.isNaN(entropyInBits)) {
    return '0.00 bits';
  }
  return `${entropyInBits.toFixed(2)} bits`;
};


/**
 * @description Renders the strength bar and accompanying labels.
 * @param   {StrengthIndicatorProps} strengthIndicatorProps
 * @returns {JSX.Element}
 */
const StrengthIndicator = ({ strengthLevel, entropyInBits, palette }) => {
  // Resolve the indicator colour and fill ratio through the centralised maps.
  const indicatorColorKey = STRENGTH_COLOR_KEYS[strengthLevel] ?? 'strengthWeak';
  const indicatorTint = palette[indicatorColorKey];
  const fillRatio = STRENGTH_FILL_RATIO[strengthLevel] ?? 0;
  const fillPercentage = `${Math.round(fillRatio * 100)}%`;

  return (
    <View style={styles.containerColumn}>
      <View style={styles.headerRow}>
        <Text style={[styles.levelLabel, { color: indicatorTint }]}>
          {strengthLevel}
        </Text>
        <Text style={[styles.entropyLabel, { color: palette.textSecondary }]}>
          {formatEntropyLabel(entropyInBits)}
        </Text>
      </View>

      <View
        style={[
          styles.progressTrack,
          { backgroundColor: palette.surfaceAlt, borderColor: palette.border },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            {
              width: fillPercentage,
              backgroundColor: indicatorTint,
            },
          ]}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  containerColumn: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  entropyLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 6,
    borderWidth: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
});


export default StrengthIndicator;

