/*----- constants -----*/

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = new Array();

/*----- app's state (variables) -----*/

let winner;  //null=handInProgress, P=player D=dealer, T=Tie, PBJ=playerBlackJack, DBJ=dealerBlackjack
let player = [];
let dealer = [];
let wager = 0;
let cash = 1000;
let playerScore = 0;
let dealerScore = 0;
let playerDone = false;

/*----- cached element references -----*/

const dealerCardsEl = document.getElementById('dealer-cards');
const playerCardsEl = document.getElementById('player-cards');
const msgEl = document.getElementById('msg');
const wagerEl = document.getElementById('wager');
const bankrollEl = document.getElementById('bankroll');

/*----- event listeners -----*/

document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stay);
document.getElementById('deal').addEventListener('click', init);
document.getElementById('restart').addEventListener('click', init);

/*----- functions -----*/


function createDeck() {
    deck = new Array();
    for (let i = 0; i < values.length; i++) {
        for (let x = 0; x < suits.length; x++) {
            let weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            let card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}

function shuffle() {
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function deal() {
    // Reminder, need to reshuffle deck

    dealer = [];
    player = [];
    dealer.push(deck.pop())
    dealer.push(deck.pop())
    player.push(deck.pop())
    player.push(deck.pop())
    // check for blackjacks
    winner = checkForBlackjacks();
}

function checkForBlackjacks() {
    return null;
}
function init() {
    playerDone = false;
    document.getElementById('hit').addEventListener('click', hit);
    document.getElementById('stand').addEventListener('click', stay);
    document.getElementById('deal').addEventListener('click', init);
    createDeck();
    shuffle();
    deal();
    render();
}

// init();

function checkScore() {
    playerScore=0, dealerScore=0;
    for (let i = 0; i < player.length; i++) {
        playerScore += player[i].Weight;
    }
    for (let i = 0; i < dealer.length; i++) {
        dealerScore += dealer[i].Weight;
    }
    if(playerDone || playerScore >= 21) {
        document.getElementById('hit').removeEventListener('click', hit);
        document.getElementById('stand').removeEventListener('click', stay);
        document.getElementById('deal').removeEventListener('click', init);    
        console.log('Running Checkscore, Player done');
        checkWinner();
    }
}

function render() {
    checkScore();
}

function hit() {
    checkScore();
    if(playerScore >= 21) {
    console.log('hitting playerScore above 21')

    playerDone=true;
    }
    else {
        player.push(deck.pop())
    }
       render();
}

function stay() {
    while (dealerScore < 15) {
        dealer.push(deck.pop())
        checkScore();
    }
    playerDone=true;

    render();
}

function checkWinner() {
    
    console.log(playerScore, dealerScore)
    
    if (playerScore === dealerScore) {
        console.log('Its a tie');
    }
    else if (playerScore === 21) {
        console.log('Player Blackjack');
    }
    else if (dealerScore === 21) {
        console.log('Dealer Blackjack');
    }
    else if(playerScore < 21 && dealerScore > 21 || (playerScore < 21 && playerScore > dealerScore)) {
        console.log('Player Wins');
    }
    else if(dealerScore < 21 && playerScore > 21 || (dealerScore < 21 && dealerScore > playerScore)) {
        console.log('Dealer Wins');
    }
    else if(playerScore > 21) {
        console.log('Player Busts, Dealer Wins')
    }
    else if(dealerScore > 21) {
        console.log('Dealer Busts, Player Wins')
    }
    // checkScore(); 
}
