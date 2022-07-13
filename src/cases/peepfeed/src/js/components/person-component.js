import Movie from "./movie-component.js";

/**
 * @description represents a person
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {Number} id
 */
export default class Person {
  constructor(id) {
    Object.defineProperty(this, 'id', {
      value: id,
      configurable: false,
      writable: true,
      enumerable: true,
    });
    this._biography;
    this._birthday;
    this._deathday;
    this._gender;
    this._knownForDepartment;
    this._name;
    this._placeOfBirth;
    this._popularity;
    this._profilePath;
    /**
     * @description movieCredits are split into two arrays, primaryMovieCredits and secondaryMovieCredits. E.g. if
     * Person is known for directing, and is credited for directing a movie, the
     * movie should be pushed to primaryMovieCredits. Contrarily, if a person is known
     * for directing, and is credited for being cast in a movie, e.g. a documentary
     * about the making of a movie, the movie should be pushed to secondaryMovieCredits.
     *
     * The seperation is implemented, because the average user likely isn't
     * interested in an exhaustive list of all of the person's work; only that
     * which the person is known for.
     * @author Joachim Danielsen <joachim.danielsen@outlook.com>
     */
    this._primaryMovieCredits = [];
    this._secondaryMovieCredits = [];
  }

  // biography
  get biography() {
    return this._biography;
  }
  set biography(value) {
    this._biography = value;
  }

  // birthday
  get birthday() {
    return this._birthday;
  }
  set birthday(value) {
    this._birthday = value;
  }

  // deathday
  get deathday() {
    return this._deathday;
  }
  set deathday(value) {
    this._deathday = value;
  }

  // gender
  get gender() {
    return this._gender;
  }
  set gender(value) {
    this._gender = value;
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

  // placeOfBirth
  get placeOfBirth() {
    return this._placeOfBirth;
  }
  set placeOfBirth(value) {
    this._placeOfBirth = value;
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

  // primaryMovieCredits
  get primaryMovieCredits() {
    return this._primaryMovieCredits;
  }
  set primaryMovieCredits(value) {
    this._primaryMovieCredits = value;
  }

  // secondaryMovieCredits
  get secondaryMovieCredits() {
    return this._secondaryMovieCredits;
  }
  set secondaryMovieCredits(value) {
    this._secondaryMovieCredits = value;
  }

  /**
   * @description logs all properties and property values of Person
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof Person
   */
  log() {
    for (let prop in this) {
      console.log(`${prop} : ${this[prop]}`);
    }
  }
}