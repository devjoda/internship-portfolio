import CrudService from '../../services/crud-service.js';
import FetchService from '../../services/fetch-service.js';

/**
 * @description represents a movie feed
 * @constructor
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @param {User} user
 */
export default class MovieFeed {
  constructor() {
    this._upcoming = [];
    this._new = [];
    this._trending = [];
    this._peepCount = [];
    this._criticallyAcclaimed = [];
    this._underTheRadar = [];
    this._anticipated = [];
    // array of Movie objects blacklisted by User (used for filtering out movies)
    this._blacklist = [];
  }

  // upcoming
  get upcoming() {
    return this._upcoming;
  }
  set upcoming(value) {
    this._upcoming = value;
  }

  // new
  get new() {
    return this._new;
  }
  set new(value) {
    this._new = value;
  }

  // trending
  get trending() {
    return this._trending;
  }
  set trending(value) {
    this._trending = value;
  }

  // _criticallyAcclaimed
  get peepCount() {
    return this._peepCount;
  }
  set peepCount(value) {
    this._peepCount = value;
  }

  // criticallyAcclaimed
  get criticallyAcclaimed() {
    return this._criticallyAcclaimed;
  }
  set criticallyAcclaimed(value) {
    this._criticallyAcclaimed = value;
  }

  // underTheRadar
  get underTheRadar() {
    return this._underTheRadar;
  }
  set underTheRadar(value) {
    this._underTheRadar = value;
  }

  // anticipated
  get anticipated() {
    return this._anticipated;
  }
  set anticipated(value) {
    this._anticipated = value;
  }

  // blacklist
  get blacklist() {
    return this._blacklist;
  }
  set blacklist(value) {
    this._blacklist = value;
  }

  addMovie(movie, person, user) {
    // return false if movie is blacklisted or already exist in other feeds
    let allFeeds = this._blacklist.concat(
      this._upcoming,
      this._new,
      this._trending,
      this._peepCount,
      this._criticallyAcclaimed,
      this._underTheRadar,
      this._anticipated
    );
    let allFeedsIncludesMovie = allFeeds.includes(movie);
    if (allFeedsIncludesMovie) {
      return false;
    }

    // return false if posterPath is falsy
    if (!movie.posterPath) {
      return false;
    }

    let homePage = CrudService.pages.find((element) => element.constructor.name === 'HomePage');

    // declare dom element hooks
    let upcomingDomElement = document.querySelector('.horizontal-scrolling-wrapper.upcoming');
    let newMoviesDomElement = document.querySelector('.horizontal-scrolling-wrapper.new');
    let trendingDomElement = document.querySelector('.horizontal-scrolling-wrapper.trending');
    let peepCountDomElement = document.querySelector('.horizontal-scrolling-wrapper.peep-factor');
    let criticallyAcclaimedDomElement = document.querySelector(
      '.horizontal-scrolling-wrapper.critically-acclaimed'
    );
    let underTheRadarDomElement = document.querySelector('.horizontal-scrolling-wrapper.under-the-radar');

    // add to anticipated if releaseDate is falsy
    if (!movie.releaseDate) {
      CrudService.addElementToArray(movie, this._anticipated, false);
      return true;
    } else {
      let releaseDateString = movie.releaseDate;
      // convert to date so we can compare with a new date instance
      let releaseDate = new Date(releaseDateString);
      let nowDate = new Date();
      // extract date string (YY-MM-DD) for date parsing to determine difference in days
      let nowDateString = nowDate.toISOString().substring(0, 10);
      let differenceInDays;
      // true if movie is not released yet
      if (releaseDate > nowDate) {
        differenceInDays = Math.floor((Date.parse(releaseDateString) - Date.parse(nowDateString)) / 86400000);
        // add to upcoming if released within 90 days
        if (differenceInDays <= 90) {
          CrudService.addElementToArray(movie, this._upcoming, false);
          homePage.renderCard(
            upcomingDomElement,
            movie.id,
            movie.title,
            person.name,
            FetchService.getFullImageUrl('w500', movie.posterPath)
          );
          return true;
        }
      } else {
        differenceInDays = Math.floor((Date.parse(nowDateString) - Date.parse(releaseDateString)) / 86400000);
        if (differenceInDays <= 90) {
          // add to new if released within 90 days
          CrudService.addElementToArray(movie, this._new, false);
          homePage.renderCard(
            newMoviesDomElement,
            movie.id,
            movie.title,
            person.name,
            FetchService.getFullImageUrl('w500', movie.posterPath)
          );
          return true;
        }
      }
    }

    // add to trending if high popularity
    if (movie.popularity >= 50) {
      CrudService.addElementToArray(movie, this._trending, false);
      homePage.renderCard(
        trendingDomElement,
        movie.id,
        movie.title,
        person.name,
        FetchService.getFullImageUrl('w500', movie.posterPath)
      );
      return true;
    }

    // add to underTheRadar if high rating and low popularity
    if (movie.voteAverage >= 7) {
      if (movie.popularity < 3) {
        CrudService.addElementToArray(movie, this._underTheRadar, false);
        homePage.renderCard(
          underTheRadarDomElement,
          movie.id,
          movie.title,
          person.name,
          FetchService.getFullImageUrl('w500', movie.posterPath)
        );
        return true;
      } else {
        // add to criticallyAcclaimed if high rating
        CrudService.addElementToArray(movie, this._criticallyAcclaimed, false);
        homePage.renderCard(
          criticallyAcclaimedDomElement,
          movie.id,
          movie.title,
          person.name,
          FetchService.getFullImageUrl('w500', movie.posterPath)
        );
        return true;
      }
    }

    // count favorited people in movie
    let peopleCount = this.getPeopleCount(movie, user);
    // if count is greater than or equal to 3 add to peepCount
    if (peopleCount > 1) {
      CrudService.addElementToArray(movie, this._peepCount, false);
      homePage.renderCard(
        peepCountDomElement,
        movie.id,
        movie.title,
        `Peep count: ${peopleCount}`,
        FetchService.getFullImageUrl('w500', movie.posterPath)
      );
      return true;
    }
    return false;
  }

