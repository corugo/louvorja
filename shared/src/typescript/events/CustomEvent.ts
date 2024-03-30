import { CONFIG } from '../config.js';

let customEvent: typeof CustomEvent;

// if not exists CustomEvent, polyfill it
if (typeof customEvent !== "function") {
  class CustomEvent extends Event {
    #detail: Object;
    constructor(type: string, options?: CustomEventInit) {
      super(type, options);
      this.#detail = options?.detail ?? null;
    }
    get detail(): Object {
      return this.#detail;
    }
    static get appID(): string {
      return CONFIG.application.id;
    }
  }
  customEvent = CustomEvent;
} else {
  // else use the existing declaration
  customEvent = CustomEvent;
}

export const CustomEvent = customEvent;

