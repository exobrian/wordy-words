// This script reads in list of words stored in json file. Then creates a dictionary where the key corresponds to the number of letters
// in a word, while the value is an array containing all the words with length equal to the key.

var wordsPath = './resources/wordsList.json'
const WORD_LENGTH_SELECTED = 6;
const WORD_LENGTH_MAX = 31 // May want to make this dynamic and set to the max length of all words in json word list
const words = require(wordsPath)

// Get length of longest word in json file. It'd be efficient to combine both loops below into one O(N) here.
let currMax = 0;
let longestWord = "";
let wordDictionary = {};
for (let key in words){
    if (key.length > currMax){
        currMax = key.length;
        longestWord = key;
    }
    if (key.length in wordDictionary){
        wordDictionary[key.length].push(key)
    } else {
        wordDictionary[key.length] = [key]
    }
}
console.log("Test: " + wordDictionary[currMax][0])
console.log("Longest word is " + longestWord + ": " + currMax + " letters")

// Initialize dictionary with word lengths minus one (integers) as the key and an empty array to contain our string words as the value.
var dictionary = {};
for (let i = 0; i < WORD_LENGTH_MAX; i++){
    dictionary[i] = [];
}

// Parse Json file and store in our dictionary
for (let key in words){
    let l = key.length - 1;
    dictionary[l].push(key);
}


let randInt = Math.floor(Math.random() * (dictionary[WORD_LENGTH_SELECTED - 1].length - 1));
let randWord = dictionary[WORD_LENGTH_SELECTED - 1][randInt]

// Testing
console.log("Random Word: " + randWord);
console.log(dictionary[14][dictionary[14].length - 1]);