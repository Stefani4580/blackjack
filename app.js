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

//==================================================================================================
// isNaturalBlackJack() - returns true if holding an ace and a 10 card
//==================================================================================================
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


//==================================================================================================
// Dealer - has name and hand. Can startHand(player).
//==================================================================================================
class Dealer extends PlayerParent {

    startHand(player) {
        player.hand.push(blackjack.nextCard());
        player.hand.push(blackjack.nextCard());
        console.log("Player hand: ", player.hand);
        this.hand.push(blackjack.nextCard());
        this.hand.push(blackjack.nextCard());
        console.log("Dealer hand: ", this.hand);
    }

    hit(player){
        player.hand.push(blackjack.nextCard());
    }
}



//==================================================================================================
// Card - holds name, value and imageFilename for later display of card image
//==================================================================================================
class Card {
    constructor (name, value, imageFilename){
        this.name = name;
        this.value = value;
        this.imageFilename = imageFilename;
    }

//==================================================================================================
// isAce() - returns true if the first character of the name is "a"; indicates an ace
//==================================================================================================
isAce(){
        return this.name[0] == "a";
    }

    getValue(){
        return this.value;
    }
}

class Blackjack {
    constructor(){
        this.deck = this.initializeDeckOfCards();
        this.staticDeck = this.deck;
        this.dealer = new Dealer("dealer",[]);
        this.player = new Player("Stefani", 500, 100,[]);
    }
//==================================================================================================
// initializeDeckOfCards() - creates the deck of cards in a Map
//==================================================================================================
    initializeDeckOfCards(){
        let deck = new Map();
        // deck = new Set();
        let suit = ["c", "d", "h", "s"];
        let faceCards = ["k", "q", "j"];
        let cardId = 0; // Index for unique id for each card
        // create each suit
        for (let i = 0; i < suit.length; i++) {
            // create ace
            let ace = new Card(`a${suit[i]}`, 11, `a${suit[i]}.jpg` );
            deck.set(cardId,ace);
            cardId++;
            // deck.add(ace);
            // create face cards
            for (let j = 0; j < faceCards.length; j++) {
                let card = new Card(`${faceCards[j]}${suit[i]}`, 10, `${faceCards[j]}${suit[i]}.jpg`);
                deck.set(cardId, card);
                cardId++;
                // deck.add(card);
            }
            // create number cards
            for (let j = 2; j <= 10; j++) {
                let card = new Card(`${j}${suit[i]}`, j, `${j}${suit[i]}.jpg`);
                deck.set(cardId, card);   
                cardId++;
                // deck.add(card);                                 
            }
        }
        return deck;              
    }

//==================================================================================================
// nextCard() - return next random card from deck and removes from deck
//==================================================================================================
    nextCard(){
        let index = returnRandomNumber(0, 51);
        let nextCard = this.deck.get(index);
        let isRemoved = this.deck.delete(index);
        return nextCard;
    }

    startGame(){
        let playAgain = true;
        while (playAgain) {
        console.log("==== Start round by dealing 2 cards to player and dealer ====");
            this.dealer.startHand(this.player);
            
            // let hitOrStay = prompt("Would you like to hit or stay?","h/s");
            console.log("==== Player says hit ====");
            let hitOrStay = "h";
            while (hitOrStay == "h"){
                console.log(`==== Hit Player at ${this.player.calculateHand()} ====`);
                this.dealer.hit(this.player);
                // hitOrStay = prompt("Would you like to hit or stay?","h/s");
                hitOrStay = "s";
            }
            
        //     Display player hand status
            console.log("Player hand:  ", this.player.calculateHand());
            if (this.player.isBust()){
                console.log("Player has busted with ", this.player.calculateHand());
            }
            console.log("==== Dealer's turn ====");

            while (this.dealer.calculateHand() < 17) {
                console.log(`==== Hit Dealer at ${this.dealer.calculateHand()} ====`);
                this.dealer.hit(this.dealer);
            }
            console.log("Dealer hand:  ", this.dealer.calculateHand());
            playAgain = false;

        //     Compare hands.
        //     let dealerTotal = dealer.calculateHand();
        //     let playerTotal = player.calculateHand();

        //     If dealerTotal > playerTotal {
        //         player loses
        //     } else if dealerTotal < playerTotal {
        //         player wins
        //         if (player.isNaturalBlackjack) {
        //             player.wallet =+ player.bet * 2;
        //         } else {
        //             player.wallet =+ player.bet * 1.5;
        //         }
        //     } else {
        //         // It's a push.
        //         return bet to player wallet
        //     }
        //     Ask player if they want to play again
        }

        }

    
}



const blackjack = new Blackjack();
blackjack.startGame();
