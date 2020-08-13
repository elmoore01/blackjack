/*----- constants -----*/

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = new Array();

/*----- app's state (variables) -----*/

let winner; 
let dealer = [];
let wager = 0;
let cash = 1000;
let playerScore = 0;
let dealerScore = 0;
let playerDone = false;
let dealerDone = false;

/*----- cached element references -----*/

const dealerScoreEl = document.getElementById('dealer-score');
const playerScoreEl = document.getElementById('player-score');
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

    dealer = [];
    player = [];
    dealer.push(deck.pop())
    dealer.push(deck.pop())
    player.push(deck.pop())
    player.push(deck.pop())

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
        checkWinner();
    }
    if(dealerDone || dealerScore >= 21) {
        document.getElementById('hit').removeEventListener('click', hit);
        document.getElementById('stand').removeEventListener('click', stay);
        document.getElementById('deal').removeEventListener('click', init);    
        checkWinner();
    }
}

function render() {
    checkScore();
    while (playerCardsEl.firstChild) {
        let child = playerCardsEl.childNodes[0]
        playerCardsEl.removeChild(child)
    }
    while (dealerCardsEl.firstChild) {
        let child = dealerCardsEl.childNodes[0]
        dealerCardsEl.removeChild(child)
    }
    for (let i = 0; i < player.length; i++) {
        let c = document.createElement('div')
        let currentValue = ''
        if('AKQJ'.includes(player[i].Value)) {
            currentValue += player[i].Value
        }
        else {
            currentValue += 'r'
            if(player[i].Value.toString().length > 1) {
                currentValue += player[i].Value
            }
            else {
                currentValue += `0${player[i].Value}`
            } 
        }

        c.className = `card large ${player[i].Suit} ${currentValue}`
        playerCardsEl.appendChild(c) 
    }
    for (let i = 0; i < dealer.length; i++) {
        let c = document.createElement('div')
        let currentValue = ''
        if('AKQJ'.includes(dealer[i].Value)) {
            currentValue += dealer[i].Value
        }
        else {
            currentValue += 'r'
            if(dealer[i].Value.toString().length > 1) {
                currentValue += dealer[i].Value
            }
            else {
                currentValue += `0${dealer[i].Value}`
            } 
        }

        c.className = `card large ${dealer[i].Suit} ${currentValue}`
        dealerCardsEl.appendChild(c) 
    }
}

function hit() {
    checkScore();
    if(playerScore >= 21) {

    playerDone=true;
    }
    else {
        player.push(deck.pop())
    }
       render();
}

function stay() {
    while (dealerScore < 16) {
        dealer.push(deck.pop())
        checkScore();
    }
    playerDone=true;

    render();
}

function checkWinner() {
    
    if (playerScore === dealerScore) {
        msgEl.textContent = "It's a Tie"
    }
    else if (playerScore === 21) {
        msgEl.textContent = "Player Blackjack"
    }
    else if (dealerScore === 21) {
        msgEl.textContent = "Dealer Blackjack"
    }
    else if(playerScore < 21 && dealerScore > 21 || (playerScore < 21 && playerScore > dealerScore)) {
        msgEl.textContent = "Player Wins"
    }
    else if(dealerScore < 21 && playerScore > 21 || (dealerScore < 21 && dealerScore > playerScore)) {
        msgEl.textContent = "Dealer Wins"
    }
    else if(playerScore > 21) {
        msgEl.textContent = "Player Busts, Dealer Wins"
    }
    else if(dealerScore > 21) {
        msgEl.textContent = "Dealer Busts, Player Wins"
    }
}
