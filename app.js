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
// isNaturalBlackjack() - returns true if holding an ace and a 10 card
//==================================================================================================
isNaturalBlackjack() {
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

 
//==================================================================================================
// payWinnings(player, rate) - pay the player at the bet * rate 
//==================================================================================================
    payWinnings(player, rate){
        let winnings = this.player.bet * rate;
        this.player.wallet += winnings;
        this.player.bet = 0;
    }

    startGame(){
        console.log("Player: ", this.player);
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

        //     Compare hands
            let dealerTotal = this.dealer.calculateHand();
            let playerTotal = this.player.calculateHand();
            let playerWinLosePush = "push";

            if (this.player.isBust()){
                console.log(`==== Player loses with bust at (${playerTotal}) ====`);
                playerWinLosePush = "lose"
                this.player.bet = 0;
            } else if (this.dealer.isBust()) {
                console.log(`==== Player wins with  ${playerTotal}  Dealer at bust (${dealerTotal}) ====`);
                playerWinLosePush = "win";
            } else if (playerTotal > dealerTotal) {
                playerWinLosePush = "win";
                console.log(`==== Player wins with  ${playerTotal}  Dealer (${dealerTotal}) ====`);
            } else if (playerTotal < dealerTotal) {
                playerWinLosePush = "lose";
                console.log(`==== Dealer wins with  ${dealerTotal}  Player (${playerTotal}) ====`);
            } else {
                console.log(`==== It's a Push with Dealer at ${dealerTotal}  Player at ${playerTotal} ====`);
                playerWinLosePush = "push";
            }

            switch (playerWinLosePush) {
                case "win":
                    if (playerTotal == 21 && this.player.isNaturalBlackjack()) {
                        console.log(`==== Pay Player double for Natural Blackjack ====`);
                        this.payWinnings(this.player, 2);
                    } else {
                        console.log(`==== Pay Player 1.5 ====`);
                        this.payWinnings(this.player, 1.5);
                    }
                        break;

                case "lose":
                    this.player.bet = 0;
                    break;

                case "push":
                    this.player.wallet =+ this.player.bet;
                    this.player.bet = 0;
                    break;
            }

            console.log("Player: ", this.player);

        //     Ask player if they want to play again
                    playAgain = false;
        }

    }
}// end of Blackjack class



const blackjack = new Blackjack();
blackjack.startGame();
