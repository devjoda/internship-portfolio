import CrudService from '../services/crud-service.js';
import ViewService from '../services/view-service.js';

/**
 * @description Default search page for most popular people
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class SearchPeoplePage
 */
export default class SearchPeoplePage {
  constructor(domElement) {
    this.domElement = domElement;
    this.pageNumber = 0;
    this.isCalling = 0;
    this.isScrolling = 0;
    this.render();
    this.init();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="search-people" class="page">
        <article class="search">

            <div class="search-sort">
                <div class="search-button-container">
                    <div class="button--active unselectable">People</div>
                    <a class="button nav-link" href="#/page-not-found">Movies</a>
                </div>
            </div>
            <h3>Browse by</h3>
            <div id="browse-by-options">
                
            </div>

            <div id="people-search-results-wrapper"></div>
        </article>
    </section>
    `;
    // create html components
    let div = document.createElement('div');
    div.id = 'people-search-results-wrapper';

    let div2 = document.createElement('div');
    div2.id = 'search-people-most-popular-option';

    let p = document.createElement('p');
    let pText = document.createTextNode('Most popular');

    let i = document.createElement('i');
    i.classList.add('bx', 'bx-chevron-right', 'right-arrow');

    // append child elements
    document.getElementById('search-people').appendChild(div);

    document.getElementById('browse-by-options').appendChild(div2);
    div2.appendChild(p);
    p.appendChild(pText);
    p.appendChild(i);

    // set default mode to fill search results with popular people
    if (this.pageNumber === 1 && document.getElementById('search-input').value.length === 0) {
      CrudService.createPopularPeopleSearchResults();
    }
  }

  attachEventListeners() {
    let div = document.getElementById('search-people-most-popular-option');
    // attach eventlistener
    div.addEventListener('click', () => {
      this.clear();
      this.pageNumber = 1;
      window.scrollTo(0, 0);
      CrudService.createPopularPeopleSearchResults();
    });
  }

  renderMostPopularSearchResults(personId, personName, knownForDepartment, profilePath) {
    let searchInput = document.querySelector('#search-input');
    if (searchInput.value.length > 0) {
      searchInput.value = '';
    }

    let peopleSearchResultsWrapper = document.querySelector('#people-search-results-wrapper');
    peopleSearchResultsWrapper.insertAdjacentHTML(
      'beforeend',
      `
    <div class="person-search">
      <div class="search-person-img" style='background-image: url(&quot;${profilePath}&quot;'></div>
      <div class="name-known-for-column">
          <div class="person-name">${personName}</div>
          <div class="person-known-for">${knownForDepartment}</div>
      </div>
    </div>
    `
    );
    // create favorite container and children
    let lastSearchResult = document.querySelector(
      '#people-search-results-wrapper .person-search:last-of-type'
    );
    let div = document.createElement('div');
    div.classList.add('star-search');
    let favoriteIcon = this.createFavoriteIcon(personId);

    // apend favorite container and children
    lastSearchResult.appendChild(div);
    div.appendChild(favoriteIcon);

    // attach eventlistener
    this.handleOnClickFavoriteIcon(favoriteIcon, personId);
  }

  renderQuerySearchResults(personId, personName, knownForDepartment, profilePath) {
    let peopleSearchResultsWrapper = document.querySelector('#people-search-results-wrapper');
    peopleSearchResultsWrapper.insertAdjacentHTML(
      'beforeend',
      `
    <div class="person-search">
      <div class="search-person-img" style='background-image: url(&quot;${profilePath}&quot;'></div>
      <div class="name-known-for-column">
          <div class="person-name">${personName}</div>
          <div class="person-known-for">${knownForDepartment}</div>
      </div>
    </div>
    `
    );
    // create favorite container and children
    let lastSearchResult = document.querySelector(
      '#people-search-results-wrapper .person-search:last-of-type'
    );
    let div = document.createElement('div');
    div.classList.add('star-search');
    let favoriteIcon = this.createFavoriteIcon(personId);

    // apend favorite container and children
    lastSearchResult.appendChild(div);
    div.appendChild(favoriteIcon);

    // attach eventlistener
    this.handleOnClickFavoriteIcon(favoriteIcon, personId);
  }

  createFavoriteIcon(personId) {
    let favoriteIcon = document.createElement('i');
    let currentUser = CrudService.viewService.currentUser;
    favoriteIcon.setAttribute('data-person-search-result-id', personId);
    if (currentUser) {
      if (currentUser.people.find((person) => person.id === personId)) {
        // if person is favorited
        favoriteIcon.classList.add('bx', 'bxs-star');
      } else {
        // if person is unfavorited
        favoriteIcon.classList.add('bx', 'bx-star');
      }
    } else {
      favoriteIcon.classList.add('bx', 'bx-star');
    }
    return favoriteIcon;
  }

  updateFavoriteIcon(personId) {
    let foundFavoriteIcon = document.querySelector(`i[data-person-search-result-id="${personId}"]`);
    if (foundFavoriteIcon) {
      if (foundFavoriteIcon.classList.contains('bx-star')) {
        // if person is unfavorited
        foundFavoriteIcon.classList.replace('bx-star', 'bxs-star');
      } else {
        // if person is favorited
        foundFavoriteIcon.classList.replace('bxs-star', 'bx-star');
      }
    }
  }

  handleOnClickFavoriteIcon(favoriteIcon, personId) {
    favoriteIcon.addEventListener('click', () => {
      if (favoriteIcon.classList.contains('bx-star')) {
        // if person is unfavorited
        favoriteIcon.classList.replace('bx-star', 'bxs-star');
        CrudService.favoritePerson(personId, false);
      } else {
        // if person is favorited
        favoriteIcon.classList.replace('bxs-star', 'bx-star');
        CrudService.unfavoritePerson(personId);
      }
    });
  }

  incrementPageNumber() {
    this.pageNumber += 1;
  }

  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }

  clear() {
    this.pageNumber = 1;
    document.getElementById('people-search-results-wrapper').innerHTML = '';
  }
}
