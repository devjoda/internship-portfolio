/*
 * MODAL FUNKTIONALITET
 *
 * vi starter med at sætte nogle globale variabler
 */

//globale variabler
const MODAL = document.querySelector('.modal-wrapper');
const MODAL_HEADING = document.querySelector('.modal-heading');
const MODAL_SUBHEADING = document.querySelector('.modal-subheading');
const MODAL_SUBSUBHEADING = document.querySelector('.modal-subsubheading');
const MODAL_BOTTOM = document.querySelector('.modal-bottom');

// tilføjer en eventlistener til hele dokumentet, som kører ved hvert klik
document.addEventListener('click', function (event) {
  // event.target' refererer til det objekt, som eventet er sendt fra
  const TARGET = event.target;

  // vi laver en tom variabel, targetClass, og sætter den til targets klasse, hvis den ikke er null
  let targetClass = '';
  if (TARGET.className !== null) {
    targetClass = TARGET.className;
  }

  /*
   * '.closest' kigger på inputsparameteren, som er en css selector og forsøger at matche den med elementer hele vejen op
   * til dokumentets rod. det er smart fordi, så skal vi ikke til at lave tjek på alle elementer i modal-wrapperen.
   * hvis closest match'er selectoren returnerer den objektet ellers null
   * vi laver en tom variabel, closestClassName, og sætter den til targets closest klasse, hvis den ikke er null
   */
  const CLOSEST = TARGET.closest('.modal');
  let closestClassName = '';
  if (CLOSEST !== null) {
    if (CLOSEST.className !== null) {
      closestClassName = CLOSEST.className;
    }
  }

  // hvis target klassen er escape-games-definition kalder vi render modal med elementet
  if (targetClass === 'how-long-does-it-last') {
    renderModal(targetClass);
    return;
  }

  // hvis closest class name = modal, så ved vi vi klikker inden for boksen. hvis ikke brugeren klikker på luk-vinduet ikonet,
  // så kan vi returne, så vi laver et check for det, og ellers kalder vi derenderModal (fjerner boksen og overlayet)
  if (closestClassName === 'modal' && targetClass !== 'modal-close') {
    return;
  }
  derenderModal();
});

// render funktion hvor vi bruger et switch statement til at sætte innerText/insertAdjacentHTML på de forskellige komponenter i modalen
function renderModal(element) {
  switch (element) {
    case 'how-long-does-it-last':
      MODAL_HEADING.innerText = 'INFO';
      MODAL_SUBHEADING.innerText = 'Hvor lang tid varer det?';
      MODAL_BOTTOM.innerHTML =
        '<p class="modal-paragraph">Alle vores escape games er tidsbegrænset til <span class="bold">2 timer</span>, som er den maksimale varighed.</p><p class="modal-paragraph">Normalt varer escape games kun 1 time, så hos os får du altså fuld valuta for pengene!</p>';
      break;
  }
  MODAL.style.display = 'block';
}

function derenderModal() {
  MODAL.style.display = 'none';
}

/*
 * GLOBAL FUNKTIONALITET
 *
 * Global funktionalitet som initialiserer og gemmer inputværdien, hvis ikke den er initialiseret.
 */

function doInputHandling(inputElement, sessionStorageKey) {
  let storedInput = isInputInitialized(sessionStorageKey);
  if (storedInput === null) {
    storedInput = initializeInput(inputElement, sessionStorageKey);
  } else {
    inputElement.value = sessionStorage.getItem(sessionStorageKey);
  }
  addInputEventListener(inputElement, sessionStorageKey);
}

//hjælpemetode: tjekker om input er initialiseret
function isInputInitialized(sessionStorageKey) {
  return sessionStorage.getItem(sessionStorageKey);
}

//hjælpemetode: initialiserer input til værdien (tjek behøves ikke, fordi standardværdien er valid)
function initializeInput(inputElement, sessionStorageKey) {
  return sessionStorage.setItem(sessionStorageKey, `${inputElement.value}`);
}

//hjælpemetode: tilføj 'onchange' event listeners til input elementer, som gemmer sessionStorageKey, hvis inputværdien er valid
function addInputEventListener(inputElement, sessionStorageKey) {
  inputElement.addEventListener('change', (event) => {
    if (inputElement.checkValidity()) {
      sessionStorage.setItem(sessionStorageKey, `${inputElement.value}`);
    }
  });
  inputElement.addEventListener('input', (event) => {
    if (inputElement.checkValidity()) {
      sessionStorage.setItem(sessionStorageKey, `${inputElement.value}`);
    }
  });
}

/*
* Global funktionalitet som sender en tilbage, hvis man kommer ind på en underside, hvor der mangler sessionStorage på en af siderne.
*/



/*
 * DATE FUNKTIONALITET
 *
 * Funktionalitet som gemmer brugerens input af dato(booking-hvornaar-skal-det-foregaa.html)
 */

const DATE_INPUT = document.getElementById('date-input');

if (DATE_INPUT !== null) {
  const SESSION_STORAGE_KEY = 'date-user-input';
  addInputEventListener(DATE_INPUT, SESSION_STORAGE_KEY);
  //metode til at sætte datoen til dags dato, og gemme i storage, hvis storageVærdien ikke allerede er initialiseret
  let todaysDate = new Date().toJSON().slice(0, 10);
  DATE_INPUT.value = todaysDate;
  DATE_INPUT.min = todaysDate;
  if (isInputInitialized(SESSION_STORAGE_KEY) === null) {
    initializeInput(DATE_INPUT, SESSION_STORAGE_KEY);
  } else {
    let storedSessionDate = sessionStorage.getItem(SESSION_STORAGE_KEY);
    DATE_INPUT.value = storedSessionDate;
  }
}

// hjælpemetode som returnerer dagens dato i html5 input-venligt format
Date.prototype.getTodaysDate = function () {
  let date = new Date(this);
  date.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return date.toJSON().slice(0, 10);
};

