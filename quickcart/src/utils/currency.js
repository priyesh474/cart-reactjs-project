const USD_TO_INR = 85;

/**
 * Convert USD price to INR
 * @param {number} usd
 * @returns {number}
 */
export function toINR(usd) {
  return Math.round(usd * USD_TO_INR);
}
