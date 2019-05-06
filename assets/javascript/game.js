// GLOBAL VARIABLES

var nashvilleWords = ["Broadway", "Vanderbilt", "Grand Ole Opry", "Ryman", "Parthenon", "Nissan Stadium", "Frist Center", "Cheekwood"];
// Source: https://www.kirupa.com/html5/picking_random_item_from_array.htm
var randomWord = nashvilleWords[Math.floor(Math.random() * nashvilleWords.length)].toLowerCase();
console.log(randomWord);
// Count without spaces: https://stackoverflow.com/questions/26389745/how-to-count-the-number-of-characters-without-spaces
var wordLength = randomWord.replace(/\s/g, "").length;
var nashvilleWord = document.getElementById("nashville-word");
var guesses = guesses(wordLength, 7);
var guessedLetters = [];
var userguess;



// FUNCTIONS

function guesses(x, y) {
    return x + y;
}

document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();
    // console.log(userGuess);

    searchedLetter = randomWord.includes(userGuess);

    // Using Regular Expressions to check if the user input was valid (i.e. a letter key only, a-z).
    // Source: https://stackoverflow.com/questions/2257070/detect-numbers-or-letters-with-jquery-javascript
    if (!/^[a-z]$/.test(userGuess)) {
        console.log("This is NOT a valid guess.");
    } else if (searchedLetter) {
        console.log("They match");
        guesses--;
        console.log(guesses);
        guessedLetters.push(userGuess);
        document.getElementById("letters-guessed").innerHTML = guessedLetters;
        console.log(guessedLetters);
    } else {
        console.log("They don't match");
        guesses--;
        console.log(guesses);
        guessedLetters.push(userGuess);
        document.getElementById("letters-guessed").innerHTML = guessedLetters;
        console.log(guessedLetters);
    };

    if (guesses === 0) {
        alert("Sorry. You are out of guesses");
    };
};



// LOGIC

for (i = 0; i < wordLength; i++) {
    document.getElementById("nashville-word").innerHTML = " _ ".repeat(wordLength);
};

// for (j = 0; j === randomWord.length; j++) {
//     document.getElementById("letters-guessed").innerHTML = guessedLetters[j] + " ";
// };
