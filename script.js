const wordsPath = "./resources/wordsList.json";
const wordsURL = "https://raw.githubusercontent.com/exobrian/Wordy-Words/main/resources/wordsList.json";
let maxWordLength = 0;
let longestWord = "";
let wordDictionary = {};
let randInt;
let correctWord;

//Initialize with 5 letters to avoid ref errors
let wordLengthSelected = 5;

// Need to run this first in order to force other functions to wait until the json file has been loaded.
fetch(wordsURL)
.then(response => response.json())
.then(json => {
    createDictionary(json);
    correctWord = getNewWord();
    console.log("Longest word is " + longestWord + ": " + maxWordLength + " letters");
});

function createDictionary(words) {
    // Parse through json list of words. Create wordDictionary using lengths of words as keys and keep track of the longest word.
    for (let key in words){
        if (key.length > maxWordLength){
            maxWordLength = key.length;
            longestWord = key;
        }
        if (key.length in wordDictionary){
            wordDictionary[key.length].push(key);
        } else {
            wordDictionary[key.length] = [key];
        }
    }
}

function isValidLength() {
    // function returns true if word length selected by the user exists in our dictionary
    if (document.getElementById("numberOfLetters").value in wordDictionary) {
        console.log("Word Length is valid.");
        return true;
    } else {
        console.log("Word Length is invalid. Please select another length between 1 and " + maxWordLength + " long.");
        return false;
    }
}

function getNewWord() {
    if (isValidLength()){
        wordLengthSelected = document.getElementById("numberOfLetters").value;
        randInt = Math.floor(Math.random() * (wordDictionary[wordLengthSelected].length - 1));
        correctWord = wordDictionary[wordLengthSelected][randInt];
        console.log("Word Length is " + wordLengthSelected + " letters long.");
        console.log("New word is " + correctWord);

        document.getElementById("correctWord").innerHTML = correctWord;
    } else {
        console.log("Current word is still " + correctWord);
    }
    return correctWord;
}