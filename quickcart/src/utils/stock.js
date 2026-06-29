/**
 * Returns a CSS class name based on stock level
 * @param {number} stock
 * @returns {string}
 */
export function getStockClass(stock) {
  if (stock > 10) return 'in-stock';
  if (stock > 0) return 'low-stock';
  return 'out-of-stock';
}

/**
 * Returns a display label based on stock level
 * @param {number} stock
 * @returns {string}
 */
export function getStockLabel(stock) {
  if (stock > 10) return '● In Stock';
  if (stock > 0) return `● Only ${stock} left`;
  return '○ Out of Stock';
}
