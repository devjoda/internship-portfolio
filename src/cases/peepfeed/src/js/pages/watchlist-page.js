import CrudService from '../services/crud-service.js';

/**
 * @description Page for watchlist which contains movies the user has bookmarked
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class WatchlistPage
 */
export default class WatchlistPage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="watchlist" class="page">
        <div id="watchlist-wrapper"></div>
    </section>
    `;
  }

  renderCards() {
    this.clear();
    const watchlistWrapper = document.getElementById('watchlist-wrapper');
    let currentUser = CrudService.viewService.currentUser;
    if (currentUser.watchlist.length > 0) {
      for (const movie of currentUser.watchlist) {
        let fullImagePath;
        const backdropPath = movie.backdropPath;
        if (backdropPath) {
          fullImagePath = FetchService.getFullImageUrl('original', backdropPath);
        } else {
          fullImagePath = FetchService.getFullImageUrl('w500', movie.posterPath);
        }
        watchlistWrapper.insertAdjacentHTML(
          'afterbegin',
          `
              <div class="wide-poster-card-container" data-bookmarked-movie-id="${movie.id}">
                <div class="wide-poster-card" style='background-image: url(&quot;${fullImagePath}&quot;'>
                  <div class="wide-poster-shadow-top"></div>
                  <div class="wide-poster-shadow-bottom"></div>
                  <a class="remove-from-feed-button" data-bookmarked-movie-id="${movie.id}">
                    <i class="bx bxs-x-circle"></i>
                  </a>
                  <div class="wide-poster-card-info">
                      <p class="wide-poster-title">${movie.title}</p>
                      <p class="wide-poster-people">${movie.releaseDate.substring(0, 4)}</p>
                  </div>
                </div>
              </div>`
        );
        // attach on click eventlistener for card
        const widePosterCardContainer = document.querySelector(
          `.wide-poster-card-container[data-bookmarked-movie-id="${movie.id}"]`
        );

        widePosterCardContainer.addEventListener('click', () => {
          CrudService.createMovieDetails(movie.id);
        });

        // attach on click eventlistener to remove button
        const removeFromFeedButton = document.querySelector(
          `.remove-from-feed-button[data-bookmarked-movie-id="${movie.id}"]`
        );
        removeFromFeedButton.addEventListener('click', (event) => {
          CrudService.removeElementFromArray(movie, CrudService.viewService.currentUser.watchlist);
          this.clear();
          this.renderCards();
          event.stopPropagation();
        });
      }
    }
  }

  /**
   * @description quickly render card, without waiting for movie crud operations
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof WatchlistPage
   */
  quickRenderCard(movieId, title, releaseYear, fullImageUrl) {
    const watchlistWrapper = document.getElementById('watchlist-wrapper');
    watchlistWrapper.insertAdjacentHTML(
      'afterbegin',
      `
          <div class="wide-poster-card-container" data-bookmarked-movie-id="${movieId}">
            <div class="wide-poster-card" style='background-image: url(&quot;${fullImageUrl}&quot;'>
              <div class="wide-poster-shadow-top"></div>
              <div class="wide-poster-shadow-bottom"></div>
              <a class="remove-from-feed-button" data-bookmarked-movie-id="${movieId}">
                    <i class="bx bxs-x-circle"></i>
                  </a>
              <div class="wide-poster-card-info">
                  <p class="wide-poster-title">${title}</p>
                  <p class="wide-poster-people">${releaseYear.substring(0, 4)}</p>
              </div>
            </div>
          </div>`
    );
    // attach on click eventlistener for card
    const widePosterCardContainer = document.querySelector(
      `.wide-poster-card-container[data-bookmarked-movie-id="${movieId}"]`
    );

    widePosterCardContainer.addEventListener('click', () => {
      CrudService.createMovieDetails(movieId);
    });
    // hide removeButton
    const removeFromFeedButton = document.querySelector(
      `.remove-from-feed-button[data-bookmarked-movie-id="${movieId}"]`
    );
    // TODO: Add functionality for quickRemove instead of display: none
    removeFromFeedButton.style.display = 'none';
  }

  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }

  clear() {
    document.getElementById('watchlist-wrapper').innerHTML = '';
  }
}
