//add "flipped" class to clicked card
function flip(elem) {
    elem.classList.add('flipped');
}

//shuffles game board by storing each card's outerHTML in javascript array and randomly adding them back to the board
function shuffle() {
    const board = document.getElementById("game-board");
    let cards = board.children; //as HTMLCollection object

    console.log(cards.length);

    //add back children randomly
    //ANNA: cards is a live list, meaning you can't remove elements without
    //them  being removed from the DOM. Figure out how to shuffle them in
    //a way that makes sure you don't duplicate them
    for (var i = cards.length; i >= 0; i--) {
        board.appendChild(cards[Math.random() * i | 0]);
    }
}