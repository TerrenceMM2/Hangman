var nashvilleWords = ["Broadway", "Vanderbilt", "Grand Ole Opry", "Ryman", "Parthenon", "Nissan Stadium", "Frist Center", "Cheekwood"];
var guesses = 15;

// Source: https://www.kirupa.com/html5/picking_random_item_from_array.htm
var randomWord = nashvilleWords[Math.floor(Math.random() * nashvilleWords.length)];

console.log(randomWord);

var blankSpace = " _ ";
// Count without spaces: https://stackoverflow.com/questions/26389745/how-to-count-the-number-of-characters-without-spaces
var wordLength = randomWord.replace(/\s/g, "").length;
var nashvilleWord = document.getElementById("nashville-word")

for (i = 0; i < wordLength; i++) {
    document.getElementById("nashville-word").innerHTML = document.write(blankSpace);
};

// var guessLetters = randomWord.charAt(i);
