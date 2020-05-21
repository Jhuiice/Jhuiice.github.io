
function userInput(Input) { // THis is what I started creating off book and then I went to the book and realized I was going this all wrong and an extremely hard way.
// We want bight size pieces that are not hard coded
//var userInput = document.getElementById("guessInput").value;
//userInput = userInput.toUpperCase();
//console.log(userInput[0]);
Input = Input.toUpperCase();
var firstChar = Input[0];
var secondChar = Input[1];
var shipInput;
var inputData = ["A", "B", "C", "D", "E", "F", "G"];

shipInput = inputData.indexOf(firstChar) + secondChar;
return shipInput;
}

var model = {
    boardSize: 7,
    numShips: 4,
    shipLength: 4,
    shipsSunk: 0,
    ships: [ { locations: [0, 0, 0], hits: ["", "", ""] },
             { locations: [0, 0, 0], hits: ["", "", ""] },
             { locations: [0, 0, 0], hits: ["", "", ""] },
             { locations: [0, 0, 0], hits: ["", "", ""] },
             { locations: [0, 0, 0], hits: ["", "", ""] } ],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess) // its possible to chaing this.ships[i].locations.indexOf(guess) but that is a big mess
            if (index >= 0) {
                // we have a hit
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] != 'hit') {
                return false;
            }
        }
        view.displayMessage("You Sunk My Battleship!");
        return true;
    },
    generateShipLocations: function() { // THis was created before any of the functions in the function calls were created
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do { // do the below until the while statement is false
                locations = this.generateShip();
                } while (this.collisions(locations));
            this.ships[i].locations = locations;
        }
    },
    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row;
        var col;
        if (direction === 1) {
            // generate random string for a horizontal ship
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * ((this.boardSize - this.shipLength) + 1));
        } else {
            // generate random string for a vertical ship
            row = Math.floor(Math.random() * ((this.boardSize - this.shipLength) + 1));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                // add location to array for new horizontal ship
                newShipLocations.push(row + "" + (col + i));
            } else {
                // add locations to array for new vertical ship
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },
    collisions: function(locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
}


var view = {
    displayMessage: function(msg) {
        var message = document.getElementById("messageArea");
        message.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit")
        view.displayMessage("HIT!")
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss")
        view.displayMessage("You missed!")
    }
};

var controller = { // don't hard code
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location)
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sunk all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
}

// checks guess to see if the input is a letter and a number and alerts all edge cases
// returns the user input at 2 numbers to process through the arrays of the ships
function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    guess = guess.toUpperCase();
    // console.log(guess)
    if (guess === null || guess.length !== 2) {
        alert('Oops, please enter a letter and a number on the board.');
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);
        // console.log(row, column)

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if ((row < 0 || row >= model.boardSize) || (column < 0 || column >= model.boardSize)) {
                alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
        return null;
    }
}

// event handlers

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton; // on user click it will send the data inputed in html to js
    var guessInput = document.getElementById("guessInput"); // used to get input from keys
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}

function handleFireButton() {
    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";

}

function handleKeyPress(e) { // this function allows me to click a certain key (in this case the enter key) to make the button behave without me using the mouse to click it.
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;

//shipLocations(ship1, ship2, ship3);
//var place = userInput('a1');


/* console.log(place)
view.displayHit(place)
view.displayMiss('11')
view.displayMiss('21')
view.displayHit('24')
view.displayHit('34')
view.displayHit('44') */

/*model.fire("53")

model.fire("06")
model.fire("16")
model.fire("26")

model.fire("24")
model.fire("34")
model.fire("44")

model.fire("12")
model.fire("11")
model.fire("10") */

/* controller.processGuess('A0');

controller.processGuess('A6');
controller.processGuess('B6');
controller.processGuess('C6');

controller.processGuess('C4');
controller.processGuess('D4');
controller.processGuess('E4');

controller.processGuess('B0');
controller.processGuess('B1');
controller.processGuess('B2'); */




/* function shipLocations(ship1, ship2, ship3) {
ship1.location = ["01", "11", "21"];
ship2.location = ["22", "23", "24"];
ship3.location = ["65", "66"];
}
*/
/* function shipLocations(ship1, ship2, ship3) {
var randomNumber;
var shipListCount = [];
var randomizer = [ship1, ship2, ship3];
var direction = floor(Math.random() * 2);
var directionHorizontal = 0;
var directionVertical = 0;

if (direction == 0 && directionHorizontal < 2) {
    directionHorizontal++;
    randomNumber = (Math.random * 3)
    if (!shipListCount.includes(randomizer[randomNumber]))
        randomizer[randomNumber].location = []
} else if ( direction == 1 && directionVertical < 2) {
    directionVertical++;
}
ship1.location.push(Math.random() * 6);
} */
