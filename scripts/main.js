
let deck = []
let deck2 = []
let playerHand = []
var dealerHand = []
let cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let cardNumbers2 = [1, 11, 12, 13]
let suits = ["clubs", "diamonds", "hearts", "spades"]
let deal = document.querySelector("#deal-button")
let hit = document.querySelector("#hit-button")
let stand = document.querySelector("#stand-button")
// let playAgain = document.querySelector("#play-again-button")
let dealer = document.querySelector("#dealer")
let player = document.querySelector("#player")
let message = document.querySelector("#message")

// create deck programmatically
function buildDeck(deck){
  cardNumbers.forEach(num => {
    suits.forEach(suit => {
      let card = {}
      if(num > 1 && num <=10){
        card = {number: num, suit: suit, points: num, src: `images/${num}_of_${suit}.png`}
      }
      else if(num == 1){
        card = {number: num, suit: suit, points: 11, src: `images/${num}_of_${suit}.png`}
      }
      else{
        card = {number: num, suit: suit, points: 10, src: `images/${num}_of_${suit}.png`}
      }
      deck.push(card)
    })
  })
}

function buildDeck2(deck){
  cardNumbers2.forEach(num => {
    suits.forEach(suit => {
      let card = {}
      if(num == 1){
        card = {number: num, suit: suit, points: 11, src: `images/${num}_of_${suit}.png`}
      }
      else if(num == 11 || num == 12 || num == 13){
        card = {number: num, suit: suit, points: 10, src: `images/${num}_of_${suit}.png`}
      }
      deck.push(card)
    })
  })
}

// function to shuffle the deck array
function shuffleDeck(deck) {
  for (var i = deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
  }
}

//create dealCardTo function which uses .pop() on the deck to deal 1 card to the player, 1 card to the dealer, then another card to the player, and a face-down card to the dealer. 

function dealCardTo(person, deck){
  let card = deck.pop()
  let newCard = document.createElement("img") 
  newCard.setAttribute("class", "card1")
  newCard.setAttribute("src", `${card.src}`)
  person.children[1].append(newCard) // appends card to person's hand
  let points = parseInt(person.children[0].children[0].textContent) // converts "current points" to int and sets equal to points
  points += card.points // adds card points to variable points
  person.children[0].children[0].textContent = points.toString() // sets "current points" to string value of points
  if(person.id == "player"){
    playerHand.push(card.number)
    console.log(`playerHand = ${playerHand}`);
  }
  if(person.id == "dealer"){
    dealerHand.push(card.number)
    console.log(`dealerHand = ${dealerHand}`)
  }
}

function displayMessage(messageText){
  message.textContent = messageText
}

function aceInHand(person, personHand){
  let points = parseInt(person.children[0].children[0].textContent) // converts "current points" to int and sets equal to points
  points -= 10 // converts ace to value of 1 point
  person.children[0].children[0].textContent = points.toString() // sets "current points" to string value of points
  let index = personHand.indexOf(1)
  if(index > -1){
    personHand.splice(index, 1)
  }
  else{
    alert(`aceInHand() was run but no ace was found in ${person.id}'s hand`)
  }
}

buildDeck(deck)

shuffleDeck(deck)
console.log(deck)

buildDeck2(deck2)

shuffleDeck(deck2)
console.log(deck2)

displayMessage("Click \"Deal\" to play")

deal.addEventListener("click", () => {
  if(dealerHand.length === 0){
    dealCardTo(player, deck)
    dealCardTo(dealer, deck)
    dealCardTo(player, deck)
    dealCardTo(dealer, deck)
    if(dealer.children[0].children[0].textContent == "22"){
      aceInHand(dealer, dealerHand)
    }
    if(player.children[0].children[0].textContent == "22"){
      aceInHand(player, playerHand)
    }
    if(dealer.children[0].children[0].textContent == "21" && player.children[0].children[0].textContent == "21"){
      displayMessage("PUSH...you don't win and you don't lose.")
    }
    else if(dealer.children[0].children[0].textContent == "21"){
      displayMessage("House wins. Please play again.")
    }
    else if(player.children[0].children[0].textContent == "21"){
      displayMessage("Perfect Hand. You win!")
    }
  }
})

hit.addEventListener("click", () => {
  if(dealerHand.length != 0){
    if(parseInt(player.children[0].children[0].textContent) < 21){
      dealCardTo(player, deck)
    }
    if(parseInt(player.children[0].children[0].textContent) > 21 && playerHand.includes(1)){
      aceInHand(player, playerHand)
    }
    if(parseInt(player.children[0].children[0].textContent) > 21){
      displayMessage("Player bust. House wins.")
    }
  }
})

stand.addEventListener("click", () => {
  if(dealerHand.length != 0){
    while (parseInt(dealer.children[0].children[0].textContent) <= 16){ // 
      dealCardTo(dealer, deck)
      if(parseInt(dealer.children[0].children[0].textContent) > 21 && dealerHand.includes(1)){
        aceInHand(dealer, dealerHand)
      }
    }
    if(parseInt(dealer.children[0].children[0].textContent) <= 21){
      if(parseInt(dealer.children[0].children[0].textContent) > parseInt(player.children[0].children[0].textContent)){
        displayMessage("House wins. Please play again.")
      }
      else if(parseInt(dealer.children[0].children[0].textContent) === parseInt(player.children[0].children[0].textContent)){
        displayMessage("PUSH...you don't win and you don't lose.")
      }
      else{
        displayMessage("You win. Congratulations!!!")
      }
    }
    else{
      displayMessage("Dealer bust. You win.")
    }
  }
})

playAgain.addEventListener("click", () => {
  deck = []
  buildDeck()
  shuffleDeck()
  playerHand = []
  dealerHand = []
  // make points = 0
  // remove divs from dealer and player hands
})

// todo if player score goes over 21, print out "BUST!" in message area

// todo create function (playerStands())to deal cards to dealer after player hits stand

// todo calculate value. If dealer or player go over 21, they lose.


// todo have game logic function???