/*
 * TIME FUNKTIONALITET
 *
 * Funktionalitet som gemmer brugerens input af tid (booking-hvornaar-skal-det-foregaa-2.html)
 */

const TIME_INPUT = document.getElementById('time-input');

if (TIME_INPUT !== null) {
  doInputHandling(TIME_INPUT, 'time-user-input');
}

/*
 * PARTICIPANT SELECTION FUNKTIONALITET
 *
 * Funktionalitet som gemmer brugerens input af deltagere (booking-hvor-mange-personer-bliver-i.html)
 */

const AMOUNT_OF_PARTICIPANTS_INPUT = document.getElementById('amount-of-participants-input');

if (AMOUNT_OF_PARTICIPANTS_INPUT !== null) {
  doInputHandling(AMOUNT_OF_PARTICIPANTS_INPUT, 'participants-user-input');
}

/*
 * TEAM SELECTION FUNKTIONALITET
 *
 * Funktionalitet som gemmer brugerens input af hold (booking-hvor-mange-hold-skal-i-vaere.html),
 * skifter mellem inputsformer (antal hold vs holdstørrelse), og opdaterer infoboksen ('dit valg')
 */

// globale variabler
const TEAMS_INPUT = document.getElementById('amount-of-teams-input');
const SWITCH_TO_TEAM_SIZE_INPUT = document.getElementById('let-me-choose-amount-of-participants-per-team-instead');
const TEAM_SIZE_INPUT = document.getElementById('amount-of-participants-per-team-input');
const SWITCH_TO_TEAMS_INPUT = document.getElementById('let-me-choose-amount-of-teams-instead');
const TEAM_SELECTION_INFO_TEXT_1 = document.getElementById('team-your-selection-text-1');
const TEAM_SELECTION_INFO_TEXT_2 = document.getElementById('team-your-selection-text-2');
const TEAMS_LABEL = document.getElementById('amount-of-teams-label');
const TEAM_SIZE_LABEL = document.getElementById('amount-of-participants-per-team-label');
const TEAM_YOUR_SELECTION_PARTICIPANTS = document.getElementById('team-your-selection-participants');
const TEAM_SELECTION_INFO_TEAMS = document.getElementById('team-selection-info-teams');
const TEAM_SELECTION_PARTICIPANTS_PER_TEAM = document.getElementById('team-selection-info-participants-per-team');
const TEAM_SELECTION_HEADING = document.getElementById('team-selection-heading');

//hold input og switch anchor

if (TEAMS_INPUT !== null) {
  doInputHandling(TEAMS_INPUT, 'teams-user-input');
  TEAMS_INPUT.addEventListener('change', (event) => {
    updateTeamSelectionInfo(TEAMS_INPUT);
  });
  TEAMS_INPUT.addEventListener('input', (event) => {
    updateTeamSelectionInfo(TEAMS_INPUT);
  });
}

if (SWITCH_TO_TEAM_SIZE_INPUT !== null) {
  SWITCH_TO_TEAM_SIZE_INPUT.addEventListener('click', (event) => {
    TEAM_SELECTION_HEADING.innerText = 'Hvor store skal jeres hold være?';
    swapElements(TEAM_SELECTION_INFO_TEXT_1, TEAM_SELECTION_INFO_TEXT_2);
    updateTeamSelectionInfo(TEAM_SIZE_INPUT);
    toggleInput();
  });
}

// holdstørrelse input og switch anchor

if (TEAM_SIZE_INPUT !== null) {
  doInputHandling(TEAM_SIZE_INPUT, 'team-size-user-input');
  TEAM_SIZE_INPUT.addEventListener('change', (event) => {
    updateTeamSelectionInfo(TEAM_SIZE_INPUT);
  });
  TEAM_SIZE_INPUT.addEventListener('input', (event) => {
    updateTeamSelectionInfo(TEAM_SIZE_INPUT);
  });
}

if (SWITCH_TO_TEAMS_INPUT !== null) {
  SWITCH_TO_TEAMS_INPUT.addEventListener('click', (event) => {
    TEAM_SELECTION_HEADING.innerText = 'Hvor mange hold skal I være?';
    swapElements(TEAM_SELECTION_INFO_TEXT_2, TEAM_SELECTION_INFO_TEXT_1);
    updateTeamSelectionInfo(TEAMS_INPUT);
    toggleInput();
  });
}

//metode som kaldes, når switch anchor klikkes på: toggler både synlighed og opdaterer infoboks

function toggleInput() {
  let newInput = toggleInputVisibility();
  updateTeamSelectionInfo(newInput);
}

// metode som toggler synligheden mellem 'hold' og 'holdstørrelse' inputene. returner det input, som bliver synligt
function toggleInputVisibility() {
  // conditional som toggler input synligheden alt efter hvilket input, der er synligt pt
  if (window.getComputedStyle(TEAMS_INPUT).display === 'none') {
    TEAMS_LABEL.style.display = 'unset';
    TEAMS_INPUT.style.display = 'unset';
    SWITCH_TO_TEAM_SIZE_INPUT.style.display = 'unset';

    TEAM_SIZE_LABEL.style.display = 'none';
    TEAM_SIZE_INPUT.style.display = 'none';
    SWITCH_TO_TEAMS_INPUT.style.display = 'none';
    return TEAMS_INPUT;
  } else {
    TEAM_SIZE_LABEL.style.display = 'unset';
    TEAM_SIZE_INPUT.style.display = 'unset';
    SWITCH_TO_TEAMS_INPUT.style.display = 'unset';

    TEAMS_LABEL.style.display = 'none';
    TEAMS_INPUT.style.display = 'none';
    SWITCH_TO_TEAM_SIZE_INPUT.style.display = 'none';
    return TEAM_SIZE_INPUT;
  }
}

