import CrudService from "../services/crud-service.js";

/**
 * @description Search page for movie search
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class SearchMoviePage
 */
export default class SearchMoviePage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="search-movie" class="page">
        <article class="search">

            <div class="search-sort">
                <div class="search-button-container">
                    <div class="search-default-button nav-link">People</div>
                    <div class="search-default-button nav-link">Movies</div>
                </div>
                <select id="search-order-by" onchange="">
                    <option value="">
                        Order by <i class="bx bx-chevron-down"></i>
                    </option>
                </select>
            </div>

            <div id="search-movie-details-container">
                <div class="search-poster-img"></div>
                <div class="name-known-for-column">
                    <div class="movie-title">Jaws</div>
                    <div class="movie-year-of-release">1975</div>
                    <div class="movie-rating">
                        <picture>
                            <source type="image/svg+xml" srcset="./src/img/branding/tmdb/tmdb-small 1.svg">
                            <img src="./src/img/branding/tmdb/tmdb-small 1@2x.png" alt="Small TMDB Logo">
                        </picture>89%
                    </div>
                    <div class="movie-genre">Adventures, mystery, thriller</div>
                </div>
                <div class="star-search"><i class='bx bx-bookmark'></i></i></div>
            </div>

        </article>
    </section>
    `;
  }
  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }

  // attachEvenlisteners() {

  // }
}
