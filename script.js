// This script reads in list of words stored in json file. Then creates a wordDictionary where the key corresponds to the number of letters
// in a word, while the value is an array containing all the words with length equal to the key.

const wordsPath = './resources/wordsList.json';
const words = require(wordsPath)
//let wordLengthSelected = document.getElementById("numberOfLetters").value;
let wordLengthSelected = 8
// Parse through json list of words. Create wordDictionary using lengths of words as keys and keep track of the longest word.
let maxWordLength = 0;
let longestWord = "";
let wordDictionary = {};

function createDictionary() {
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
    console.log(wordLengthSelected in wordDictionary ? "Word Length is valid" : "Word Length is invalide");
    return;
}

createDictionary();
let randInt = Math.floor(Math.random() * (wordDictionary[wordLengthSelected].length - 1));
let randWord = wordDictionary[wordLengthSelected][randInt];

// Testing
console.log("Random Word: " + randWord);
console.log("Test: " + wordDictionary[maxWordLength][0]);
console.log("Longest word is " + longestWord + ": " + maxWordLength + " letters");