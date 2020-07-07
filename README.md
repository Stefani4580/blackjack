# BlackjaMOD1 Project Game - Blackjackck

## Overview
This Blackjack game is a two-person game.  The player against the computer.  Player places bets on hand.  As the player continues to play, the winnings accumulate.  Game ends when the player ends the game or runs out of money. 

## Rules of the Game
Dealer (computer) deals two cards face up to the player.  The dealer deals two cards to herself one face up and one face down.

The player has the choice to “stay” or “hit”.  The player can “hit” multiple times  until they reach or exceed 21.

The dealer plays after the player has finished.  The dealer reveals her hidden card.  The dealer must hit if her hand is less than 17.  At 17 or greater, the dealer must stay.

The winner is determined by the following rules:
> * If the player is dealt an Ace and a ten-value card (called a "blackjack" or "natural"), and the dealer does not, the player wins.
>* If the player exceeds a sum of 21 ("busts"); the player loses, even if the dealer also exceeds 21.
>* If the dealer exceeds 21 ("busts") and the player does not; the player wins.
>* If the player attains a final sum higher than the dealer and does not bust; the player wins.
>* If both dealer and player receive a blackjack or any other hands with the same sum, called a "push", no one wins.

The player receives 1.5 times the bet for a win and 2 times the bet for a natural blackjack (i.e. ace and facecard).  The player loses the bet if they lose.   For a push, the player keeps the bet.

The player can choose to stop the game.  The game ends if the player has no money.

## Approach Taken
Using Object Oriented Design, I identified the actors that became classes (e.g. Player, Dealer and Game).  Then I identified the actions that the actors would make (e.g. deal, count hand, hit, start game).  Those actions became methods of the classes.

I pseudocoded my game using my wireframe to indicate APIs needed for communication with the UI.  Other classes were identified during pseudocoding.  I implemented and tested the code in phases starting with the deck of cards.

I implemented my game to work in the console prior to implementing the UI.  After I had a working game, I implemented the UI using vanilla CSS.

Once I had a working game (HTML, CSS, JS), I investigated jQuery to add animation.  I used jQuery to animate the cards as they were dealt and revealed.

## File Structure
- blackjack
    - assets
        - cards
    - pages
    - styles

## Installation
The game starts by opening the index.html page.


## Blackjack 2.0
I would like to improve the UI with more animation and other modern UI techniques.

## Resources
Card Images
: Downloaded from American Contract Bridge League (ACBL) http://acbl.mybigcommerce.com/52-playing-cards/

Images
: Downloaded from unsplash https://unsplash.com/photos/gqCYRe2ml6k jt-gqCYRe2ml6k-unsplash.jpg
: Downloaded from unsplash https://unsplash.com/photos/o4lI2gKdrrA

jQuery
: https://www.tutorialspoint.com/jquery/index.htm
