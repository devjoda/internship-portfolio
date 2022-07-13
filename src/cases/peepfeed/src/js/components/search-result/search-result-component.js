/**
 * @description represents a search result
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {String} query
 * @param {Number} pageNumber
 * @param {Number} popularity 
 * @param {Number} id
 */
export default class SearchResult {
  constructor(query, pageNumber, popularity, id) {
    this._query = query;
    this._pageNumber = pageNumber;
    this._popularity = popularity;
    this._id = id;
  }

  // query
  get query() {
    return this._query;
  }
  set query(value) {
    this._query = value;
  }

  // pageNumber
  get pageNumber() {
    return this._pageNumber;
  }
  set pageNumber(value) {
    this._pageNumber = value;
  }

  // popularity
  get popularity() {
    return this._popularity;
  }
  set popularity(value) {
    this._popularity = value;
  }

  // id
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  log() {
    for (let prop in this) {
      console.log(`${prop} : ${this[prop]}`);
    }
  }
}
