var Letter = require("./letter");

function Word(pickedWord) {
    this.pickedWord = pickedWord;
    this.lettersInWord = [];
    this.wordIsGuessed = false;
    this.newLetter = null;
    this.guesses = 7;

    this.letterArrAssembler = function () {
        for (let i = 0; i < this.pickedWord.length; i++) {
            this.newLetter = new Letter(this.pickedWord[i]);
            this.lettersInWord.push(this.newLetter);
        }
    };

    this.wordAssembler = function (wordToGuess) {
        var lineToGuess = "";
        for (let i = 0; i < wordToGuess.length; i++){
            
            lineToGuess += this.lettersInWord[i].charReturn();
             
        }
        return lineToGuess;
    }
    this.userGuess = function(event) {
        var count = 0;
        for (let i = 0; i < this.lettersInWord.length; i++) {
            this.lettersInWord[i].charCheck(event);
            if (this.lettersInWord[i].charCheck(event) === "_") {
                count++;
            }

        }
        this.wordAssembler(this.pickedWord);
        if (count >= 0) {
            this.guesses--;
        }
    }
}

module.exports = Word;
