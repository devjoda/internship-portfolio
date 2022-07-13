import FetchService from './fetch-service.js';
import Person from '../components/person-component.js';
import User from '../components/user-component.js';
import Movie from '../components/movie-component.js';
import CastCredit from '../components/credit/cast-credit-component.js';
import CrewCredit from '../components/credit/crew-credit-component.js';
import WatchProvider from '../components/watch-provider-component.js';
import SimilarMovie from '../components/similar-movie-component.js';
import PersonSearchResult from '../components/search-result/person-search-result-component.js';
import MovieSearchResult from '../components/search-result/movie-search-result-component.js';
import HomePage from '../pages/home-page.js';
import HomeEmptyStatePage from '../pages/home-empty-state-page.js';
import GetStarted1Page from '../pages/get-started-1-page.js';
import GetStarted2Page from '../pages/get-started-2-page.js';
import GetStarted3Page from '../pages/get-started-3-page.js';
import PageNotFoundPage from '../pages/page-not-found.js';
import SearchMoviePage from '../pages/search-movie-page.js';
import MovieDetailsPage from '../pages/movie-details-page.js';
import AttributionPage from '../pages/attribution-page.js';
import PeoplePage from '../pages/people-page.js';
import WatchlistPage from '../pages/watchlist-page.js';
import ViewService from './view-service.js';
import Router from './router-service.js';
import SearchEmptyStatePage from '../pages/search-empty-state.js';
import IsoLanguageCodeConverter from '../components/iso-language-code-converter-component.js';
import SearchPeoplePage from '../pages/search-people-page.js';

/**
 * @description service methods to create, read, update and delete objects
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class CrudService
 */
export default class CrudService {
  static users = [];
  static people = [];
  static movies = [];
  static pages = [];
  static routerService;
  static viewService;
  static isoLanguageCodeConverter;
  static verbose = true;

  /**
   * @description creates a user and stores the object in this.users
   * @param {String} name
   * @param {String} email
   * @param {String} password
   * @param {String} birthday
   * @return {Boolean}
   * @memberof CrudService
   */
  static createUser(name, email, password, birthday) {
    // check for duplicate
    if (this.people.some((user) => user.email === email)) {
      return false;
    }

    // create user
    let user = new User(name, email, password, birthday);

    // push user to this.users
    this.users.push(user);

    // print verbose
    this.printVerboseMessage(`[Created User] ${user.name}`, '#222', '#40D4FB');

    return true;
  }

  /**
   * @description creates pages and stores in this.pages
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Object} domElement
   * @memberof CrudService
   */
  static createPages(domElement) {
    let homePage = new HomePage(domElement);
    this.pages.push(homePage);

    let homeEmptyStatePage = new HomeEmptyStatePage(domElement);
    this.pages.push(homeEmptyStatePage);

    let getStarted1Page = new GetStarted1Page(domElement);
    this.pages.push(getStarted1Page);

    let getStarted2Page = new GetStarted2Page(domElement);
    this.pages.push(getStarted2Page);

    let getStarted3Page = new GetStarted3Page(domElement);
    this.pages.push(getStarted3Page);

    let pageNotFoundPage = new PageNotFoundPage(domElement);
    this.pages.push(pageNotFoundPage);

    let searchPeoplePage = new SearchPeoplePage(domElement);
    this.pages.push(searchPeoplePage);

    let searchMoviePage = new SearchMoviePage(domElement);
    this.pages.push(searchMoviePage);

    let searchEmptyStatePage = new SearchEmptyStatePage(domElement);
    this.pages.push(searchEmptyStatePage);

    let movieDetailsPage = new MovieDetailsPage(domElement);
    this.pages.push(movieDetailsPage);

    let attributionPage = new AttributionPage(domElement);
    this.pages.push(attributionPage);

    let peoplePage = new PeoplePage(domElement);
    this.pages.push(peoplePage);

    let watchlistPage = new WatchlistPage(domElement);
    this.pages.push(watchlistPage);
  }

