/**
 * rename key in array object,
 * for example: renameAllKeys([{a: 1}, {a: 2}], "a", "b")
 * will return [{b: 1}, {b: 2}]
 * @param {object} obj
 * @param {string} old_key
 * @param {string} new_key
 * @returns object
 */
export const renameAllKeys = (obj, old_key, new_key) => {
  Object.keys(obj).forEach((key) => {
    obj[key][new_key] = obj[key][old_key];
    delete obj[key][old_key];
  });
  return obj;
};

/**
 * rename key in object,
 * for example: renameKey({a: 1}, "a", "b")
 * will return {b: 1}
 * @param {object} obj
 * @param {string} old_key
 * @param {string} new_key
 * @returns object
 */
export const renameKey = (obj, old_key, new_key) => {
  obj[new_key] = obj[old_key];
  delete obj[old_key];
  return obj;
};
