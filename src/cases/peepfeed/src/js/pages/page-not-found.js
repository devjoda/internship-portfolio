import CrudService from "../services/crud-service.js";

/**
 * @description Page not found-page which displays 404 error
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class PageNotFoundPage
 */
export default class PageNotFoundPage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="page-not-found" class="page">
      <article class="page-not-found">

          <h2>404</h2>

          <picture>
              <source type="image/svg+xml" srcset="./src/img/page-not-found/page-not-found.svg">
              <img src="./src/img/page-not-found/page-not-found@2x.png" alt="Rocket crashing">
          </picture>

          <h3>
              "Houston,<br>
              we have a problem!"
          </h3>

          <p>
              Sorry, astronaut... But it looks like your are heading to the wrong
              planet!
          </p>

          <a href="#/home" class="get-started-button nav-link">
              Take me back
          </a>
          
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
