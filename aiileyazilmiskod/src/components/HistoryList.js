/* ==========================================================================
 * HISTORY-LIST COMPONENT
 * --------------------------------------------------------------------------
 * Renders the bounded history of recently generated passwords. Each entry is
 * displayed with a copy affordance. Empty state shows a hint message.
 * ========================================================================== */

import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { COPY } from '../utils/constants';

/**
 * @typedef {Object} HistoryListProps
 * @property {string[]} historyEntries
 * @property {Function} onCopyEntry
 * @property {Object}   palette
 */

/**
 * @description Renders an empty-state hint when no history entries exist.
 * @param   {Object} palette
 * @returns {JSX.Element}
 */
const renderEmptyHint = (palette) => (
  <Text style={[styles.emptyHintText, { color: palette.textSecondary }]}>
    {COPY.LABEL_EMPTY_HISTORY}
  </Text>
);


/**
 * @description Renders a single history row.
 * @param   {string}   entryValue
 * @param   {number}   entryIndex
 * @param   {Function} onCopyEntry
 * @param   {Object}   palette
 * @returns {JSX.Element}
 */
const renderHistoryRow = (entryValue, entryIndex, onCopyEntry, palette) => {
  /**
   * @description Adapts the per-row press style.
   */
  const resolveRowStyle = ({ pressed }) => [
    styles.rowContainer,
    {
      backgroundColor: palette.surfaceAlt,
      borderColor: palette.border,
      opacity: pressed ? 0.75 : 1,
    },
  ];

  return (
    <Pressable
      key={`history-entry-${entryIndex}-${entryValue}`}
      accessibilityRole="button"
      accessibilityLabel={`Copy ${entryValue}`}
      onPress={() => onCopyEntry(entryValue)}
      style={resolveRowStyle}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="middle"
        style={[styles.entryText, { color: palette.textPrimary }]}
      >
        {entryValue}
      </Text>
      <Text style={[styles.copyHint, { color: palette.accent }]}>
        {COPY.CTA_COPY}
      </Text>
    </Pressable>
  );
};


/**
 * @description Renders the history list.
 * @param   {HistoryListProps} historyListProps
 * @returns {JSX.Element}
 */
const HistoryList = ({ historyEntries, onCopyEntry, palette }) => {
  // Defensive default — treat missing arrays as empty.
  const safeEntries = Array.isArray(historyEntries) ? historyEntries : [];
  if (safeEntries.length === 0) {
    return renderEmptyHint(palette);
  }
  return (
    <View style={styles.listContainer}>
      {safeEntries.map((entryValue, entryIndex) =>
        renderHistoryRow(entryValue, entryIndex, onCopyEntry, palette),
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  entryText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    marginRight: 12,
  },
  copyHint: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  emptyHintText: {
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
});


export default HistoryList;

