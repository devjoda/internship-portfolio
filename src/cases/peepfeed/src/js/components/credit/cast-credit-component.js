import Credit from "./credit-component.js";
/**
 * @description
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {Number} id
 * @param {Number} gender
 * @param {String} name
 * @param {Number} popularity
 * @param {String} profilePath 
 * @param {String} character
 * @export
 * @class CastCredit
 * @extends {Credit}
 */
export default class CastCredit extends Credit {
  constructor(id, gender, name, popularity, profilePath, character) {
    super(id, gender, name, popularity, profilePath);
    this._character = character;
  }

  //character
  get character() {
    return this._character;
  }
  set character(value) {
    this._character = value;
  }
}
