export abstract class HandlerLoader {
  async load(target: string): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      reject("Must be implemented in subclass.");
    });
  }
}
export class DefaultHandlerLoader extends HandlerLoader {
  async load(target: string): Promise<void> {
    await import(`./handlers/${target}.js`);
  }
}


