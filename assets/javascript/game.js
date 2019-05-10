var nashvilleArray = ["Broadway", "Vanderbilt", "Grand Ole Opry", "Ryman Auditorium", "Parthenon", "Nissan Stadium", "Frist Center", "Cheekwood", "Zoo at Grassmere", "The Hermitage", "Nashville Shores", "General Jackson Showboat", "Printers Alley", "The Gulch", "Bicentennial Park", "Belle Meade Plantation"];

// Source: https://www.kirupa.com/html5/picking_random_item_from_array.htm
var randomWord = nashvilleArray[Math.floor(Math.random() * nashvilleArray.length)].toLowerCase();

// randomWordLetters = ["B", "r", "o", "a", "d", "w", "a", "y"]
var randomWordLetters = [];

// guessedLetters = ["a", "b", "c"]
var guessedLetters = [];

var winTotal = 0;

var lossTotal = 0;

function startGame() {

    resetMessage();

    musicBed();

    stopWinningSound();

    stopLosingSound();

    resetGuessedLetters();

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

    var gussesRemaining = guesses;
    var alertMessages = ['Please choose a letter.', 'You have already choosen this letter. Please choose again.', 'YOU WIN!', 'Sorry. You lose. Better luck next time.', 'Please press the "Start Game" to begin again.', 'Out of guesses']

    var id;

    // Used to calculate guesses based on unique array values
    // Source: https://medium.com/front-end-weekly/getting-unique-values-in-javascript-arrays-17063080f836
    var unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };
    
    var uniqueRandomWordLetters = randomWordLetters.filter(unique);
    var guesses = uniqueRandomWordLetters.length + 5;


    function incorrectGuess() {
        guessedLetters.push(userGuess);
        document.getElementById("letters-guessed").innerHTML = guessedLetters.join(" ");
        return guesses--;
    };

    function correctGuess(indexes) {
        indexes.forEach(function (item) {
            blankSpacesMinusSpace.splice(item, 1, userGuess);
            blankSpaces.splice(item, 1, userGuess);
            document.getElementById("nashville-word").innerHTML = blankSpaces.join(" ");
        });
        return guesses--;
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
        if (arr1.length !== arr2.length)
            return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i] !== arr2[i])
                return false;
        };
        return true;
    };

    function alertMessage(num) {
        var a = document.getElementById("alert-message");
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
    };

    function resetMessage() {
        document.getElementById("alert-message").style.display = "none";
    };

    document.onkeyup = function (event) {
        userGuess = event.key.toLowerCase();

        searchedLetter = randomWord.includes(userGuess);

        restrictSpace();

        // Using Regular Expressions to check if the user input was valid (i.e. a letter key only, a-z).
        // Source: https://stackoverflow.com/questions/2257070/detect-numbers-or-letters-with-jquery-javascript
        if (!/^[a-z]$/.test(userGuess)) {
            alertMessage(0);
            errorSound();
        } else if (blankSpaces.includes(userGuess) || guessedLetters.includes(userGuess)) {
            alertMessage(1);
            errorSound();
        } else if (searchedLetter) {
            getAllIndexes(randomWord, userGuess);
            document.getElementById("guesses-remaining").innerHTML = guesses;
            alertMessage();
            correctGuessSound();
        } else {
            incorrectGuess();
            document.getElementById("guesses-remaining").innerHTML = guesses;
            alertMessage();
            incorrectGuessSound();
        };

        // Calculates winning or losing scenarios
        if (arraysEqual(blankSpaces, randomWordLetters)) {
            alertMessage(2);
            winTotal++;
            document.getElementById("win-total").innerHTML = winTotal;
        } else if (arraysEqual(blankSpacesMinusSpace, randomWordLettersWithSpaces)) {
            alertMessage(2);
            winTotal++;
            winningSound();
            stopMusicBed();
            document.getElementById("win-total").innerHTML = winTotal;
        } else if (guesses === 0) {
            alertMessage(3);
            lossTotal++;
            losingSound();
            stopMusicBed();
        } else if (guesses < 0) {
            alertMessage(4);
            document.getElementById("guesses-remaining").innerHTML = alertMessages[5];
        };

    };

    function correctGuessSound() {
        var audio = document.getElementById("correct-guess-sound");
        audio.play();
    };

    function incorrectGuessSound() {
        var audio = document.getElementById("incorrect-guess-sound");
        audio.play();
    };

    function errorSound() {
        var audio = document.getElementById("error-sound");
        audio.play();
    };

    function musicBed() {
        audio = document.getElementById("music-bed");
        audio.loop = true;
        audio.play();
        audio.currentTime=0;
    };

    function winningSound() {
        var audio = document.getElementById("winning-sound");
        audio.play();
        audio.currentTime = 0;
    };

    function losingSound() {
        var audio = document.getElementById("losing-sound");
        audio.play();
        audio.currentTime = 0;
    };

    function stopWinningSound() {
        var audio = document.getElementById("winning-sound");
        audio.pause();
    };

    function stopLosingSound() {
        var audio = document.getElementById("losing-sound");
        audio.pause();
    };
     

    document.getElementById("win-total").innerHTML = winTotal;
    document.getElementById("loss-total").innerHTML = lossTotal;
    document.getElementById("guesses-remaining").innerHTML = guesses;

};

function resetGuessedLetters() {
    guessedLetters = [];
    document.getElementById("letters-guessed").innerHTML = guessedLetters;
};

function pauseMusicBed() {
    var audio = document.getElementById("music-bed");
    audio.pause();
};

function stopMusicBed() {
    var audio = document.getElementById("music-bed");
    audio.pause();
};

// Allows user to stop and start audio.
// Source: https://stackoverflow.com/questions/27368778/how-to-toggle-audio-play-pause-with-one-button-or-link
function togglePlay() {
    return audio.paused ? audio.play() : audio.pause();
};

function restrictSpace() {
    if (event.keyCode == 32 || event.keyCode == 13) {
        event.returnValue = false;
        return false;
    }
};