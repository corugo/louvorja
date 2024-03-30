export abstract class HandlerLoader {
  async load(_target: string): Promise<void> {
    await new Promise<void>((_resolve, reject) => {
      reject("Must be implemented in subclass.");
    });
  }
}
export class DefaultHandlerLoader extends HandlerLoader {
  override async load(target: string): Promise<void> {
    await import(`./handlers/${target}.js`);
  }
}


