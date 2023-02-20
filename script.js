const wordsURL = "https://raw.githubusercontent.com/exobrian/wordy-words/main/resources/wordsListCleaned.json"
let randInt;
let correctWord;
let currentIndex = 0;
let currentGuess = "";
let wordDictionary = {};
let maxWordLength;
let longestWord;

//Initialize with 5 letters to avoid ref errors
let wordLengthSelected = 5;
let guessesRemaining = wordLengthSelected;

// Need to run this first in order to force other functions to wait until the json file has been loaded.
// Each chain returns a promise object. Then only called once preceding promise is fulfilled.
// Refresh page if error caught. These are usually related to undefined variables due to fetch api not finishing first.
fetch(wordsURL)
.then(response => response.json())
.then(json => {
    wordDictionary = json;
    maxWordLength = wordDictionary['maxWordLength'];
    longestWord = wordDictionary['longestWord'];})
.then(() => {
    correctWord = getNewWord();
    addKeyListener();
})
.catch((error) => {
    console.log(error);
    //location.reload();
}); 

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

function insertLetter(pressedKey) {
    // Check if we have any more space for new letters first. Then add letter.
    if (currentIndex >= wordLengthSelected){
        console.log("Word guessed is " + currentGuess);
        return;
    }

    pressedKey = pressedKey.toLowerCase();
    let row = document.getElementsByClassName("letter-row")[wordLengthSelected - guessesRemaining];
    let box = row.children[currentIndex];
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess = currentGuess + pressedKey;
    currentIndex += 1;
}

function checkGuess() {
    const green = "#6ca965";
    const yellow = "#c8b653";
    const row = document.getElementsByClassName("letter-row")[wordLengthSelected - guessesRemaining];
    let letterCounts = new Array(26).fill(0);

    //Check for correct letters in the correct spot first
    for (let i = 0; i < correctWord.length; i++){
        if (currentGuess.charAt(i) === correctWord.charAt(i)){
            row.children[i].style.backgroundColor = green;
        } else {
            //Keep count of letters that are correct but not in the right spot
            let letterIndex = correctWord.charAt(i).toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
            letterCounts[letterIndex] += 1;
        }
    }
    //Check for correct letters in the wrong spots after counting correct letters. Decrease count after coloring yellow.
    for (let i = 0; i < correctWord.length; i++){
        if ((currentGuess.charAt(i) != correctWord.charAt(i)) && (letterCounts[currentGuess.charAt(i).toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)] > 0)){
            row.children[i].style.backgroundColor = yellow;
            letterCounts[currentGuess.charAt(i).toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)] -= 1;
        }
    }
    
    if (currentGuess == correctWord){
        alert("You've done it!");        
        row.childNodes.forEach(node => node.style.backgroundColor = green);
    }
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[wordLengthSelected - guessesRemaining];
    let box = row.children[currentIndex - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess = currentGuess.slice(0, currentGuess.length - 2);
    currentIndex -= 1;
}

// Event listener for key presses; needed to make this a function in order to call it synchronously after fetch api
function addKeyListener(){
    document.addEventListener("keyup", (e) => {
        if (guessesRemaining === 0) {
            return;
        }

        let pressedKey = String(e.key)
        if (pressedKey === "Backspace" && currentIndex !== 0) {
            deleteLetter()
            return
        }

        if (pressedKey === "Enter" && currentIndex >= wordLengthSelected) {
            checkGuess()
            guessesRemaining -= 1;
            currentIndex = 0;
            currentGuess = "";
            return
        }

        let found = pressedKey.match(/[a-z]/gi)
        if (!found || pressedKey.length > 1) {
            return
        } else {
            insertLetter(pressedKey);
        }
    })
}