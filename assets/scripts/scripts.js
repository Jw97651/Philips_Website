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

const intro = document.getElementById("intro");
const year = document.getElementById("year");

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
      openModal(image);
    });

    knifeGrid.appendChild(card);
  });
}

function openModal(image) {
  modalImage.src = image;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeKnifeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImage.src = "";
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

if (closeModal) {
  closeModal.addEventListener("click", closeKnifeModal);
}

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeKnifeModal();
    }
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeKnifeModal();
  }
});

displayKnives();