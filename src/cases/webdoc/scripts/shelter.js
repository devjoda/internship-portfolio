const BIRDS_TEXT = document.querySelectorAll('.birds-text');
const CAMPFIRE_TEXT = document.querySelectorAll('.campfire-text');
const RAIN_TEXT = document.querySelectorAll('.rain-text');

const BIRDS_CIRCLES = document.querySelectorAll('.birds-circle');
const CAMPFIRE_CIRCLES = document.querySelectorAll('.campfire-circle');
const RAIN_CIRCLES = document.querySelectorAll('.rain-circle');

const BACK_ARROW_FALLBACK = document.getElementsByClassName('back-arrow')[1];

let audioElement = null;
let activeSound = null;

BIRDS_TEXT.forEach(element => element.addEventListener('click', playAudioFile1));
CAMPFIRE_TEXT.forEach(element => element.addEventListener('click', playAudioFile2));
RAIN_TEXT.forEach(element => element.addEventListener('click', playAudioFile3));

BACK_ARROW_FALLBACK.addEventListener('click', goBack);

function playAudioFile1() {
  if (activeSound !== null) {
    clearActiveStyles();
    stopActivePlayback();
  }
  if (activeSound !== 'birds') {
    activeSound = 'birds';
    BIRDS_CIRCLES.forEach(element => element.style.fill = 'black');
    BIRDS_TEXT.forEach(element => element.style.fill = 'white');
    audioElement = new Audio(`audio/shelter/birds.mp3`);
    audioElement.volume = 1;
    audioElement.loop = true;
    audioElement.play();
  } else {
    activeSound = null;
  }
}

function playAudioFile2() {
  {
    if (activeSound !== null) {
      clearActiveStyles();
      stopActivePlayback();
    }
    if (activeSound !== 'campfire') {
      activeSound = 'campfire';
      CAMPFIRE_CIRCLES.forEach(element => element.style.fill = 'black');
      CAMPFIRE_TEXT.forEach(element => element.style.fill = 'white');
      audioElement = new Audio(`audio/shelter/campfire.mp3`);
      audioElement.volume = 1;
      audioElement.loop = true;
      audioElement.play();
    } else {
      activeSound = null;
    }
  }
}

function playAudioFile3() {
  {
    if (activeSound !== null) {
      clearActiveStyles();
      stopActivePlayback();
    }
    if (activeSound !== 'rain') {
      activeSound = 'rain';
      RAIN_CIRCLES.forEach(element => element.style.fill = 'black');
      RAIN_TEXT.forEach(element => element.style.fill = 'white');
      audioElement = new Audio(`audio/shelter/rain.wav`);
      audioElement.volume = 1;
      audioElement.loop = true;
      audioElement.play();
    } else {
      activeSound = null;
    }
  }
}

function isPlaying(element) {
  if (element.paused) {
    return false;
  }
  return true;
}

function stopActivePlayback() {
  if (audioElement !== null) {
    if (isPlaying(audioElement)) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }
}

function clearActiveStyles() {
  BIRDS_CIRCLES.forEach(element => element.style.fill = 'none');
  CAMPFIRE_CIRCLES.forEach(element => element.style.fill = 'none');
  RAIN_CIRCLES.forEach(element => element.style.fill = 'none');
  BIRDS_TEXT.forEach(element => element.style.fill = 'black');
  CAMPFIRE_TEXT.forEach(element => element.style.fill = 'black');
  RAIN_TEXT.forEach(element => element.style.fill = 'black');
}

function goBack() { 
  window.location.href = "overview.html";
}