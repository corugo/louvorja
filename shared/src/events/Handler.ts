import { createLogger, STDOUT } from "../logging.js";

const LOGGER = createLogger(STDOUT);
const EXCLUDED_METHODS = ["constructor", "element", "htmlToNodes"];

export class Handler {
  #element: HTMLElement;
  autoplay = false;

  constructor(element: HTMLElement) {
    this.#element = element;
  }

  get element(): HTMLElement {
    return this.#element;
  }

  get supportedActions(): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(
      (name) => !EXCLUDED_METHODS.includes(name)
    );
  }

  htmlToNodes(html: string): NodeList {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.childNodes;
  }
}

export class DefaultHandler extends Handler {
  constructor(element: HTMLElement) {
    super(element);
  }

  add = async (event: { dataId: string; args: { template: string; animate: { cssClass: string } } }) => {
    const id = event.dataId;
    const { template, animate } = event.args;
    for (const node of this.htmlToNodes(template)) {
      node.dataset.id = node.dataset.id || id;
      animate?.cssClass
        ?.split(" ")
        .forEach((cssClass) => node.classList.add(cssClass));
      setTimeout(() => this.element.appendChild(node), 0);
    }
  };

  remove = async (event: { args: { dataId: string | string[]; template?: string; animate: { cssClass: string } }; delay?: number }) => {
    let ids = event.args.dataId || [];
    if (typeof ids === "string") {
      ids = [ids];
    } else if (!ids.length && event.args.template?.includes("data-id")) {
      ids = Array.from(this.htmlToNodes(event.args.template)).map((node) => node.dataset.id);
    }
    if (!ids.length) {
      throw new Error("Data id (data-id) not provided! Use clear instead.");
    }
    const { animate, delay } = event.args;
    const promises: Promise<void>[] = [];
    for (const id of ids) {
      try {
        const children = this.element.querySelectorAll(`[data-id="${id}"]`);
        for (const child of children) {
          animate?.cssClass
            ?.split(" ")
            .forEach((cssClass) => child.classList.add(cssClass));
          promises.push(
            new Promise((resolve, reject) => {
              setTimeout(() => {
                child.remove();
                resolve();
              }, delay || 0);
            })
          );
        }
      } catch (error) {
        LOGGER.error(error);
      }
      await Promise.all(promises);
    }
  };

  clear = async (event: { args: { animate: { cssClass: string } }; delay?: number }) => {
    try {
      const animate = event.args.animate;
      const children = this.element.querySelectorAll(`*`);
      const promises: Promise<void>[] = [];
      for (const child of children) {
        animate?.cssClass
          ?.split(" ")
          .forEach((cssClass) => child.classList.add(cssClass));
        promises.push(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              child.remove();
              resolve();
            }, event.args.delay || 0);
          })
        );
      }
      await Promise.all(promises);
    } catch (error) {
      LOGGER.error(error);
    }
  };
}

