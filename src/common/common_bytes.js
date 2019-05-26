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

/**
 * Convert a given dictionary to a Uint8Array.
 * @param {Object} dict
 * @return {Uint8Array} Parsed array.
 */
function dictToBytes(dict) {
  let i; // Init iterator

  let bytes = []; // Init buffer

  for (i = 0; i < Object.keys(dict).length; i++) {
    // Iterate through keys
    bytes.push(dict[i.toString()]); // Push byte
  }

  return Uint8Array.from(bytes); // Return parsed
}

module.exports = {
  concatArrays: concatArrays,
}; // Exports
