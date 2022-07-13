import CrudService from "../services/crud-service.js";

/**
 * @description Default search page for movie search 
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class SearchMovieDefaultStatePage
 */
export default class SearchMovieDefaultStatePage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="search-movie-default-state" class="page">
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

            <h3>Browse by</h3>

            <div id="browse-by-options">
                <div id="browse-by-most-popular" class="browse-border">
                    <p>
                        Most popular <i class="bx bx-chevron-right right-arrow"></i>
                    </p>
                </div>
                <div id="browse-by-upcoming" class="browse-border">
                    <p>Upcoming <i class="bx bx-chevron-right right-arrow"></i></p>
                </div>
                <div id="browse-by-rating" class="browse-border">
                    <p>
                        Highest rating <i class="bx bx-chevron-right right-arrow"></i>
                    </p>
                </div>
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
