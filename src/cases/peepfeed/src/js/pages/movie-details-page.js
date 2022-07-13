import CrudService from '../services/crud-service.js';
import FetchService from '../services/fetch-service.js';
import ViewService from '../services/view-service.js';

/**
 * @description Movie details page
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class MovieDetailsPage
 */
export default class MovieDetailsPage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="movie-details" class="page">
     
      <div class="movie-detail-info-container">
        <div class="movie-detail-poster-bookmark-container">
            <div class="movie-detail-poster">
            </div>
            <div class="button-wrapper"></div>
           
        </div>

        <div class="movie-detail-info">
            <p class="movie-detail-title"></p>
            <div class="movie-detail-rating movie-rating">
                <picture>
                    <source type="image/svg+xml" srcset="./src/img/branding/tmdb/tmdb-small 1.svg">
                    <img src="./src/img/branding/tmdb/tmdb-small 1@2x.png" alt="Small TMDB Logo">
                </picture>
                <span class="vote-average"></span>
            </div>
            <p class="movie-detail-release movie-detail-text">
              <p class="movie-keyword release-text"></p>
              <p class="release-date"></p>
            </p>
            <p class="movie-detail-genre movie-detail-text">
              <p class="movie-keyword genres-text"></p>
              <p class="genres"></p>
            </p>
  
            <p class="movie-detail-language movie-detail-text">
              <p class="movie-keyword language-text"></p>
              <p class="language"></p>
            </p>

            <p class="movie-detail-runtime movie-detail-text">
              <p class="movie-keyword runtime-text"></p> 
              <p class="runtime"></p>
            </p>
        </div>
      </div>

      <h3>Description</h3>

      <p class="movie-description"></p>

      <h3>People</h3>

      <div class="movie-people-container">
        <div id="movie-details-actors-button" class="movie-people-button--active">Actors</div>
        <div id="movie-details-directors-button" class="movie-people-button">Directors</div>
        <div id="movie-details-writers-button" class="movie-people-button">Writers</div>
      </div>

      <div id="actors-wrapper" class="horizontal-scrolling-wrapper"></div>
      <div id="director-wrapper" class="horizontal-scrolling-wrapper"></div>
      <div id="writers-wrapper" class="horizontal-scrolling-wrapper"></div>

      <h3 id="watch-providers-heading">Streaming providers</h3>

      <div id="watch-providers-wrapper" class="horizontal-scrolling-wrapper"></div>

      <h3  id="trailers-heading">Trailers</h3>

      <div class="trailers-container">
        <div class="horizontal-scrolling-wrapper"></div>
      </div>

      <h3 id="similar-movies-heading">Similar movies</h3>

      <div class="movies-related">
        <div class="horizontal-scrolling-wrapper"></div>
      </div>
  </section>
  `;
  }
  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }

  renderMovie(movieInput) {
    window.scrollTo(0, 0);
    let movie = movieInput;
    // declare current user
    let user = CrudService.viewService.currentUser;

    // clear button wrapper
    let buttonWrapper = document.querySelector('#movie-details .button-wrapper');
    buttonWrapper.innerHTML = '';

    // create cta button
    let button = document.createElement('a');
    button.classList.add('bookmark-button');

    // if movie is already in users watchlist
    if (user.watchlist.find((element) => element === movie)) {
      // create remove button
      button.innerText = 'Remove';
    } else {
      // create bookmark button
      button.innerText = 'Bookmark';
    }

    button.addEventListener('click', (event) => {
      let eventTarget = event.target;
      if (eventTarget.innerText === 'Remove') {
        button.innerText = 'Bookmark';
        CrudService.removeElementFromArray(movie, user.watchlist);
      } else {
        button.innerText = 'Remove';
        CrudService.addElementToArray(movie, user.watchlist);
      }
      const watchlistPage = CrudService.pages.find((element) => element.constructor.name === 'WatchlistPage');
      if (watchlistPage) {
        watchlistPage.renderCards();
      }
    });

    // append button
    document.querySelector('#movie-details .button-wrapper').appendChild(button);

    // render title
    document.querySelector('#movie-details .movie-detail-title').innerText = movie.title;

    // render vote average
    document.querySelector('.movie-detail-rating.movie-rating').style = 'display: unset';
    let voteAverage = movie.voteAverage;
    if (movie.voteAverage > 0) {
      voteAverage *= 10;
      if (voteAverage >= 70) {
        document.querySelector('#movie-details .vote-average').style = 'color: #21D07A';
      } else if (voteAverage >= 50) {
        document.querySelector('#movie-details .vote-average').style = 'color: #D2D531';
      } else {
        document.querySelector('#movie-details .vote-average').style = 'color: #C12258';
      }
      voteAverage += ' %';
      document.querySelector('#movie-details .vote-average').innerText = voteAverage;
    } else {
      document.querySelector('.movie-detail-rating.movie-rating').style = 'display: none';
    }

    // render release date
    let releaseDate = movie.releaseDate;
    if (releaseDate) {
      let releaseText = document.querySelector('#movie-details .release-text');
      if (movie.status === 'Released') {
        releaseText.innerText = `Released`;
      } else {
        releaseText.innerText = `Release date`;
      }
      document.querySelector('#movie-details .release-date').innerText = movie.releaseDate;
    }

    // render genres
    let movieGenres = movie.genres;
    if (movieGenres) {
      let genres = [];
      let genresString = '';
      if (movie.genres.length > 0) {
        let releaseText = document.querySelector('#movie-details .genres-text');
        releaseText.innerText = 'Genres';
        for (const genre of movie.genres) {
          genres.push(genre.name);
        }
        // max include 3 genre categories
        genres = genres.slice(0, 3);
        genresString = genres.join(', ');
      }
      document.querySelector('#movie-details .genres').innerText = genresString;
    }

    // render language
    let originalLanguage = movie.originalLanguage;
    if (originalLanguage) {
      let languageText = document.querySelector('#movie-details .language-text');
      languageText.innerText = 'Language';
      document.querySelector('#movie-details .language').innerText =
        CrudService.isoLanguageCodeConverter.convertIsoCodeToLanguage(movie.originalLanguage);
    }

    // render runtime
    let movieRuntime = movie.runtime;
    if (movieRuntime) {
      let runtime = `${movieRuntime} min`;
      document.querySelector('.movie-keyword.runtime-text').innerText = 'Runtime';
      document.querySelector('#movie-details .runtime').innerText = runtime;
    } 

    // render backdrop
    let posterPath = movie.posterPath;
    if (posterPath) {
      let fullImagePath = FetchService.getFullImageUrl('w500', posterPath);
      document.querySelector(
        '#movie-details .movie-detail-poster'
      ).style = `background-image: url('${fullImagePath}');`;
    }

    // render description
    document.querySelector('#movie-details .movie-description').innerText = movie.overview;

    // declare wrapper hooks
    const actorsWrapper = document.querySelector('#actors-wrapper');
    const directorsWrapper = document.querySelector('#director-wrapper');
    const writersWrapper = document.querySelector('#writers-wrapper');

    // handle scroll
    actorsWrapper.scrollTo(0, 0);
    directorsWrapper.scrollTo(0, 0);
    writersWrapper.scrollTo(0, 0);

    // clear wrappers
    actorsWrapper.innerHTML = '';
    directorsWrapper.innerHTML = '';
    writersWrapper.innerHTML = '';

    // render wrappers
    this.renderDomElement(actorsWrapper, true);
    this.renderDomElement(directorsWrapper, false);
    this.renderDomElement(writersWrapper, false);

    // render actors
    for (const cast of movie.cast) {
      // create dom elements
      const actor = document.createElement('div');
      actor.classList.add('movie-detail-people');
      const movieDetailPeopleImg = document.createElement('div');
      movieDetailPeopleImg.classList.add('movie-detail-people-img');
      const personFavoriteIcon = document.createElement('i');
      const personPrimaryText = document.createElement('p');
      personPrimaryText.classList.add('movie-details-primary-text');
      const personSecondaryText = document.createElement('p');
      personSecondaryText.classList.add('movie-detail-secondary-text');

      // init icons
      this.initFavoriteIcon(personFavoriteIcon, cast.id);

      // append dom elements
      actorsWrapper.appendChild(actor);
      actor.appendChild(movieDetailPeopleImg);
      actor.appendChild(personFavoriteIcon);
      actor.appendChild(personPrimaryText);
      actor.appendChild(personSecondaryText);

      // set dom element values
      let fullImageUrl;
      if (cast.profilePath) {
        fullImageUrl = FetchService.getFullImageUrl('w500', cast.profilePath);
      } else {
        fullImageUrl = CrudService.getRandomUserAvatarImage(cast.id);
      }
      movieDetailPeopleImg.style = `background-image: url('${fullImageUrl}');`;
      personPrimaryText.innerText = cast.name;
      personSecondaryText.innerText = cast.character;
    }

    // render directors
    for (const director of movie.directors) {
      // create dom elements
      const directorContainer = document.createElement('div');
      directorContainer.classList.add('movie-detail-people');
      const movieDetailPeopleImg = document.createElement('div');
      movieDetailPeopleImg.classList.add('movie-detail-people-img');
      const personFavoriteIcon = document.createElement('i');
      const personPrimaryText = document.createElement('p');
      personPrimaryText.classList.add('movie-details-primary-text');
      const personSecondaryText = document.createElement('p');
      personSecondaryText.classList.add('movie-detail-secondary-text');

      // init icons
      this.initFavoriteIcon(personFavoriteIcon, director.id);

      // append dom elements
      directorsWrapper.appendChild(directorContainer);
      directorContainer.appendChild(movieDetailPeopleImg);
      directorContainer.appendChild(personFavoriteIcon);
      directorContainer.appendChild(personPrimaryText);
      directorContainer.appendChild(personSecondaryText);

      // set dom element values
      let fullImageUrl;
      if (director.profilePath) {
        fullImageUrl = FetchService.getFullImageUrl('w500', director.profilePath);
      } else {
        fullImageUrl = CrudService.getRandomUserAvatarImage(director.id);
      }
      movieDetailPeopleImg.style = `background-image: url('${fullImageUrl}');`;
      personPrimaryText.innerText = director.name;
      personSecondaryText.innerText = director.job;
    }

    // render writers
    for (const writer of movie.writers) {
      // create dom elements
      const writerContainer = document.createElement('div');
      writerContainer.classList.add('movie-detail-people');
      const movieDetailPeopleImg = document.createElement('div');
      movieDetailPeopleImg.classList.add('movie-detail-people-img');
      const personFavoriteIcon = document.createElement('i');
      const personPrimaryText = document.createElement('p');
      personPrimaryText.classList.add('movie-details-primary-text');
      const personSecondaryText = document.createElement('p');
      personSecondaryText.classList.add('movie-detail-secondary-text');

      // init icons
      this.initFavoriteIcon(personFavoriteIcon, writer.id);

      // append dom elements
      writersWrapper.appendChild(writerContainer);
      writerContainer.appendChild(movieDetailPeopleImg);
      writerContainer.appendChild(personFavoriteIcon);
      writerContainer.appendChild(personPrimaryText);
      writerContainer.appendChild(personSecondaryText);

      // set dom element values
      let fullImageUrl;
      if (writer.profilePath) {
        fullImageUrl = FetchService.getFullImageUrl('w500', writer.profilePath);
      } else {
        fullImageUrl = CrudService.getRandomUserAvatarImage(writer.id);
      }
      movieDetailPeopleImg.style = `background-image: url('${fullImageUrl}');`;
      personPrimaryText.innerText = writer.name;
      personSecondaryText.innerText = writer.job;
    }

    // clear watch providers container
    const watchProvidersWrapper = document.getElementById('watch-providers-wrapper');
    watchProvidersWrapper.innerHTML = '';

    // render watch providers
    const watchProvidersHeading = document.getElementById('watch-providers-heading');
    this.renderDomElement(watchProvidersHeading, false);
    if (movie.watchProviders.length > 0) {
      this.renderDomElement(watchProvidersHeading, true);
      for (const watchProvider of movie.watchProviders) {
        // create dom elements
        const anchor = document.createElement('a');
        const img = document.createElement('img');
        img.classList.add('watchprovider-logo');

        // set dom element values
        anchor.setAttribute('href', watchProvider.link);
        anchor.setAttribute('target', '_blank');
        let logoPath = watchProvider.logoPath;
        let fullImagePath = FetchService.getFullImageUrl('original', logoPath);
        img.setAttribute('src', fullImagePath);

        // append dom elements
        watchProvidersWrapper.appendChild(anchor);
        anchor.appendChild(img);
      }
    }

    // clear trailers container
    const trailersContainer = document.querySelector(
      '#movie-details .trailers-container .horizontal-scrolling-wrapper'
    );
    trailersContainer.innerHTML = '';

    // render trailers
    const trailersHeading = document.getElementById('trailers-heading');
    this.renderDomElement(trailersHeading, false);
    if (movie.trailers.length > 0) {
      this.renderDomElement(trailersHeading, true);
      for (const trailer of movie.trailers) {
        // create dom elements
        const iframe = document.createElement('iframe');

        // set dom element values
        iframe.setAttribute('title', `Youtube video player`);
        iframe.setAttribute('src', `${trailer}`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('gesture', 'media');
        iframe.setAttribute(
          'allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        );
        iframe.setAttribute('allowfullscreen', '');

        // append dom elements
        trailersContainer.appendChild(iframe);
      }
    }

    // render similar movies
    const similarMoviesHeading = document.getElementById('similar-movies-heading');
    this.renderDomElement(similarMoviesHeading, false);
    if (movie.similarMovies.length > 0) {
      this.renderDomElement(similarMoviesHeading, true);
      for (const similarMovie of movie.similarMovies) {
        let similarMoviesContainer = document.querySelector(
          '#movie-details .movies-related .horizontal-scrolling-wrapper'
        );
        similarMoviesContainer.insertAdjacentHTML(
          'afterbegin',
          `
        <div class="movie-details-poster-card-container" data-similar-movie-id="${similarMovie.id}">
          <div class="feed-poster-card" style='background-image: url(&quot;${FetchService.getFullImageUrl(
            'w500',
            similarMovie.posterPath
          )}&quot;'>
            <div class="feeder-poster-shadow-top"></div>
            <div class="feeder-poster-shadow-bottom"></div>
            <div class="feed-poster-card-info">
                <p class="feed-poster-title">${similarMovie.title}</p>
                <p class="feed-poster-people">${similarMovie.releaseDate.slice(0, 4)}</p>
            </div>
          </div>
        </div>`
        );
        // attach on click eventlistener for card
        let movieDetailsPosterCard = document.querySelector(
          `#movie-details .movies-related .horizontal-scrolling-wrapper .movie-details-poster-card-container[data-similar-movie-id="${similarMovie.id}"]`
        );
        movieDetailsPosterCard.addEventListener('click', async () => {
          let loader;
          if (CrudService.viewService) {
            // set loader active if hash equals #/search-people
            loader = CrudService.viewService.loader;
            CrudService.addElementToArray('#/movie-details', loader.loaderHashes, false);
            loader.check();
          }
          let newSimilarMovie = await CrudService.createMovie(similarMovie.id);
          if (loader) {
            CrudService.removeElementFromArray('#/movie-details', loader.loaderHashes);
            loader.check();
          }
          this.renderMovie(newSimilarMovie);
        });
      }
    }
  }

  initFavoriteIcon(domElement, personId) {
    let user = CrudService.viewService.currentUser;
    let isCastMemberFavorited = false;
    domElement.setAttribute('data-person-id', personId);
    if (user.people.some((element) => element.id === personId)) {
      isCastMemberFavorited = true;
    }
    if (isCastMemberFavorited) {
      domElement.classList.add('bx', 'bxs-star', 'person-favorite-icon');
    } else {
      domElement.classList.add('bx', 'bx-star', 'person-favorite-icon');
    }
    domElement.addEventListener('click', (event) => {
      const eventTarget = event.target;
      if (eventTarget.classList.contains('bx-star')) {
        domElement.classList.replace('bx-star', 'bxs-star');
        CrudService.favoritePerson(personId, false);
      } else {
        domElement.classList.replace('bxs-star', 'bx-star');
        CrudService.unfavoritePerson(personId);
      }
    });
  }

  attachEventListeners() {
    // declare button hooks
    const actorsButton = document.getElementById('movie-details-actors-button');
    const directorsButton = document.getElementById('movie-details-directors-button');
    const writersButton = document.getElementById('movie-details-writers-button');

    // declare wrapper hooks
    const actorsWrapper = document.querySelector('#actors-wrapper');
    const directorsWrapper = document.querySelector('#director-wrapper');
    const writersWrapper = document.querySelector('#writers-wrapper');

    actorsButton.addEventListener('click', () => {
      if (actorsButton.classList.contains('movie-people-button--active')) {
        return;
      } else {
        actorsButton.className = 'movie-people-button--active';
        directorsButton.className = 'movie-people-button';
        writersButton.className = 'movie-people-button';

        this.renderDomElement(actorsWrapper, true);
        this.renderDomElement(directorsWrapper, false);
        this.renderDomElement(writersWrapper, false);
      }
    });
    directorsButton.addEventListener('click', () => {
      if (directorsButton.classList.contains('movie-people-button--active')) {
        return;
      } else {
        directorsButton.className = 'movie-people-button--active';
        actorsButton.className = 'movie-people-button';
        writersButton.className = 'movie-people-button';

        this.renderDomElement(actorsWrapper, false);
        this.renderDomElement(directorsWrapper, true);
        this.renderDomElement(writersWrapper, false);
      }
    });
    writersButton.addEventListener('click', () => {
      if (writersButton.classList.contains('movie-people-button--active')) {
        return;
      } else {
        writersButton.className = 'movie-people-button--active';
        directorsButton.className = 'movie-people-button';
        actorsButton.className = 'movie-people-button';

        this.renderDomElement(actorsWrapper, false);
        this.renderDomElement(directorsWrapper, false);
        this.renderDomElement(writersWrapper, true);
      }
    });
  }

  renderDomElement(domElement, render) {
    if (render) {
      domElement.style.display = 'flex';
    } else {
      domElement.style.display = 'none';
    }
  }

  clear() {
    document.getElementById('movie-details').remove();
    this.render();
  }
}
