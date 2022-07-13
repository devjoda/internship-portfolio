/**
 * @description represents a credits 
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {Number} id
 * @param {Number} gender
 * @param {String} name
 * @param {Number} popularity
 * @export
 * @class Credit
 */
export default class Credit {
  constructor(id, gender, name, popularity, profilePath) {
    this._id = id;
    this._gender = gender;
    this._name = name;
    this._popularity = popularity;
    this._profilePath = profilePath;
  }

  // id
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  // gender
  get gender() {
    return this._gender;
  }
  set gender(value) {
    this._gender = value;
  }

  // name
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  // popularity
  get popularity() {
    return this._popularity;
  }
  set popularity(value) {
    this._popularity = value;
  }

  // profilePath
  get profilePath() {
    return this._profilePath;
  }

  set profilePath(value) {
    this._profilePath = value;
  }

  /**
   * @description logs all properties and property values of Credit
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof Credit
   */
  log() {
    for (let prop in this) {
      console.log(`${prop} : ${this[prop]}`);
    }
  }
}
