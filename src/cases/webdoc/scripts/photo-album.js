const BACK_ARROW_FALLBACK = document.getElementsByClassName('back-arrow')[1];

BACK_ARROW_FALLBACK.addEventListener('click', goBack);

function goBack() {
  window.location.href = 'overview.html';
}
