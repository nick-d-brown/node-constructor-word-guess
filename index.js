
var Word = require("./word");
const randomWord = require('random-word');
var colors = require("colors");
var inquirer = require("inquirer");

var hangmanGame = {
    guesses:7,
    guessedLetters: [],
    wordToGuess: null,
}
var thing = hangmanGame.wordToGuess;

gameStart();

function gameStart() {
    inquirer.prompt([

        {
            type: "confirm",
            name: "gameStart",
            message: "Would you like to play a game of hangman?"
        },

    ]).then(function (user) { 
        
        if (user.gameStart) {
           gamePlay();
        }
        else {
            console.log("OK, maybe next time... goodbye.");
            
        }
    }); 
}

function gamePlay() {
    thing = new Word(randomWord());
    if (hangmanGame.guessedLetters.length > 0) {
        hangmanGame.guessedLetters = [];
    }
   thing.letterArrAssembler();
   thing.wordAssembler(thing.pickedWord);
   console.log(thing.wordAssembler(thing.pickedWord));
    
   
    console.log("word constructor pass\n"+
                thing.pickedWord.green + " Keep this only for testing".underline.red + "\n" +
                "The word to guess has been chosen. Let the game begin...".green + "\n");
    userGuessPromt();
    
}


function userGuessPromt() {
    console.log("You have " + colors.red(thing.guesses) + " guesses remaining!");
    
    inquirer.prompt([
        {
            type: "input",
            name: "gamePlay",
            message: "Please Guess a Letter?",
        },

    ]).then(function (use) {
    
        if (thing.guesses>0 && thing.wordIsGuessed === false) {
            // input the letter to the function
            thing.userGuess(use);
            console.log(thing.wordAssembler(thing.pickedWord));
            userGuessPromt();
        }
        else if (thing.guesses < 0) {
            console.log("Game Over!!! You ran out of guesses...");
            playAgain();
        }
        else if (thing.guesses > 0 && thing.wordIsGuessed === true) {
            console.log("YOU WON!!!");
            playAgain();
        }
        else {
            console.log("error: inside game over logic");
        }
        
    }); 
}

function playAgain() {
    inquirer.prompt([
        {
            type: "input",
            name: "playAgain",
            message: "Would you like to play again?"
        },
    ]).then(function (user) {
        if (user.playAgain === "yes") {
            gamePlay();
        }
        if (user.playAgain === "no") {
            console.log("OK.. Thanks for playing!"); 
        }
        else{
            console.log("Please enter 'yes' or 'no'");
            playAgain();
        }

    }); 
}

