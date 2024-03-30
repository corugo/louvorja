export function toString() {
  return "module @louvorja/shared";
}

export {
  Dispatcher,
  Event,
  Handler,
  DefaultHandler,
  HandlerLoader,
  DefaultHandlerLoader,
  Participant
} from "./events/index.js";

export * as logging from "./logging.js";
export * as modules from "./modules.js";
export * from "./platform.js";
export * as prefix from "./prefix.js";
export * as specs from "./specs.js";
export * as strings from "./strings.js";
export * as theme from "./theme.js";
export * from "./config.js";
