/*----- constants -----*/

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = new Array();

let running = false;
let blackjack = false;
let deal;
let player = [];
let dealer = [];
/*----- app's state (variables) -----*/

let hand = [];
let wager = 0;
let cash = 1000;
let bank = 0;
let element = '';
let playerScore = 0;
let dealerScore = 0;
let gameInPlay = true;

/*----- cached element references -----*/


/*----- event listeners -----*/

document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stay);

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

function dealToDealer() {

    dealer.push(deck.pop())
}

function dealToPlayer() {
    player.push(deck.pop())
}

function init() {
    createDeck();
    shuffle();
    dealToPlayer();
    dealToPlayer();
    dealToDealer();
    dealToDealer();
    render();
}

init();

function checkScore() {
    playerScore=0, dealerScore=0;
    for (let i = 0; i < player.length; i++) {
        playerScore += player[i].Weight;
    }
    for (let i = 0; i < dealer.length; i++) {
        dealerScore += dealer[i].Weight;
    }
}

function render() {
    checkScore();
    if (gameInPlay == false){
        checkWinner();
    }
}

function hit() {
    dealToPlayer();
    dealToDealer();
    render();
}

function stay() {
    while (dealerScore < 15) {
        dealToDealer();
        checkScore();
    }
    gameInPlay=false;

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
    checkScore(); 
}