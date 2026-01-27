let revealed = false;
console.log("Bird flashcards loaded");
function loadRandomBird() {
  card.classList.remove("flipped");
  cardBack.classList.remove("revealed");
  revealed = false;

  currentBird = birds[Math.floor(Math.random() * birds.length)];

  birdImage.src = currentBird.image;
  birdName.textContent = currentBird.name;
  audio.src = currentBird.audio;
}