  getPeopleCount(movie, user) {
    // allow input parameter to be movieId (besides Movie object)
    if (movie instanceof Number) {
      movie = CrudService.movies.find((element) => element.id === movie);
    }
    let peopleCount = 0;
    for (let i = 0; i < movie.cast.length; i++) {
      for (let j = 0; j < user.people.length; j++) {
        if (movie.cast[i].id === user.people[j].id) {
          peopleCount++;
        }
      }
    }
    for (let i = 0; i < movie.directors; i++) {
      for (let j = 0; j < user.people; j++) {
        if (movie.cast[i].id === user.people[j].id) {
          peopleCount++;
        }
      }
    }
    for (let i = 0; i < movie.writers; i++) {
      for (let j = 0; j < user.people; j++) {
        if (movie.cast[i].id === user.people[j].id) {
          peopleCount++;
        }
      }
    }
    return peopleCount;
  }

  removeMovie(movie) {
    this.addMovieToBlacklist(movie);
    let success = false;
    let successCheck1 = CrudService.removeElementFromArray(movie, this._upcoming);
    let successCheck2 = CrudService.removeElementFromArray(movie, this._new);
    let successCheck3 = CrudService.removeElementFromArray(movie, this._trending);
    let successCheck4 = CrudService.removeElementFromArray(movie, this._peepCount);
    let successCheck5 = CrudService.removeElementFromArray(movie, this._criticallyAcclaimed);
    let successCheck6 = CrudService.removeElementFromArray(movie, this._underTheRadar);
    let successCheck7 = CrudService.removeElementFromArray(movie, this._anticipated);
    if (successCheck1 || successCheck2 || successCheck3 || successCheck4 || successCheck5 || successCheck6 || successCheck7) {
      success = true;
    }
    return success;
  }

  addMovieToBlacklist(movie) {
    return CrudService.addElementToArray(movie, this._blacklist, false);
  }

  removeMovieFromBlacklist(movie) {

    return CrudService.removeElementFromArray(movie, this._blacklist);
  }
}
