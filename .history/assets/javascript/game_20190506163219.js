// GLOBAL VARIABLES

var nashvilleArray = ["Broadway", "Vanderbilt", "Grand Ole Opry", "Ryman", "Parthenon", "Nissan Stadium", "Frist Center", "Cheekwood"];

// Source: https://www.kirupa.com/html5/picking_random_item_from_array.htm
// randomwWord = Broadway
var randomWord = nashvilleArray[Math.floor(Math.random() * nashvilleArray.length)].toLowerCase();

// randomWordLetters = ["B", "r", "o", "a", "d", "w", "a", "y"]
var randomWordLetters = [];

// Count without spaces: https://stackoverflow.com/questions/26389745/how-to-count-the-number-of-characters-without-spaces
// wordLength = 8
var wordLength = randomWord.replace(/\s/g, "").length;

// nashvilleWord = "<span id="nashville-word"> _ _ _ _ _ _ _ _ </span>"
var nashvilleWord = document.getElementById("nashville-word");

// guesses = 15
var guesses = guesses(wordLength, 7);

// guessedLetters = ["a", "b", "c"]
var guessedLetters = [];

// userGuess = "a"
var userGuess;

// blankSpaces = _ _ _ _ _ _ _ _ (to be replaced if userGuess matched letters in randomWord)
var blankSpaces = [];




// FUNCTIONS

function guesses(x, y) {
    return x + y;
}

function incorrectGuess() {
    guessedLetters.push(userGuess);
    document.getElementById("letters-guessed").innerHTML = guessedLetters.join(" ");
    guesses--;
}

function correctGuess() {
    blankSpaces.splice(indexes, 0, userGuess);
    guesses--;
}

// Finds all instances of user input.
// Source: https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array
function getAllIndexes(arr, val) {
    var indexes = [], j;
    for(j = 0; j < arr.length; j++)
        if (arr[j] === val)
            indexes.push(j);
    return indexes;
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
        correctGuess();
    } else {
        console.log("They don't match");
        incorrectGuess();
    };

    if (guesses === 0) {
        alert("Sorry. You are out of guesses");
    };

    if (userGuess === randomWordLetters) {
        replaceWithLetter();
    } else {
        
    };
};



// LOGIC

// Adds " _ " to an array.
for (i = 0; i < wordLength; i++) {
    blankSpaces.push(" _ ");
    document.getElementById("nashville-word").innerHTML = blankSpaces.join(" ");
};


// Adds " _ " using .repeat
// for (i = 0; i < wordLength; i++) {
//     document.getElementById("nashville-word").innerHTML = blankSpaces.repeat(i);
// };

// for (var l = 0; l < randomWord.length; l++) {
//     randomWordLetters.push(randomWord.charAt(l));
//     // Source: https://stackoverflow.com/questions/20668872/remove-whitespace-only-array-elements
//     // Removes the space characters from the array;
//     randomWordLetters = randomWordLetters.filter(function(str) {
//         return /\S/.test(str);
//     });
// }
