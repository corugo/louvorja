import { basename, MetaModule } from "./modules.js";
import { ThemeDefinition } from "./vuetify.js";

/**
 * Represents dark theme.
 * @type string
 */
export const DARK = "dark";

/**
 * Represents light theme.
 * @type string
 */
export const LIGHT = "light";

/**
 * Class extendind {ThemeDefinition} to add theme name.
 * @extends ThemeDefinition
 */
export class NamedThemeDefinition extends ThemeDefinition {
  /**
   * Theme name.
   * @type {string}
   */
  name;
}

/**
 *
 * @param {MetaModule} meta
 * @returns {string} Module calculated ID (file name without extension)
 */
export function id(meta) {
  return basename(meta);
}
/**
 *
 * @param {MetaModule} meta
 * @returns {string} Module calculated Name (file name without extension, upercased first letter, spaces instead of hyphens)
 */
export function name(meta) {
  const name = id(meta).replace(/([A-Z])/g, " $1");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 *
 * @returns {boolean} True if prefers-color-scheme is dark
 */
export function isDarkMode() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 *
 * @returns {string} {@link DARK} or {@link LIGHT}.
 */
export function defaultTheme() {
  return isDarkMode() ? DARK : LIGHT;
}
