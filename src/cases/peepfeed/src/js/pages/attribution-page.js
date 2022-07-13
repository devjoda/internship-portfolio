import CrudService from '../services/crud-service.js';

/**
 * @description Attribution page
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class AttributionPage
 */
export default class AttributionPage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="attribution" class="page">
      <article>
          <h2>Special thanks to</h2>
          <ul>
            <li>
              <a href="https://animista.net">
                <p>Animista</p>
                <p>CSS animations</p>
              </a>
            </li>
            <li>
              <a href="https://boxicons.com/">
                <p>Boxicons</p>
                <p>Webfont icons</p>
              </a>
            </li>
            <li>
              <p>Martin A. Nøhr</p>
              <p>UX/UI guidance</p>
          </li>
            <li>
              <a href="https://www.themoviedb.org/">
                <p>The Movie Database</p>
                <p>API Data</p>
              </a>
            </li>
            <li>
              <a href="https://cederdorff.com/">
                <p>Rasmus Cederdorff</p>
                <p>JavaScript snippets</p>
              </a>
            </li>
            <li>
              <a href="https://storyset.com">
                <p>Storyset</p>
                <p>Illustrations</p>
              </a>
            </li>
        </ul>
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
