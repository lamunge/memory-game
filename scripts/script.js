//global variable for the current number of matches
let numMatches = 0;

//global variables for the number of wrong moves and total moves a player has made
let numWrongs = 0;
let numMoves = 0;

//global variables for start and end times of timer
let startTime, endTime;

//interval for updating the timer
let interval;

//adds 1 to score and checks if you've gotten all 12 matches
function updateScore() {
    numMatches++;
    if (numMatches === 12) {
        //stop timer for this round
        endTime = new Date();
        timeDiff = Math.round((endTime - startTime)/1000);
        clearInterval(interval);
        numCows = wrongs2Cows(numWrongs);
        if (confirm("You won! It took you " + timeDiff + " seconds. Your rating is " + numCows + " cows. Play again?")) {
            restart();
        }
        else {
            alert("Well then...");
            alert("Guess we're done here...");
        }
    }
}

function updateRating() {
    numWrongs++;
    numCows = wrongs2Cows(numWrongs);
    cows = document.getElementsByClassName("cow");
    for (var i = 4 - numCows; i >= 0; i--) {
        cows[i].style.visibility = "hidden";
    }
}

function wrongs2Cows(nwrongs) {
    ncows = 0;
    if (nwrongs <= 12) {
        ncows = 5;
    }
    if (nwrongs > 12 && nwrongs <= 16) {
        ncows = 4;
    }
    if (nwrongs > 16 && nwrongs <= 20) {
        ncows = 3;
    }
    if (nwrongs > 20 && nwrongs <= 24) {
        ncows = 2;
    }
    if (nwrongs > 24 && nwrongs <= 28) {
        ncows = 1;
    }
    if (nwrongs > 28 && nwrongs <= 32) {
        ncows = 0;
    }
    return ncows;
}

//initially shuffle the board
restart();

//add "flipped" class to clicked card
function flip(elem) {
    elem.classList.add('flipped');
    const flippedCards = document.getElementsByClassName('flipped');

    //if there are two cards flipped over, check if they're the same card (after showing them to the user for 1sec)
    if (flippedCards.length === 2) {
        updateMoves();

        //temporarily disable click events during the timeout that's about to happen
        cards = document.getElementsByClassName('card');
        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].onclick = null;
        }

        //for some reason, we can't pass functions with parameters to settimeout, hence the anonymous function
        window.setTimeout(function () {
            compareCards(flippedCards);
        }, 1000);

        //reenable click events after timeout
        window.setTimeout(function () {
            for (var i = cards.length - 1; i >= 0; i--) {
                cards[i].onclick = function () {
                    flip(this);
                }
            }
        }, 1000);
    }        
}

function compareCards(cards) {    
    card1 = cards[0].getElementsByClassName('back')[0].children[0].classList[0];
    card2 = cards[1].getElementsByClassName('back')[0].children[0].classList[0];
    if (card1 === card2) {
        updateScore(); 
        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].classList.add('matched');
            cards[i].classList.remove('flipped');                       
        }
    }
    else {
        updateRating();
        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].classList.remove('flipped');
        }
    }    
}

function updateTimer(startTime) {
    currentTime = new Date();
    timeDiff = Math.round((currentTime - startTime)/1000);
    document.getElementById("timer").innerHTML = "Time: " + timeDiff;
}

function updateMoves() {
    numMoves++;
    document.getElementById("move-counter").innerHTML = "Moves: " + numMoves;
}

//restarts game board by storing each card's outerHTML in javascript array and randomly adding them back to the board
function restart() {
    numMatches = 0;
    numWrongs = 0;
    numMoves = 0;

    //reset the number of visible cows to 5
    cows = document.getElementsByClassName("cow");
    for (var i = cows.length - 1; i >= 0; i--) {
        cows[i].style.visibility = "visible";
    }

    //reset moves counter to zero
    document.getElementById("move-counter").innerHTML = "Moves: 0";

    //begin the timer for this round
    startTime = new Date();
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(function () {
        updateTimer(startTime);
    }, 1000);

    //flip back over all flipped cards
    const flippedCards = document.querySelectorAll('.flipped, .matched');
    for (var i = flippedCards.length - 1; i >= 0; i--) {
        flippedCards[i].classList.remove('flipped');
        flippedCards[i].classList.remove('matched');        
    }

    const board = document.getElementById('game-board');
    let cards = board.children; //as HTMLCollection object - a live list

    //append children randomly (yes we never removed them, but that's ok bc they only appear once each in cards)
    for (var i = cards.length; i >= 0; i--) {
        board.appendChild(cards[Math.random() * i | 0]); //bitwise OR operator | is basically a floor function: 1.9 | 0 => 1
    }
}