if (TEAM_YOUR_SELECTION_PARTICIPANTS !== null) {
  if (TEAMS_INPUT !== null) {
    updateTeamSelectionInfo(TEAMS_INPUT);
  }
}

function updateTeamSelectionInfo(inputElement) {
  updateTeamSelectionInfoParticipants(inputElement);
  let inputValue = inputElement.value;
  let inputId = inputElement.id;
  let totalParticipants = sessionStorage.getItem('participants-user-input');
  /*
   * hvis elementet IKKE er et validt tal afbryder vi metodekaldet
   */
  if (!inputElement.checkValidity()) {
    return;
  }
  // vi switcher på inputId, opdaterer relevante variabler og html span elementer
  switch (inputId) {
    case 'amount-of-teams-input':
      let participantsPerTeam = totalParticipants / parseInt(inputValue);
      TEAM_SELECTION_INFO_TEAMS.innerText = sessionStorage.getItem('teams-user-input');
      TEAM_SELECTION_PARTICIPANTS_PER_TEAM.innerText = toFixed(participantsPerTeam);
      sessionStorage.setItem('teams-user-input', `${inputValue}`);
      break;
    case 'amount-of-participants-per-team-input':
      let teams = Math.ceil(totalParticipants / parseInt(inputValue));
      TEAM_SELECTION_PARTICIPANTS_PER_TEAM.innerText = sessionStorage.getItem('team-size-user-input');
      TEAM_SELECTION_INFO_TEAMS.innerText = teams;
      // vi sætter her hold variablen i sessionStorage, fordi den skal bruges senere til kvitteringen
      if (isElementAValidNumber(teams)) {
        sessionStorage.setItem('teams-user-input', `${teams}`);
      }
      break;
  }
}

function toFixed(element) {
  return parseFloat(element.toFixed(1));
}

function updateTeamSelectionInfoParticipants(inputElement) {
  let inputId = inputElement.id;
  let participantsUserInput = sessionStorage.getItem('participants-user-input');
  if (isElementAValidNumber(participantsUserInput)) {
    switch (inputId) {
      case 'amount-of-teams-input':
        if (participantsUserInput != 1) {
          TEAM_YOUR_SELECTION_PARTICIPANTS.innerHTML = `${participantsUserInput} personer fordelt på`;
        } else {
          TEAM_YOUR_SELECTION_PARTICIPANTS.innerHTML = `${participantsUserInput} person fordelt på`;
        }
        break;
      case 'amount-of-participants-per-team-input':
        TEAM_YOUR_SELECTION_PARTICIPANTS.innerHTML = `${participantsUserInput} personer med`;
        break;
    }
  }
}

function isElementAValidNumber(element) {
  if (element !== null) {
    if (!isNaN(element) && element > 0) {
      return element;
    }
  }
  return false;
}

function swapElements(element1, element2) {
  // vi laver en midlertidigt markør, og indsætter den hvor element1 er
  let temp = document.createElement('div');
  element1.parentNode.insertBefore(temp, element1);

  // vi flytter element1 til lige før element2
  element2.parentNode.insertBefore(element1, element2);

  // vi flytter element2 til lige før hvor element1 plejede at være
  temp.parentNode.insertBefore(element2, temp);

  // vi fjerner den midlertidige markør
  temp.parentNode.removeChild(temp);
}

/*
 * SELECT ESCAPE GAME CATEGORY FUNKTIONALITET (booking-hvor-skal-det-foregaa.html)
 */

const OUTDOOR_ESCAPE_GAME_BUTTON = document.getElementById('outdoor-escape-game-wrapper');
const DELIVERED_ESCAPE_GAME_BUTTON = document.getElementById('delivered-escape-game-wrapper');
const OUTDOOR_ESCAPE_GAME_PRICE = document.getElementById('outdoor-escape-game-price');
const DELIVERED_ESCAPE_GAME_PRICE = document.getElementById('delivered-escape-game-price');

if (OUTDOOR_ESCAPE_GAME_BUTTON !== null) {
  OUTDOOR_ESCAPE_GAME_BUTTON.addEventListener('click', (event) => {
    sessionStorage.setItem('escape-game-category-user-input', 'outdoors');
    calculatePrice(OUTDOOR_ESCAPE_GAME_PRICE, true);
  });
}

if (DELIVERED_ESCAPE_GAME_BUTTON !== null) {
  DELIVERED_ESCAPE_GAME_BUTTON.addEventListener('click', (event) => {
    sessionStorage.setItem('escape-game-category-user-input', 'delivered');
    calculatePrice(DELIVERED_ESCAPE_GAME_PRICE, true);
  });
}

if (OUTDOOR_ESCAPE_GAME_PRICE !== null) {
  OUTDOOR_ESCAPE_GAME_PRICE.innerText = calculatePrice(OUTDOOR_ESCAPE_GAME_PRICE, false);
}

if (DELIVERED_ESCAPE_GAME_PRICE !== null) {
  DELIVERED_ESCAPE_GAME_PRICE.innerText = calculatePrice(DELIVERED_ESCAPE_GAME_PRICE, false);
}

