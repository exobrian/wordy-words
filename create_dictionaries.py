import json
#import pandas as pd

json_path = './resources/words_dictionary.json'
#words_df = pd.read_json(json_path)

wordDict = dict()
wordDict.update({4:'test'})

wordLength = '4'
newWord = 'test2'

wordDict.update({wordLength: newWord})
print(wordDict.get(wordLength))

"""
with open(json_path,'r') as json_file:
    for i in json_file:
        wordLength = len(i)
        if wordLength in wordDict.keys:
            wordDict[wordLength].append(i)
        print(i + ': ' + str(len(i)))
"""