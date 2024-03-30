import { Mode } from "./Mode.js";

export class Participant {
  private mode: Mode;
  private module: string;
  private component: string;

  constructor(mode: Mode, module: string, component: string) {
    this.mode = mode;
    this.module = module;
    this.component = component;
  }

  getMode(): Mode {
    return this.mode;
  }

  getModule(): string {
    return this.module;
  }

  getComponent(): string {
    return this.component;
  }

  static of({ mode, module, component }: { mode: Mode; module: string; component: string }): Participant {
    return new Participant(mode, module, component);
  }

  static control(module: string, component: string): Participant {
    return new Participant(Mode.CONTROL, module, component);
  }

  static projection(module: string, component: string): Participant {
    return new Participant(Mode.CONTROL, module, component);
  }
}


