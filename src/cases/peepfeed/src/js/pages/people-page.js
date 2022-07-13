import CrudService from '../services/crud-service.js';
import FetchService from '../services/fetch-service.js';

/**
 * @description Page for people which contains the user's favorite actors, directors and writers
 * @author Jakob Valentin
 * @author Joachim Danielsen <joachim.danielsen@outlook.com>
 * @export
 * @class PeoplePage
 */
export default class PeoplePage {
  constructor(domElement) {
    this.domElement = domElement;
    this.render();
    this.init();
  }

  render() {
    this.domElement.innerHTML += /*html*/ `
    <section id="people" class="page">
      <div id="people-list-wrapper"></div>
    </section>
    `;
  }

  renderCards() {
    this.clear();
    const peopleListWrapper = document.getElementById('people-list-wrapper');
    let currentUser = CrudService.viewService.currentUser;
    if (currentUser.people.length > 0) {
      for (const person of currentUser.people) {
        const fullProfilePath = FetchService.getFullImageUrl('w500', person.profilePath);
        peopleListWrapper.insertAdjacentHTML(
          'afterbegin',
          `
              <div class="wide-poster-card-container" data-favorite-person-id="${person.id}">
                <div class="wide-poster-card" style='background-image: url(&quot;${fullProfilePath}&quot;'>
                  <div class="wide-poster-shadow-top"></div>
                  <div class="wide-poster-shadow-bottom"></div>
                  <a class="remove-from-feed-button" data-favorite-person-id="${person.id}">
                    <i class="bx bxs-x-circle"></i>
                  </a>
                  <div class="wide-poster-card-info">
                      <p class="wide-poster-title">${person.name}</p>
                      <p class="wide-poster-people">${CrudService.getFormattedKnownForDepartment(
                        person.knownForDepartment
                      )}</p>
                  </div>
                </div>
              </div>`
        );
        // attach on click eventlistener to remove button
        const removeFromFeedButton = document.querySelector(
          `.remove-from-feed-button[data-favorite-person-id="${person.id}"]`
        );
        removeFromFeedButton.addEventListener('click', () => {
          CrudService.unfavoritePerson(person.id);
        });
      }
    }
  }

  /**
   * @description quickly render card, without waiting for person crud operations
   * @author Joachim Danielsen <joachim.danielsen@outlook.com>
   * @memberof PeoplePage
   */
  quickRenderCard(personId, name, knownForDepartment, fullImageUrl) {
    const peopleListWrapper = document.getElementById('people-list-wrapper');
    peopleListWrapper.insertAdjacentHTML(
      'afterbegin',
      `
          <div class="wide-poster-card-container" data-favorite-person-id="${personId}">
            <div class="wide-poster-card" style='background-image: url(&quot;${fullImageUrl}&quot;'>
              <div class="wide-poster-shadow-top"></div>
              <div class="wide-poster-shadow-bottom"></div>
              <a class="remove-from-feed-button" data-favorite-person-id="${personId}">
                    <i class="bx bxs-x-circle"></i>
                  </a>
              <div class="wide-poster-card-info">
                  <p class="wide-poster-title">${name}</p>
                  <p class="wide-poster-people">${knownForDepartment}</p>
              </div>
            </div>
          </div>`
    );
    const removeFromFeedButton = document.querySelector(
      `.remove-from-feed-button[data-favorite-person-id="${personId}"]`
    );
    removeFromFeedButton.style.display = 'none';
  }

  init() {
    CrudService.printVerboseMessage(`[Created Page] ${this.constructor.name}`, '#222', '#02EB16');
  }

  clear() {
    document.getElementById('people-list-wrapper').innerHTML = '';
  }
}
