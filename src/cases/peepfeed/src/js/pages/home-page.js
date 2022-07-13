import CrudService from '../services/crud-service.js';
import ViewService from '../services/view-service.js';

/**
 * @description Page for home which contains automated, person-based movie feeds
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class HomePage
 */
export default class HomePage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
      <section id="home" class="page">
      <div id="feed-empty-state-wrapper">
        <article class="feed-empty-state">
        <h2>No feeds yet</h2>
        <picture>
          <source type="image/svg+xml" srcset="./src/img/home/feed-empty-state.svg">
          <img src="./src/img/home/feed-empty-state.svg" alt="girl standing next to empty boxes">
        </picture>
        <p>
          You haven’t added any people yet. Try the
          <span class="keyword">search bar</span> to find people to add.
        </p>
        </article>
      </div>
      <article class="feed-with-content">
              <h3>Your feed</h3>

              <section id="upcoming-section">
                <h5>Upcoming</h5>
                <p class="feed-text">The latest new movies coming soon to theaters</p>
                <div class="horizontal-scrolling-wrapper upcoming"></div>
              </section>

              <section id="new-section">
                <h5>New</h5>
                <p class="feed-text">In-theater movies and new releases</p>
                <div class="horizontal-scrolling-wrapper new"></div>
              </section>

              <section id="trending-section">
                <h5>Trending</h5>
                <p class="feed-text">The most popular movies right now</p>
                <div class="horizontal-scrolling-wrapper trending"></div>
              </section>

              <section id="peep-count-section">
                <h5>Peep Count</h5>
                <p class="feed-text">Movies starring multiple of your favorite People</p>
                <div class="horizontal-scrolling-wrapper peep-factor"></div>
              </section>

              <section id="critically-acclaimed-section">
                <h5>Critically Acclaimed</h5>
                <p class="feed-text">The very best according to the critics</p>
                <div class="horizontal-scrolling-wrapper critically-acclaimed"></div>
              </section>

              <section id="under-the-radar-section">
                <h5>Under The Radar</h5>
                <p class="feed-text">Great independent movies you may have missed</p>
                <div class="horizontal-scrolling-wrapper under-the-radar"></div>
              </section>
      </article>
    </section>
    `;
  }
  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }

  renderCard(domElement, movieId, primaryText, secondaryText, posterPath) {
    domElement.insertAdjacentHTML(
      'afterbegin',
      `
    <div class="feed-poster-card-container" data-movie-id="${movieId}">
      <div class="feed-poster-card" style='background-image: url(&quot;${posterPath}&quot;'>
        <div class="feeder-poster-shadow-top"></div>
        <div class="feeder-poster-shadow-bottom"></div>
        <a class="remove-from-feed-button" data-movie-id="${movieId}">
          <i class="bx bxs-x-circle"></i>
        </a>
        <div class="feed-poster-card-info">
            <p class="feed-poster-title">${primaryText}</p>
            <p class="feed-poster-people">${secondaryText}</p>
        </div>
      </div>
    </div>`
    );
    let userFeed = CrudService.viewService.currentUser.feed;

    // attack on click eventlistener for card
    const feedPosterCardContainer = document.querySelector(
      `.feed-poster-card-container[data-movie-id="${movieId}"]`
    );

    feedPosterCardContainer.addEventListener('click', () => {
      CrudService.createMovieDetails(movieId);
    });

    // attach on click eventlistener to remove button
    const removeFromFeedButton = document.querySelector(
      `.remove-from-feed-button[data-movie-id="${movieId}"]`
    );
    removeFromFeedButton.addEventListener('click', (event) => {
      // find neighboring card container element and remove from dom
      removeFromFeedButton.closest('.feed-poster-card-container').remove();
      let movie = CrudService.movies.find(element => element.id === movieId);
      userFeed.removeMovie(movie);
      this.renderFeedCategories(userFeed);
      // prevents movie details event 
      event.stopPropagation();
    });

    this.renderFeedCategories(userFeed);
  }

  renderFeedCategories(userFeed) {
    const upcomingSection = document.getElementById('upcoming-section');
    const newSection = document.getElementById('new-section');
    const trendingSection = document.getElementById('trending-section');
    const peepCountSection = document.getElementById('peep-count-section');
    const criticallyAcclaimedSection = document.getElementById('critically-acclaimed-section');
    const underTheRadarSection = document.getElementById('under-the-radar-section');

    let emptyState = true;

    // upcoming section
    if (userFeed.upcoming.length > 0) {
      emptyState = false;
      this.renderDomElement(upcomingSection, true);
    } else {
      this.renderDomElement(upcomingSection, false);
    }
    // new section
    if (userFeed.new.length > 0) {
      emptyState = false;
      this.renderDomElement(newSection, true);
    } else {
      this.renderDomElement(newSection, false);
    }

    // trending section
    if (userFeed.trending.length > 0) {
      emptyState = false;
      this.renderDomElement(trendingSection, true);
    } else {
      this.renderDomElement(trendingSection, false);
    }

    // peep count section
    if (userFeed.peepCount.length > 0) {
      emptyState = false;
      this.renderDomElement(peepCountSection, true);
    } else {
      this.renderDomElement(peepCountSection, false);
    }

    // critically acclaimed section
    if (userFeed.criticallyAcclaimed.length > 0) {
      emptyState = false;
      this.renderDomElement(criticallyAcclaimedSection, true);
    } else {
      this.renderDomElement(criticallyAcclaimedSection, false);
    }

    // under the radar section
    if (userFeed.underTheRadar.length > 0) {
      emptyState = false;
      this.renderDomElement(underTheRadarSection, true);
    } else {
      this.renderDomElement(underTheRadarSection, false);
    }

    // empty state / feed with content
    const feedEmptyState = document.querySelector('#home .feed-empty-state');
    const feedWithContent = document.querySelector('#home .feed-with-content');
    if (emptyState) {
      this.renderDomElement(feedEmptyState, true);
      this.renderDomElement(feedWithContent, false);
    } else {
      this.renderDomElement(feedEmptyState, false);
      this.renderDomElement(feedWithContent, true);
    }
  }

  renderDomElement(domElement, render) {
    if (render) {
      domElement.style.display = 'unset';
    } else {
      domElement.style.display = 'none';
    }
  }

  clearCards(domElement) {
    domElement.innerHTML = '';
  }

  // attachEvenlisteners() {

  // }
}
