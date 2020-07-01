//==================================================================================================
// Global functions
//==================================================================================================

// ===========================================================
// function returnRandomNumber(min, max)
//      Returns a random integer between min and max, inclusive
// ===========================================================   
returnRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//==================================================================================================
// Classes
//==================================================================================================

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
        // set ace
        let ace = new Card(`a${suit[i]}`, 11, `a${suit[i]}.jpg` );
        deck.set(ace.name,ace);
        // Face cards
        for (let j = 0; j < faceCards.length; j++) {
            let card = new Card(`${faceCards[j]}${suit[i]}`, 10, `${faceCards[j]}${suit[i]}.jpg`);
            deck.set(card.name, card);
        }
        // number cards
        for (let j = 2; j <= 10; j++) {
            let card = new Card(`${j}${suit[i]}`, 10, `${j}${suit[i]}.jpg`);
            deck.set(card.name, card);                                    
        }               
    } 
    console.log(deck);
    console.log(deck.size);
}

initializeDeckOfCards();
