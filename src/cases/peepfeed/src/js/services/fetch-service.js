import Person from "../components/person-component.js";

/**
 * @description service methods to fetch data from themoviedb.org
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class FetchService
 */
export default class FetchService {
  // public static properties
  static _API_KEY = '810d7635c0ecf3c7142dc3ad8764fbe5';
  static _API_KEY_QUERY = '?api_key=810d7635c0ecf3c7142dc3ad8764fbe5';
  static _LANG_QUERY = '&language=en-US';

  /**
   * @description fetches person details asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/people/get-person-details
   * example api call: https://api.themoviedb.org/3/person/5655?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Person} person
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchPersonDetails(person) {
    const baseURL = 'https://api.themoviedb.org/3/person/';
    const fullURL = `${baseURL}${person.id}${this._API_KEY_QUERY}${this._LANG_QUERY}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches movie credits for a person asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/people/get-person-movie-credits
   * example api call: https://api.themoviedb.org/3/person/5655/movie_credits?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Person} person
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchMovieCreditsForPerson(person) {
    const baseURL = 'https://api.themoviedb.org/3/person/';
    const fullURL = `${baseURL}${person.id}/movie_credits${this._API_KEY_QUERY}${this._LANG_QUERY}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches movie details asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/movies/get-movie-credits
   * example api call: https://api.themoviedb.org/3/movie/550988?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Movie} movie
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchMovieDetails(movie) {
    const baseURL = 'https://api.themoviedb.org/3/movie/';
    const fullURL = `${baseURL}${movie.id}${this._API_KEY_QUERY}${this._LANG_QUERY}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches credits for a movie asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/people/get-person-movie-credits
   * example api call: https://api.themoviedb.org/3/movie/550988/credits?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Movie} movie
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchCreditsForMovie(movie) {
    const baseURL = 'https://api.themoviedb.org/3/movie/';
    const fullURL = `${baseURL}${movie.id}/credits${this._API_KEY_QUERY}${this._LANG_QUERY}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches videos for a movie asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/movies/get-movie-videos
   * example api call: https://api.themoviedb.org/3/movie/550988/videos?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Movie} movie
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchVideos(movie) {
    const baseURL = 'https://api.themoviedb.org/3/movie/';
    const fullURL = `${baseURL}${movie.id}/videos${this._API_KEY_QUERY}${this._LANG_QUERY}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches watch providers for a movie (e.g. netflix, hbo etc.) asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/movies/get-movie-watch-providers
   * example api call: https://api.themoviedb.org/3/movie/504949/watch/providers?api_key=810d7635c0ecf3c7142dc3ad8764fbe5
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Movie} movie
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchWatchProviders(movie) {
    const baseURL = 'https://api.themoviedb.org/3/movie/';
    const fullURL = `${baseURL}${movie.id}/watch/providers${this._API_KEY_QUERY}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches similar movies for a movie asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/movies/get-similar-movies
   * example api call: https://api.themoviedb.org/3/movie/550988/similar?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US&page=1
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Movie} movie
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchSimilarMovies(movie) {
    const baseURL = 'https://api.themoviedb.org/3/movie/';
    const fullURL = `${baseURL}${movie.id}/similar${this._API_KEY_QUERY}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches results from a people search query asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/search/search-people
   * example api call: https://api.themoviedb.org/3/search/person?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US&query=Steven&page=1&include_adult=false
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {String} query
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchPersonSearchResults(query, pageNumber) {
    const formattedQuery = this.formatSearchQuery(query, pageNumber);
    const baseURL = 'https://api.themoviedb.org/3/search/person';
    const fullURL = `${baseURL}${this._API_KEY_QUERY}${this._LANG_QUERY}${formattedQuery}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches results from a movie search query asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/search/search-movies
   * example api call: https://api.themoviedb.org/3/search/movie?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US&query=The%20Hobbit&page=1&include_adult=false
   * @static
   * @param {String} query
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof FetchService
   */
  static async fetchMovieSearchResults(query, pageNumber) {
    const formattedQuery = this.formatSearchQuery(query, pageNumber);
    const baseURL = 'https://api.themoviedb.org/3/search/movie';
    const fullURL = `${baseURL}${this._API_KEY_QUERY}${this._LANG_QUERY}${formattedQuery}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches current most popular people on TMDB asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/people/get-popular-people
   * example api call: https://api.themoviedb.org/3/person/popular?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US&page=1
   * @static
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof FetchService
   */
   static async fetchPopularPeople(pageNumber) {
    const baseURL = 'https://api.themoviedb.org/3/person/popular';
    const fullURL = `${baseURL}${this._API_KEY_QUERY}${this._LANG_QUERY}&page=${pageNumber}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches current most popular movies on TMDB asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/movies/get-popular-movies
   * example api call: https://api.themoviedb.org/3/movie/popular?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US&page=1
   * @static
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof FetchService
   */
   static async fetchPopularMovies(pageNumber) {
    const baseURL = 'https://api.themoviedb.org/3/movie/popular';
    const fullURL = `${baseURL}${this._API_KEY_QUERY}${this._LANG_QUERY}&page=${pageNumber}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }

  /**
   * @description fetches current highest rated movies on TMDB asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/movies/get-top-rated-movies
   * example api call: https://api.themoviedb.org/3/movie/top_rated?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US&page=1
   * @static
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof FetchService
   */
   static async fetchTopRatedMovies(pageNumber) {
    const baseURL = 'https://api.themoviedb.org/3/movie/top_rated';
    const fullURL = `${baseURL}${this._API_KEY_QUERY}${this._LANG_QUERY}&page=${pageNumber}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }
  
  /**
   * @description fetches upcoming movies on TMDB asynchronously from themoviedb.org and returns as Promise.
   * api documentation: https://developers.themoviedb.org/3/movies/get-upcoming
   * example api call: https://api.themoviedb.org/3/movie/upcoming?api_key=810d7635c0ecf3c7142dc3ad8764fbe5&language=en-US&page=1
   * @static
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof FetchService
   */
   static async fetchUpcomingMovies(pageNumber) {
    const baseURL = 'https://api.themoviedb.org/3/movie/upcoming';
    const fullURL = `${baseURL}${this._API_KEY_QUERY}${this._LANG_QUERY}&page=${pageNumber}`;
    return new Promise((resolve) => {
      resolve(fetch(fullURL));
    });
  }



  /**
   * @description helper method which formats search query strings for compatibility with api calls to themoviedb.org
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {String} query
   * @param {Number} pageNumber
   * @return {String}
   * @memberof FetchService
   */
  static formatSearchQuery(query, pageNumber) {
    // replace whitespace in query with safe URL encoded white space
    let formattedQuery = query.replace(/\s/, '%20');
    // format query and append query options
    formattedQuery = `&query=${formattedQuery}&page=${pageNumber}&include_adult=false`;
    return formattedQuery;
  }

  /**
   * @description gets the full image url for tmdb images.
   * api documentation: https://developers.themoviedb.org/3/getting-started/images
   * example api call: https://image.tmdb.org/t/p/original/oYNKh0FwArUfryI6GaKcbfWVPl4.jpg
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {String} size - size of the image (e.g. 'w500')
   * @param {String} filename - filename of the image (base name and file extension, e.g. '/oYNKh0FwArUfryI6GaKcbfWVPl4.jpg')
   * @return {String}
   * @memberof FetchService
   */
  static getFullImageUrl(size, filename) {
    const baseImageURL = 'https://image.tmdb.org/t/p/';
    const fullImageURL = `${baseImageURL}${size}${filename}`;
    return fullImageURL;
  }
}
