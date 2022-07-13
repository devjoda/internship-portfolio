import CrudService from "../services/crud-service.js";

/**
 * @description Get started page which introduces PeepFeed to new users
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class GetStarted3Page
 */
export default class GetStarted3Page {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
      <section id="get-started-3" class="page">
        <article class="get-started">

          <div class="get-started-headline">
            <div></div>
            <h2>Get Started</h2>
            <a href="#/home" class="get-started-skip nav-link">Skip</a>
          </div>

          <picture>
            <source type="image/svg+xml" srcset="./src/img/get-started/get-started3.svg">
            <img src="./src/img/get-started/get-started3@2x.png" alt="man looking at phone">
          </picture>
  
          <div class="slider">
            <a href="#/get-started-1" class="nav-link">
              <picture>
                <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-grey.svg">
                <img src="./src/img/get-started/ellipse-grey@2x.png" alt="Inactive slider icon">
              </picture>
            </a>
  
            <a href="#/get-started-2" class="nav-link">
              <picture>
                <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-grey.svg">
                <img src="./src/img/get-started/ellipse-grey@2x.png" alt="Inactive slider icon">
              </picture>
            </a>
  
            <picture>
              <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-white.svg">
              <img src="./src/img/get-started/ellipse-white@2x.png" alt="Active slider icon">
            </picture>
          </div>
  
          <h3>
            Build and maintain an <br>
            awesome watchlist
          </h3>

          <p>
            All bookmarked movies are saved to <br>
            your <span class="keyword">Watchlist</span>.
          </p>

          <a href="#/home" class="get-started-button nav-link">
            Lets get started!
          </a>

        </article>
      </section>
      `;
  }
  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }
}
