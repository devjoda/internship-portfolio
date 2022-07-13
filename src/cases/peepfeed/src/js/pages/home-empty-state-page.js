import CrudService from "../services/crud-service.js";

/**
 * @description Page for home when feed is empty 
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class HomeEmptyStatePage
 */
export default class HomeEmptyStatePage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="home-empty-state" class="page">
      <article class="feed-empty-state">
          <h2>No feeds yet</h2>
          <picture>
              <source type="image/svg+xml" srcset="./src/img/home/feed-empty-state.svg">
              <img src="./src/img/home/feed-empty-state.svg" alt="girl standing next to empty boxes">
          </picture>
          <p>
              You haven’t added any people yet. Try the
              <span class="keyword">search bar</span> to find people to add.
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
