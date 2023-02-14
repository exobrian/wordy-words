// npm install browserify-fs
const fileSystem = require("fs");

const wordsURL = "https://raw.githubusercontent.com/exobrian/wordy-words/main/resources/wordsList.json";
const wordsLocalPath = "./resources/wordsList.json"
const words = require(wordsLocalPath);
const jsonPath = "./resources/wordsListCleaned.json"
let wordDictionary = {};
let maxWordLength = 0;

//Local File:
if (false){
    createDictionary();
    writeDictionary(jsonPath);
} else {
    fetch(wordsURL)
    .then(response => response.json())
    .then(json => {
        createDictionary();
        writeDictionary(jsonPath);
    });
}

function writeDictionary(fileName){
    let obj = JSON.stringify(wordDictionary);
    fileSystem.writeFile(fileName, obj, function(err){
        if(err){
            throw new Error("Error writing json");
        } else {
            console.log("Json file saved successfully!");
        }
    })
}

function createDictionary() {
    wordDictionary['longestWord'] = "";
    wordDictionary['maxWordLength'] = "";
    // Parse through json list of words. Create wordDictionary using lengths of words as keys and keep track of the longest word.
    for (let key in words){
        // Keep track of the largest word in order to limit the number of letters allowed to be selected
        if (key.length > maxWordLength){
            maxWordLength = key.length;
            longestWord = key;
            wordDictionary['maxWordLength'] = key.length;
            wordDictionary['longestWord'] = key;
        }

        // Create our dictionary by either appending words to the length keys or create a new array for the key.
        if (key.length in wordDictionary){
            wordDictionary[key.length].push(key);
        } else {
            wordDictionary[key.length] = [key];
        }
    }
}