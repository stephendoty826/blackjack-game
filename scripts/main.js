
let deck = []
let numberOfDecks = 3
let edgeDeck = [] // deck to test edge cases
let playerHand = []
let dealerHand = []
let cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let cardNumbers2 = [1, 11, 12, 13] // only aces and face cards for edge cases
let suits = ["clubs", "diamonds", "hearts", "spades"]
let playerPoints = 0
let dealerPoints = 0
let playerWins = 0
let dealerWins = 0
let faceDownImage = ""
let bet = 0
let budget = 500
let betPlaced = false
let deal = document.querySelector("#deal-button")
let hit = document.querySelector("#hit-button")
let stand = document.querySelector("#stand-button")
let resetButton = document.querySelector("#reset-button")
let dealer = document.querySelector("#dealer")
let player = document.querySelector("#player")
let message = document.querySelector("#message")
let selectBet = document.querySelector(".drop-menu")
let placeBet = document.querySelector("#place-a-bet")
let budgetText = document.querySelector("#budget")
let betText = document.querySelector("#current-bet")

// create deck programmatically
function buildDeck(deck){
  for(i = 0; i < numberOfDecks; i++){
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
}

function buildEdgeDeck(deck){ // function to build edgeDeck
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

//create dealCardTo() function which uses .pop() on the deck to deal 1 card to the player, 1 card to the dealer, then another card to the player, last face-down card is dealt to dealer using dealFaceDownCard() function

function dealCardTo(person, deck){
  let card = deck.pop()
  let newCard = document.createElement("img") 
  newCard.setAttribute("class", "card1")
  newCard.setAttribute("src", `${card.src}`)
  person.children[2].append(newCard) // appends card to person's hand
  if(person.id == "player"){
    playerPoints += card.points // adds card playerPoints to variable points
    player.children[1].children[0].textContent = playerPoints.toString() // sets "current points" to string value of playerPoints
    playerHand.push(card.number)
  }
  if(person.id == "dealer"){
    dealerPoints += card.points // adds card dealerPoints to variable points
    dealerHand.push(card.number)
  }
}

function dealFaceDownCard(deck){
  let card = deck.pop()
  let newCard = document.createElement("img") 
  newCard.setAttribute("class", "card1")
  faceDownImage = card.src
  newCard.setAttribute("src", "images/facedown_card.png")
  dealer.children[2].append(newCard) // appends card to dealer's hand
  dealerPoints += card.points // adds card dealerPoints to variable points
  dealerHand.push(card.number)
}

function displayMessage(messageText){
  message.textContent = messageText
}

function aceInHand(person, personHand){
  if(person.id == "player"){
    playerPoints -= 10
    player.children[1].children[0].textContent = playerPoints.toString()
  }
  else{
    dealerPoints -= 10
    dealer.children[1].children[0].textContent = playerPoints.toString()
  }
  let index = personHand.indexOf(1)
  if(index > -1){
    personHand.splice(index, 1)
  }
  else{
    alert(`aceInHand() was run but no ace was found in ${person.id}'s hand`)
  }
}

function resetGame(){
  deck = []
  buildDeck(deck)
  shuffleDeck(deck)
  console.log(deck)
  buildEdgeDeck(edgeDeck)
  shuffleDeck(edgeDeck)
  console.log(edgeDeck)
  playerHand = []
  dealerHand = []
  playerPoints = 0
  dealerPoints = 0
  dealer.children[1].children[0].textContent = "???"
  player.children[1].children[0].textContent = "0"
  dealer.children[2].innerHTML = ""
  player.children[2].innerHTML = ""
  bet = 0
  betPlaced = false
  betText.children[0].textContent = `\$${bet.toString()}`
  budgetText.children[0].textContent = `\$${budget.toString()}`
  displayMessage("Start by placing a bet")
  placeBet.disabled = false
  placeBet.textContent = "Place a Bet"
}

selectBet.addEventListener("click", (e) => {
  if(!betPlaced){
    placeBet.textContent = `Bet \$${e.target.textContent}?`
    bet = parseFloat(e.target.textContent)
  }
})

placeBet.addEventListener("click", () => {
  if(bet != 0){  
    budget -= bet
    budgetText.children[0].textContent = `\$${budget.toString()}`
    betText.children[0].textContent = `\$${bet.toString()}`
    placeBet.textContent = "Locked In"
    displayMessage("Click \"Deal\" to play")
    betPlaced = true
    placeBet.disabled = true
  }
})

deal.addEventListener("click", () => {
  if(bet != 0 && betPlaced){  
    if(dealerHand.length === 0){
      setTimeout(dealCardTo, 300, player, deck)
      setTimeout(dealCardTo, 600, dealer, deck)
      setTimeout(dealCardTo, 1100, player, deck)
      setTimeout(dealFaceDownCard, 1400, deck)
      if(dealerPoints == 22){
        aceInHand(dealer, dealerHand)
      }
      if(playerPoints == 22){
        aceInHand(player, playerHand)
      }
    }
  }
  else if (placeBet){
    alert(`Lock in your bet using the \"Bet \$${bet}?\" button `)
  }
  else{
    alert("Place a bet to play")
  }
})

hit.addEventListener("click", () => {
  if(playerPoints === 21){
    return
  }
  else if(dealerHand.length != 0){
    if(playerPoints < 21){
      dealCardTo(player, deck)
    }
    if(playerPoints > 21 && playerHand.includes(1)){
      aceInHand(player, playerHand)
    }
    if(playerPoints > 21){
      dealer.children[2].children[1].setAttribute("src", `${faceDownImage}`)
      dealer.children[1].children[0].textContent = dealerPoints.toString()
      displayMessage("House wins.")
      setTimeout(alert, 200, "Player BUST")
      dealerWins += 1
      dealer.children[0].children[0].textContent = dealerWins.toString()
    }
  }
})

stand.addEventListener("click", () => {
  if(dealerHand.length != 0){
    dealer.children[2].children[1].setAttribute("src", `${faceDownImage}`)
    if(dealerPoints < playerPoints){
      while (dealerPoints <= 16){
        dealCardTo(dealer, deck)
        if(dealerPoints > 21 && dealerHand.includes(1)){
          aceInHand(dealer, dealerHand)
        }
      }
    }
    dealer.children[1].children[0].textContent = dealerPoints.toString()
    if(dealerPoints <= 21){
      if(dealerPoints > playerPoints){
        displayMessage("House wins.")
        setTimeout(alert, 200, "Please play again.")
        dealerWins += 1
        dealer.children[0].children[0].textContent = dealerWins.toString()
      }
      else if(dealerPoints === playerPoints){
        displayMessage("TIE...")
        setTimeout(alert, 200, "You get your money back.")
        budget += bet
        budgetText.children[0].textContent = `\$${budget.toString()}`
      }
      else{
        displayMessage(`You win \$${bet*2}!`)
        setTimeout(alert, 200, "Congratulations!")
        budget += bet*2
        budgetText.children[0].textContent = `\$${budget.toString()}`
        playerWins += 1
        player.children[0].children[0].textContent = playerWins.toString()
      }
    }
    else{
      displayMessage(`You win \$${bet*2}!`)
      setTimeout(alert, 200, "Dealer BUST")
      budget += bet*2
      budgetText.children[0].textContent = `\$${budget.toString()}`
      playerWins += 1
      player.children[0].children[0].textContent = playerWins.toString()
    }
  }
})

resetButton.addEventListener("click", () => {
  resetGame()
})

resetGame()