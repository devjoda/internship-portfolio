// imports
import CrudService from './services/crud-service.js';
import FetchService from './services/fetch-service.js';
import ViewService from './services/view-service.js';

// init pages
let pages = document.getElementById('pages');
CrudService.createPages(pages);

// init user
CrudService.createUser('John Doe', 'john.doe@example.com', 'b4da55', '1990, 01, 01');

// simulate login (inits router)
let currentUser = login('john.doe@example.com', 'b4da55');



// init view service
await CrudService.createViewService(currentUser);

// init iso lang code converter
CrudService.createIsoLanguageCodeConverter();

// create window hooks for service testers
window.currentUser = ViewService.currentUser;
window.CrudService = CrudService;
window.FetchService = FetchService;

(async () => {
  // // simulate steven spielberg favorited by currentUser
  // await CrudService.favoritePerson(488, false);
  
  // // simulate denis villeneuve favorited by currentUser
  // await CrudService.favoritePerson(137427, false);
  
  // // simulate daniel day-lewis favorited by currentUser
  // await CrudService.favoritePerson(11856, false);
  
  // simulate timothée chalamet favorited by currentUser
  // await CrudService.favoritePerson(1190668, false);
  
  // simulate rebecca hall favorited by currentUser
  // await CrudService.favoritePerson(15556, false);

  // simulate elle fanning favorited by currentUser
  // await CrudService.favoritePerson(18050, false);
})();

function login(email, password) {
  // find user
  let foundUser = CrudService.users.find((element) => element.email === email);

  if (!foundUser) {
    // TODO: Handle navigateTo signup
  }
  // check email/password
  if (foundUser.email === email && foundUser.password === password) {
    // if user is new
    if (foundUser.isNewUser) {
      // show get-started-1 page as default
      CrudService.createRouterService('#/get-started-1');
      foundUser.isNewUser = false;
    } else {
      // else show home as default
      CrudService.createRouterService('#/home');
    }
  } else {
    // TODO: Handle wrong password
  }
  return foundUser;
}
