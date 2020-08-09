/*----- constants -----*/

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const blkjkLookup = {
    spds: {
        A: {
            imgUrl: '../images/spades/spades-A.svg'
        },
        K: {
            imgUrl: '../images/spades/spades-K.svg'
        },
        Q: {
            imgUrl: '../images/spades/spades-Q.svg'
        },
        J: {
            imgUrl: '../images/spades/spades-J.svg'
        },
        2: {
            imgUrl: '../images/spades/spades-r02.svg'
        },
        3: {
            imgUrl: '../images/spades/spades-r03.svg'
        },
        4: {
            imgUrl: '../images/spades/spades-r04.svg'
        },
        5: {
            imgUrl: '../images/spades/spades-r05.svg'
        },
        6:  {
            imgUrl: '../images/spades/spades-r06.svg'
        },
        7:  {
            imgUrl: '../images/spades/spades-r07.svg'
        },
        8:  {
            imgUrl: '../images/spades/spades-r08.svg'
        },
        9:  {
            imgUrl: '../images/spades/spades-r09.svg'
        },
        10: {
            imgUrl: '../images/spades/spades-r10.svg'
        },

    clbs: {
        A: {
            imgUrl: '../images/clubs/clubs-A.svg'
        },
        K: {
            imgUrl: '../images/clubs/clubs-K.svg'
        },
        Q: {
            imgUrl: '../images/clubs/clubs-Q.svg'
        },
        J: {
            imgUrl: '../images/clubs/clubs-J.svg'
        },
        2: {
            imgUrl: '../images/clubs/clubs-r02.svg'
        },
        3: {
            imgUrl: '../images/clubs/clubs-r03.svg'
        },
        4: {
            imgUrl: '../images/clubs/clubs-r04.svg'
        },
        5: {
            imgUrl: '../images/clubs/clubs-r05.svg'
        },
        6:  {
            imgUrl: '../images/clubs/clubs-r06.svg'
        },
        7:  {
            imgUrl: '../images/clubs/clubs-r07.svg'
        },
        8:  {
            imgUrl: '../images/clubs/clubs-r08.svg'
        },
        9:  {
            imgUrl: '../images/clubs/clubs-r09.svg'
        },
        10: {
            imgUrl: '../images/clubs/clubs-r10.svg'
        },
    
    hrts: {
        A: {
            imgUrl: '../images/hearts/hearts-A.svg'
        },
        K: {
            imgUrl: '../images/hearts/hearts-K.svg'
        },
        Q: {
            imgUrl: '../images/hearts/hearts-Q.svg'
        },
        J: {
            imgUrl: '../images/hearts/hearts-r09.svg'
        },
        2: {
            imgUrl: '../images/hearts/hearts-r02.svg'
        },
        3: {
            imgUrl: '../images/hearts/hearts-r03.svg'
        },
        4: {
            imgUrl: '../images/hearts/hearts-r04.svg'
        },
        5: {
            imgUrl: '../images/hearts/hearts-r05.svg'
        },
        6:  {
            imgUrl: '../images/hearts/hearts-r06.svg'
        },
        7:  {
            imgUrl: '../images/hearts/hearts-r07.svg'
        },
        8:  {
            imgUrl: '../images/hearts/hearts-r08.svg'
        },
        9:  {
            imgUrl: '../images/hearts/hearts-r09.svg'
        },
        10: {
            imgUrl: '../images/hearts/hearts-r10.svg'
        },

    dmds: {
        A: {
            imgUrl: '../images/diamonds/diamonds-A.svg'
        },
        K: {
            imgUrl: '../images/diamonds/diamonds-K.svg'
        },
        Q: {
            imgUrl: '../images/diamonds/diamonds-Q.svg'
        },
        J: {
            imgUrl: '../images/diamonds/diamonds-J.svg'
        },
        2: {
            imgUrl: '../images/diamonds/diamonds-r02.svg'
        },
        3: {
            imgUrl: '../images/diamonds/diamonds-r03.svg'
        },
        4: {
            imgUrl: '../images/diamonds/diamonds-r04.svg'
        },
        5: {
            imgUrl: '../images/diamonds/diamonds-r05.svg'
        },
        6:  {
            imgUrl: '../images/diamonds/diamonds-r06.svg'
        },
        7:  {
            imgUrl: '../images/diamonds/diamonds-r07.svg'
        },
        8:  {
            imgUrl: '../images/diamonds/diamonds-r08.svg'
        },
        9:  {
            imgUrl: '../images/diamonds/diamonds-r09.svg'
        },
        10: {
            imgUrl: '../images/diamonds/diamonds-r10.svg'
        },
    }



// console.log(blkjkLookup.spds.A.imgUrl)

/*----- app's state (variables) -----*/

let deck = new Array();
let playerScore;
let dealerScore;
let playerWinnings;
let turn;
// let currentBet;
let results;
let winner;

/*----- cached element references -----*/

const scoreElements = {
    player: document.querySelector('#player-score'),
    computer: document.querySelector('#computer-score')
}

/*----- event listeners -----*/


/*----- functions -----*/

function createDeck()
    {
        deck = new Array();
        for (var i = 0 ; i < values.length; i++)
        {
            for(var x = 0; x < suits.length; x++)
            {
                var weight = parseInt(values[i]);
                if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                    weight = 10;
                if (values[i] == "A")
                    weight = 11;
                var card = { Value: values[i], Suit: suits[x], Weight: weight };
                deck.push(card);
            }
        }
    }