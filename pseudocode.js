//==================================================================================================
// Classes
//==================================================================================================
/* 

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
        holdAce = [];
        for (const card of this.hand){
            if card.isAce() {
                holdAce.push() = card;
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

    isBust(){
        return (this.calculateHand() > 21);
    }
}

class Player extends PlayerParent {
    constructor (name, wallet, bet, hand) (
        super(name, hand);
        this.wallet = wallet;
        this.bet = bet;
    )


}

class Dealer extends PlayerParent {

    deal() {
        deal two cards face up to player
        deal one card face down to dealer
        deal one card face up to dealer
    }

    // Make sure an instance and be an argument to its own method
    hit(player) {
        deal one card
    }
}

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

class Blackjack {
    constructor (){
        this.deckOfCards = initializeDeckOfCards();
    }

    // Building the deck of cards using a Map.  Key = card name ( #A, where # is the num of card and A is the suit (C - club, D - diamond, H - heart, S- spade)) Value = the filename of the image
    initializeDeckOfCards(){
        let deck = new Map();
        let suit = ["c", "d", "h", "s"];
        let faceCards = ["k", "q", "j"];
        // Create each suit
        for (let i = 0; i < suit.length; i++) {
            // Set Ace
            let ace = new Card(`a${suit[i]}`, 11, `a${suit[i]}.jpg` );
            deck.set(ace.name,ace);
            // Face cards
            for (let j = 0; j < faceCards.length; j++) {
                let card = new Card(`${faceCards[j]}${suit[i]}`, 10, `${j}${faceCards[j]}${suit[i]}.jpg`);
                deck.set(card.name, card);
            }                
        } 
        console.log(deck);
    }

    startGame(){
        deal two cards to player
        deal two cards to dealer

        ask the player hit or stay
        while hit {
            deal card to player
        }
        
        Display player hand status

        //Dealer plays
        while hand < 17 {
            deal card to dealer
        }

        Compare hands.




    }
}



*/
