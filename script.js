// This script reads in list of words stored in json file. Then creates a wordDictionary where the key corresponds to the number of letters
// in a word, while the value is an array containing all the words with length equal to the key.

var wordsPath = './resources/wordsList.json';
const WORD_LENGTH_SELECTED = 6;
const words = require(wordsPath);

// Parse through json list of words. Create wordDictionary using lengths of words as keys and keep track of the longest word.
let maxWordLength = 0;
let longestWord = "";
let wordDictionary = {};
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

let randInt = Math.floor(Math.random() * (wordDictionary[WORD_LENGTH_SELECTED].length - 1));
let randWord = wordDictionary[WORD_LENGTH_SELECTED][randInt];

// Testing
console.log("Random Word: " + randWord);
console.log("Test: " + wordDictionary[maxWordLength][0]);
console.log("Longest word is " + longestWord + ": " + maxWordLength + " letters");