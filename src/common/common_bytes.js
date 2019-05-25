/**
 * Concatenate two byte arrays of the same type.
 *
 * @param {any} a
 * @param {any} b
 * @return {any} Concatenated array.
 */
function concatArrays(a, b) {
  const c = new a.constructor(a.length + b.length); // Initialize

  c.set(a, 0); // Set first half
  c.set(b, a.length); // Set second half

  return c; // Return concatenated
}

module.exports = {
  concatArrays: concatArrays,
}; // Exports
