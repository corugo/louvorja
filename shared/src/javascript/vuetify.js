

export class BaseColors {
    /**
     * @type {string}
     */
    background;

    /**
     * @type {string}
     */
    surface;

    /**
     * @type {string}
     */
    primary;

    /**
     * @type {string}
     */
    secondary;

    /**
     * @type {string}
     */
    success;

    /**
     * @type {string}
     */
    warning;

    /**
     * @type {string}
     */
    error;

    /**
     * @type {string}
     */
    info;
}

export class OnColors extends BaseColors {
    /**
     * @type {string}
     */
    'on-background';

    /**
    * @type {string}
    */
    'on-surface';

    /**
    * @type {string}
    */
    'on-primary';

    /**
    * @type {string}
    */
    'on-secondary';

    /**
    * @type {string}
    */
    'on-success';

    /**
    * @type {string}
    */
    'on-warning';

    /**
    * @type {string}
    */
    'on-error';

    /**
    * @type {string}
    */
    'on-info';
}

export class Colors extends OnColors {

}

// ?????
// type Record<K extends keyof any, T> = {
//     [P in K]: T;
// };

/**
 * Theme Definition extratec from Vuetify types.
 */
export class ThemeDefinition {
    /**
     * @type {boolean}
     */
    dark;
    /**
     * @type {Colors}
     */
    colors;
    //variables: Record<string, string | number>;
}