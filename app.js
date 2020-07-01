//==================================================================================================
// Global functions
//==================================================================================================

// ===========================================================
// function returnRandomNumber(min, max)
//      Returns a random integer between min and max, inclusive
// ===========================================================   
const returnRandomNumber = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//==================================================================================================
// Classes
//==================================================================================================

//==================================================================================================
// PlayerParent - Parent class for common player attributes and methods
//==================================================================================================
class PlayerParent {
    constructor (name, hand){
        this.name = name;
        this.hand = hand;
    }

//==================================================================================================
// calculateHand() - Calculate the players hand by adding the value of each card.  Returns total.
//==================================================================================================

    calculateHand() {
        let sum = 0;
        let holdAce = [];
        for (const card of this.hand){
            if (card.isAce()) {
                holdAce.push(card);
            } else {
                sum += card.getValue();
            }
        }
        // Count an Ace as an 11 as long as it doesn't bust the hand. If there is more than one Ace only one can be 11.
        for (const ace of holdAce){
            let tempSum = sum + ace.getValue();
            if (tempSum >21){
                sum += 1;
            }  else {
                sum += ace.getValue();
            }
        }
        return sum;
    }

//==================================================================================================
// isBust() - returns true if hand > 21
//==================================================================================================
    isBust(){
        return (this.calculateHand() > 21);
    }

}

//==================================================================================================
// Player - has name, wallet, bet and hand. Knows isNaturalBlackJack().
//==================================================================================================
class Player extends PlayerParent {
    constructor (name, wallet, bet, hand) {
        super(name, hand);
        this.wallet = wallet;
        this.bet = bet;
    }

    isNaturalBlackJack() {
        if (this.hand.length > 2) {
            return false;
        } else {
            if (this.calculateHand() == 21  && (this.hand[0].name[0] == "a" | this.hand[1].name[0] == "a")) {
                return true;
            } else {
                return false;
            }
        }
    }
}



// Card - holds name, value and imageFilename for later display of card image
class Card {
    constructor (name, value, imageFilename){
        this.name = name;
        this.value = value;
        this.imageFilename = imageFilename;
    }

    isAce(){
        return this.name[0] == "a";
    }

    getValue(){
        return this.value;
    }
}



let initializeDeckOfCards = () =>{
    let deck = new Map();
    let suit = ["c", "d", "h", "s"];
    let faceCards = ["k", "q", "j"];
    // create each suit
    for (let i = 0; i < suit.length; i++) {
        // create ace
        let ace = new Card(`a${suit[i]}`, 11, `a${suit[i]}.jpg` );
        deck.set(ace.name,ace);
        // create face cards
        for (let j = 0; j < faceCards.length; j++) {
            let card = new Card(`${faceCards[j]}${suit[i]}`, 10, `${faceCards[j]}${suit[i]}.jpg`);
            deck.set(card.name, card);
        }
        // create number cards
        for (let j = 2; j <= 10; j++) {
            let card = new Card(`${j}${suit[i]}`, j, `${j}${suit[i]}.jpg`);
            deck.set(card.name, card);                                    
        }               
    } 
}

initializeDeckOfCards();

let hand = [
    new Card("2c", 2),
    new Card("jh", 10),
    new Card("6s", 6),
    new Card("ah", 11),
    new Card("ac", 11),
    new Card("as", 11)
]

let blackJackHand = [
    new Card("jh", 10),
    new Card("ah", 11)
]


let player = new Player("Stefani", 100, 50, blackJackHand);

console.log (player.isNaturalBlackJack());
console.log(player.calculateHand());
console.log(player.isBust());
console.log((new Card("as", 11)).isAce());
