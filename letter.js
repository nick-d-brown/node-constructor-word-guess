
function Letter (character) {
    this.character = character;
    this.letterIsGuessed = false;
    this.charReturn = function () {
        if (this.letterIsGuessed) {
            return this.character;
        } else {
            return "_";
        }
    }
    this.charCheck = function (char) {
        
        if (char.gamePlay === this.character) {
            this.letterIsGuessed = true;
            this.charReturn();
        }
    }
};

module.exports = Letter;