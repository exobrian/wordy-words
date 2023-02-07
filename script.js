// This script reads in list of words stored in json file. Then creates a dictionary where the key corresponds to the number of letters
// in a word, while the value is an array containing all the words with length equal to the key.

var wordsPath = './resources/wordsList.json'
const WORD_LENGTH_MAX = 100 // May want to make this dynamic and set to the max length of all words in json word list
const words = require(wordsPath)

// Initialize array to sort our dictionary of words by word length
var dictionary = {};
for (let i = 0; i < WORD_LENGTH_MAX; i++){
    dictionary[i] = [];
}

for (let key in words){
    let l = key.length - 1;
    dictionary[l].push(key);
}

//Testing
console.log(dictionary[23]);