//setSessionStoragePriceInfo = boolean: skal prisinformation gemmes i sessionStorage
function calculatePrice(element, setSessionStoragePriceInfo) {
  elementId = element.id;
  let participants = parseInt(sessionStorage.getItem('participants-user-input'));
  let basePrice = 0;
  let costPerParticipant = 0;
  let totalPrice = 0;
  if (elementId !== null) {
    switch (elementId) {
      case 'outdoor-escape-game-price':
        //pris varierer alt efter hvor mange deltagere
        if (participants <= 2) {
          costPerParticipant = 196;
          totalPrice = costPerParticipant * participants;
        } else if (participants <= 3) {
          costPerParticipant = 180;
          totalPrice = costPerParticipant * participants;
        } else if (participants <= 4) {
          costPerParticipant = 156;
          totalPrice = costPerParticipant * participants;
        } else if (participants > 4) {
          costPerParticipant = 140;
          totalPrice = costPerParticipant * participants * 1.25;
        }
        if (setSessionStoragePriceInfo) {
          sessionStorage.setItem('base-price', `${basePrice}`);
          sessionStorage.setItem('cost-per-participant', `${costPerParticipant}`);
          sessionStorage.setItem('total-price', `${totalPrice}`);
        }
        break;
      case 'delivered-escape-game-price':
        //pris = 3500 kr (startpris for levering) + 100 kr for hver deltager
        costPerParticipant = 100;
        basePrice = 3500;
        totalPrice = basePrice + participants * costPerParticipant * 1.25;
        if (setSessionStoragePriceInfo) {
          sessionStorage.setItem('base-price', `${basePrice}`);
          sessionStorage.setItem('cost-per-participant', `${costPerParticipant}`);
          sessionStorage.setItem('total-price', `${totalPrice}`);
        }
        break;
    }
  }
  return totalPrice;
}

/*
 * SELECT CITY FUNKTIONALITET (booking-vaelg-by.html)
 */

const CITY_SELECT = document.getElementById('city-select');

if (CITY_SELECT !== null) {
  doInputHandling(CITY_SELECT, 'city-user-input');
}

/*
 * INPUT CONTACT INFO FUNTIONALITET (booking-indtast-kontaktoplysninger.html)
 */

const EMAIL_INPUT = document.getElementById('email-input');
const PHONE_INPUT = document.getElementById('phone-input');
const INPUT_CONTACT_INFO_BACK_ANCHOR = document.getElementById('input-contact-info-back-anchor');

if (EMAIL_INPUT !== null) {
  doInputHandling(EMAIL_INPUT, 'email-user-input');
}

if (PHONE_INPUT !== null) {
  doInputHandling(PHONE_INPUT, 'phone-user-input');
}

// metode til at håndtere hvilken side man kommer fra og sikre rigtig destination ved klik på tilbagepil
if (INPUT_CONTACT_INFO_BACK_ANCHOR !== null) {
  const ESCAPE_GAME_CATEGORY = sessionStorage.getItem('escape-game-category-user-input');
  if (ESCAPE_GAME_CATEGORY !== null) {
    switch (ESCAPE_GAME_CATEGORY) {
      case 'outdoors':
        INPUT_CONTACT_INFO_BACK_ANCHOR.href = 'booking-vaelg-by.html';
        break;
      case 'delivered':
        INPUT_CONTACT_INFO_BACK_ANCHOR.href = 'booking-indtast-leveringsadresse.html';
        break;
    }
  }
}

/*
 * SELECT DELIVERY ADDRESS FUNKTIONALITET (indtast-leveringsadresse.html)
 */

const INPUT_DELIVERY_ADDRESS_WRAPPER = document.getElementById('input-delivery-address-wrapper');
const POSTAL_CODE_AND_CITY_LIST = [];
const ADRESS_LIST = [];

if (INPUT_DELIVERY_ADDRESS_WRAPPER !== null) {
  //input elementer
  const ATTENTION_TO_INPUT = document.getElementById('attention-to-input');
  const COMPANY_INPUT = document.getElementById('company-input');
  const CITY_INPUT = document.getElementById('city-input');
  const POSTCAL_CODE_INPUT = document.getElementById('postal-code-input');
  const ADDRESS_INPUT = document.getElementById('address-input');
  //datalist elementer

  //populate globalt array: postal and city liste
  populatePostalCodeAndCityList();

  if (ATTENTION_TO_INPUT !== null) {
    doInputHandling(ATTENTION_TO_INPUT, 'delivery-address-attention-to-input');
  }
  if (COMPANY_INPUT !== null) {
    doInputHandling(COMPANY_INPUT, 'delivery-address-company-input');
  }

  if (POSTCAL_CODE_INPUT !== null) {
    POSTCAL_CODE_INPUT.addEventListener('input', (event) => {
      if (checkIfElementValueLengthEquals(POSTCAL_CODE_INPUT, 4)) {
        populateCityInput();
      }
    });
    doInputHandling(POSTCAL_CODE_INPUT, 'delivery-address-postal-code-input');
  }

  if (CITY_INPUT !== null) {
    doInputHandling(CITY_INPUT, 'delivery-address-city-input');
  }

  if (ADDRESS_INPUT !== null) {
    doInputHandling(ADDRESS_INPUT, 'delivery-address-address-input');
    ADDRESS_INPUT.addEventListener('input', (event) => {
      if (checkIfElementValueLengthEquals(POSTCAL_CODE_INPUT, 4)) {
        populateAdressInput();
      }
    });
  }
}

/*
 * hjælpemetode til at tjekke om længden af et elements værdi er lig et bestemt heltal
 * (bruges for at finde ud af om fuldt postnr. er tastet ind)
 */
function checkIfElementValueLengthEquals(element, compareInt) {
  if (element !== null) {
    let elementValueLength = element.value.length;
    if (elementValueLength === compareInt) {
      return true;
    }
  }
  return false;
}

/*
 * hjælpemetode: populate postal code og city list (global variabel)
 */
function populatePostalCodeAndCityList() {
  fetch('https://api.dataforsyningen.dk/postnumre')
    .then(function (data) {
      return data.json();
    })
    .then(function (post) {
      for (let i = 0; i < post.length; i++) {
        if (POSTAL_CODE_AND_CITY_LIST !== null) {
          POSTAL_CODE_AND_CITY_LIST.push([CURRENT_POSTAL_CODE, CURRENT_CITY]);
        }
      }
    })
    .catch(function (error) {
      console.error(`Kunne ikke hente JSON-data fra 'https://api.dataforsyningen.dk/postnumre'`);
    });
}

