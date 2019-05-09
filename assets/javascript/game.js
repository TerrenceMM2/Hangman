// GLOBAL VARIABLES
///////////////////////////////////////////////////////////////////////////////////////////////////

var nashvilleArray = ["Broadway", "Vanderbilt", "Grand Ole Opry", "Ryman", "Parthenon", "Nissan Stadium", "Frist Center", "Cheekwood"];

// Source: https://www.kirupa.com/html5/picking_random_item_from_array.htm
var randomWord = nashvilleArray[Math.floor(Math.random() * nashvilleArray.length)].toLowerCase();
console.log("random word", randomWord);

// randomWordLetters = ["B", "r", "o", "a", "d", "w", "a", "y"]
var randomWordLetters = [];

for (var l = 0; l < randomWord.length; l++) {
    randomWordLetters.push(randomWord.charAt(l));
    // Source: https://stackoverflow.com/questions/20668872/remove-whitespace-only-array-elements
    // Removes the space characters from the array;
    randomWordLetters = randomWordLetters.filter(function (str) {
        return /\S/.test(str);
    });
};

// Count without spaces: https://stackoverflow.com/questions/26389745/how-to-count-the-number-of-characters-without-spaces
// wordLength = 8
var wordLength = randomWord.length;

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

for (i = 0; i < wordLength; i++) {
    blankSpaces.push(" _ ");
    if (randomWord[i] === " ") {
        blankSpaces.splice(i, 1, "&nbsp;");
        document.getElementById("nashville-word").innerHTML = blankSpaces.join(" ");
    } else {
        document.getElementById("nashville-word").innerHTML = blankSpaces.join(" ");
    };
};


// To remove "&nbsp;" from blankSpaces array to be used to compare randomWordLetters array.
// Source: https://flaviocopes.com/how-to-remove-item-from-array/
var whiteSpace = "&nbsp;";
var blankSpacesMinusSpace = blankSpaces.filter(item => !whiteSpace.includes(item));

var randomWordLettersWithSpaces = [];

for (var x = 0; x < randomWord.length; x++) {
    if (randomWord[x] === " ") {
        randomWordLettersWithSpaces.splice(i, 1, " _ ");
    }
    randomWordLettersWithSpaces.push(randomWord.charAt(x));
    randomWordLettersWithSpaces = randomWordLettersWithSpaces.filter(function (str) {
        return /\S/.test(str);
    });
};

var indexes = [];




// FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////////////////////

function guesses(x, y) {
    return x + y;
};

function incorrectGuess() {
    guessedLetters.push(userGuess);
    document.getElementById("letters-guessed").innerHTML = guessedLetters.join(" ");
    guesses--;
    console.log("incorrect function   ", guesses)
};

function correctGuess(indexes) {
    indexes.forEach(function (item) {
        blankSpacesMinusSpace.splice(item, 1, userGuess);
        console.log(blankSpacesMinusSpace);
        blankSpaces.splice(item, 1, userGuess);
        console.log(blankSpaces);
        document.getElementById("nashville-word").innerHTML = blankSpaces.join(" ");
    });
    guesses--;
    console.log("correct function   ", guesses);
};

// Finds all instances of user input.
// Source: https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array
function getAllIndexes(arr, val) {
    indexes = [];
    for (var j = 0; j < arr.length; j++)
        if (arr[j] === val)
            indexes.push(j);
    correctGuess(indexes);
};

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
};



document.onkeyup = function (event) {
    userGuess = event.key.toLowerCase();

    searchedLetter = randomWord.includes(userGuess);

    // Using Regular Expressions to check if the user input was valid (i.e. a letter key only, a-z).
    // Source: https://stackoverflow.com/questions/2257070/detect-numbers-or-letters-with-jquery-javascript
    if (!/^[a-z]$/.test(userGuess)) {
        console.log("This is NOT a valid guess.");
    } else if (blankSpaces.includes(userGuess) || guessedLetters.includes(userGuess)) {
        console.log("You've guesses this letter already.", guesses);
    } else if (searchedLetter) {
        getAllIndexes(randomWord, userGuess);
    } else {
        console.log("They don't match");
        incorrectGuess();
    };

    if (arraysEqual(blankSpaces, randomWordLetters)) {
        alert("You Win!")
    } else if (arraysEqual(blankSpacesMinusSpace, randomWordLettersWithSpaces)) {
        alert("You win!")
    } else if (guesses === 0) {
        alert("Sorry. You are out of guesses.");
    };
};



// LOGIC
///////////////////////////////////////////////////////////////////////////////////////////////////

// Adds " _ " to an array.






// Source: https://mariusschulz.com/blog/removing-elements-from-javascript-arrays
// Removes element from an array.
// function remove(array, element) {
//     return array.filter(el => el !== element);
// };





// for (var m = 0; m < blankSpacesMinusSpace.length; m++){ 
//     if (blankSpacesMinusSpace[m] === "&nbsp;") {
//       blankSpacesMinusSpace.splice(m, 1); 
//     }
//  };

// if guess is correct find indexof of character is the word.Adds
// loop to find each letter.