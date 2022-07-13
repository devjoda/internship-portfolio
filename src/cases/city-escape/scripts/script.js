/*
 * OUT OF SCOPE LINKS
 *
 * Funktionalitet som laver en lille confirmation dialog ved klik på HTML-elementer med særlige klasser, og leverer en bid information.
 * Alle elementer med 'out-of-scope'-klassen og 'out-of-time'-klassen gemmes i arrays gennem querySelectorAll-metoden, og traverseres gennem et forEach-loop.
 * Hvert element får knyttet en onclick-event listener til sig, som udløser en bekræftelsesdialog med information. Informationen er unik alt efter hvilken
 * besked, der bliver passed som 2. inputsparameter (en af de to konstanter, som deklareres indledningsvist).
 */

const OUT_OF_SCOPE_MESSAGE = 'Linket peger på tomt indhold, som vi har fravalgt i vores scope 🎯';
const OUT_OF_TIME_MESSAGE = 'Linket peger på tomt indhold, som vi havde håbet at kunne få med i vores endelige løsning, men som vi har nedprioriteret og udeladt pga. tidsmæssige udfordringer 🕒.';

addConfirmationDialogs('out-of-scope', OUT_OF_SCOPE_MESSAGE);
addConfirmationDialogs('out-of-time', OUT_OF_TIME_MESSAGE);

function addConfirmationDialogs(className, message) {
  document.querySelectorAll(`.${className}`).forEach((element) => {
    element.addEventListener('click', () => {
      confirm(message);
    });
  });
}