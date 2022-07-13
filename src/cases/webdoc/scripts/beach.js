const BIRDS_TEXT = document.querySelectorAll('.birds-text');
const WATER_TEXT = document.querySelectorAll('.water-text');
const WAVES_TEXT = document.querySelectorAll('.waves-text');

const BIRDS_CIRCLES = document.querySelectorAll('.birds-circle');
const WATER_CIRCLES = document.querySelectorAll('.water-circle');
const WAVES_CIRCLES = document.querySelectorAll('.waves-circle');

const MEDITATION_1_ICONS = document.querySelectorAll('.meditation-1-icon');
const MEDITATION_1_TEXT = document.querySelectorAll('.meditation-1-text');

const MEDITATION_2_ICONS = document.querySelectorAll('.meditation-2-icon');
const MEDITATION_2_TEXT = document.querySelectorAll('.meditation-2-text');

const BACK_ARROW_FALLBACK = document.getElementsByClassName('back-arrow')[1];

BIRDS_TEXT.forEach(element => element.addEventListener('click', playAudioFile1));
WATER_TEXT.forEach(element => element.addEventListener('click', playAudioFile2));
WAVES_TEXT.forEach(element => element.addEventListener('click', playAudioFile3));

MEDITATION_1_ICONS.forEach(element => element.addEventListener('click', playAudioFile4));
MEDITATION_1_TEXT.forEach(element => element.addEventListener('click', playAudioFile4));

MEDITATION_2_ICONS.forEach(element => element.addEventListener('click', playAudioFile5));
MEDITATION_2_TEXT.forEach(element => element.addEventListener('click', playAudioFile5));

BACK_ARROW_FALLBACK.addEventListener('click', goBack);

let audioElement = null;
let activeSound = null;

function playAudioFile1() {
  if (activeSound !== null) {
    clearActiveStyles();
    stopActivePlayback();
  }
  if (activeSound !== 'birds') {
    activeSound = 'birds';
    BIRDS_CIRCLES.forEach(element => element.style.fill = 'black');
    BIRDS_TEXT.forEach(element => element.style.fill = 'white');
    audioElement = new Audio(`audio/beach/birds.mp3`);
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
    if (activeSound !== 'water') {
      activeSound = 'water';
      WATER_CIRCLES.forEach(element => element.style.fill = 'black');
      WATER_TEXT.forEach(element => element.style.fill = 'white');
      audioElement = new Audio(`audio/beach/water.mp3`);
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
    if (activeSound !== 'waves') {
      activeSound = 'waves';
      WAVES_CIRCLES.forEach(element => element.style.fill = 'black');
      WAVES_TEXT.forEach(element => element.style.fill = 'white');
      audioElement = new Audio(`audio/beach/waves.mp3`);
      audioElement.volume = 1;
      audioElement.loop = true;
      audioElement.play();
    } else {
      activeSound = null;
    }
  }
}

function playAudioFile4() {
  {
    if (activeSound !== null) {
      clearActiveStyles();
      stopActivePlayback();
    }
    if (activeSound !== 'meditation1') {
      activeSound = 'meditation1';
      MEDITATION_1_ICONS.forEach(element => element.src = "images/beach/sound.png");
      audioElement = new Audio(`audio/beach/meditation1.mp3`);
      audioElement.volume = 1;
      audioElement.loop = true;
      audioElement.play();
    } else {
      activeSound = null;
    }
  }
}

  function playAudioFile5() {
  {
    if (activeSound !== null) {
      clearActiveStyles();
      stopActivePlayback();
    }
    if (activeSound !== 'meditation2') {
      activeSound = 'meditation2';
      MEDITATION_2_ICONS.forEach(element => element.src = "images/beach/sound.png");
      audioElement = new Audio(`audio/beach/meditation2.mp3`);
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
  WATER_CIRCLES.forEach(element => element.style.fill = 'none');
  WAVES_CIRCLES.forEach(element => element.style.fill = 'none');
  BIRDS_TEXT.forEach(element => element.style.fill = 'black');
  WATER_TEXT.forEach(element => element.style.fill = 'black');
  WAVES_TEXT.forEach(element => element.style.fill = 'black');
  
  MEDITATION_1_ICONS.forEach(element => element.src = "images/beach/no-sound.png");
  MEDITATION_2_ICONS.forEach(element => element.src = "images/beach/no-sound.png");
}

function goBack() { 
  window.location.href = "overview.html";
}