"use strict";
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const currentscore0 = document.querySelector("#current--0");
const currentscore1 = document.querySelector("#current--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

let playing, score, currentScore, activePlayer;
const reset = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;
  dice.classList.add("hidden");

  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");

  player1.classList.add("player--active");
  player2.classList.remove("player--active");
};
reset();
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

// reset();
btnRoll.addEventListener("click", function () {
  if (playing) {
    //rolling dice
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    //   console.log(diceRoll);
    //displaying dice
    dice.classList.remove("hidden");
    dice.src = `./images/dice-${diceRoll}.png`;
    //adding to current score
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player1.classList.toggle("player--active");
      player2.classList.toggle("player--active");
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //hold the score
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    //check if score is >= 100
    if (score[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    //switch to player
    switchPlayer();
  }
});
btnNew.addEventListener("click", reset);
