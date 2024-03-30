import ini from "ini";

/**
 * Liturgy model.
 */
export class Liturgy {
  /**
   * @type {number}
   */
  weekday;
  /**
   * @type {string}
   */
  name;

  /**
   *
   * @param {string} iniStr
   * @returns {Liturgy[]} ????
   */
  static fromIni(iniStr) {
    const config = ini.parse(iniStr);

    const geral = config.Geral;
    /**
     * @type {Liturgy[]}
     */
    const json = [];

    [...Array(7).keys()]
      .map((i) => i + 1)
      .forEach((i) => {
        json.push({
          weekday: i,
          name: geral[`${i}`],
        });
      });

    // Object.keys(config).forEach((el) => {
    //   console.log(el);
    // });
    return json;
  }
}

export default Liturgy;