  /**
   * @description creates Person object, fetches properties from id and stores the object in this.people
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Number} personId - the tmdb id associated with the person
   * @param {Boolean} includeSecondaryMovieCredits - option to include secondary movie credits (see Person
   * property description for more info)
   * @return {Promise}
   * @memberof CrudService
   */
  static async createPerson(personId, includeSecondaryMovieCredits) {
    // short-circuit evaluate default false
    let isIncludeSecondaryMovieCredits = includeSecondaryMovieCredits || false;

    // check for duplicate of person
    let foundPerson = this.people.find((element) => element.id === personId);

    // if person already exist return it
    if (foundPerson) {
      return Promise.resolve(foundPerson);
    }

    // create person
    let person = new Person(personId);

    // push person to this.people
    this.people.push(person);

    // fetch person details
    const personDetailsResponse = await FetchService.fetchPersonDetails(person);
    const personDetailsData = await personDetailsResponse.json();

    // bind person details to person
    person.biography = personDetailsData.biography;
    person.birthday = personDetailsData.birthday;
    person.deathday = personDetailsData.deathday;
    person.gender = personDetailsData.gender;
    person.knownForDepartment = personDetailsData.known_for_department;
    person.name = personDetailsData.name;
    person.placeOfBirth = personDetailsData.place_of_birth;
    person.popularity = personDetailsData.popularity;
    person.profilePath = personDetailsData.profile_path;

    // fetch movie credits
    const movieCreditsResponse = await FetchService.fetchMovieCreditsForPerson(person);
    const movieCreditsData = await movieCreditsResponse.json();

    // bind movie details to this
    let knownForDepartment;
    if (person.knownForDepartment) {
      knownForDepartment = person.knownForDepartment.toLowerCase();
    }

    // if person is known for acting
    switch (knownForDepartment) {
      case 'acting':
        // add cast credits to primaryMovieCredits
        for (const movieCredit of movieCreditsData.cast) {
          let movie = await this.createMovie(movieCredit.id);
          this.addElementToArray(movie, person.primaryMovieCredits);
        }
        if (isIncludeSecondaryMovieCredits) {
          // add crew credits to secondaryMovieCredits
          for (const movieCredit of movieCreditsData.crew) {
            let movie = await this.createMovie(movieCredit.id);
            this.addElementToArray(movie, person.secondaryMovieCredits);
          }
        }
        break;
      case 'directing':
        // add director credits to primaryMovieCredits
        for (const movieCredit of movieCreditsData.crew) {
          let movieCreditJob = movieCredit.job.toLowerCase();
          let movie = await this.createMovie(movieCredit.id);
          if (movieCreditJob === 'director') {
            this.addElementToArray(movie, person.primaryMovieCredits);
          } else if (isIncludeSecondaryMovieCredits) {
            this.addElementToArray(movie, person.secondaryMovieCredits);
          }
        }
        if (isIncludeSecondaryMovieCredits) {
          // add cast credits to secondaryMovieCredits
          for (const movieCredit of movieCreditsData.cast) {
            let movie = await this.createMovie(movieCredit.id);
            this.addElementToArray(movie, person.secondaryMovieCredits);
          }
        }
        break;
      case 'writing':
        // add director credits to primaryMovieCredits
        for (const movieCredit of movieCreditsData.crew) {
          let movieCreditDepartment = movieCredit.department.toLowerCase();
          let movie = await this.createMovie(movieCredit.id);
          if (movieCreditDepartment === 'writing') {
            this.addElementToArray(movie, person.primaryMovieCredits);
          } else if (isIncludeSecondaryMovieCredits) {
            this.addElementToArray(movie, person.secondaryMovieCredits);
          }
        }
        if (isIncludeSecondaryMovieCredits) {
          // add cast credits to secondaryMovieCredits
          for (const movieCredit of movieCreditsData.cast) {
            let movie = await this.createMovie(movieCredit.id);
            this.addElementToArray(movie, person.secondaryMovieCredits);
          }
        }
        break;
      default:
        // add cast credits to primaryMovieCredits
        for (const movieCredit of movieCreditsData.cast) {
          let movie = await this.createMovie(movieCredit.id);
          this.addElementToArray(movie, person.primaryMovieCredits);
        }
        if (isIncludeSecondaryMovieCredits) {
          // add crew credits to secondaryMovieCredits
          for (const movieCredit of movieCreditsData.crew) {
            let movie = await this.createMovie(movieCredit.id);
            this.addElementToArray(movie, person.secondaryMovieCredits);
          }
        }
    }

    // print verbose
    this.printVerboseMessage(`[Created Person] ${person.name}`, '#222', '#FB00FF');
    return Promise.resolve(person);
  }

