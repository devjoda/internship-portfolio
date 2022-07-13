import Credit from "./credit-component.js";
/**
 * @description represents a movie credit for crew members 
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {Number} id
 * @param {Number} gender
 * @param {String} name
 * @param {Number} popularity
 * @param {String} profilePath
 * @param {String} job
 * @export
 * @class CrewCredit
 * @extends {Credit}
 */
export default class CrewCredit extends Credit {
  constructor(id, gender, name, popularity, profilePath, job) {
    super(id, gender, name, popularity, profilePath);
    this._job = job;
  }

  // job
  get job() {
    return this._job;
  }
  set job(value) {
    this._job = value;
  }
}
