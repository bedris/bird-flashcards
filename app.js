/* --------------------------
   State
-------------------------- */
let birds = [];
let currentBird = null;
let revealed = false;
let lastIndex = -1;

/* --------------------------
   DOM References
-------------------------- */
const card = document.getElementById("card");
const cardBack = document.getElementById("cardBack");
const audio = document.getElementById("audio");
const birdImage = document.getElementById("birdImage");
const birdName = document.getElementById("birdName");

audio.preload = "auto";

/* --------------------------
   Load random bird
-------------------------- */
function loadRandomBird() {
  if (birds.length === 0) return;

  // Reset card state
  card.classList.remove("flipped");
  cardBack.classList.remove("revealed");
  revealed = false;

  // Pick random bird (avoid immediate repeat)
  let index;
  do {
    index = Math.floor(Math.random() * birds.length);
  } while (index === lastIndex && birds.length > 1);

  lastIndex = index;
  currentBird = birds[index];

  // Update UI
  birdImage.src = currentBird.image;
  birdName.textContent = currentBird.name;

  // Reset + load audio (Safari-safe)
  audio.pause();
  audio.currentTime = 0;
  audio.src = currentBird.audio;
  audio.load();
}

/* --------------------------
   Event listeners
-------------------------- */

// Play button
document.getElementById("playBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  audio.currentTime = 0;
  audio.play().catch(err => {
    console.error("Audio play failed:", err);
  });
});

// Card click: front → back → reveal name
card.addEventListener("click", () => {
  // Front → back
  if (!card.classList.contains("flipped")) {
    card.classList.add("flipped");
    return;
  }

  // Back → reveal name + button
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
   Load bird data and start app
-------------------------- */
fetch("birds.json")
  .then(r => {
    if (!r.ok) throw new Error("birds.json not found");
    return r.json();
  })
  .then(data => {
    birds = data;
    loadRandomBird(); // START ONLY AFTER JSON LOADS
  })
  .catch(err => {
    console.error("Failed to load birds.json:", err);
  });