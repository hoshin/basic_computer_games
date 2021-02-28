const prompt = require('prompt');
const cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]

prompt.message = ''
prompt.delimiter = ''

let playerMoney = 100;
let firstCard = -1, secondCard = -1, availableCards = [];

const bootupPrompt = () => {
    console.log('          ACEY DUCEY CARD GAME');
    console.log('CREATIVE COMPUTING MORRISTOWN, NEW JERSEY');
    console.log('');
    console.log('');
    console.log('ACEY DUCEY IS PLAYED IN THE FOLLOWING MANNER');
    console.log('THE DEALER (COMPUTER) DEALS TWO CARDS FACE UP');
    console.log('YOU HAVE AN OPTION TO BET OR NOT TO BET DEPENDING');
    console.log('ON WHETHER OR NOT YOU FEEL THE CARD WILL HAVE');
    console.log('A VALUE BETWEEN THE FIRST TWO.');
    console.log('IF YOU DO NOT WANT TO BET, INPUT A 0');
    console.log(`YOU NOW HAVE ${playerMoney} DOLLARS`);
    prompt.start();
}

const translateCardNumberToCardName = cardNumber => {
    switch(cardNumber){
        case 11: return 'JACK'
        case 12: return 'QUEEN'
        case 13: return 'KING'
        case 1: return 'ACE'
        default: return `${cardNumber}`
    }
}
const PROMPT_SCHEMA = {
    properties: {
        bet: {
            pattern: /^[0-9]+$/,
            message: 'Only integers allowed!',
            required: true
        }
    }
}
const askForBet = async () => {
    return prompt.get(PROMPT_SCHEMA)
}

const dealCards = () => {
    availableCards = [...Object.keys(cards)]

    const one = Math.random()*(availableCards.length)
    firstCard = cards[availableCards.splice(one, 1)[0]]
    const two = Math.random()*(availableCards.length)
    secondCard = cards[availableCards.splice(two, 1)[0]]


    console.log('HERE ARE YOUR NEXT TWO CARDS')
    console.log(translateCardNumberToCardName(firstCard))
    console.log(translateCardNumberToCardName(secondCard))
}

const dealSingleCard = () => {
    const one = Math.floor(Math.random()*(availableCards.length))
    return cards[availableCards.splice(one, 1)[0]]
}

const checkIfPlayerCardIsInInterval = (highCard, lowCard, playersCard) => {
    if(playersCard < highCard && playersCard > lowCard){
        console.log('YOU WIN!!!')
    } else {
        console.log('SORRY, YOU LOSE')
    }
}

bootupPrompt();
dealCards();
askForBet().then(result => {
    const bet = parseInt(result.bet, 10)
    if(bet === 0){
        console.log('CHICKEN!!')
    } else if(bet > playerMoney) {
        console.log('SORRY, FRIEND BUT YOU BLEW YOUR WAD')
    } else {
        const playersCard = dealSingleCard()
        if(firstCard > secondCard){
            checkIfPlayerCardIsInInterval(firstCard, secondCard, playersCard)
        } else {
            checkIfPlayerCardIsInInterval(secondCard, firstCard, playersCard)
        }
    }
})

