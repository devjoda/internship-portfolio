/**
 * @description represents a movie
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {Number} id
 */
export default class Movie {
  constructor(id) {
    Object.defineProperty(this, 'id', {
      value: id,
      configurable: false,
      writable: false,
      enumerable: true,
    });
    this._backdropPath;
    this._budget;
    this._genres = [];
    this._originalLanguage;
    this._originalTitle;
    this._overview;
    this._popularity;
    this._posterPath;
    this._productionCountry;
    this._releaseDate;
    this._revenue;
    this._runtime;
    this._status;
    this._tagline;
    this._title;
    this._voteAverage;
    this._voteCount;
    this._cast = [];
    this._directors = [];
    this._writers = [];
    this._trailers = [];
    this._watchProviders = [];
    this._similarMovies = [];
  }

  // backdropPath
  get backdropPath() {
    return this._backdropPath;
  }
  set backdropPath(value) {
    this._backdropPath = value;
  }

  // budget
  get budget() {
    return this._budget;
  }
  set budget(value) {
    this._budget = value;
  }

  // cast
  get cast() {
    return this._cast;
  }
  set cast(value) {
    this._cast = value;
  }

  // directors
  get directors() {
    return this._directors;
  }
  set directors(value) {
    this._directors = value;
  }

  // writers
  get writers() {
    return this._writers;
  }
  set writers(value) {
    this._writers = value;
  }

  // trailers
  get trailers() {
    return this._trailers;
  }
  set trailers(value) {
    this._trailers = value;
  }

  // watchProviders
  get watchProviders() {
    return this._watchProviders;
  }
  set watchProviders(value) {
    this._watchProviders = value;
  }

  // genres
  get genres() {
    return this._genres;
  }
  set genres(value) {
    this._genres = value;
  }

  // originalLanguage
  get originalLanguage() {
    return this._originalLanguage;
  }
  set originalLanguage(value) {
    this._originalLanguage = value;
  }

  // originalTitle
  get originalTitle() {
    return this._originalTitle;
  }
  set originalTitle(value) {
    this._originalTitle = value;
  }

  // overview
  get overview() {
    return this._overview;
  }
  set overview(value) {
    this._overview = value;
  }

  // popularity
  get popularity() {
    return this._popularity;
  }
  set popularity(value) {
    this._popularity = value;
  }

  // posterPath
  get posterPath() {
    return this._posterPath;
  }
  set posterPath(value) {
    this._posterPath = value;
  }

  // productionCountries
  get productionCountries() {
    return this._productionCountries;
  }
  set productionCountries(value) {
    this._productionCountries = value;
  }

  // releaseDate
  get releaseDate() {
    return this._releaseDate;
  }
  set releaseDate(value) {
    this._releaseDate = value;
  }

  // revenue
  get revenue() {
    return this._revenue;
  }
  set revenue(value) {
    this._revenue = value;
  }

  // runtime
  get runtime() {
    return this._runtime;
  }
  set runtime(value) {
    this._runtime = value;
  }

  // status
  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }

  // tagline
  get tagline() {
    return this._tagline;
  }
  set tagline(value) {
    this._tagline = value;
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

  // voteCount
  get voteCount() {
    return this._voteCount;
  }
  set voteCount(value) {
    this._voteCount = value;
  }

  // similarMovies
  get similarMovies() {
    return this._similarMovies;
  }
  set similarMovies(value) {
    this._similarMovies = value;
  }

  /**
   * @description logs all properties and property values of Movie
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof Movie
   */
  log() {
    for (let prop in this) {
      console.log(`${prop} : ${this[prop]}`);
    }
  }
}
