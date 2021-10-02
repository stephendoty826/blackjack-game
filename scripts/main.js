
let deck = []
let cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let suits = ["clubs", "diamonds", "hearts", "spades"]
let deal = document.querySelector("#deal-button")
let hit = document.querySelector("#hit-button")
let stand = document.querySelector("#stand-button")
let dealerHand = document.querySelector("#dealer-hand")
let playerHand = document.querySelector("#player-hand")

// create deck programmatically
cardNumbers.forEach(num => {
  suits.forEach(suit => {
    let card = {number: num, suit: suit, src: `images/${num}_of_${suit}.png`}
    deck.push(card)
  })
})

// function to shuffle the deck array
function shuffleDeck() {
  for (var i = deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
  }
}

//create dealCard function which uses .pop() on the deck to deal 1 card to the player, 1 card to the dealer, then another card to the player, and a face-down card to the dealer. 

function dealCard(deck, hand){
  let card = deck.pop()
  let newCard = document.createElement("img")
  newCard.setAttribute("class", "card1")
  newCard.setAttribute("src", `${card.src}`)
  hand.append(newCard) 
}

shuffleDeck()

console.log(deck)

deal.addEventListener("click", () => {
  dealCard(deck, playerHand)

  dealCard(deck, dealerHand)

  dealCard(deck, playerHand)

  dealCard(deck, dealerHand)
})

hit.addEventListener("click", () => {
  dealCard(deck, playerHand)
})

stand.addEventListener("click", () => {
})


// add up value of cards and put current score in place

// if player score goes over 21, print out "BUST!" in message area

// create function (playerStands())to deal cards to dealer after player hits stand


// calculate value. If dealer or player go over 21, they lose.
