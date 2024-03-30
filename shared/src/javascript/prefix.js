/**
 *
 * @param {string} str String to check and add leading slash if needed.
 * @returns {string}
 */
export function garanteeLeadingSlash(str) {
  return str.startsWith("/") ? str : `/${str}`;
}

/**
 *
 * @param {string} str String to check and remove trailing slash if needed.
 * @returns {string}
 */
export function garanteeNoTrailingSlash(str) {
  return str.endsWith("/") ? str.substring(0, str.length - 1) : str;
}

/**
 *
 * @param {string} str String to apply {@link garanteeLeadingSlash} and {@link garanteeNoTrailingSlash}.
 * @returns {string}
 */
export function garanteeSlashes(str) {
  return garanteeLeadingSlash(garanteeNoTrailingSlash(str));
}

/**
 *
 * @param {string} path
 * @returns {prefixRoute~applyPrefix} Prefixed route path
 */
export function prefixRoute(prefix) {
  prefix = garanteeSlashes(prefix);

  /**
   *
   * @param {string} path
   * @returns {string} Prefixed route.
   */
  const applyPrefix = function (path) {
    path = garanteeSlashes(path);
    return `${prefix}${path}`;
  };

  return applyPrefix;
}
