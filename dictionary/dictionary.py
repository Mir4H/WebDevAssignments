import json

start_dictionary = {"Flower": "Kukka", "Sun": "Aurinko", "Cloud": "Pilvi"}

try:
    with open("words.json", "r") as f:
        dictionary = json.load(f)
except OSError:
    print("Error reading existing dictionary. Creating a new one...\n")
    dictionary = start_dictionary
except ValueError:
    print("Invalid JSON data. Creating a new file...\n")
    dictionary = start_dictionary
while True:
    word = input("Search for a word or add a new one!\n(Or hit enter to exit)\nWord:").capitalize()
    if not word: 
        break
    if word in dictionary: 
        print(f"\nSEARCH RESULT\n{word} = {dictionary[word]}\n")
    else:
        print(f"\n{word} not found.\n")
        definition = input(f"Please input a definition for {word}:\n(Or hit enter to cancel)\nDefinition:\n").capitalize()
        if definition:
            dictionary[word] = definition
            try:
                with open("words.json", "w+") as f: 
                    json.dump(dictionary, f)
                print(f"\nNew word added!\n{word} = {dictionary[word]}\n")
            except OSError:
                print("Unable to update the dictionary. :(\nCheck file permissions.")
                break
        if not definition: 
            continue
