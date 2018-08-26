'use strict';
let card = [];
let cards = [];
let matchedCard = document.getElementsByClassName("match");
let moves = 0;
let counter = document.querySelector(".moves");
let openedCards = [];
let seconds = 0;
let minutes = 0;
let interval, timeout;
let timer = document.querySelector(".timer");
let stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll('.stars li');
let modal = document.getElementById('window');
let closeIcon = document.querySelector('.close');
let finalTime;
let list = document.getElementsByTagName("li");
let deck = document.querySelector('.deck');

const cardTypes = [
    'fa-diamond',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-anchor',
    'fa-bolt',
    'fa-bolt',
    'fa-cube',
    'fa-cube',
    'fa-leaf',
    'fa-leaf',
    'fa-bicycle',
    'fa-bicycle',
    'fa-bomb',
    'fa-bomb'
];

/**
 * Creates card elements and add them in deck
 */
const createDeck = () => {
    cards = [];
    deck.innerText = "";
    cardTypes.forEach((type) => {
        const card = document.createElement('li');
        card.className = 'card';
        const cardType = document.createElement('i');
        cardType.classList.add('fa', type);
        card.appendChild(cardType);
        let displayCard = function() {

            this.classList.toggle("open");
            this.classList.toggle("show");
            this.classList.toggle("disabled");

            openedCards.push(card);
            if (openedCards.length === 2) {
                cardOpen();
                Counter();
            }
        };
        card.addEventListener("click", displayCard);

        cards.push(card);

    });

    addCards(cards, deck);
}

/**
 * Add cards to DOM
 * shuffle cards
 * append them in deck
 */
const addCards = (cards, deck) => {
    shuffle(cards);
    cards.forEach((card) => {
        deck.appendChild(card);
    });
}

const cardOpen = () => {
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
        matched();
    } else {
        unmatched();

    }
}





const matched = () => {
    openedCards[0].classList.add("disabled", "match");
    openedCards[1].classList.add("disabled", "match");
    openedCards[0].classList.remove("open", "show");
    openedCards[1].classList.remove("open", "show");
    openedCards = [];
    congrats();
}

const unmatched = () => {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
    timeout = setTimeout(function() {
        openedCards[0].classList.remove('show', 'open', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'unmatched');
        enable();

        openedCards = [];
    }, 500);
}

// disable cards when not matched
const disable = () => Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
});

// enable cards when matched
const enable = () => Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (let i = 0; i < matchedCard.length; i++) {
        matchedCard[i].classList.add('disabled');
    }
});

const Timer = () => interval = setInterval(function() {
    timer.innerHTML = `${minutes} mins ${seconds} secs`;
    seconds = (seconds + 1) % 60;
    minutes = seconds === 59 ? ++minutes : minutes;
}, 1000);



function starRating() {
    if (moves > 8 && moves < 16) {
        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                stars[i].classList.remove("fa-star");
                stars[2].classList.add("silver");
                stars[1].classList.add("silver");
            }
        }
    } else if (moves >= 16) {
        for (let i = 0; i < 3; i++) {
            if (i === 1) {
                stars[i].classList.remove("fa-star");
                stars[2].classList.remove("silver");
                stars[2].classList.add("bronze");
            }
        }
    }
}

function resetTimer() {
    seconds = 0;
    minutes = 0;
    clearInterval(interval);
    timer.innerHTML = "0 mins 0 secs";
}

function resetMoves() {
    moves = 0;
    counter.innerHTML = moves;
}

function resetRating() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.add('fa-star');
        stars[1].classList.remove('silver');
        stars[2].classList.remove('silver');
        stars[2].classList.remove('bronze');
    }
}


function congrats() {

    if (matchedCard.length === 16) {
        clearInterval(interval);
        let finalTime = timer.innerHTML;
        modal.classList.add('show');
        let starRating = document.querySelector('.stars').innerHTML;
        document.getElementById('finalMove').innerHTML = moves;
        document.getElementById('starRating').innerHTML = starRating;
        document.getElementById('totalTime').innerHTML = finalTime;
        closeModal();

    };
}

const Counter = () => {
    moves++;
    counter.innerHTML = moves;
    if (moves === 1) {
        Timer();
    }
    starRating();
}


function closeModal() {
    closeIcon.addEventListener('click', function(e) {
        modal.classList.remove('show');
    });
}

// play again function for modal
function playAgain() {
    modal.classList.remove('show');
    startGame();
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */