import { EVENT_TYPE } from "./Dispatcher.js";
import cuid from "cuid";
import { CustomEvent } from "./CustomEvent.js";
import { Participant } from "./Participant.js";

export class Event extends CustomEvent {
  /**
   * @type source {Participant}
   * @type target {Participant}
   * @type command {string}
   * @type args {Object}
   */
  static create(source: Participant, target: Participant, command: string, args: Object = {}): Event {
    const id: string = `evt_${cuid()}`;
    const objectId: string = `obj_${cuid()}`;
    return new Event(id, source, target, objectId, command, args);
  }

  static of({ detail: { id, source, target, objectId, command, args } }: { detail: { id: string, source: Participant, target: Participant, objectId: string, command: string, args: Object } }): Event {
    return Event.create(
      id,
      Participant.of(source),
      Participant.of(target),
      objectId,
      command,
      args
    );
  }

  constructor(id: string, source: Participant, target: Participant, objectId: string, command: string, args: Object = {}) {
    if (!source) {
      throw new Error(`Source is not defined (${source})`);
    }
    if (!target) {
      throw new Error(`Target is not defined (${target})`);
    }
    if (!command) {
      throw new Error(`Command is not defined (${command})`);
    }
    super(EVENT_TYPE, {
      detail: { id, objectId, source, target, command, args }
    });
  }

  /**
   * Event self ID.
   */
  get eid(): string {
    return this.detail.id;
  }

  get id(): string {
    return this.detail.id;
  }

  /**
   * Event Object ID.
   */
  get oid(): string {
    return this.detail.objectId;
  }

  get objectId(): string {
    return this.detail.objectId;
  }

  /** @type {string} */
  get dataId(): string {
    return this.detail.dataId;
  }

  /**
   * Event source using screen destination and component, e.g.:
   * - control:liturgy;
   * - projection:top.
   * @type {string}
   **/
  get source(): string {
    return this.detail.source;
  }

  /**
   * Event target.
   * @see {@link #source}
   * @type {string}
   **/
  get target(): string {
    return this.detail.target;
  }

  /** @type {string} */
  get command(): string {
    return this.detail.command;
  }

  /** @type {object} */
  get args(): object {
    return this.detail.args;
  }

  with(details: object): Event {
    return Event.of(Object.assign(this.toJSON(), details));
  }

  toString(): string {
    return `#${this.target}.${this.command}(${JSON.stringify(this.args)})`;
  }

  toJSON(): object {
    return {
      id: this.id,
      target: this.target,
      command: this.command,
      args: this.args,
    };
  }

  equals(other: Event): boolean {
    return this.id === other.id;
  }
}

