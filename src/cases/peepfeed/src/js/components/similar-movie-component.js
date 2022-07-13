/**
 * @description represents a similar movie
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {Number} id
 * @param {String} title
 * @param {String} posterPath
 * @param {String} releaseDate
 */
export default class SimilarMovie {
  constructor(id, title, posterPath, releaseDate) {
    Object.defineProperty(this, 'id', {
      value: id,
      configurable: false,
      writable: false,
      enumerable: true,
    });
    this._title = title;
    this._posterPath = posterPath;
    this._releaseDate = releaseDate;
    this._releaseYear;
    this.init();
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get posterPath() {
    return this._posterPath;
  }

  set posterPath(value) {
    this._posterPath = value;
  }

  get releaseDate() {
    return this._releaseDate;
  }

  set releaseDate(value) {
    this._releaseDate = value;
  }

  get releaseYear() {
    return this._releaseYear;
  }

  set releaseYear(value) {
    this._releaseYear = value;
  }

  init() {
    this._releaseYear = this._releaseDate.substring(0, 4);
  }

  /**
   * @description logs all properties and property values of SimilarMovie
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof SimilarMovie
   */
  log() {
    for (let prop in this) {
      console.log(`${prop} : ${this[prop]}`);
    }
  }
}
