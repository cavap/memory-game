function resetCardsState() {
  lockedCards = false;
  firstCard = null;
  secondCard = null;
}

function unflipWrongCards() {
  lockedCards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetCardsState();
  }, unflipTime);
}

function disableFoundCards() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  resetCardsState();
}

function cardsAreEqual() {
  return firstCard.dataset.card === secondCard.dataset.card;
}

function checkMatch() {
  if (cardsAreEqual()) disableFoundCards();
  else unflipWrongCards();
}

function flip() {
  if (lockedCards || this === firstCard) {
    return;
  }
  this.classList.add("flip");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  checkMatch();
}

function shuffle() {
  cards.forEach((card) => (card.style.order = Math.floor(Math.random() * 12)));
}

let lockedCards = false;
let firstCard = null,
  secondCard = null;
const unflipTime = 1000;
const cards = document.querySelectorAll(".cards");
cards.forEach((card) => card.addEventListener("click", flip));

shuffle();
