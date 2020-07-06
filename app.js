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
//==================================================================================================
// startHand(player) - deal two cards to player displaying both. deal two cards to dealer displaying only the second.
//==================================================================================================
    startHand(player) {
        // deal two cards to player
        let nextCard = blackjack.nextCard();
        player.hand.push(nextCard);
        this.displayPlayerCard(nextCard);
        nextCard = blackjack.nextCard();
        player.hand.push(nextCard);
        this.displayPlayerCard(nextCard);
        document.getElementById("score").innerText = player.calculateHand();
        console.log("Player hand: ", player.hand);

        // deal two cards to dealer revealing on the second
        this.hand.push(blackjack.nextCard());
        nextCard = blackjack.nextCard();
        this.hand.push(nextCard);
        this.displayDealerCard(nextCard);
        console.log("Dealer hand: ", this.hand);
    }

    hit(player){
        let nextCard = blackjack.nextCard();
        player.hand.push(nextCard);
        if (player instanceof Player) {
            this.displayPlayerCard(nextCard);
            document.getElementById("score").innerText = player.calculateHand();        
        } else {
            this.displayDealerCard(nextCard);
        }
    }

    displayPlayerCard(card){
        const cardImg = document.createElement("img");
        cardImg.src = `${card.imageFilename}`;
        cardImg.height = 200;
        cardImg.width = 100;
        cardImg.style = "display: none;";
        cardImg.className = `${card.name}`;

        $(document).ready(function () {
            $(".playerCards").append(cardImg);
            $(`.${card.name}`).show(500);
        });
        // document.querySelector(".playerCards").appendChild(cardImgDiv); 
    }

    displayDealerCard(card){
        const cardImg = document.createElement("img");
        cardImg.src = `${card.imageFilename}`;
        cardImg.height = 200;
        cardImg.width = 100;
        cardImg.style = "display: none;";
        cardImg.className = `${card.name}`;

        $(document).ready(function () {
            $(".dealerCards").append(cardImg);
            $(`.${card.name}`).show(500);
        });

        // document.querySelector(".dealerCards").appendChild(cardImg); 
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
        this.activeDeck = this.initializeDeckOfCards();
        this.discardDeck = new Array();
        this.dealer = new Dealer("dealer",[]);
        this.player = new Player("Stefani", 500, 100,[]);
        this.displayInitialPlayerStats();
    }
//==================================================================================================
// initializeDeckOfCards() - creates the activeDeck of cards in a Map
//==================================================================================================
    initializeDeckOfCards(){
        let activeDeck = new Array();

        let suit = ["c", "d", "h", "s"];
        let faceCards = ["k", "q", "j"];
        for (let i = 0; i < suit.length; i++) {
            // create ace
            let ace = new Card(`a${suit[i]}`, 11, `../assets/cards/a${suit[i]}.jpg` );
            activeDeck.push(ace);
            // create face cards
            for (let j = 0; j < faceCards.length; j++) {
                let card = new Card(`${faceCards[j]}${suit[i]}`, 10, `../assets/cards/${faceCards[j]}${suit[i]}.jpg`);
                activeDeck.push(card);
            }
            // create number cards
            for (let j = 2; j <= 10; j++) {
                let card = new Card(`${j}${suit[i]}`, j, `../assets/cards/${j}${suit[i]}.jpg`);
                activeDeck.push(card);   
            }
        }
        return activeDeck;              
    }

//==================================================================================================
// displayPlayerStats() - display the initial stats in table
//==================================================================================================
    displayInitialPlayerStats(){
        document.getElementById("playerName").innerText = `${this.player.name}`;
        document.getElementById("bet").innerText = `$${this.player.bet}`;
        document.getElementById("wallet").innerText = `$${this.player.wallet}`;
        document.getElementById("score").innerText = 0;
    }

//==================================================================================================
// nextCard() - return next random card from activeDeck and removes from activeDeck
//==================================================================================================
    nextCard(){
        let index = returnRandomNumber(0, this.activeDeck.length-1);
        let nextCard = this.activeDeck[index];
        this.activeDeck.splice(index, 1);
        this.discardDeck.push(nextCard);
        return nextCard;
    }
 
//==================================================================================================
// payWinnings(player, rate) - pay the player at the bet * rate. return amount won.
//==================================================================================================
    payWinnings(player, rate){
        let winnings = this.player.bet * rate;
        this.player.wallet += winnings;
        this.player.bet = 0;
        return winnings;
    }

