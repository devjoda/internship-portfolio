import Loader from '../components/loader-component.js';
import CrudService from './crud-service.js';

export default class ViewService {
  constructor(currentUser) {
    this._currentUser = currentUser;
    this._loader;
    this.init();
  }

  // currentUser
  get currentUser() {
    return this._currentUser;
  }
  set currentUser(value) {
    this._currentUser = value;
  }

  // loader
  get loader() {
    return this._loader;
  }
  set loader(value) {
    this._loader = value;
  }

  init() {
    this._loader = new Loader();
    this.attachEventListeners();
    this.overrideCSSNavigation();
    this.renderHomePageFeedCategories();
  }

  async attachEventListeners() {
    let pages = CrudService.pages;

    if (!this._currentUser) {
      // TODO: Handle navigateTo login/signup
      return;
    }

    // declare search-related dom hooks
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');

    // global
    window.addEventListener('scroll', () => {
      let locationHash = window.location.hash;
      const searchValue = searchInput.value;
      const searchValueLength = searchValue.length;
      switch (locationHash) {
        case '#/search-people':
          let searchPage = pages.find((element) => element.constructor.name === 'SearchPeoplePage');
          // if method is already calling, timeout for 200 ms and return
          if (searchPage.isScrolling) {
            (async () => {
              new Promise((r) => setTimeout(r, 200));
            })();
            return;
          }
          let searchSection = document.querySelector('#search-people');
          // check if scroll is near bottom of search container
          if (window.innerHeight + window.pageYOffset >= searchSection.offsetHeight) {
            searchPage.isScrolling = 1;
            searchPage.incrementPageNumber();
            if (searchValueLength === 0) {
              CrudService.createPopularPeopleSearchResults();
            } else {
              CrudService.createQueryPeopleSearchResults(searchValue);
            }
          }
          break;
      }
    });

    // attach page-specific eventlisteners
    for (const page of pages) {
      // if page method 'attachEventListeners' exists
      if (typeof page['attachEventListeners'] === 'function') {
        // attachEventListener
        page.attachEventListeners();
      }
    }

    // go-back-button
    const goBackButton = document.getElementById('go-back-button');
    goBackButton.addEventListener('click', () => {
      window.history.go(-1);
    });

    // const filter
    const filterToggleCollapsed = document.querySelector('.filter-toggle.collapsed');
    const filterToggleExpanded = document.querySelector('.filter-toggle.expanded');
    const filter = document.getElementById('filter');

    filterToggleCollapsed.addEventListener('click', () => {
      filterToggleCollapsed.style = 'display: none';
      filterToggleExpanded.style = 'display: flex';
      filter.style = 'display: flex';

      // TODO: Add functionality to buttons
    });

    filterToggleExpanded.addEventListener('click', () => {
      filterToggleCollapsed.style = 'display: flex';
      filterToggleExpanded.style = 'display: none';
      filter.style = 'display: none';
    });

    // searchInput
    // binds multiple listers to a single eventhandler
    ['click', 'focus'].forEach((evt) =>
      searchInput.addEventListener(evt, this.handleOnClickOrFocusSearchInput, false)
    );

    // searchForm
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    // handle search key input
    searchForm.addEventListener('keyup', async () => {
      const searchValue = searchInput.value;
      const searchValueLength = searchValue.length;
      // check searchInput is not empty
      let searchPeoplePage = pages.find((element) => element.constructor.name === 'SearchPeoplePage');
      if (searchValueLength > 0) {
        if (searchPeoplePage.isCalling) {
          return;
        }
        searchPeoplePage.clear();
        CrudService.createQueryPeopleSearchResults(searchValue);
        // set calling, timeout for 500 ms and clear calling to avoid hammering api
        (async () => {
          searchPeoplePage.isCalling = 1;
          await new Promise((r) => setTimeout(r, 250));
          searchPeoplePage.isCalling = 0;
        })();
      } else {
        searchPeoplePage.pageNumber = 1;
        searchPeoplePage.clear();
      }
    });
  }

  handleOnClickOrFocusSearchInput() {
    let locationHash = window.location.hash;
    // check current page isn't already on search pages
    if (locationHash.substring(2, 8) !== 'search') {
      // navigate to search default state page
      CrudService.routerService.navigateTo('#/search-people');
    } 
  }

  /**
   * @description overrides the pure css functionality of the secondary navigation (burger menu).
   * The css functionality allows for toggling of the drop-down menu, and relies
   * on url fragments and the pseudo selector :target, which conflicts with the
   * core strategy of the spa functionality, since it also relies on url fragments
   * by listening on window hash change events.The purpose of a pure css implementation
   * is to ensure critical navigational fallback functionality, in case javascript is
   * disabled.
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   */
  overrideCSSNavigation() {
    // declare hooks for nav elements
    const toggleCollapsed = document.querySelector('.nav-toggle.collapsed');
    const toggleExpanded = document.querySelector('.nav-toggle.expanded');
    const dropdownNavigation = document.getElementById('nav-secondary');
    const secondaryNavAnchors = document.querySelectorAll('.nav-secondary-list li a');

    // remove href attributes which links to url fragments
    toggleCollapsed.removeAttribute('href');
    toggleExpanded.removeAttribute('href');

    // handle on click toggleCollapsed
    toggleCollapsed.addEventListener('click', () => {
      // toggle rendering
      toggleExpanded.style.display = 'flex';
      toggleCollapsed.style.display = 'none';
      dropdownNavigation.style.display = 'flex';
    });

    // handle on click toggleExpanded
    toggleExpanded.addEventListener('click', () => {
      // toggle rendering
      toggleCollapsed.style.display = 'flex';
      toggleExpanded.style.display = 'none';
      dropdownNavigation.style.display = 'none';
    });

    // collapse navigation after anchor click
    for (const anchor of secondaryNavAnchors) {
      anchor.addEventListener('click', () => {
        toggleCollapsed.style.display = 'flex';
        toggleExpanded.style.display = 'none';
        dropdownNavigation.style.display = 'none';
      });
    }
  }

  /**
   * @description calls the renderFeedCategories on HomePage, to control whether empty state should be displayed or not
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof ViewService
   */
  renderHomePageFeedCategories() {
    let foundPage = CrudService.pages.find((element) => element.constructor.name === 'HomePage');
    if (foundPage) {
      foundPage.renderFeedCategories(this.currentUser.feed);
    }
  }
}
