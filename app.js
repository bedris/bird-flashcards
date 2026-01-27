/* --------------------------
   Bird Data
-------------------------- */
const birds = [
  {
    name: "California Towhee",
    image: "images/California-Towhee.jpg",
    audio: "audio/California-Towhee.mp3"
  },
  {
    name: "Anna’s Hummingbird",
    image: "images/Annas-Hummingbird.jpg",
    audio: "audio/Annas-hummingbird.mp3"
  }
];

/* --------------------------
   DOM References
-------------------------- */
const card = document.getElementById("card");
const cardBack = document.getElementById("cardBack");
const audio = document.getElementById("audio");
const birdImage = document.getElementById("birdImage");
const birdName = document.getElementById("birdName");

let currentBird = null;
let revealed = false;

audio.preload = "auto";

/* --------------------------
   Load random bird
-------------------------- */
function loadRandomBird() {
  // Reset card state
  card.classList.remove("flipped");
  cardBack.classList.remove("revealed");
  revealed = false;

  // Pick random bird
  currentBird = birds[Math.floor(Math.random() * birds.length)];

  // Set image, name, and audio
  birdImage.src = currentBird.image;
  birdName.textContent = currentBird.name;
  audio.src = currentBird.audio;
}

/* --------------------------
   Event listeners
-------------------------- */

// Play button
document.getElementById("playBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  audio.play();
});

// Card click: front → back, then reveal name
card.addEventListener("click", () => {
  // Flip front → back
  if (!card.classList.contains("flipped")) {
    card.classList.add("flipped");
    return;
  }

  // Back card first click → reveal name + Next button
  if (!revealed) {
    cardBack.classList.add("revealed");
    revealed = true;
  }
});

// Next Bird button
document.getElementById("nextBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  loadRandomBird();
});

/* --------------------------
   Initial load
-------------------------- */
loadRandomBird();
