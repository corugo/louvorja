export class Stringifyable {
  static of(object) {
    const obj = new Stringifyable();
    Object.assign(this, object);
    return obj;
  }

  toString() {
    return JSON.stringify(this);
  }

  toJSON() {
    return { ...this };
  }
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((s) => capitalize(s))
    .join(" ");
}
