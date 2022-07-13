import CrudService from "../services/crud-service.js";

/**
 * @description Page for empty state search
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class SearchEmptyStatePage
 */
export default class SearchEmptyStatePage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="search-empty-state" class="page">
      <article class="feed-empty-state">
        <h2>Oh snap! We can’t find it.</h2>
        <picture>
          <source type="image/svg+xml" srcset="./src/img/search-empty-state/search-empty-state.svg" />
          <img src="./src/img/search-empty-state/search-empty-state.png" alt="Girl with magnifying glass looking confused" />
        </picture>
        <p>
          We have searched far and wide and couldn’t find any results matching
          your search.
        </p>
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
