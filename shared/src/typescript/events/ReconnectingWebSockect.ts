import { createLogger } from "logging";

const logger = createLogger();

export const CONNECTING: number = 0;
export const OPEN: number = 1;
export const CLOSING: number = 2;
export const CLOSED: number = 3;

interface ListenerHolder {
  listener: EventListenerObject;
  options: AddEventListenerOptions;
}

class ListenersMap {
    [key: string]: Array<ListenerHolder>;
    readonly open: Array<ListenerHolder> = [];
    readonly message: Array<ListenerHolder> = [];
    readonly close: Array<ListenerHolder> = [];
    readonly error: Array<ListenerHolder> = [];
}

export class ReconnectingWebSocket extends EventTarget {
  readonly _url: string;
  private protocols: string[];
  private ws!: WebSocket;
  private queue: string[] = [];
  listeners: ListenersMap = new ListenersMap();
  keepConnected: boolean = true;

  constructor(url: string, protocols: string[] = []) {
    super();
    this._url = url;
    this.protocols = protocols;
  }

  get binaryType(): BinaryType {
    return this.ws.binaryType;
  }

  get bufferedAmount(): number {
    return this.ws.bufferedAmount;
  }

  get extensions(): string {
    return this.ws.extensions;
  }

  get protocol(): string {
    return this.ws.protocol;
  }

  get readyState(): number {
    return this.ws.readyState;
  }

  get url(): string {
    return this.ws.url;
  }

  set onopen(_listener: EventListenerObject) {
    throw new Error("Not supported. Use addEventListener instead!");
  }

  set onmessage(_listener: EventListenerObject) {
    throw new Error("Not supported. Use addEventListener instead!");
  }

  set onclose(_listener: EventListenerObject) {
    throw new Error("Not supported. Use addEventListener instead!");
  }

  set onerror(_listener: EventListenerObject) {
    throw new Error("Not supported. Use addEventListener instead!");
  }

  async send(message: string): Promise<void> {
    this.queue.push(message);
    await this.assureOpen();
    if (this.ws.readyState === OPEN) {
      while (this.queue.length > 0) {
        this.ws.send(this.queue.shift()!);
      }
    }
  }

  close(codeOrReopen: number | boolean, reason?: string): void {
    if (typeof codeOrReopen === "boolean") {
      this.keepConnected = codeOrReopen;
      this.ws.close();
    } else {
      this.keepConnected = false;
      this.ws.close(codeOrReopen, reason);
    }
  }

  override addEventListener(type: string, listener: EventListenerObject, options: AddEventListenerOptions = {}): void {
    options.capture = options.capture || false;
    this.listeners[type].push({ listener, options });
  }

  override removeEventListener(type: string, listener: EventListenerObject, options: EventListenerOptions = {}): void {
    options.capture = options.capture || false;
    const list = this.listeners[type];
    const index = list.findIndex(
      (el) => el.listener === listener && el.options.capture === options.capture
    );
    if (index >= 0) {
      list.splice(index, 1);
    }
    this.ws.removeEventListener(type, listener, options);
  }

  override dispatchEvent(event: Event): boolean {
    return this.ws.dispatchEvent(event);
  }

  private async open(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      this.ws = new WebSocket(this._url, this.protocols);
      for (const type in this.listeners) {
        for (const { listener, options } of this.listeners[type]) {
          this.ws.addEventListener(type, listener, options);
        }
      }
      this.ws.onopen = (event) => {
        logger.warn("WebSocket opened: " + JSON.stringify(event));
        resolve();
      };
      this.ws.onmessage = (event) => {
        logger.trace(JSON.stringify(JSON.parse(event.data)));
      };
      this.ws.onerror = (event) => {
        logger.error("WebSocket error: " + JSON.stringify(event));
        if (this.ws.readyState < OPEN) {
          reject();
        }
      };
      this.ws.onclose = (event) => {
        logger.warn("WebSocket closed: " + JSON.stringify(event));
        if (this.keepConnected) {
          this.open();
        }
      };
    });
    await promise;
  }

  private async assureOpen(): Promise<void> {
    if (this.ws.readyState > OPEN) {
      await this.open();
    }
  }

  logListeners(): void {
    console.log(this.listeners);
  }
}


