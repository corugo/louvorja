import url from "node:url";

export class MetaModule {
  /**
   * Module URL.
   * @type {string}
   */
  url;
}

export class Module {
  /**
   * @type {MetaModule}
   */
  meta;
}

/**
 *
 * @param {MetaModule|string} meta.
 * @returns {string} Module path.
 */
export function path(meta) {
  return url.fileURLToPath(meta.url || meta);
}

/**
 *
 * @param {MetaModule} meta.
 * @returns {string} Module directory (parent) path.
 */
export function parent(meta) {
  return path(meta.url.split("/").slice(0, -1).join("/"));
}

/**
 *
 * @param {MetaModule} meta.
 * @returns {string} Module directory name.
 */
export function dirname(meta) {
  return meta.url.split("/").slice(-2)[0];
}

/**
 *
 * @param {MetaModule} meta.
 * @returns {string} Module filename.
 */
export function filename(meta) {
  return meta.url.split("/").slice(-1)[0];
}

/**
 *
 * @param {MetaModule} meta.
 * @returns {string} Module basename (filename without extension).
 */
export function basename(meta) {
  return filename(meta).split(".")[0];
}