//==================================================================================================
// hitButtonClicked() - hit the player.  If bust, display lost status.
//==================================================================================================
    hitButtonClicked(){
        this.dealer.hit(this.player);
        if (this.player.isBust()) {
            if (this.player.wallet <= 0){
                document.getElementById("statusText").innerText = `${this.player.name} lost!  Busted at ${this.player.calculateHand()}\nNow ${this.player.name} is broke!  Game Over!!`;
                document.getElementById("hitButton").disabled = true;
                document.getElementById("stayButton").disabled = true;
                document.getElementById("nextHandButton").disabled = true;            
            } else {
                document.getElementById("hitButton").disabled = true;
                document.getElementById("stayButton").disabled = true;
                document.getElementById("nextHandButton").disabled = false;            

                document.getElementById("statusText").innerText = `${this.player.name} lost!  Busted at ${this.player.calculateHand()}`;                
            }
            document.getElementById("bet").innerText = "$0";
            document.getElementById("wallet").innerText = `$${this.player.wallet}`;    
        } else {
            document.getElementById("score").innerText = this.player.calculateHand();
        }
    }

//==================================================================================================
// stayButtonClicked() - disable hit/stay buttons. Start dealers turn. Turn over dealer hole card.
//                      Compare hands.
//==================================================================================================
    stayButtonClicked(){
        document.getElementById("hitButton").disabled = true;
        document.getElementById("stayButton").disabled = true;
        // Dealer's turn
        this.dealersTurn();
        this.turnOverDealersHoleCard();
        this.compareHands();

        // Display results
        document.getElementById("bet").innerText = "$0";
        document.getElementById("wallet").innerText = `$${this.player.wallet}`;

        // document.getElementById("nextHandButton").disabled = false;            
    }

//==================================================================================================
// nextHandButtonClicked() - Clear the board.  Dealer starts the next hand.
//==================================================================================================
    nextHandButtonClicked(){
        // Display next hand modal
        let nextHandModal = document.querySelector(".nextHandModal");
        nextHandModal.classList.add("makeModalVisible");
    }

//==================================================================================================
// nextHandInfo() - Get the next bet.  Update player model and UI.  Start next hand.
//==================================================================================================
    nextHandInfo(){
        let playerBet = parseInt(document.getElementById("nextBet").value);

        if (playerBet > this.player.wallet) {
            alert(`You cannot bet more than your wallet.  Wallet: $${this.player.wallet}`);   
            this.nextHandButtonClicked(); 
        } else {
            this.player.wallet -= playerBet;
            this.player.bet = playerBet;
            let nextHandModal = document.querySelector(".nextHandModal");
            nextHandModal.classList.remove("makeModalVisible");

            // Clear dealer and player hands
            document.querySelector(".playerCards").innerHTML = "";

            const cardBackImg = document.createElement("img");
            cardBackImg.id = "holeCard"
            cardBackImg.src = "../assets/cards/purple_back.jpg";
            cardBackImg.height = 200;
            cardBackImg.width = 100;

            let dealerCardsDiv = document.querySelector(".dealerCards"); 
            dealerCardsDiv.innerHTML = "";
            $(document).ready(function () {
                $(".dealerCards").append(cardBackImg);
            });  
    
            // dealerCardsDiv.appendChild(cardBackImg);

            document.getElementById("statusText").innerText = "";

            document.getElementById("dealerScore").innerText = "";


            document.getElementById("bet").innerText = `$${this.player.bet}`;
            document.getElementById("wallet").innerText = `$${this.player.wallet}`;
            document.getElementById("hitButton").disabled = false;
            document.getElementById("stayButton").disabled = false;
            document.getElementById("nextHandButton").disabled = true;            

            // Clear model for Dealer and Player.
            this.dealer.hand = [];
            this.player.hand = [];
            
            this.dealer.startHand(this.player);
        }
    }

//==================================================================================================
// startNewGameButtonClicked() - Clear the board.  Dealer starts the next hand.
//==================================================================================================
    startNewGameButtonClicked(){
        this.clearBoard();
        let newGameModal = document.querySelector(".newGameModal");
        newGameModal.classList.add("makeModalVisible");
    }