function populatePostalCodeAndCityList() {
  fetch('https://api.dataforsyningen.dk/postnumre')
    .then(function (data) {
      return data.json();
    })
    .then(function (post) {
      const POSTAL_CODE_DATA_LIST = document.getElementById('postal-code-list');
      const CITY_DATA_LIST = document.getElementById('city-list');
      const CITY_LIST = [];
      for (let i = 0; i < post.length; i++) {
        const CURRENT_POSTAL_CODE = post[i].nr;
        const CURRENT_CITY = post[i].navn;

        POSTAL_CODE_DATA_LIST.insertAdjacentHTML('beforeend', `<option>${CURRENT_POSTAL_CODE}</option>`);
        //vi fylder et array med et array postnummre og tilhørende bynavne, så vi kan autoudfylde city-input
        //bruges i populateCityInput()
        if (POSTAL_CODE_AND_CITY_LIST !== null) {
          POSTAL_CODE_AND_CITY_LIST.push([CURRENT_POSTAL_CODE, CURRENT_CITY]);
        }
        if (!CITY_LIST.includes(post[i].navn)) {
          CITY_LIST.push(post[i].navn);
        }
      }
      for (let i = 0; i < CITY_LIST.length; i++) {
        CITY_DATA_LIST.insertAdjacentHTML('beforeend', `<option>${CITY_LIST[i]}</option>`);
      }
    })
    .catch(function (error) {
      console.error(`Kunne ikke hente JSON-data fra 'https://api.dataforsyningen.dk/postnumre'`);
    });
}

/*
 * hjælpemetode: populate city list
 */
function populateCityDataList() {
  fetch('https://api.dataforsyningen.dk/postnumre')
    .then(function (data) {
      return data.json();
    })
    .then(function (post) {
      const POSTAL_CODE_LIST = document.getElementById('city-list');
      for (let i = 0; i < post.length; i++) {
        POSTAL_CODE_LIST.insertAdjacentHTML('beforeend', `<option>${post[i].navn}</option>`);
      }
    })
    .catch(function (error) {
      console.error(`Kunne ikke hente JSON-data fra 'https://api.dataforsyningen.dk/postnumre'`);
    });
}

function populateCityInput() {
  const CITY_INPUT = document.getElementById('city-input');
  const POSTAL_CODE_INPUT = document.getElementById('postal-code-input');
  const POSTAL_CODE_LIST = document.getElementById('city-list');
  console.log(POSTAL_CODE_LIST);
  if (POSTAL_CODE_AND_CITY_LIST !== null) {
    for (let i = 0; i < POSTAL_CODE_AND_CITY_LIST.length; i++) {
      let currentCity = POSTAL_CODE_AND_CITY_LIST[i][1];
      if (POSTAL_CODE_INPUT.value == POSTAL_CODE_AND_CITY_LIST[i][0]) {
        CITY_INPUT.value = currentCity;
        sessionStorage.setItem('delivery-address-city-input', currentCity);
        return;
      }
    }
  }
}

function populateAdressInput() {
  const POSTAL_CODE_INPUT = document.getElementById('postal-code-input');
  const ADDRESS_INPUT = document.getElementById('address-input');
  let fetchUrl = `https://api.dataforsyningen.dk/adresser?postnr=${POSTAL_CODE_INPUT.value}&q=${ADDRESS_INPUT.value}*&struktur=mini`;
  const ADDRESS_LIST = document.getElementById('address-list');
  //Clear address datalist
  ADDRESS_LIST.innerHTML = '';
  fetch(fetchUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (post) {
      const REGEX = /,\s\d{4}[\S\s]*/g;
      for (let i = 0; i < post.length; i++) {
        //vi bruger regex til at fjerne uønsket postnummer + adresse med string.replace
        ADDRESS_LIST.insertAdjacentHTML('beforeend', '<option>' + post[i].betegnelse.replace(REGEX, '') + '</option>');
      }
    })

    .catch(function (error) {
      console.error("Kunne ikke hente JSON-data fra 'https://api.dataforsyningen.dk/adresser'");
    });
}

/*
 * SELECT ESCAPE GAME CARD FUNKTIONALITET (booking-vaelg-escape-game.html)
 */
const ESCAPE_GAMES_CARD_WRAPPER = document.getElementById('escapes-games-card-wrapper');
const OUTDOOR_ESCAPE_GAMES_CARD_CONTAINER = document.getElementById('outdoor-escape-games-card-container');
const DELIVERED_ESCAPE_GAMES_CARD_CONTAINER = document.getElementById('delivered-escape-games-card-container');
const OPERATION_MINDFALL_CARD = document.getElementById('operation-mindfall-card');
const THE_LAST_SECRET_OF_ALBERT_EINSTEIN_CARD = document.getElementById('the-last-secret-of-albert-einstein-card');
const PIRATE_ESCAPE_CARD = document.getElementById('pirate-escape-card');
const THE_MURDER_AT_GRAND_HOTEL_CARD = document.getElementById('the-murder-at-grand-hotel-card');

if (ESCAPE_GAMES_CARD_WRAPPER !== null) {
  const ESCAPE_GAME_CATEGORY = sessionStorage.getItem('escape-game-category-user-input');
  if (ESCAPE_GAME_CATEGORY !== null) {
    switch (ESCAPE_GAME_CATEGORY) {
      case 'outdoors':
        DELIVERED_ESCAPE_GAMES_CARD_CONTAINER.style.display = 'none';
        OUTDOOR_ESCAPE_GAMES_CARD_CONTAINER.style.display = 'unset';
        doCardHandling(OPERATION_MINDFALL_CARD);
        doCardHandling(THE_LAST_SECRET_OF_ALBERT_EINSTEIN_CARD);
        break;
      case 'delivered':
        OUTDOOR_ESCAPE_GAMES_CARD_CONTAINER.style.display = 'none';
        DELIVERED_ESCAPE_GAMES_CARD_CONTAINER.style.display = 'unset';
        doCardHandling(PIRATE_ESCAPE_CARD);
        doCardHandling(THE_MURDER_AT_GRAND_HOTEL_CARD);
        break;
    }
  }
}

