import CrudService from '../services/crud-service.js';

/**
 * @description Get started page which introduces PeepFeed to new users
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class GetStarted1Page
 */
export default class GetStarted2Page {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="get-started-2" class="page">
      <article class="get-started">

        <div class="get-started-headline">
            <div></div>
            <h2>Get Started</h2>
            <a href="#/home" class="get-started-skip nav-link">Skip</a>
          </div>

        <picture>
          <source type="image/svg+xml" srcset="./src/img/get-started/get-started2.svg">
          <img src="./src/img/get-started/get-started2@2x.png" alt="man looking at phone">
        </picture>

        <div class="slider">
          <a href="#/get-started-1" class="nav-link">
            <picture>
              <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-grey.svg">
              <img src="./src/img/get-started/ellipse-grey@2x.png" alt="Inactive slider icon">
            </picture>
          </a>

          <picture>
            <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-white.svg">
            <img src="./src/img/get-started/ellipse-white@2x.png" alt="Active slider icon">
          </picture>

          <a href="#/get-started-3" class="nav-link">
            <picture>
              <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-grey.svg">
              <img src="./src/img/get-started/ellipse-grey@2x.png" alt="Inactive slider icon">
            </picture>
          </a>
        </div>

        <h3>
          Browse and manage <br>
          your favorite movie people
        </h3>

        <p>
          Go to <span class="keyword">People</span> for easy management of
          your favorites. Changes influence all current and future feeds.
        </p>

        <a href="#/get-started-3" class="get-started-button nav-link">
          Continue
        </a>

      </article>
    </section>
    `;
  }

  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }
}
