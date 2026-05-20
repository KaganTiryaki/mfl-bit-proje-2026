/* ==========================================================================
 * BABEL CONFIGURATION
 * --------------------------------------------------------------------------
 * Provides the Expo preset required for transpiling React Native sources.
 * ========================================================================== */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