function doCardHandling(cardElement) {
  let cardId = cardElement.id;
  if (cardId !== null) {
    switch (cardId) {
      case 'operation-mindfall-card':
        addCardEventlistener(cardElement, 'operation-mindfall');
        break;
      case 'the-last-secret-of-albert-einstein-card':
        addCardEventlistener(cardElement, 'the-last-secret-of-albert-einstein');
        break;
      case 'pirate-escape-card':
        addCardEventlistener(cardElement, 'pirate-escape');
        break;
      case 'the-murder-at-grand-hotel-card':
        addCardEventlistener(cardElement, 'the-murder-at-grand-hotel');
        break;
    }
  }
}

function addCardEventlistener(cardElement, sessionStorageValue) {
  cardElement.addEventListener('click', (event) => {
    sessionStorage.setItem('escape-game-user-input', sessionStorageValue);
  });
}

/*
 * REVIEW YOUR BOOKING FUNKTIONALITET (booking-gennemse-din-booking.html)
 */

const BOOKING_TABLE_WRAPPER = document.getElementById('booking-table-wrapper');
const BUTTON_TO_PAYMENT = document.getElementById('button-to-payment');

if (BOOKING_TABLE_WRAPPER !== null) {
  renderBookingData();
}

function renderBookingData() {
  //escape game
  const ESCAPE_GAME_USER_INPUT = sessionStorage.getItem('escape-game-user-input');
  if (ESCAPE_GAME_USER_INPUT !== null) {
    const CARDS = [
      document.getElementById('operation-mindfall-booking-review-card'),
      document.getElementById('the-last-secret-of-albert-einstein-booking-review-card'),
      document.getElementById('pirate-escape-booking-review-card'),
      document.getElementById('the-murder-at-grand-hotel-booking-review-card'),
    ];
    //enhanced for loop til at sætte alle cards display = none (clear dem fra render i DOM'en)
    CARDS.forEach((element) => (element.style.display = 'none'));
    //for loop til at sætte render til det korrekte kort
    for (let i = 0; i < CARDS.length; i++) {
      /*
       * Vi bruger includes til at se om de enkelte kort indeholder en del af strengen i vores session storage
       * I så fald bryder vi loopet (der kan kun vælge et kort / escape game)
       * F.eks.: Om 'operation-mindfall-booking-review-card' (kort ID) indeholder strengen 'operation-mindfall' (escape-game-user-input, sessionStorage)
       */
      if (CARDS[i].id.includes(ESCAPE_GAME_USER_INPUT)) {
        CARDS[i].style.display = 'unset';
        break;
      }
    }
  }
  //alt data bortset fra where
  const BOOKING_TABLE_COLUMN_2_LIST = document.getElementsByClassName('booking-column-2');
  //dato
  BOOKING_TABLE_COLUMN_2_LIST[0].innerText = sessionStorage.getItem('date-user-input');
  //klokkeslæt
  BOOKING_TABLE_COLUMN_2_LIST[1].innerText = sessionStorage.getItem('time-user-input');
  //antal deltagere
  BOOKING_TABLE_COLUMN_2_LIST[2].innerText = sessionStorage.getItem('participants-user-input');
  //antal hold
  BOOKING_TABLE_COLUMN_2_LIST[3].innerText = sessionStorage.getItem('teams-user-input');
  //email
  BOOKING_TABLE_COLUMN_2_LIST[4].innerText = sessionStorage.getItem('email-user-input');
  //mobilnummer (formatterer, hvis char = 8)
  let unformattedPhone = sessionStorage.getItem('phone-user-input');
  if (unformattedPhone.length === 8) {
    let formattedPhone = [
      unformattedPhone.slice(0, 2),
      unformattedPhone.slice(2, 4),
      unformattedPhone.slice(4, 6),
      unformattedPhone.slice(6, 8),
    ].join(' ');
    BOOKING_TABLE_COLUMN_2_LIST[5].innerText = formattedPhone;
  } else {
    BOOKING_TABLE_COLUMN_2_LIST[5].innerText = unformattedPhone;
  }
  //basispris
  let basePrice = parseInt(sessionStorage.getItem('base-price'));
  BOOKING_TABLE_COLUMN_2_LIST[6].innerText = ` ${basePrice} DKK`;
  //deltagertillæg (col 1)
  const BOOKING_TABLE_PARTICIPANT_COST_BREAKDOWN = document.getElementById('booking-table-participant-cost-breakdown');
  let participants = parseInt(sessionStorage.getItem('participants-user-input'));
  let costPerParticipant = parseInt(sessionStorage.getItem('cost-per-participant'));
  BOOKING_TABLE_PARTICIPANT_COST_BREAKDOWN.innerHTML = `(${participants} x ${costPerParticipant},00 DKK)`;
  //deltagertillæg (col 2)
  let totalParticipantCost = participants * costPerParticipant;
  BOOKING_TABLE_COLUMN_2_LIST[7].innerText = `${totalParticipantCost},00 DKK`;
  //subtotal
  let subtotal = basePrice + totalParticipantCost;
  BOOKING_TABLE_COLUMN_2_LIST[8].innerText = `${subtotal},00 DKK`;
  //moms
  let totalPrice = parseInt(sessionStorage.getItem('total-price'));
  let vat = totalPrice * 0.2;
  BOOKING_TABLE_COLUMN_2_LIST[9].innerText = `${vat},00 DKK`;
  //totalbeløb
  BOOKING_TABLE_COLUMN_2_LIST[10].innerText = `${totalPrice},00 DKK`;

  //where (dynamisk oprettelse)
  const BOOKING_TABLE_HEADING_WHERE = document.getElementById('booking-table-heading-where');
  const BOOKING_TABLE_CONTENT_WHERE = document.getElementById('booking-table-content-where');
  const ESCAPE_GAME_CATEGORY_USER_INPUT = sessionStorage.getItem('escape-game-category-user-input');
  if (ESCAPE_GAME_CATEGORY_USER_INPUT !== null) {
    switch (ESCAPE_GAME_CATEGORY_USER_INPUT) {
      case 'outdoors':
        BOOKING_TABLE_HEADING_WHERE.innerText = 'Mødested';
        createOutdoorsBookingWhereRow(BOOKING_TABLE_CONTENT_WHERE);
        break;
      case 'delivered':
        BOOKING_TABLE_HEADING_WHERE.innerText = 'Leveringsadresse';
        createDeliveredBookingWhereRow(BOOKING_TABLE_CONTENT_WHERE);
        break;
    }
  }
}

