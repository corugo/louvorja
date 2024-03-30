export class Mode {
    private constructor() {
        throw 'Cannot instantiate';
    }
    static get CONTROL(): string {
        return 'control';
    }
    static get PROJECTION(): string {
        return 'projection';
    }
}


