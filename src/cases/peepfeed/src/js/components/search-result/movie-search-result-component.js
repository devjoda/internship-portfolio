import SearchResult from "./search-result-component.js";

/**
 * @description represents a person search result
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {String} query
 * @param {Number} pageNumber
 * @param {Number} popularity 
 * @param {Number} id
 * @param {Array} genre_ids
 * @param {String} posterPath
 * @param {String} releaseDate
 * @param {String} title
 * @param {Number} vote_average 
 */
export default class MovieSearchResult extends SearchResult {
  constructor(query, pageNumber, popularity, id, genreIds, posterPath, releaseDate, title, voteAverage) {
    super(query, pageNumber, popularity, id);
    this._genreIds = genreIds;
    this._posterPath = posterPath;
    this._releaseDate = releaseDate;
    this._title = title;
    this._voteAverage = voteAverage;
    this._releaseYear;
    this.init();
  }

  // genreIds
  get genreIds() {
    return this._genreIds;
  }
  set genreIds(value) {
    this._genreIds = value;
  }

  // posterPath
  get posterPath() {
    return this._posterPath;
  }
  set posterPath(value) {
    this._posterPath = value;
  }

  // releaseDate
  get releaseDate() {
    return this._releaseDate;
  }
  set releaseDate(value) {
    this._releaseDate = value;
  }

  // title
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  // voteAverage
  get voteAverage() {
    return this._voteAverage;
  }
  set voteAverage(value) {
    this._voteAverage = value;
  }

  // releaseYear
  get releaseYear() {
    return this._releaseYear;
  }
  set releaseYear(value) {
    this._releaseYear = value;
  }

  init() {
    this._releaseYear = this._releaseDate.substring(0, 4);
  }
}