//hjælpemetode til at render valg af escape game, parentNode = forældreNode, column1+2 = tekstIndhold, trailingHorizontalDivider = bool om der skal være hr
function createBookingRow(parentNode, column1, column2, trailingHorizontalDivider) {
  if (parentNode !== null) {
    if (trailingHorizontalDivider) {
      parentNode.insertAdjacentHTML(
        'beforeend',
        `<div class="booking-row"><p class="booking-column-1">${column1}</p>
  <p class="booking-column-2">${column2}</p></div><hr>`
      );
    } else {
      parentNode.insertAdjacentHTML(
        'beforeend',
        `<div class="booking-row"><p class="booking-column-1">${column1}</p>
  <p class="booking-column-2">${column2}</p></div>`
      );
    }
  }
}

// if (trailingHorizontalDivider) {
//   parentNode.insertAdjacentHTML('beforeend', '<hr>');
// }

//hjælpemetode til at dynamisk at lave 'hvor'-rækkerne, hvis escape kategorien = 'outdoors'
function createOutdoorsBookingWhereRow(parentNode) {
  const CITY = sessionStorage.getItem('city-user-input');
  const POSTAL_CODE = getPostalCode(CITY);
  const MEETING_POINT = getMeetingPoint(CITY);
  sessionStorage.setItem('postal-code', POSTAL_CODE);
  sessionStorage.setItem('meeting-point', MEETING_POINT);
  createBookingRow(parentNode, 'By', CITY, true);
  createBookingRow(parentNode, 'Postnummer', POSTAL_CODE, true);
  createBookingRow(parentNode, 'Adresse', MEETING_POINT, false);
}

//hjælpemetode til at dynamisk at lave 'hvor'rækkerne, hvis escape kategorien = 'delivered'
function createDeliveredBookingWhereRow(parentNode) {
  const DELIVERY_ADDRESS_ATTENTION_TO_INPUT = sessionStorage.getItem('delivery-address-attention-to-input');
  const DELIVERY_ADDRESS_COMPANY_INPUT = sessionStorage.getItem('delivery-address-company-input');
  const DELIVERY_ADDRESS_ADDRESS_INPUT = sessionStorage.getItem('delivery-address-address-input');
  const DELIVERY_ADDRESS_CITY_INPUT = sessionStorage.getItem('delivery-address-city-input');
  const DELIVERY_ADDRESS_POSTAL_CODE_INPUT = sessionStorage.getItem('delivery-address-postal-code-input');
  // if checks på att og firma fordi de ikke er obligatoriske inputs (ikke nødvendigvis gemt i session)
  if (DELIVERY_ADDRESS_ATTENTION_TO_INPUT.length > 0) {
    createBookingRow(parentNode, 'Att.', DELIVERY_ADDRESS_ATTENTION_TO_INPUT, true);
  }
  if (DELIVERY_ADDRESS_COMPANY_INPUT.length > 0) {
    createBookingRow(parentNode, 'Firma', DELIVERY_ADDRESS_COMPANY_INPUT, true);
  }
  createBookingRow(parentNode, 'Adresse', DELIVERY_ADDRESS_ADDRESS_INPUT, true);
  createBookingRow(parentNode, 'By', DELIVERY_ADDRESS_CITY_INPUT, true);
  createBookingRow(parentNode, 'Postnummer', DELIVERY_ADDRESS_POSTAL_CODE_INPUT, false);
}

//hjælpemetode til at få postnummer
function getPostalCode(city) {
  let postalCode = '';
  switch (city) {
    case 'København':
      postalCode = '1711';
      break;
    case 'Aarhus':
      postalCode = '8000';
      break;
    case 'Odense':
      postalCode = '5000';
      break;
    case 'Esbjerg':
      postalCode = '6700';
      break;
    case 'Kolding':
      postalCode = '6000';
      break;
    case 'Randers':
      postalCode = '8900';
      break;
    case 'Herning':
      postalCode = '7400';
      break;
    case 'Roskilde':
      postalCode = '4000';
      break;
    case 'Horsens':
      postalCode = '8700';
      break;
  }
  return postalCode;
}

//hjælpemetode til at få mødested
function getMeetingPoint(city) {
  let meetingPoint = '';
  switch (city) {
    case 'København':
      meetingPoint = 'Flæsketorvet 68';
      break;
    case 'Aarhus':
      meetingPoint = 'Mathilde Fibigers Have';
      break;
    case 'Odense':
      meetingPoint = 'Flakhaven – Torvet';
      break;
    case 'Esbjerg':
      meetingPoint = 'Street Food Esbjerg';
      break;
    case 'Kolding':
      meetingPoint = 'Låsbybanke Plads';
      break;
    case 'Randers':
      meetingPoint = 'Rådhustorvet';
      break;
    case 'Herning':
      meetingPoint = 'Torvet i Herning';
      break;
    case 'Roskilde':
      meetingPoint = 'Stændertorvet';
      break;
    case 'Horsens':
      meetingPoint = 'Brætspilscafeen';
      break;
  }
  return meetingPoint;
}

