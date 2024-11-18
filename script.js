"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const playerEl = document.querySelectorAll(".player");

//Starting conditions
let scores, current, activePlayer, dice, playing;

const newGame = function () {
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");
  diceEl.classList.add("hidden");

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  dice = 0;
  playing = true;
};

const rollDice = function () {
  if (playing) {
    dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      current += dice;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else updateScore();
  }
};

const updateScore = function () {
  if (playing) {
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      current = 0;
      activePlayer = activePlayer ? 0 : 1;
      for (let i = 0; i < playerEl.length; i++)
        playerEl[i].classList.toggle("player--active");
    }
  }
};

newGame();

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", updateScore);
btnNew.addEventListener("click", newGame);
