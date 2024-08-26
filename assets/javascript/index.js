import {
  PLAY_SOUND,
  STOP_SOUND,
  alertMessages,
  nashvilleArray,
} from "./consts.js";
import { winningImages } from "./consts.js";
import { handleSound } from "./utils.js";

function startGame() {
  let winTotal = 0;
  let lossTotal = 0;

  let randomWord;
  let randomWordLetters = [];
  let blankSpaces = [];
  let blanksIncludeSpaces = [];
  let randomWordBlanks = [];

  let userGuess;
  let guessedLetters;
  let searchedLetter;

  let indexes = [];

  let guesses = 5;

  initializeGuessedLetters();

  resetImage();
  resetNumberOfGuessesStyling();
  resetGuessedLetters();
  resetMessage();

  handleSound("music-bed", PLAY_SOUND, true);
  handleSound("winning-sound", "stop");
  handleSound("losing-sound", "stop");

  chooseRandomWord();

  function incorrectGuess(letter) {
    guessedLetters.push(letter);
    document.getElementById("letters-guessed").innerHTML =
      guessedLetters.join(" ");
    return guesses--;
  }

  function correctGuess(indexes) {
    for (const item of indexes) {
      blankSpaces.splice(item, 1, userGuess);
      randomWordBlanks.splice(item, 1, userGuess);
      document.getElementById("nashville-word").innerHTML =
        blankSpaces.join(" ");
    }
  }

  // Finds all instances of user input.
  // Source: https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array
  function getAllIndexes(arr, val) {
    indexes = [];
    for (let j = 0; j < arr.length; j++) if (arr[j] === val) indexes.push(j);
    correctGuess(indexes);
  }

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  function alertMessage(num) {
    const a = document.getElementById("alert-message");
    if (num === 0) {
      a.innerHTML = alertMessages[0];
      a.className = "alert alert-danger";
      a.style.display = "block";
    } else if (num === 1) {
      a.innerHTML = alertMessages[1];
      a.className = "alert alert-warning";
      a.style.display = "block";
    } else if (num === 2) {
      a.innerHTML = alertMessages[2];
      a.className = "alert alert-success";
      a.style.display = "block";
    } else if (num === 3) {
      a.innerHTML = alertMessages[3];
      a.className = "alert alert-secondary";
      a.style.display = "block";
    } else if (num === 4) {
      a.innerHTML = alertMessages[4];
      a.className = "alert alert-primary";
      a.style.display = "block";
    } else {
      resetMessage();
    }
  }

  function resetMessage() {
    document.getElementById("alert-message").style.display = "none";
  }

  function resetGuessedLetters() {
    guessedLetters = [];
    document.getElementById("letters-guessed").innerHTML = guessedLetters;
  }

  function resetNumberOfGuessesStyling() {
    const guessesStyling = document.getElementById("guesses-remaining");
    guessesStyling.style.color = null;
    guessesStyling.style.fontWeight = null;
    guessesStyling.style.fontSize = null;
  }

  function resetImage() {
    const resetImage = document.getElementById("image-placeholder");
    resetImage.style.display = "none";
    resetImage.removeAttribute("src");
  }

  function winningImage(randomWord) {
    const b = document.getElementById("image-placeholder");
    const obj = winningImages.find((x) => x.id === randomWord);
    b.setAttribute("src", obj.src);
    b.style.display = "block";
  }

  document.onkeyup = (event) => {
    userGuess = event.key.toLowerCase();

    searchedLetter = randomWord.includes(userGuess);

    restrictSpace();

    // Using Regular Expressions to check if the user input was valid (i.e. a letter key only, a-z).
    // Source: https://stackoverflow.com/questions/2257070/detect-numbers-or-letters-with-jquery-javascript
    if (!/^[a-z]$/.test(userGuess)) {
      alertMessage(0);
      handleSound("error-sound", PLAY_SOUND);
    } else if (
      blankSpaces.includes(userGuess) ||
      guessedLetters.includes(userGuess)
    ) {
      alertMessage(1);
      handleSound("error-sound", PLAY_SOUND);
    } else if (searchedLetter) {
      getAllIndexes(randomWord, userGuess);
      document.getElementById("guesses-remaining").innerHTML = guesses;
      alertMessage();
      handleSound("correct-guess-sound", PLAY_SOUND);
    } else {
      incorrectGuess(userGuess);
      document.getElementById("guesses-remaining").innerHTML = guesses;
      alertMessage();
      handleSound("incorrect-guess-sound", PLAY_SOUND);
    }

    // Calculates winning or losing scenarios
    if (arraysEqual(randomWordBlanks, randomWordLetters)) {
      alertMessage(2);
      winTotal++;
      handleSound("music-bed", STOP_SOUND);
      handleSound("winning-sound", PLAY_SOUND);
      document.getElementById("win-total").innerHTML = winTotal;
      winningImage(randomWord);
    } else if (guesses === 0) {
      alertMessage(3);
      lossTotal++;
      handleSound("losing-sound", PLAY_SOUND);
      handleSound("music-bed", STOP_SOUND);
    } else if (guesses < 0) {
      alertMessage(4);
      document.getElementById("guesses-remaining").innerHTML = alertMessages[5];
    }

    if (guesses === 3) {
      const x = document.getElementById("guesses-remaining");
      x.style.color = "#ffc107";
      x.style.fontWeight = "700";
      x.style.fontSize = "1.8rem";
    } else if (guesses === 2) {
      const x = document.getElementById("guesses-remaining");
      x.style.color = "#e68a00";
      x.style.fontWeight = "800";
      x.style.fontSize = "1.9rem";
    } else if (guesses === 1) {
      const x = document.getElementById("guesses-remaining");
      x.style.color = "#cc2900";
      x.style.fontWeight = "900";
      x.style.fontSize = "2rem";
    }
  };

  function chooseRandomWord() {
    blankSpaces = []; // Displayed to user
    blanksIncludeSpaces = [];
    randomWord =
      nashvilleArray[
        Math.floor(Math.random() * nashvilleArray.length)
      ].toLowerCase();
    randomWordLetters = []; // To be analyzed against
    randomWordBlanks = []; // To be filled in as used types

    if (randomWord.search(" ")) {
      for (let x = 0; x < randomWord.length; x++) {
        blankSpaces.push(" _ ");
        randomWordBlanks.push(" ");
        blanksIncludeSpaces.push(randomWord.charAt(x));
        randomWordLetters.push(randomWord.charAt(x));
        if (randomWord[x] === " ") {
          blankSpaces.splice(x, 1, "&nbsp;");
          randomWordBlanks.splice(x, 1, " ");
        }
      }
    }
    document.getElementById("nashville-word").innerHTML = blankSpaces.join(" ");
  }

  function initializeGuessedLetters() {
    blankSpaces = [];
    document.getElementById("letters-guessed").textContent = blankSpaces;
  }

  document.getElementById("win-total").innerHTML = winTotal;
  document.getElementById("loss-total").innerHTML = lossTotal;
  document.getElementById("guesses-remaining").innerHTML = guesses;
}

function restrictSpace() {
  if (event.keyCode === 32 || event.keyCode === 13) {
    event.returnValue = false;
    return false;
  }
}

window.startGame = startGame;
window.restrictSpace = restrictSpace;
