import CrudService from "../services/crud-service.js";

/**
 * @description Get started page which introduces PeepFeed to new users
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class GetStarted1Page
 */
export default class GetStarted1Page {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
      <section id="get-started-1" class="page">
        <article class="get-started">

          <div class="get-started-headline">
            <div></div>
            <h2>Get Started</h2>
            <a href="#/home" class="get-started-skip nav-link">Skip</a>
          </div>

          <picture>
            <source type="image/svg+xml" srcset="./src/img/get-started/get-started-1.svg">
            <img src="./src/img/get-started/get-started-1@2x.png" alt="Man looking at phone">
          </picture>

          <div class="slider">
            <picture>
              <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-white.svg">
              <img src="./src/img/get-started/ellipse-white@2x.png" alt="Active slider icon">
            </picture>

            <a href="#/get-started-2" class="nav-link">
              <picture>
                <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-grey.svg">
                <img src="./src/img/get-started/ellipse-grey@2x.png" alt="Inactive slider icon">
              </picture>
            </a>

            <a href="#/get-started-3" class="nav-link">
              <picture>
                <source type="image/svg+xml" srcset="./src/img/get-started/ellipse-grey.svg">
                <img src="./src/img/get-started/ellipse-grey@2x.png" alt="Inactive slider icon">
              </picture>
            </a>
          </div>

          <h3>
            Keep tabs on movies through <br/>
            people-based discovery
          </h3>

          <p>
            When you add an actor, director or writer, personalized movie feeds
            will be made available to you in <span class="keyword">Home.</span>
          </p>

          <a href="#/get-started-2" class="get-started-button nav-link">
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