  /**
   * @description creates person, binds person to user, process movies in user movie feed and appends to dom
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Number} personId
   * @param {Boolean} includeSecondaryMovieCredits
   * @return {Promise}
   * @memberof CrudService
   */
  static async favoritePerson(personId, includeSecondaryMovieCredits) {
    // set loader active if hash equals home
    let loader;
    if (this.viewService) {
      loader = this.viewService.loader;
      this.addElementToArray('#/home', loader.loaderHashes, true);
      loader.check();
    }

    // find person page
    const peoplePage = this.pages.find((element) => element.constructor.name === 'PeoplePage');
    if (peoplePage) {
      // quick add card to people (only fetching basic information for quick add to people tab bar)
      // create quick person object
      let quickPerson = new Person(personId);
      const personDetailsResponse = await FetchService.fetchPersonDetails(quickPerson);
      const personDetailsData = await personDetailsResponse.json();
      let name = personDetailsData.name;
      let knownForDepartment = this.getFormattedKnownForDepartment(personDetailsData.known_for_department);
      let profilePath = personDetailsData.profile_path;
      let fullImageUrl = FetchService.getFullImageUrl('w500', profilePath);
      peoplePage.quickRenderCard(personId, name, knownForDepartment, fullImageUrl);
    }

    let user = this.viewService.currentUser;

    // set isIncludeSeondaryMovieCredits to false as default
    let isIncludeSecondaryMovieCredits = includeSecondaryMovieCredits || false;

    // create person object
    let person = await this.createPerson(personId, includeSecondaryMovieCredits);

    // bind person to user
    try {
      let success = this.addElementToArray(person, user.people, false);
      if (!success) {
        throw new Error('Person is already favorited.');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
      return Promise.resolve(false);
    }

    // add to people (renderCards will replace quick add card)
    peoplePage.renderCards();

    // add movies to user's movie feed
    let feed = user.feed;
    let movieCredits;

    if (isIncludeSecondaryMovieCredits) {
      movieCredits = person.primaryMovieCredits.concat(person.secondaryMovieCredits);
    } else {
      movieCredits = person.primaryMovieCredits;
    }

    // find home page
    let foundPage = this.pages.find((element) => element.constructor.name === 'HomePage');
    if (foundPage) {
      for (const movie of movieCredits) {
        // append movies to home page
        let success = feed.addMovie(movie, person, user);
        if (success) this.printVerboseMessage(`[Created Movie Feed] ${movie.title}`, '#222', '#F6FF73');
      }
    }
    if (loader) {
      this.removeElementFromArray('#/home', loader.loaderHashes);
      loader.check();
    }

    return Promise.resolve(true);
  }

  /**
   * @description unbinds person to user, process movies in user movie feed and appends to dom
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Number} personId
   * @param {User} user
   * @param {Boolean} includeSecondaryMovieCredits
   * @return {Promise}
   * @memberof CrudService
   */
  static unfavoritePerson(personId) {
    // set loader active if hash equals home
    let loader;
    let viewService = this.viewService;
    if (viewService) {
      loader = viewService.loader;
      this.addElementToArray('#/home', loader.loaderHashes, false);
      loader.check();
    }

    // update search results
    const foundSearchPeoplePage = this.pages.find(
      (element) => element.constructor.name === 'SearchPeoplePage'
    );
    if (foundSearchPeoplePage) {
      foundSearchPeoplePage.updateFavoriteIcon(personId);
    }

    // unbind person from user
    let person = viewService.currentUser.people.find((element) => element.id === personId);

    this.removeElementFromArray(person, viewService.currentUser.people);

    // declare dom element hooks
    let foundPage = this.pages.find((element) => element.constructor.name === 'PeoplePage');
    if (foundPage) {
      foundPage.renderCards();
    }

    if (loader) {
      this.removeElementFromArray('#/home', loader.loaderHashes);
      loader.check();
    }

    return Promise.resolve(true);
  }

  /**
   * @description creates Movie object, fetches properties from id and stores this object in this.movie
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Number} movieId- the tmdb id associated with the movie
   * @return {Promise}
   * @memberof CrudService
   */
  static async createMovie(movieId) {
    // check for duplicate
    let foundMovie = this.movies.find((element) => element.id === movieId);

    // if movie already exist return it
    if (foundMovie) {
      return Promise.resolve(foundMovie);
    }

    // create movie
    let movie = new Movie(movieId);

    // push movie to this.movies
    this.movies.push(movie);

    // fetch movie details
    const movieDetailsResponse = await FetchService.fetchMovieDetails(movie);
    const movieDetailsData = await movieDetailsResponse.json();

    // bind movie details to movie
    movie.backdropPath = movieDetailsData.backdrop_path;
    movie.budget = movieDetailsData.budget;
    let newGenres = [];
    if (movieDetailsData.genres) {
      for (const genre of movieDetailsData.genres) {
        newGenres.push(genre);
      }
      movie.genres = newGenres;
      movie.originalLanguage = movieDetailsData.original_language;
      movie.originalTitle = movieDetailsData.original_title;
      movie.overview = movieDetailsData.overview;
      movie.popularity = movieDetailsData.popularity;
      movie.posterPath = movieDetailsData.poster_path;
    }
    if (movieDetailsData.production_countries[0]) {
      movie.productionCountry = movieDetailsData.production_countries[0].name;
    }
    movie.releaseDate = movieDetailsData.release_date;
    movie.revenue = movieDetailsData.revenue;
    movie.runtime = movieDetailsData.runtime;
    movie.status = movieDetailsData.status;
    movie.tagline = movieDetailsData.tagline;
    movie.title = movieDetailsData.title;
    movie.voteAverage = movieDetailsData.vote_average;
    movie.voteCount = movieDetailsData.vote_count;

    // fetch movie credits
    const creditsResponse = await FetchService.fetchCreditsForMovie(movie);
    const creditsData = await creditsResponse.json();

    // bind cast to movie
    let newCast = [];
    if (creditsData.cast) {
      for (const castMember of creditsData.cast) {
        newCast.push(
          new CastCredit(
            castMember.id,
            castMember.gender,
            castMember.name,
            castMember.popularity,
            castMember.profile_path,
            castMember.character
          )
        );
      }
    }
    movie.cast = newCast;

    // bind directors and writers to movie
    let newDirectors = [];
    let newWriters = [];
    if (creditsData.crew) {
      for (const crewMember of creditsData.crew) {
        let crewMemberJob = crewMember.job.toLowerCase();
        let crewCredit = new CrewCredit(
          crewMember.id,
          crewMember.gender,
          crewMember.name,
          crewMember.popularity,
          crewMember.profile_path,
          crewMember.job
        );
        if (crewMemberJob === 'director') {
          newDirectors.push(crewCredit);
        }
        if (crewMemberJob === 'screenplay' || crewMemberJob === 'story') {
          newWriters.push(crewCredit);
        }
      }
    }
    movie.directors = newDirectors;
    movie.writers = newWriters;

    // fetch trailers
    const videosResponse = await FetchService.fetchVideos(movie);
    const videosData = await videosResponse.json();

    // bind trailers to movie
    let newTrailers = [];
    if (videosData.results) {
      for (const video of videosData.results) {
        if (
          video.site.toLowerCase() === 'youtube' &&
          video.type.toLowerCase() === 'trailer' &&
          video.official === true
        ) {
          newTrailers.push(`https://www.youtube.com/embed/${video.key}`);
        }
      }
    }
    movie.trailers = newTrailers;

    // fetch watch providers
    const watchProvidersResponse = await FetchService.fetchWatchProviders(movie);
    const watchProvidersData = await watchProvidersResponse.json();

    // bind watch provider
    let locale = 'DK';
    if (watchProvidersData.results[locale]) {
      let link = watchProvidersData.results[locale].link;
      if (watchProvidersData.results[locale].flatrate) {
        for (const watchProvider of watchProvidersData.results[locale].flatrate) {
          let providerName = watchProvider.provider_name;
          let logoPath = watchProvider.logo_path;
          let newWatchProvider = new WatchProvider(locale, link, providerName, logoPath);
          movie.watchProviders.push(newWatchProvider);
        }
      }
    }

    // fetch similar movies
    const similarMoviesResponse = await FetchService.fetchSimilarMovies(movie);
    const similarMoviesData = await similarMoviesResponse.json();

    // bind similar movies
    let newSimilarMovies = [];
    if (similarMoviesData.results) {
      for (const similarMovie of similarMoviesData.results) {
        let id = similarMovie.id;
        let title = similarMovie.title;
        let posterPath = similarMovie.poster_path;
        let releaseDate = similarMovie.release_date;
        let newSimilarMovie = new SimilarMovie(id, title, posterPath, releaseDate);
        newSimilarMovies.push(newSimilarMovie);
      }
      movie.similarMovies = newSimilarMovies;
    }

    // print verbose
    this.printVerboseMessage(`[Created Movie] ${movie.title}`, '#222', '#E67300');

    return Promise.resolve(movie);
  }

  /**
   * @description Fetches person search result data from query and creates array with PersonSearchResult objects
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {User} user
   * @param {String} query
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof CrudService
   */

  static async createQueryPeopleSearchResults(query) {
    let loader;

    if (this.viewService) {
      // set loader active if hash equals #/search-people
      loader = this.viewService.loader;
      this.addElementToArray('#/search-people-most-popular', loader.loaderHashes, false);
      loader.check();
    }

    let SearchPeoplePage;
    if (CrudService.pages) {
      SearchPeoplePage = CrudService.pages.find((element) => element.constructor.name === 'SearchPeoplePage');
    }

    if (SearchPeoplePage) {
      SearchPeoplePage.isScrolling = 1;
    }

    let pageNumber;
    if (SearchPeoplePage) {
      pageNumber = SearchPeoplePage.pageNumber;
    } else {
      pageNumber = 1;
    }

    // fetch search results
    const searchResultsResponse = await FetchService.fetchPersonSearchResults(query, pageNumber);
    const searchResultsData = await searchResultsResponse.json();

    // bind search results to user
    let newQueryPeopleSearchResults = [];
    if (searchResultsData.results) {
      for (const searchResult of searchResultsData.results) {
        let popularity = searchResult.popularity;
        let id = searchResult.id;
        let knownForDepartment = searchResult.known_for_department;
        let personName = searchResult.name;
        let profilePath = searchResult.profile_path;
        let newPersonSearchResult = new PersonSearchResult(
          query,
          pageNumber,
          popularity,
          id,
          knownForDepartment,
          personName,
          profilePath
        );

        // print verbose
        this.printVerboseMessage(
          `[Created Person Search Result] ${newPersonSearchResult.name}`,
          '#222',
          '#347AEB'
        );

        // push result to array
        newQueryPeopleSearchResults.push(newPersonSearchResult);
      }
    }

    // append search results to search people page
    if (newQueryPeopleSearchResults) {
      for (const person of newQueryPeopleSearchResults) {
        let profilePath;
        if (!person.profilePath) {
          profilePath = this.getRandomUserAvatarImage(person);
        } else {
          profilePath = FetchService.getFullImageUrl('w500', person.profilePath);
        }
        SearchPeoplePage.renderQuerySearchResults(
          person.id,
          person.name,
          person.knownForDepartment,
          profilePath
        );
      }
    }

    // remove #/search-people from active loader hashes
    if (loader) {
      this.removeElementFromArray('#/search-people-most-popular', loader.loaderHashes);
      loader.check();
    }

    // reset isScrolling to 0
    if (SearchPeoplePage) {
      SearchPeoplePage.isScrolling = 0;
    }

    return Promise.resolve(newQueryPeopleSearchResults);
  }
  /**
   * @description Fetches movie search result data from query and creates arrays with MovieSearchResult objects
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {User} user
   * @param {String} query
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof CrudService
   */
  static async createMovieSearchResults(user, query, pageNumber) {
    // fetch search results
    const searchResultsResponse = await FetchService.fetchMovieSearchResults(query, pageNumber);
    const searchResultsData = await searchResultsResponse.json();

    // bind search results to user
    const newMovieSearchResults = [];
    if (searchResultsData.results) {
      for (const searchResult of searchResultsData.results) {
        let popularity = searchResult.popularity;
        let id = searchResult.id;
        let genreIds = searchResult.genre_ids;
        let posterPath = searchResult.poster_path;
        let releaseDate = searchResult.release_date;
        let title = searchResult.title;
        let voteAverage = searchResult.vote_average;
        let newMovieSearchResult = new MovieSearchResult(
          query,
          pageNumber,
          popularity,
          id,
          genreIds,
          posterPath,
          releaseDate,
          title,
          voteAverage
        );
        // print verbose
        this.printVerboseMessage(
          `[Created Movie Search Result] ${newMovieSearchResult.title}`,
          '#222',
          '#347AEB'
        );

        // push result to array
        newMovieSearchResults.push(newMovieSearchResult);
      }
    }
    // set user movieSearchResults property
    user.movieSearchResults = newMovieSearchResults;
    return Promise.resolve(newMovieSearchResults);
  }

  /**
   * @description Fetches most popular people data from TMDB and creates array with PersonSearchResult objects
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @return {Promise}
   * @memberof CrudService
   */
  static async createPopularPeopleSearchResults() {
    let loader;
    if (this.viewService) {
      // set loader active if hash equals #/search-people
      loader = this.viewService.loader;
      this.addElementToArray('#/search-people-most-popular', loader.loaderHashes, false);
      loader.check();
    }

    let SearchPeoplePage;
    if (CrudService.pages) {
      SearchPeoplePage = CrudService.pages.find((element) => element.constructor.name === 'SearchPeoplePage');
    }

    if (SearchPeoplePage) {
      SearchPeoplePage.isScrolling = 1;
    }

    let pageNumber;
    if (SearchPeoplePage) {
      pageNumber = SearchPeoplePage.pageNumber;
    } else {
      pageNumber = 1;
    }

    // fetch popular movies
    const popularPeopleResponse = await FetchService.fetchPopularPeople(pageNumber);
    const popularPeopleData = await popularPeopleResponse.json();

    // bind fetch data to array
    let popularPeopleSearchResults = [];
    if (popularPeopleData.results) {
      for (const person of popularPeopleData.results) {
        let query = '@popular';
        let popularity = person.popularity;
        let id = person.id;
        let knownForDepartment = person.known_for_department;
        let personName = person.name;
        let profilePath = person.profile_path;
        let newPersonSearchResult = new PersonSearchResult(
          query,
          pageNumber,
          popularity,
          id,
          knownForDepartment,
          personName,
          profilePath
        );
        // print verbose
        this.printVerboseMessage(
          `[Created Person Search Result] ${newPersonSearchResult.name}`,
          '#222',
          '#347AEB'
        );

        // push result to array
        popularPeopleSearchResults.push(newPersonSearchResult);
      }
    }

    // append search results to search people page
    if (SearchPeoplePage) {
      for (const person of popularPeopleSearchResults) {
        let profilePath;
        if (!person.profilePath) {
          profilePath = this.getRandomUserAvatarImage(person);
        } else {
          profilePath = FetchService.getFullImageUrl('w500', person.profilePath);
        }
        SearchPeoplePage.renderMostPopularSearchResults(
          person.id,
          person.name,
          person.knownForDepartment,
          profilePath
        );
      }
    }

    // remove #/search-people from active loader hashes
    if (loader) {
      this.removeElementFromArray('#/search-people-most-popular', loader.loaderHashes);
      loader.check();
    }

    // reset isScrolling to 0
    if (SearchPeoplePage) {
      SearchPeoplePage.isScrolling = 0;
    }

    return Promise.resolve(popularPeopleSearchResults);
  }

  /**
   * @description creates movie details
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Number} id
   * @memberof CrudService
   */
  static createMovieDetails(movieId) {
    let movie = this.movies.find((element) => element.id === movieId);
    let movieDetailsPage = this.pages.find((element) => element.constructor.name === 'MovieDetailsPage');
    // movieDetailsPage.clear();
    this.routerService.navigateTo('#/movie-details');
    movieDetailsPage.renderMovie(movie);
    window.scrollTo(0, 0);
  }

  /**
   * @description generates a random user avatar image and returns it
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Person} person
   * @memberof CrudService
   */
  static getRandomUserAvatarImage(person) {
    const gender = person.gender;
    const baseImagePath = '/src/cases/peepfeed/src/img/people/avatar/';
    let fullImagePath;
    if (gender === 1) {
      let randomNumber = Math.ceil(Math.random() * 4);
      fullImagePath = `${baseImagePath}female-${randomNumber}.png`;
    } else {
      let randomNumber = Math.ceil(Math.random() * 5);
      fullImagePath = `${baseImagePath}male-${randomNumber}.png`;
    }
    return fullImagePath;
  }

  /**
   * @description Fetches most popular movies data from TMDB and creates array with MovieSearchResult objects
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof CrudService
   */
  static async createPopularMoviesSearchResults(pageNumber) {
    // fetch popular movies
    const popularMoviesResponse = await FetchService.fetchPopularMovies(pageNumber);
    const popularMoviesData = await popularMoviesResponse.json();

    // bind fetch data to array
    let popularMoviesSearchResults = [];
    if (popularMoviesData.results) {
      for (const movie of popularMoviesData.results) {
        let query = '@popular';
        let popularity = movie.popularity;
        let id = movie.id;
        let genreIds = movie.genre_ids;
        let posterPath = movie.poster_path;
        let releaseDate = movie.release_date;
        let title = movie.title;
        let voteAverage = movie.vote_average;
        let newMovieSearchResult = new MovieSearchResult(
          query,
          pageNumber,
          popularity,
          id,
          genreIds,
          posterPath,
          releaseDate,
          title,
          voteAverage
        );
        // print verbose
        this.printVerboseMessage(
          `[Created Movie Search Result] ${newMovieSearchResult.title}`,
          '#222',
          '#347AEB'
        );

        // push result to array
        popularMoviesSearchResults.push(newMovieSearchResult);
      }
    }
    return Promise.resolve(popularMoviesSearchResults);
  }

  /**
   * @description Fetches top rated movies from TMDB and creates array with MovieSearchResult objects
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof CrudService
   */
  static async createTopRatedMoviesSearchResults(pageNumber) {
    // fetch top rated movies
    const topRatedMoviesResponse = await FetchService.fetchTopRatedMovies(pageNumber);
    const topRatedMoviesData = await topRatedMoviesResponse.json();

    // bind fetch data to array
    let topRatedMoviesSearchResults = [];
    for (const movie of topRatedMoviesData.results) {
      let query = '@toprated';
      let popularity = movie.popularity;
      let id = movie.id;
      let genreIds = movie.genre_ids;
      let posterPath = movie.poster_path;
      let releaseDate = movie.release_date;
      let title = movie.title;
      let voteAverage = movie.vote_average;
      let newMovieSearchResult = new MovieSearchResult(
        query,
        pageNumber,
        popularity,
        id,
        genreIds,
        posterPath,
        releaseDate,
        title,
        voteAverage
      );
      // print verbose
      this.printVerboseMessage(
        `[Created Movie Search Result] ${newMovieSearchResult.title}`,
        '#222',
        '#347AEB'
      );

      // push result to array
      topRatedMoviesSearchResults.push(newMovieSearchResult);
    }
    return Promise.resolve(topRatedMoviesSearchResults);
  }

  /**
   * @description Fetches upcoming movies from TMDB and creates array with MovieSearchResult objects
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Number} pageNumber
   * @return {Promise}
   * @memberof CrudService
   */
  static async createUpcomingMoviesSearchResults(pageNumber) {
    // fetch top rated movies
    const upcomingMoviesResponse = await FetchService.fetchUpcomingMovies(pageNumber);
    const upcomingMoviesData = await upcomingMoviesResponse.json();

    // bind fetch data to array
    let upcomingMoviesSearchResults = [];
    if (upcomingMoviesData.results) {
      for (const movie of upcomingMoviesData.results) {
        let query = '@upcoming';
        let popularity = movie.popularity;
        let id = movie.id;
        let genreIds = movie.genre_ids;
        let posterPath = movie.poster_path;
        let releaseDate = movie.release_date;
        let title = movie.title;
        let voteAverage = movie.vote_average;
        let newMovieSearchResult = new MovieSearchResult(
          query,
          pageNumber,
          popularity,
          id,
          genreIds,
          posterPath,
          releaseDate,
          title,
          voteAverage
        );
        // print verbose
        this.printVerboseMessage(
          `[Created Movie Search Result] ${newMovieSearchResult.title}`,
          '#222',
          '#347AEB'
        );

        // push result to array
        upcomingMoviesSearchResults.push(newMovieSearchResult);
      }
    }
    return Promise.resolve(upcomingMoviesSearchResults);
  }

  /**
   * @description creates ViewService and stores in this.viewService
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {User} currentUser
   * @return {Promise}
   * @memberof CrudService
   */
  static async createViewService(currentUser) {
    this.viewService = new ViewService(currentUser);
    return Promise.resolve(this.viewService);
  }

  /**
   * @description creates RouterService and stores in this.routerService
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {String} defaultPage
   * @return {Promise}
   * @memberof CrudService
   */
  static async createRouterService(defaultPage) {
    // declare dom hook
    const pages = document.querySelector('#pages');

    // create router
    this.routerService = new Router(pages, defaultPage);
    return Promise.resolve(this.routerService);
  }

  /**
   * @description logs verbose messages if this.verbose is truthy
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {String} message
   * @param {String} backgroundColor - hex value
   * @param {String} color - hex value
   * @memberof CrudService
   */
  static printVerboseMessage(message, backgroundColor, color) {
    if (this.verbose) {
      console.log(`%c ${message} `, `background: ${backgroundColor}; color: ${color}`);
    }
  }

  /**
   * @description helper method that removes the first element that matches the input element from an array by mutation.
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Object} element
   * @param {array} array
   * @return {Boolean}
   */
  static removeElementFromArray(element, array) {
    // find index of element
    let foundIndex = array.findIndex((e) => e === element);
    if (foundIndex === -1) {
      return false;
    }
    array.splice(foundIndex, 1);
    return true;
  }

  /**
   * @description helper method that removes all elements matching the input element from an array by mutation.
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Object} element
   * @param {array} array
   * @return {Boolean}
   */
  static removeAllElementsFromArray(element, array) {
    let newArray = array.filter((e) => e != element);
    // if array and newArray have same length, no elements were removed
    if (array.length === newArray.length) {
      return false;
    }
    array = newArray;
    return true;
  }

  /**
   * @description helper method that adds an element to an array by mutation
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Object} element
   * @param {Array} array
   * @param {Boolean} addDuplicates
   * @return {Boolean}
   * @memberof CrudService
   */
  static addElementToArray(element, array, addDuplicates) {
    // set default value to false for add duplicates option
    let isAddDuplicates = addDuplicates || false;
    // search for duplicates
    if (!isAddDuplicates) {
      let foundDuplicate = array.includes(element);
      // return if duplicate is found
      if (foundDuplicate) {
        return false;
      }
    }
    array.push(element);
    return true;
  }

  /**
   * @description helper method that clears an array by mutation.
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {Array} array
   * @memberof CrudService
   */
  static clearArray(array) {
    array.length = 0;
  }

  /**
   * @description creates iso language code converter and stores in this.isoLanguageCodeConverter
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @memberof CrudService
   */
  static createIsoLanguageCodeConverter() {
    this.isoLanguageCodeConverter = new IsoLanguageCodeConverter();
  }

  /**
   * @description formats knownForDepartment string
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @static
   * @param {String} knownForDepartment
   * @return {String}
   * @memberof CrudService
   */
  static getFormattedKnownForDepartment(knownForDepartment) {
    switch (knownForDepartment.toLowerCase()) {
      case 'acting':
        return 'Actor';
      case 'directing':
        return 'Director';
      case 'writing':
        return 'Writer';
    }
  }
}