//==================================================================================================
// clearBoard() - Replace dealer cards with a single cardBack.  Replace the player cards with nothing.
//==================================================================================================
    clearBoard(){
        // Clear display for Dealer and Player
        document.getElementById("statusText").innerText = "";
        document.querySelector(".playerCards").innerHTML = "";
        document.getElementById("score").innerText = 0;
        document.getElementById("dealerScore").innerText = "";

        const cardBackImg = document.createElement("img");
        cardBackImg.id = "holeCard"
        cardBackImg.src = "../assets/cards/purple_back.jpg";
        cardBackImg.height = 200;
        cardBackImg.width = 100;

        let dealerCardsDiv = document.querySelector(".dealerCards"); 
        dealerCardsDiv.innerHTML = "";
        $(document).ready(function () {
            $(".dealerCards").append(cardBackImg);
        });

        // dealerCardsDiv.appendChild(cardBackImg);

        document.getElementById("hitButton").disabled = false;
        document.getElementById("stayButton").disabled = false;
        document.getElementById("nextHandButton").disabled = true;            

        // Clear model for Dealer and Player.  Reconstitute deck.
        this.dealer.hand = [];
        this.player.hand = [];
        this.discardDeck.forEach(card => this.activeDeck.push(card));
    }

//==================================================================================================
// dealersTurn() - Dealer must hit on less than 17.  Stay on 17 or over.
//==================================================================================================
    dealersTurn(){
        while (this.dealer.calculateHand() < 17) {
            console.log(`==== Hit Dealer at ${this.dealer.calculateHand()} ====`);
            this.dealer.hit(this.dealer);
        }
    }

//==================================================================================================
// turnOverDealersHoleCard() - Turn over dealer's hole card.
//==================================================================================================
    turnOverDealersHoleCard(){
        // $(document).ready(function (){
        //     // $("#holeCard").hide(200);
        //     $("#holeCard").src = this.dealer.hand[0].imageFilename;
        //     $("#holeCard").show(300);
        // });
        document.getElementById("holeCard").src = this.dealer.hand[0].imageFilename;
    }

//==================================================================================================
// compareHands() - Compare hands.  Determine winner by game rules.  Display results.
//==================================================================================================
    compareHands(){
        let dealerTotal = this.dealer.calculateHand();
        let playerTotal = this.player.calculateHand();
        let playerWinLosePush = "push";

        this.turnOverDealersHoleCard();
        document.getElementById("dealerScore").innerHTML = dealerTotal;
        document.getElementById("score").innerHTML = playerTotal;

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
                let winnings = 0;
                if (playerTotal == 21 && this.player.isNaturalBlackjack()) {
                    console.log(`==== Pay Player double for Natural Blackjack ====`);
                    winnings = this.payWinnings(this.player, 2);
                } else {
                    console.log(`==== Pay Player 1.5 ====`);
                    winnings = this.payWinnings(this.player, 1.5);
                }
                document.getElementById("statusText").innerText = `${this.player.name} won $${winnings}!`;
                this.player.wallet += winnings;
                document.getElementById("nextHandButton").disabled = false;            
                break;

            case "lose":
                document.getElementById("statusText").innerText = `${this.player.name} lost $${this.player.bet}!`;
                this.player.bet = 0;
                if (this.player.wallet <= 0){
                    document.getElementById("statusText").innerText = `${this.player.name} is broke!  Game Over!`;
                    document.getElementById("hitButton").disabled = true;
                    document.getElementById("stayButton").disabled = true;
                    document.getElementById("nextHandButton").disabled = true;            
                } else {
                document.getElementById("nextHandButton").disabled = false;            
                }
                break;

            case "push":
                document.getElementById("statusText").innerText = `Dealer and ${this.player.name} have the same score.  It's a push!`;
                this.player.wallet += this.player.bet;
                this.player.bet = 0;
                document.getElementById("nextHandButton").disabled = false;            
                break;
        }

    }


//==================================================================================================
// startGameInfo() - Capture name, wallet, bet from modal
//==================================================================================================
    startGameInfo(){
        let playerName = document.getElementById("name").value;
        let playerWallet = parseInt(document.getElementById("initialWallet").value);
        let playerBet = parseInt(document.getElementById("initialBet").value);

        if (playerBet > playerWallet) {
            alert(`You cannot bet more than your wallet.  Wallet: $${playerWallet}`);
            
        } else {
            this.player.name = playerName;
            this.player.wallet = playerWallet - playerBet;
            this.player.bet = playerBet;
            let newGameModal = document.querySelector(".newGameModal");
            newGameModal.classList.remove("makeModalVisible");
            document.getElementById("nextHandButton").disabled = true;            

            this.displayInitialPlayerStats();

            blackjack.startGame();       
        }

    }

    startGame(){
        this.dealer.startHand(this.player);
    }
}// end of Blackjack class


// Create instance of game
const blackjack = new Blackjack();

//Display Modal to capture initial player data
let newGameModal = document.querySelector(".newGameModal");
let modalClose = document.querySelector(".modal-close");
newGameModal.classList.add("makeModalVisible");

modalClose.addEventListener("click", function (){
    newGameModal.classList.remove("makeModalVisible");
});