import CrudService from './crud-service.js';

/**
 * @description service methods to switch between views
 * @author Rasmus Cederdorff
 * @author Joachim Danielsen
 * @export
 * @class Router
 */
export default class Router {
  constructor(app, defaultPage) {
    this.defaultPage = defaultPage;
    this.basePath = location.pathname.replace('index.html', ''); // remove index.html from path
    this.pages = app.querySelectorAll('.page');
    this.navItems = app.querySelectorAll('.nav-link');
    this.routes = {
      '#/home': 'home',
      '#/home-empty-state': 'home-empty-state',
      '#/people': 'people',
      '#/watchlist': 'watchlist',
      '#/attribution': 'attribution',
      '#/get-started-1': 'get-started-1',
      '#/get-started-2': 'get-started-2',
      '#/get-started-3': 'get-started-3',
      '#/page-not-found': 'page-not-found',
      '#/search-people': 'search-people',
      '#/search-movie': 'search-movie',
      '#/search-empty-state': 'search-empty-state',
      '#/movie-details': 'movie-details',
      '#/search-empty-state': 'search-empty-state',
      '#/people-page': 'people-page',
    };
    this.flexRoutes = ['#/get-started-1', '#/get-started-2', '#/get-started-3'];
    this.initRouter();
  }

  initRouter() {
    this.attachNavLinkEvents();
    window.addEventListener('popstate', () => this.showPage(location.hash));

    if (this.routes[location.hash]) {
      this.defaultPage = location.hash;
    }
    this.navigateTo(this.defaultPage);
  }

  attachNavLinkEvents() {
    for (const link of this.navItems) {
      link.addEventListener('click', (event) => {
        const path = link.getAttribute('href');
        this.navigateTo(path);
        event.preventDefault();
      });
    }
  }

  // navigate to a new view/page by changing href
  navigateTo(path) {
    window.history.pushState({}, path, this.basePath + path);
    this.showPage(path);
  }

  showPage(path) {
    this.hideAllPages(); // hide all pages
    if (this.flexRoutes.includes(path)) {
      document.querySelector(`#${this.routes[path]}`).style.display = 'flex';
    } else {
      document.querySelector(`#${this.routes[path]}`).style.display = 'block'; // show page by given path
    }
    if (path === '#/movie-details') {
      this.resetMovieDetailsPeopleSlider();
    }
    this.setActiveTab(path);
    this.checkLoaderHashes();
  }

  // hide all pages
  hideAllPages() {
    for (const page of this.pages) {
      page.style.display = 'none';
    }
  }

  // sets active tabbar/ menu item
  setActiveTab(pathname) {
    for (const link of this.navItems) {
      if (pathname === link.getAttribute('href')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  }

  /**
   * @description Checks whether or not loader animations should run. See loader-component.js for more info.
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof Router
   */
  checkLoaderHashes() {
    let viewService = CrudService.viewService;
    if (viewService) {
      if (viewService.loader) {
        viewService.loader.check();
      }
    }
  }

  /**
   * @description resets people slider on movie details to default settings
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof Router
   */
  resetMovieDetailsPeopleSlider() {
    let moviePeopleContainer = document.querySelector('#movie-details .movie-people-container');
    let buttons = moviePeopleContainer.children;
    if (buttons) {
      buttons[0].className = 'movie-people-button--active';
      for (let i = 1; i < buttons.length; i++) {
        buttons[i].className = 'movie-people-button';
      }  
    }
  }
}
