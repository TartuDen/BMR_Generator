/**
 * Delays execution by a specified duration.
 * @param {number} ms - The duration to delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}