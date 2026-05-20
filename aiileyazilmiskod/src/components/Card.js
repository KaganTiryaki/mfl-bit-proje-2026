/* ==========================================================================
 * CARD COMPONENT
 * --------------------------------------------------------------------------
 * Generic themed surface used for sectioning the generator screen.
 * Renders an optional title above arbitrary children.
 * ========================================================================== */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * @typedef {Object} CardProps
 * @property {string}    [title]
 * @property {React.ReactNode} children
 * @property {Object}    palette
 */

/**
 * @description Renders a themed card container with an optional header.
 * @param   {CardProps} cardProps
 * @returns {JSX.Element}
 */
const Card = ({ title, children, palette }) => {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
        },
      ]}
    >
      {title ? (
        <Text style={[styles.titleText, { color: palette.textSecondary }]}>
          {title.toUpperCase()}
        </Text>
      ) : null}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  contentContainer: {
    width: '100%',
  },
});


export default Card;

