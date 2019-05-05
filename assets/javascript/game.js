// GLOBAL VARIABLES

var nashvilleWords = ["Broadway", "Vanderbilt", "Grand Ole Opry", "Ryman", "Parthenon", "Nissan Stadium", "Frist Center", "Cheekwood"];
var guesses = 15;

// Source: https://www.kirupa.com/html5/picking_random_item_from_array.htm
var randomWord = nashvilleWords[Math.floor(Math.random() * nashvilleWords.length)].toLowerCase();
console.log(randomWord);
// Count without spaces: https://stackoverflow.com/questions/26389745/how-to-count-the-number-of-characters-without-spaces
var wordLength = randomWord.replace(/\s/g, "").length;
var nashvilleWord = document.getElementById("nashville-word");


// FUNCTIONS

document.onkeyup = function userGuess(event) {
    var userGuess = event.key.toLowerCase();
    console.log(userGuess);

    var searchedLetter = randomWord.includes(userGuess);
    console.log(searchedLetter);

    // if (searchedLetter === userGuess) {
    //     console.log("They match");
    // } else {
    //     console.log("They don't match");
    // }

};


// LOGIC

for (i = 0; i < wordLength; i++) {
    document.getElementById("nashville-word").innerHTML = " _ ".repeat(wordLength);
};

// var guessedLetter = randomWord.search(userGuess);