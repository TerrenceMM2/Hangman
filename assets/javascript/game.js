var nashvilleArray = ["Broadway", "Vanderbilt", "Grand Ole Opry", "Ryman Auditorium", "Parthenon", "Nissan Stadium", "Frist Center", "Cheekwood", "Zoo at Grassmere", "The Hermitage", "Nashville Shores", "General Jackson Showboat", "Printers Alley", "The Gulch", "Bicentennial Park", "Belle Meade Plantation"];

// var nashvilleArray = ["aaa bbb ccc ddd"];

var winTotal = 0;
var lossTotal = 0;

var randomWord;
var randomWordLetters = [];
var blankSpaces = [];

function startGame() {

    initializeGuessedLetters();

    resetImage();
    resetNumberOfGuessesStyling();
    resetGuessedLetters();
    resetMessage();

    musicBed();

    stopWinningSound();
    stopLosingSound();

    chooseRandomWord();

    var userGuess;
    var guessedLetters = [];

    var indexes = [];

    var alertMessages = ['Please choose a letter.', 'You have already chosen this letter. Please choose again.', 'YOU WIN!', 'Sorry. You lose. Better luck next time.', 'Please press the "Start Game" button to begin again.', 'Out of guesses'];

    var guesses = 5;


    function incorrectGuess() {
        guessedLetters.push(userGuess);
        document.getElementById("letters-guessed").innerHTML = guessedLetters.join(" ");
        return guesses--;
    };

    function correctGuess(indexes) {
        indexes.forEach(function (item) {
            blankSpaces.splice(item, 1, userGuess);
            randomWordBlanks.splice(item, 1, userGuess);
            document.getElementById("nashville-word").innerHTML = blankSpaces.join(" ");
        });
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
        if (arraysEqual(randomWordBlanks, randomWordLetters)) {
            alertMessage(2);
            winTotal++;
            stopMusicBed();
            winningSound();
            document.getElementById("win-total").innerHTML = winTotal;
            winningImage(randomWord);
        } else if (guesses === 0) {
            alertMessage(3);
            lossTotal++;
            losingSound();
            stopMusicBed();
        } else if (guesses < 0) {
            alertMessage(4);
            document.getElementById("guesses-remaining").innerHTML = alertMessages[5];
        };

        if (guesses === 3) {
            var x = document.getElementById("guesses-remaining");
            x.style.color = "#ffc107";
            x.style.fontWeight = "700";
            x.style.fontSize = "1.8rem";
        } else if (guesses === 2) {
            var x = document.getElementById("guesses-remaining");
            x.style.color = "#e68a00";
            x.style.fontWeight = "800";
            x.style.fontSize = "1.9rem";
        } else if (guesses === 1) {
            var x = document.getElementById("guesses-remaining");
            x.style.color = "#cc2900";
            x.style.fontWeight = "900";
            x.style.fontSize = "2rem";
        };

    };

    function chooseRandomWord() {
        blankSpaces = []; // Displayed to user
        blanksIncludeSpaces = [];
        randomWord = nashvilleArray[Math.floor(Math.random() * nashvilleArray.length)].toLowerCase();
        randomWordLetters = []; // To be analyzed against
        randomWordBlanks = []; // To be filled in as used types

        if (randomWord.search(" ")) {
            for (var x = 0; x < randomWord.length; x++) {
                blankSpaces.push(" _ ");
                randomWordBlanks.push(" ");
                blanksIncludeSpaces.push(randomWord.charAt(x));
                randomWordLetters.push(randomWord.charAt(x));
                if (randomWord[x] === " ") {
                    blankSpaces.splice(x, 1, "&nbsp;");
                    randomWordBlanks.splice(x, 1, " ");
                }
            };
        };
        document.getElementById("nashville-word").innerHTML = blankSpaces.join(" ");
    };

    function initializeGuessedLetters() {
        blanksSpaces = [];
        document.getElementById("letters-guessed").textContent = blankSpaces;
    };

    document.getElementById("win-total").innerHTML = winTotal;
    document.getElementById("loss-total").innerHTML = lossTotal;
    document.getElementById("guesses-remaining").innerHTML = guesses;
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

function stopMusicBed() {
    var audio = document.getElementById("music-bed");
    audio.pause();
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

function resetGuessedLetters() {
    guessedLetters = "&nbsp;";
    document.getElementById("letters-guessed").innerHTML = guessedLetters;
};

function resetNumberOfGuessesStyling() {
    var guessesStyling = document.getElementById("guesses-remaining");
    guessesStyling.style.color = null;
    guessesStyling.style.fontWeight = null;
    guessesStyling.style.fontSize = null;
};

function restrictSpace() {
    if (event.keyCode == 32 || event.keyCode == 13) {
        event.returnValue = false;
        return false;
    }
};

function resetImage() {
    var resetImage = document.getElementById("image-placeholder");
    resetImage.style.display = "none";
    resetImage.removeAttribute("src");
};

function winningImage(randomWord) {
    var b = document.getElementById("image-placeholder")
    if (randomWord === "broadway") {
        b.setAttribute("src", "assets/images/broadway.jpg");
        b.style.display = "block";
    } else if (randomWord === "vanderbilt") {
        b.setAttribute("src", "assets/images/vanderbilt.jpg");
        b.style.display = "block";
    } else if (randomWord === "grand ole opry") {
        b.setAttribute("src", "assets/images/grand_ole_opry.jpg");
        b.style.display = "block";
    } else if (randomWord === "ryman auditorium") {
        b.setAttribute("src", "assets/images/ryman.jpg");
        b.style.display = "block";
    } else if (randomWord === "parthenon") {
        b.setAttribute("src", "assets/images/parthenon.jpg");
        b.style.display = "block";
    } else if (randomWord === "nissan stadium") {
        b.setAttribute("src", "assets/images/nissan_stadium.jpg");
        b.style.display = "block";
    } else if (randomWord === "frist center") {
        b.setAttribute("src", "assets/images/frist_center.jpg");
        b.style.display = "block";
    } else if (randomWord === "cheekwood") {
        b.setAttribute("src", "assets/images/cheekwood.jpg");
        b.style.display = "block";
    } else if (randomWord === "zoo at grassmere") {
        b.setAttribute("src", "assets/images/zoo.jpg");
        b.style.display = "block";
    } else if (randomWord === "the hermitage") {
        b.setAttribute("src", "assets/images/hermitage.jpg");
        b.style.display = "block";
    } else if (randomWord === "nashville shores") {
        b.setAttribute("src", "assets/images/nashville_shores.jpg");
        b.style.display = "block";
    } else if (randomWord === "general jackson showboat") {
        b.setAttribute("src", "assets/images/general_jackson.jpg");
        b.style.display = "block";
    } else if (randomWord === "printers alley") {
        b.setAttribute("src", "assets/images/printers_alley.jpg");
        b.style.display = "block";
    } else if (randomWord === "the gulch") {
        b.setAttribute("src", "assets/images/gulch.jpg");
        b.style.display = "block";
    } else if (randomWord === "bicentennial park") {
        b.setAttribute("src", "assets/images/bicentennial_park.jpg");
        b.style.display = "block";
    } else if (randomWord === "belle meade plantation") {
        b.setAttribute("src", "assets/images/belle_meade.jpg");
        b.style.display = "block";
    }
};