/**
 * Get the wrapped version of an index based on a certain length
 * @param {Number} i
 * @param {Number} len
 * @returns
 */
 export const wrap = (i, len) => ((i % len) + len) % len
