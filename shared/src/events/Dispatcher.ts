import { Event } from "./Event.js";
import { Handler } from "./Handler.js";
import { createLogger, STDOUT } from "../logging.js";
import { CONFIG } from '../config.js';

const LOGGER = createLogger(STDOUT);
export const EVENT_TYPE = "louvorja:event";

export class Dispatcher {
  option: URLSearchParams;
  handlers: Handler[];
  mode: string;

  /**
   *
   * @param {Handler[]}
   */
  constructor(handlers: Handler[]) {
    this.option = new URLSearchParams(document.location.search);
    this.mode = this.option.get("mode") || 'control';
    this.handlers = handlers;
    LOGGER.warn(`Mode: ${this.mode} with handlers ${this.handlers}`);
    if (!handlers) {
      LOGGER.warn('No handlers provided!');
    }
  }

  /** @param {Event} event */
  send(event: Event): void {
    const json = JSON.stringify(event.detail);
    LOGGER.debug(event, json);
    // for other tabs or iframes
    window.localStorage.removeItem(EVENT_TYPE);
    window.localStorage.setItem(EVENT_TYPE, json);
    // for same tab (no iframes)
    window.dispatchEvent(event);
  }

  /** @param {Event} event */
  process = async (event: Event): Promise<void> => {
    const { id, objectId, source, target, command, args } = event;
    console.log(event, { id, objectId, source, target, command, args })
    try {
      LOGGER.debug(this.handlers[target]);
      this.handlers[target][command](event);
    } catch (error) {
      LOGGER.error(
        `Projection [handle] error for ${target} ${command} ${JSON.stringify(
          args
        )}.`,
        error
      );
    }
  };

  /** @param {Event} event */
  receive = async (event: Event): Promise<void> => {
    if (event.type === EVENT_TYPE) {
        LOGGER.debug(`Event ${EVENT_TYPE}: ${event}`);
        this.process(Event.of(event));
    }
  };

  receiveStorageEvent = (event: StorageEvent): void => {
    LOGGER.debug(`Event (storage) ${EVENT_TYPE}: ${event.newValue}`);
    if (event.key === EVENT_TYPE && event.newValue) {
      this.receive(JSON.parse(event.newValue));
    }
  };

  register(): void {
    // try connect with websocket, if fail use events in browser
    window.addEventListener(EVENT_TYPE, this.receive, { capture: true });
    window.addEventListener("storage", this.receiveStorageEvent, {
      capture: true,
    });
  }

  unregister(): void {
    // try disconnect with websocket, if fail remove events in browser
    window.removeEventListener(EVENT_TYPE, this.receive, { capture: true });
    window.removeEventListener("storage", this.receiveStorageEvent, {
      capture: true,
    });
    window.localStorage.removeItem(EVENT_TYPE);
  }
}