if (BUTTON_TO_PAYMENT !== null) {
  BUTTON_TO_PAYMENT.addEventListener('click', (event) => {
    window.open('https://service.nemid.nu/dk-en/#log_on_to_self-service', '_blank');
    window.location.href = 'booking-tak-for-din-booking.html';
  });
}

/*
 * REVIEW YOUR BOOKING FUNKTIONALITET (booking-tak-for-din-booking.html)
 */

const THANKS_FOR_BOOKING_MESSAGE_WRAPPER = document.getElementById('thanks-for-booking-message-wrapper');

if (THANKS_FOR_BOOKING_MESSAGE_WRAPPER !== null) {
  clearBookingMessageWrapper();
  const ESCAPE_GAME_CATEGORY_USER_INPUT = sessionStorage.getItem('escape-game-category-user-input');
  if (ESCAPE_GAME_CATEGORY_USER_INPUT !== null) {
    createThanksForBookingMessage(ESCAPE_GAME_CATEGORY_USER_INPUT);
  }
}

function clearBookingMessageWrapper() {
  THANKS_FOR_BOOKING_MESSAGE_WRAPPER.innerHTML = '';
}

function createThanksForBookingMessage(escapeGameCategory) {
  if (escapeGameCategory === 'outdoors') {
    const DATE = sessionStorage.getItem('date-user-input');
    const TIME = sessionStorage.getItem('time-user-input');
    const CITY = sessionStorage.getItem('city-user-input');
    const GOOGLE_MAPS_LINK = getGoogleMapsLink(CITY);
    const MEETING_POINT = sessionStorage.getItem('meeting-point');
    THANKS_FOR_BOOKING_MESSAGE_WRAPPER.insertAdjacentHTML(
      'afterbegin',
      `
<div id="thanks-for-booking-message-wrapper">
<div id="thanks-for-booking-message-outdoors">
<p>Vi glæder os til at se jer den <span id="thanks-for-booking-date">${DATE}</span>, kl. <span id="thanks-for-booking-time">
${TIME}</span> ved <a href="${GOOGLE_MAPS_LINK}" target="_blank" id="google-maps-meeting-point-anchor">
<span id="thanks-for-booking-meeting-point">${MEETING_POINT}</span> i <span id="thanks-for-booking-city">${CITY}</span></a>. 
Her vil I få en kort introduktion inden I bliver sluppet løs.</p>
<p>I kan se frem til et sjovt og udfordrende escape game, hvor byen danner ramme om hele oplevelsen.</p>
<p>Rigtig god fornøjelse!</p>
<img id="ceo-portrait" src="images/booking/ceo-portrait.jpg" alt="Lasse Jakobsen, indehaver af City Escape ApS">
<p>De bedste hilsner</p>
<p id="ceo-signature-paragraph">Lasse Jakobsen</p>
<p id="occupation-paragraph">Indehaver</p>
<p id="company-paragraph">City Escape ApS</p>
</div>
</div>`
    );
  } else if (escapeGameCategory === 'delivered') {
    const DATE = sessionStorage.getItem('date-user-input');
    const TIME = sessionStorage.getItem('time-user-input');
    THANKS_FOR_BOOKING_MESSAGE_WRAPPER.insertAdjacentHTML(
      'afterbegin',
      `
<div id="thanks-for-booking-message-wrapper">
<div id="thanks-for-booking-message-outdoors">
<p>Vi glæder os til at se jer den <span id="thanks-for-booking-date">${DATE}</span>, kl. <span id="thanks-for-booking-time">${TIME}</span>.</p>
<p>Vores dygtige gamemaster vil give jer en grundig introduktion, og vil stå til rådighed under hele forløbet klar til at assistere og guide jer.</p>
<p>I kan se frem til af få leveret et sjovt og udfordrende escape game, som byder på masser af muligheder for teambuilding og samarbejde.</p>
<p>Rigtig god fornøjelse!</p>
<img id="ceo-portrait" src="images/booking/ceo-portrait.jpg" alt="Lasse Jakobsen, indehaver af City Escape ApS">
<p>De bedste hilsner</p>
<p id="ceo-signature-paragraph">Lasse Jakobsen</p>
<p id="occupation-paragraph">Indehaver</p>
<p id="company-paragraph">City Escape ApS</p>
</div>
</div>`
    );
  }
}

//hjælpemetode til at få googlemaps link
function getGoogleMapsLink(city) {
  let googleMapsLink = '';
  switch (city) {
    case 'København':
      googleMapsLink = 'https://goo.gl/maps/kiEHbH186qrde8Lo8';
      break;
    case 'Aarhus':
      googleMapsLink = 'https://goo.gl/maps/h9RPqvgQocEYKuVL8';
      break;
    case 'Odense':
      googleMapsLink = 'https://goo.gl/maps/5frnJH2wQoEBpmWP9';
      break;
    case 'Esbjerg':
      googleMapsLink = 'https://g.page/esbjergstreetfood?share';
      break;
    case 'Kolding':
      googleMapsLink = 'https://goo.gl/maps/b8eBnFeEr47F8uC96';
      break;
    case 'Randers':
      googleMapsLink = 'https://goo.gl/maps/81ujm1QVnNaTQgPr9';
      break;
    case 'Herning':
      googleMapsLink = 'https://goo.gl/maps/tcuzxbDYch4TohDa6';
      break;
    case 'Roskilde':
      googleMapsLink = 'https://goo.gl/maps/oXPQSv5UAMsZSPkt5';
      break;
    case 'Horsens':
      googleMapsLink = 'https://goo.gl/maps/a1SQgg4nufH9q4Kk6';
      break;
  }
  return googleMapsLink;
}