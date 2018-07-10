//display the current number of matches
numMatches = 0;
function updateScore() {
    document.getElementById('matches').innerHTML = "Matches: " + numMatches;
}
updateScore();

//initially shuffle the board
shuffle();

//add "flipped" class to clicked card
function flip(elem) {
    elem.classList.add('flipped');
    const flippedCards = document.getElementsByClassName('flipped');

    //if there are two cards flipped over, check if they're the same card (after showing them to the user for 1sec)
    if (flippedCards.length === 2) {
        //for some reason, we can't pass functions with parameters to settimeout, hence the anonymous function
        window.setTimeout(function () {
            compareCards(flippedCards);
        }, 1000);
    }        
}

function compareCards(cards) {    
    card1 = cards[0].getElementsByClassName('back')[0].children[0].classList[0];
    card2 = cards[1].getElementsByClassName('back')[0].children[0].classList[0];
    if (card1 === card2) {
        numMatches++;
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

//shuffles game board by storing each card's outerHTML in javascript array and randomly adding them back to the board
function shuffle() {
    //flip back over all flipped cards
    const flippedCards = document.getElementsByClassName('flipped');
    for (var i = flippedCards.length - 1; i >= 0; i--) {
        flippedCards[i].classList.remove('flipped');
    }

    const board = document.getElementById('game-board');
    let cards = board.children; //as HTMLCollection object - a live list

    //append children randomly (yes we never removed them, but that's ok bc they only appear once each in cards)
    for (var i = cards.length; i >= 0; i--) {
        board.appendChild(cards[Math.random() * i | 0]); //bitwise OR operator | is basically a floor function: 1.9 | 0 => 1
    }
}