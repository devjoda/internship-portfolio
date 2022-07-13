/**
 * @description represents a watch provider - eg. Netflix, HBO etc.
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {String} locale
 * @param {String} link
 * @param {String} providerName
 * @param {String} logoPath
 */
export default class WatchProvider {
  constructor(locale, link, providerName, logoPath) {
    this._locale = locale;
    this._link = link;
    this._providerName = providerName;
    this._logoPath = logoPath;
  }

  // link
  get link() {
    return this._link;
  }

  set link(value) {
    this._link = value;
  }

  // locale
  get locale() {
    return this._locale;
  }

  set locale(value) {
    this._locale = value;
  }

  // providerName
  get providerName() {
    return this._providerName;
  }

  set providerName(value) {
    this._providerName = value;
  }

  // logoPath
  get logoPath() {
    return this._logoPath;
  }

  set logoPath(value) {
    this._logoPath = value;
  }

  /**
   * @description logs all properties and property values of WatchProvider
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof WatchProvider
   */
  log() {
    for (let prop in this) {
      console.log(`${prop} : ${this[prop]}`);
    }
  }
}
