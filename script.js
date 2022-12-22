const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const startgameEl = document.getElementById('start-game-container');
const startBtn = document.getElementById('start');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const apiUrl = 'https://random-word-api.herokuapp.com/word';

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let randomWord;
let score = 0;
let time = 10;

// Set difficulty to value in ls or meduim
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Start game
function gameStart() {
  startgameEl.style.display = 'none';

  // Update time
  function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
      clearInterval(timeInterval);
      // end game
      gameOver();
    }
  }

  // Start counting down
  const timeInterval = setInterval(updateTime, 1000);

  // Focus on text on start
  text.focus();
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

addWordToDOM();

// Event listeners
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') time += 1;
    else if (difficulty === 'medium') time += 3;
    else time += 5;
  }
});

// Start game click
startBtn.addEventListener('click', () => {
  // Typing
  gameStart();
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
