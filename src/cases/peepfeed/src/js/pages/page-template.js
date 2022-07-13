import CrudService from "../services/crud-service.js";

/**
 * @description Page
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class Page
 */
export default class Page {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
    // this.attachEventListeners();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    
    `;
  }
  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }
  // attachEvenlisteners() {

  // }
}
