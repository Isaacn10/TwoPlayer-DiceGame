'use strict';

const player0EL = document.querySelector('.player-0');
const player1EL = document.querySelector('.player-1');
const score0El = document.getElementById('playerscore-0');
const score1El = document.getElementById('playerscore-1');
const dice1El = document.querySelector('.dice1');
const dice2El = document.querySelector('.dice2');
const diceRoll = document.querySelector('.roll-button');
const newGame = document.querySelector('.newgame-button');
const roundNumber = document.querySelector('.round-number');
const gameResult = document.querySelector('.game-result');
// const roundResult = document.querySelector('.round-result'); //both the round and game results will be displayed on the gameResult variable

let rollCount,
  activePlayer,
  currentScore,
  roundsToPlay,
  roundCount,
  player1RoundWins,
  player2RoundWins,
  playing;

const resetGame = function () {
  // Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;

  //Tracks the number of rolls
  rollCount = 0;
  // We need to keep track of which player is playing and their score
  activePlayer = 0;
  currentScore = 0;

  roundsToPlay = 5; // Set the number of rounds to play
  roundCount = 0; // Keep track of the current round
  player1RoundWins = 0; // Keep track of Player 1's round wins
  player2RoundWins = 0; // Keep track of Player 2's round wins
  roundNumber.textContent = 0;

  gameResult.textContent = '';
  // roundResult.textContent = '';

  // Enable the dice roll button
  diceRoll.disabled = false;
};
resetGame();

// Rolling dice functionality
// ...
diceRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice1 = Math.trunc(Math.random() * 6) + 1;
    const dice2 = Math.trunc(Math.random() * 6) + 1;

    const diceScore = dice1 + dice2;
    // 2. Display dice
    dice1El.src = `dice-${dice1}.png`;
    dice2El.src = `dice-${dice2}.png`;
    // 3. Increment rollCount for the current player
    rollCount++;
    // 4. Check if the current player has rolled three times
    if (rollCount === 3) {
      // Add dice score to the current player's score
      currentScore += diceScore;
      document.getElementById(`playerscore-${activePlayer}`).textContent =
        currentScore; // Update the displayed score for the active player based on the value of currentScore.

      // Check if both players have completed their rolls
      if (activePlayer === 1) {
        // Round is complete; compare scores and display the round winner
        if (score0El.textContent > score1El.textContent) {
          gameResult.textContent = 'Player 1 Wins The Round 🏅';
          player1RoundWins++;
        } else if (score1El.textContent > score0El.textContent) {
          gameResult.textContent = 'Player 2 Wins The Round 🏅';
          player2RoundWins++;
        } else {
          roundResult.textContent = 'The Round is Tied 🏅';
        }
      }

      // Check the game has ended (5 rounds played)
      if (roundCount === roundsToPlay) {
        // Determine the game winner based on the number of round won
        if (player1RoundWins > player2RoundWins) {
          gameResult.textContent = `Player 1 Wins The Game 🏆! (${player1RoundWins} Rounds To ${player2RoundWins})`;
        } else if (player2RoundWins > player1RoundWins) {
          gameResult.textContent = `Player 2 Wins The Game 🏆!  (${player2RoundWins} Rounds To ${player1RoundWins})`;
        } else {
          gameResult.textContent = 'The Game is Tied 🏆!';
        }

        // Disable the dice roll button and set playing to false
        diceRoll.disabled = true;
        playing = false;
      } else {
        //continue the next round
        if (activePlayer === 0) {
          //Increment rounds count
          roundCount++;
          roundNumber.textContent = roundCount;
          // rollCount.textContent = `Round: ${roundCount}/${roundsToPlay}`;
        }
      }

      // Reset rollCount and currentScore for the new player
      rollCount = 0;
      currentScore = 0;

      // Switch to the other player
      activePlayer = 1 - activePlayer; // Toggle between 0 and 1
      player0EL.classList.toggle('player-active'); //Switches color for the active player
      player1EL.classList.toggle('player-active'); //Must do it on both so only one has the active class on them
    } else {
      // Add dice score to the current player's score
      currentScore += diceScore;
    }
  }
});

newGame.addEventListener('click', resetGame);
