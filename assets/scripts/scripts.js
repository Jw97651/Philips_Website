const knives = [
  "assets/images/5117.jpg",
  "assets/images/5118.jpg",
  "assets/images/5119.jpg",
  "assets/images/5120.jpg",
  "assets/images/5121.jpg",
  "assets/images/5122.jpg",
  "assets/images/5123.jpg",
  "assets/images/5124.jpg",
  "assets/images/5125.jpg",
  "assets/images/5126.jpg",
  "assets/images/5127.jpg",
  "assets/images/5128.jpg",
  "assets/images/5129.jpg",
  "assets/images/5130.jpg",
  "assets/images/5131.jpg",
  "assets/images/5132.jpg",
  "assets/images/5133.jpg",
  "assets/images/5134.jpg",
  "assets/images/5135.jpg",
  "assets/images/5136.jpg",
  "assets/images/5914.jpg",
  "assets/images/5917.jpg",
  "assets/images/5918.jpg",
  "assets/images/5919.jpg",
  "assets/images/5920.jpg",
  "assets/images/5921.jpg",
  "assets/images/5922.jpg",
  "assets/images/5923.jpg",
  "assets/images/5924.jpg",
  "assets/images/5925.jpg"
];

const knifeGrid = document.getElementById("knifeGrid");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const modal = document.getElementById("knifeModal");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalCounter = document.getElementById("modalCounter");
const prevKnife = document.getElementById("prevKnife");
const nextKnife = document.getElementById("nextKnife");

const intro = document.getElementById("intro");
const year = document.getElementById("year");

let currentKnifeIndex = 0;

document.body.classList.add("intro-active");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (intro) {
      intro.style.display = "none";
    }

    document.body.classList.remove("intro-active");
  }, 6400);
});

if (year) {
  year.textContent = new Date().getFullYear();
}

function displayKnives() {
  if (!knifeGrid) return;

  knifeGrid.innerHTML = "";

  knives.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("knife-card");

    card.innerHTML = `
      <img src="${image}" alt="Crazy J handmade knife ${index + 1}" loading="lazy">
      <div class="knife-info">
        <h3>Handmade Blade ${index + 1}</h3>
        <p>View Blade</p>
      </div>
    `;

    card.addEventListener("click", () => {
      openModal(index);
      playKnifeClick();
    });

    card.addEventListener("mousemove", createSpark);

    knifeGrid.appendChild(card);
  });
}

function openModal(index) {
  if (!modal || !modalImage) return;

  currentKnifeIndex = index;
  updateModalImage();

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function updateModalImage() {
  if (!modalImage) return;

  modalImage.src = knives[currentKnifeIndex];
  modalImage.alt = `Crazy J handmade knife ${currentKnifeIndex + 1}`;

  if (modalCounter) {
    modalCounter.textContent = `${currentKnifeIndex + 1} / ${knives.length}`;
  }
}

function closeKnifeModal() {
  if (!modal || !modalImage) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImage.src = "";
}

function showNextKnife() {
  currentKnifeIndex = (currentKnifeIndex + 1) % knives.length;
  updateModalImage();
  playKnifeClick();
}

function showPreviousKnife() {
  currentKnifeIndex = (currentKnifeIndex - 1 + knives.length) % knives.length;
  updateModalImage();
  playKnifeClick();
}

function playKnifeClick() {
  const sound = new Audio("assets/sounds/knife-click.mp3");
  sound.volume = 0.35;
  sound.play().catch(() => {});
}

function createSpark(event) {
  if (Math.random() > 0.18) return;

  const card = event.currentTarget;
  const spark = document.createElement("span");
  spark.classList.add("spark");

  const rect = card.getBoundingClientRect();

  spark.style.left = `${event.clientX - rect.left}px`;
  spark.style.top = `${event.clientY - rect.top}px`;
  spark.style.setProperty("--x", `${Math.random() * 80 - 40}px`);
  spark.style.setProperty("--y", `${Math.random() * -80 - 20}px`);

  card.appendChild(spark);

  setTimeout(() => {
    spark.remove();
  }, 700);
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("show");
    }
  });
});

if (closeModal) {
  closeModal.addEventListener("click", closeKnifeModal);
}

if (nextKnife) {
  nextKnife.addEventListener("click", showNextKnife);
}

if (prevKnife) {
  prevKnife.addEventListener("click", showPreviousKnife);
}

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeKnifeModal();
    }
  });
}

document.addEventListener("keydown", event => {
  if (!modal || !modal.classList.contains("show")) return;

  if (event.key === "Escape") {
    closeKnifeModal();
  }

  if (event.key === "ArrowRight") {
    showNextKnife();
  }

  if (event.key === "ArrowLeft") {
    showPreviousKnife();
  }
});

displayKnives();