/* ==========================================================================
 *  ██████╗██╗     ██╗██████╗ ██████╗  ██████╗  █████╗ ██████╗ ██████╗
 * ██╔════╝██║     ██║██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
 * ██║     ██║     ██║██████╔╝██████╔╝██║   ██║███████║██████╔╝██║  ██║
 * ██║     ██║     ██║██╔═══╝ ██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
 * ╚██████╗███████╗██║██║     ██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 *  ╚═════╝╚══════╝╚═╝╚═╝     ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
 * --------------------------------------------------------------------------
 * CLIPBOARD HELPER
 * --------------------------------------------------------------------------
 * Thin adapter wrapping `expo-clipboard` so callers never reach for the
 * native module directly.
 * ========================================================================== */

import * as Clipboard from 'expo-clipboard';

/**
 * @description Persists the supplied string into the OS clipboard.
 * @param   {string}             clipboardPayload  The text to copy.
 * @returns {Promise<boolean>}                     True on success, false otherwise.
 * @example
 *   const wasCopied = await copyTextToClipboard('hello');
 */
export const copyTextToClipboard = async (clipboardPayload) => {
  // Defensive guard — refuse empty or non-string payloads.
  if (typeof clipboardPayload !== 'string' || clipboardPayload.length === 0) {
    console.error('[clipboardHelper] Refused empty clipboard payload.');
    return false;
  }
  try {
    await Clipboard.setStringAsync(clipboardPayload);
    return true;
  } catch (clipboardError) {
    // Surface the failure on the developer console; callers handle the user UI.
    console.error('[clipboardHelper] Failed to write to clipboard:', clipboardError);
    return false;
  }
};

