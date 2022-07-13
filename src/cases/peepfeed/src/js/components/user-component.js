import CrudService from '../services/crud-service.js';
import MovieFeed from './feed/movie-feed-component.js';

/**
 * @description represents a user
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {String} birthDate
 * @param {String} country
 */
export default class User {
  constructor(name, email, password, birthDate, country) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._birthDate = birthDate;
    this._country = country;
    // array of Person objects favorited by User
    this._people = [];
    // array of Movie objects bookmarked by User
    this._watchlist = [];
    // array of search results for search queries for persons
    this._personSearchResults = [];
    // array of search results for search queries for movies
    this._movieSearchResults = [];
    // define a globally unique identifier property
    Object.defineProperty(this, 'id', {
      // non-rfc compliant guid generation (...but good enough for our scope)
      value: Math.random().toString(36).substr(2, 9),
      // property should not be changed/deleted
      configurable: false,
      // property should not be changed with assignment operator
      writable: false,
      // property should show up during enumeration of the property
      enumerable: true,
    });
    // boolean to control whether get started pages should get rendered
    this._isNewUser = true;
    // feed of movies
    this._feed = new MovieFeed(this);
  }

  // name
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  // email
  get email() {
    return this._email;
  }
  set email(value) {
    this._email = value;
  }

  // password
  get password() {
    return this._password;
  }
  set password(value) {
    this._password = value;
  }

  // birthDate
  get birthDate() {
    return this._birthDate;
  }
  set birthDate(value) {
    this._birthDate = value;
  }

  // people
  get people() {
    return this._people;
  }
  set people(value) {
    this._people = value;
  }

  // watchlist
  get watchlist() {
    return this._watchlist;
  }
  set watchlist(value) {
    this._watchlist = value;
  }

  // blacklist
  get blacklist() {
    return this._blacklist;
  }
  set blacklist(value) {
    this._blacklist = value;
  }

  // personSearchResults
  get personSearchResults() {
    return this._personSearchResults;
  }
  set personSearchResults(value) {
    this._personSearchResults = value;
  }

  // movieSearchResults
  get movieSearchResults() {
    return this._movieSearchResults;
  }
  set movieSearchResults(value) {
    this._movieSearchResults = value;
  }

  // isNewUser
  get isNewUser() {
    return this._isNewUser;
  }
  set isNewUser(value) {
    this._isNewUser = value;
  }
  
  // feed
  get feed() {
    return this._feed;
  }
  set feed(value) {
    this._feed = value;
  }

  /**
   * @description calculates current age of User
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @return {Number}
   * @memberof User
   */
  getAge() {
    if (!this._birthDate) {
      return undefined;
    }
    let date = new Date(this._birthDate);
    // calculate time difference from current date in time in ms
    let differenceInMiliseconds = Date.now() - date.getTime();
    // calculate time difference from current date in unix time
    let differenceInUnixTime = new Date(differenceInMiliseconds);
    // extract birth year
    let birthYear = differenceInUnixTime.getUTCFullYear();
    // calculate time difference from birthday and unix epoch in years
    let differenceInYears = birthYear - 1970;
    let age = Math.abs(differenceInYears);
    return age;
  }

  removeMovieFromWatchlist(movie) {
    let watchlist = this._watchlist;
    CrudService.removeElementFromArray(movie, watchlist);
    this._watchlist = watchlist;
  }

  /**
   * @description logs all properties and property values of User
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof User
   */
  log() {
    for (let prop in this) {
      console.log(`${prop} : ${this[prop]}`);
    }
  }
}
