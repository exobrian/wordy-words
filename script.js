const wordsURL = "https://raw.githubusercontent.com/exobrian/wordy-words/main/resources/wordsList.json";
let maxWordLength = 0;
let longestWord = "";
let wordDictionary = {};
let randInt;
let correctWord;
let currentIndex = 0;
let currentGuess = [];

//Initialize with 5 letters to avoid ref errors
let wordLengthSelected = 5;
let guessesRemaining = wordLengthSelected;

// Need to run this first in order to force other functions to wait until the json file has been loaded.
// Each chain returns a promise object. Then only called once preceding promise is fulfilled.
// Need to add catch at the end of chain to handle exceptions. 
fetch(wordsURL)
.then(response => response.json())
.then(json => {
    createDictionary(json);
    correctWord = getNewWord();
});

function createDictionary(words) {
    // Parse through json list of words. Create wordDictionary using lengths of words as keys and keep track of the longest word.
    for (let key in words){
        // Keep track of the largest word in order to limit the number of letters allowed to be selected
        if (key.length > maxWordLength){
            maxWordLength = key.length;
            longestWord = key;
        }

        // Create our dictionary by either appending words to the length keys or create a new array for the key.
        if (key.length in wordDictionary){
            wordDictionary[key.length].push(key);
        } else {
            wordDictionary[key.length] = [key];
        }
    }
}

function isValidLength() {
    // function returns true if word length selected by the user exists in our dictionary
    return document.getElementById("number-of-letters").value in wordDictionary;
}

function getNewWord() {
    // Check if word length is valid first. Then clear old board, create a new board, and select a random word from our dictionary.
    if (isValidLength()){
        wordLengthSelected = document.getElementById("number-of-letters").value;
        guessesRemaining = wordLengthSelected;
        randInt = Math.floor(Math.random() * (wordDictionary[wordLengthSelected].length - 1));
        correctWord = wordDictionary[wordLengthSelected][randInt];
        document.getElementById("correct-word").innerHTML = "New word is " + correctWord;
        clearGameBoard();
        initGameBoard();
    } else {
        document.getElementById("correct-word").innerHTML = "Word Length is invalid. Please select another length between 1-" + maxWordLength + ".";
    }
    return correctWord;
}

function initGameBoard(){
    // Create the div containers for each letter in each guess.
    let gameBoard = document.getElementById("game-board");
    for (let i = 0; i < wordLengthSelected; i++){
        let row = document.createElement("div");
        console.log("creating a row:");
        row.className = "letter-row";

        for (let j = 0; j < wordLengthSelected; j++){
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }

        // add row of letter boxes to our gameboard
        gameBoard.appendChild(row);
    }
}

function clearGameBoard(){
    // faster way of clearing child elements or letter boxes of our gameBoard.
    let gameBoard = document.getElementById("game-board");
    if (gameBoard.hasChildNodes()){
        while(gameBoard.hasChildNodes()){
            gameBoard.firstChild.remove();
        }
    }
}

function checkGuess() {
    // TODO
}

function insertLetter(pressedKey) {
    // Check if we have any more space for new letters first. Then add letter.
    if (currentIndex == wordLengthSelected){
        console.log("Word guessed is " + currentGuess);
        return;
    }

    pressedKey = pressedKey.toLowerCase();
    let row = document.getElementsByClassName("letter-row")[wordLengthSelected - guessesRemaining];
    let box = row.children[currentIndex];
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    currentIndex += 1;
}

function checkGuess() {

}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[wordLengthSelected - guessesRemaining];
    let box = row.children[currentIndex - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    currentIndex -= 1;
}

// Event listener for key presses
document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return;
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && currentIndex !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})