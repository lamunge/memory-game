//global variable for the current number of matches
let numMatches = 0;

//global variables for start and end times of timer
let startTime, endTime;

//adds 1 to score and checks if you've gotten all 12 matches
function updateScore() {
    numMatches++;
    if (numMatches === 12) {
        //stop timer for this round
        endTime = new Date();
        timeStars = getTimeAndStars(startTime, endTime);
        if (confirm("You won! It took you " + timeStars[0] + " seconds. Your rating is " + timeStars[1] + " stars. Play again?")) {
            restart();
        }
        else {
            alert("Well then...");
            alert("Guess we're done here...");
        }
    }
}

function getTimeAndStars (start, end) {
    const time = Math.round((end - start)/1000);
    let stars;
    if (time < 60) {
        stars = 5;
    }    
    if ((time >= 60) && (time < 70)) {
        stars = 4;
    }
    if ((time >= 70) && (time < 80)) {
        stars = 3;
    }
    if ((time >= 80) && (time < 90)) {
        stars = 2;
    }
    if ((time >= 90) && (time < 100)) {
        stars = 1;
    }
    if (time >= 100) {
        stars = 0;
    }
        
    
    return [time, stars];
}

//initially restart the board
restart();

//add "flipped" class to clicked card
function flip(elem) {
    elem.classList.add('flipped');
    const flippedCards = document.getElementsByClassName('flipped');

    //if there are two cards flipped over, check if they're the same card (after showing them to the user for 1sec)
    if (flippedCards.length === 2) {
        //temporarily disable click events during the timeout that's about to happen
        cards = document.getElementsByClassName('card');
        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].onclick = null;
        }

        //for some reason, we can't pass functions with parameters to settimeout, hence the anonymous function
        window.setTimeout(function () {
            compareCards(flippedCards);
        }, 1000);

        //reenable click events (hope this is the right place to add this back in...)
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
        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].classList.remove('flipped');
        }
    }    
}

//restarts game board by storing each card's outerHTML in javascript array and randomly adding them back to the board
function restart() {
    numMatches = 0;

    //begin the timer for this round
    startTime = new Date();

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