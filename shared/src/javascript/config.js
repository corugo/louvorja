class TypedProperty {
  /** @type {string} */
  #name;
  /** @type {string} */
  #type;
  /** @type {} */
  #defaultValue;
  /** @type {string} */
  #description;
  /** @type {} */
  #value;

  constructor(name, type, defaultValue, description) {
    this.#name = name;
    this.#type = type;
    this.#defaultValue = defaultValue;
    this.#description = description;
    this.value = defaultValue;
  }

  get name() {
    return this.#name;
  }

  get type() {
    return this.#type;
  }

  get defaultValue() {
    return this.#defaultValue;
  }

  get description() {
    return this.#description;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.isTypeCorrect(value);
    this.#value = value;
  }

  reset() {
    this.#value = this.#defaultValue;
  }

  toJSON() {
    return this.#value;
  }

  toString() {
    return `${this.#name}: ${this.#value}`;
  }

  isArrayCorrect() {
    // if array is expected and value is array
    if (this.#type.endsWith("[]") && Array.isArray(value)) {
      // if array empty or elements type match
      if (
        value.length == 0 ||
        typeof value[0] === this.#type.substring(0, this.#type.length - 2)
      ) {
        return true;
      }
    }
    return false;
  }

  isTypeCorrect(value) {
    // FIXME needs support for object (maybe comparing keys??)
    const isCorrect = typeof value === this.#type || this.isArrayCorrect();
    if (!isCorrect) {
      throw new Error(
        `Wrong type: expected ${this.#type}, received ${typeof value}${
          Array.isArray(value) ? "[]" : ""
        }`
      );
    }
    return isCorrect;
  }
}

class PropertyGroup {
  _name;
  _description;
  _properties = {};
  static #isInternalConstructing = false;

  constructor(name, description) {
    if (!PropertyGroup.#isInternalConstructing) {
      throw new TypeError("PropertyGroup is not constructable");
    }
    this._name = name;
    this._description = description;
  }

  static #create(name, description) {
    PropertyGroup.#isInternalConstructing = true;
    const instance = new PropertyGroup(name, description);
    PropertyGroup.#isInternalConstructing = false;
    return instance;
  }

  static of(name, description, ...properties) {
    const group = PropertyGroup.#create(name, description);
    for (const property of properties) {
      group.add(property);
    }
    return group.proxied();
  }

  add(property) {
    this._properties[property.name] = property;
    return this;
  }

  has(target, key) {
    if (key[0] === "_") {
      return key in target;
    }
    return key in target._properties;
  }

  get(target, key, receiver) {
    if (key[0] === "_") {
      return target[key];
    }
    if (key in target._properties) {
      return target._properties[key].value;
    }
    return target[key];
  }

  set(target, key, value) {
    if (key[0] === "_") {
      throw new Error(`Cannot set value for ${key}`);
    }
    if (key in target._properties) {
      target._properties[key].value = value;
    }
    target[key] = value;
  }

  ownKeys() {
    return Object.keys(this._properties);
  }

  getOwnPropertyDescriptor(target, key) {
    return {
      enumerable: true,
      configurable: true,
      value: this._properties[key].value,
    };
  }

  proxied() {
    return new Proxy(this, this);
  }
}

/**
 * Holds all aplication configuration.
 */
export class Config {
  application = PropertyGroup.of(
    "Application",
    "Application related configurations",
    new TypedProperty("id", "string", 'louvor-ja', 'Application ID'),
    new TypedProperty("debug", "boolean", process.env.NODE_ENV === 'development' || !process.env.DEBUG === 'true', "Enable debug mode"),
    new TypedProperty("name", "string", "Louvor JA", "Application name"),
    new TypedProperty(
      "description",
      "string",
      "Coletânea e Utilidades Louvor JA",
      "Application description"
    ),
    new TypedProperty(
      "startPage",
      "string",
      "liturgy",
      "Application start page. Default 'liturgy'. Can be either liturgy or tools"
    )
  );
  /**
   * @type {ServerConfig}
   */
  server = PropertyGroup.of(
    "Server",
    "Server related configurations",
    new TypedProperty(
      "port",
      "number",
      5174,
      "Server port. Use 0 (zero) for random."
    ),
    new TypedProperty(
      "bind",
      "string",
      "0.0.0.0",
      "Address to bind to. '0.0.0.0' to all interfaces, '127.0.0.1' to localhost."
    ),
    new TypedProperty(
      "logLevel",
      "string",
      "trace",
      "Set server log level (trace, debug, info, warn, error, fatal, silent)."
    )
  );

  /**
   * @returns {Config}.
   */
  static load() {
    return new Config();
  }
}

/**
 * @type {Config}
 */
let config = null;

/**
 * Load or return already loaded {@link Config}.
 * @returns {Config}
 */
export const CONFIG = (function () {
  if (config === null) {
    config = Config.load();
  }
  return config;
})();

export default CONFIG;
