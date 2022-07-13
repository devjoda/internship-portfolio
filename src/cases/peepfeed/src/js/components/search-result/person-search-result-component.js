import SearchResult from "./search-result-component.js";

/**
 * @description represents a person search result
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {String} query
 * @param {Number} pageNumber
 * @param {Number} popularity 
 * @param {Number} id
 * @param {String} knownForDepartment
 * @param {String} name
 * @param {String} profilePath
 */
export default class PersonSearchResult extends SearchResult {
  constructor(query, pageNumber, popularity, id, knownForDepartment, name, profilePath) {
    super(query, pageNumber, popularity, id);
    this._knownForDepartment = knownForDepartment;
    this._name = name;
    this._profilePath = profilePath;
  }

  // knownForDepartment
  get knownForDepartment() {
    return this._knownForDepartment;
  }
  set knownForDepartment(value) {
    this._knownForDepartment = value;
  }

  // name
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  // profilePath
  get profilePath() {
    return this._profilePath;
  }
  set profilePath(value) {
    this._profilePath = value;
  }
}
