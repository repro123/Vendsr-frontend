"use strict";

// select elements that handle the mobile navigation dialog functionality.
const mobileNavButton = document.getElementById("mobileNavButton");
const mobileNavDialog = document.getElementById("mobileNavDialog");
const mobileNavCloseButton = document.getElementById("mobileNavCloseButton");
const mobileNavLinks = document.querySelectorAll("#mobileNavDialog a");

if (mobileNavButton) {
  mobileNavButton.addEventListener("click", () => {
    mobileNavDialog.showModal();
    document.body.classList.add("overflow-hidden");
    mobileNavButton.setAttribute("aria-expanded", "true");
  });

  // Close the mobile nav dialog when clicking the close button
  mobileNavCloseButton.addEventListener("click", closeMobileNav);

  // Close the mobile nav dialog when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // Close the mobile nav dialog when pressing the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });

  // Close the mobile nav dialog when resizing the window to a width greater than 768px
  // This is to ensure that the dialog closes when switching from mobile to desktop view
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMobileNav();
    }
  });

  // Close the mobile nav dialog when clicking outside of it
  mobileNavDialog.addEventListener("click", (event) => {
    if (event.target === mobileNavDialog) {
      closeMobileNav();
    }
  });
}

// Function to close the mobile navigation dialog
function closeMobileNav() {
  if (mobileNavDialog.open) {
    mobileNavDialog.close();
    document.body.classList.remove("overflow-hidden");
    mobileNavButton.setAttribute("aria-expanded", "false");
  }
}

//  FAQ sectiondocument.addEventListener("DOMContentLoaded", () => {
// Toggle FAQ Sections
const merchantsBtn = document.getElementById("merchantsFAQDivBtn");
const shoppersBtn = document.getElementById("shoppersFAQDivBtn");

const merchantsDiv = document.getElementById("merchantsFAQDiv");
const shoppersDiv = document.getElementById("shoppersFAQDiv");

const toggleSection = (showDiv, hideDiv, activeBtn, inactiveBtn) => {
  showDiv.classList.remove("hidden");
  hideDiv.classList.add("hidden");

  activeBtn.classList.add("activeBtn");
  inactiveBtn.classList.remove("activeBtn");
};

merchantsBtn.addEventListener("click", () => {
  toggleSection(merchantsDiv, shoppersDiv, merchantsBtn, shoppersBtn);
});

shoppersBtn.addEventListener("click", () => {
  toggleSection(shoppersDiv, merchantsDiv, shoppersBtn, merchantsBtn);
});

// Accordion Toggle Logic
const accordionButtons = document.querySelectorAll(".accordion__button");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

    // Toggle aria attributes and visibility
    button.setAttribute("aria-expanded", !expanded);
    panel.setAttribute("aria-hidden", expanded);
  });
});

const container = document.getElementById("testimonialContainer");
const radios = document.querySelectorAll("#testimonialRadios .radio");
const items = container.querySelectorAll("div.testimonial");

// Helper to update active radio
function updateActiveRadio(index) {
  radios.forEach((radio, i) => {
    radio.classList.toggle("bg-primary", i === index);
    radio.classList.toggle("bg-gray-400", i !== index);
  });
}

// Scroll listener to track visible testimonial
container.addEventListener("scroll", () => {
  const scrollLeft = container.scrollLeft;
  const width = container.clientWidth;
  const index = Math.round(scrollLeft / width);
  updateActiveRadio(index);
});

// Radio click handler
radios.forEach((radio, index) => {
  radio.addEventListener("click", () => {
    items[index].scrollIntoView({ behavior: "smooth", inline: "start" });
  });
});

// Left/Right Arrow Key Navigation
container.addEventListener("keydown", (e) => {
  const width = container.clientWidth;
  const scrollLeft = container.scrollLeft;
  const index = Math.round(scrollLeft / width);

  if (e.key === "ArrowRight" && index < items.length - 1) {
    items[index + 1].scrollIntoView({ behavior: "smooth", inline: "start" });
  } else if (e.key === "ArrowLeft" && index > 0) {
    items[index - 1].scrollIntoView({ behavior: "smooth", inline: "start" });
  }
});

// HERO SECTION ANIMATION
const texts = ["empowers", "connects", "supports", "enables", "equips"];

const images = [
  {
    src: "./assets/images/two-women-viewing-content-phone-vendsr-market.png",
    alt: "Empowerment on Vendsr",
  },
  {
    src: "./assets/images/Vendsr_connects-you.png",
    alt: "Connecting users with Vendsr",
  },
  {
    src: "./assets/images/Vendsr_supports-you.png",
    alt: "Supporting sellers on the go",
  },
  {
    src: "./assets/images/Vendsr_enables-you.png",
    alt: "Enabling growth for merchants",
  },
  {
    src: "./assets/images/Vendsr_equips_you.png",
    alt: "Boosting mobile commerce",
  },
];

let index = 0;

const textEl = document.getElementById("changingText");
const imageEl = document.getElementById("changingImage");

function updateHeroContent() {
  // Fade out
  textEl.classList.add("fade-out");
  imageEl.classList.add("fade-out");

  setTimeout(() => {
    // Update content
    textEl.textContent = texts[index];
    imageEl.src = images[index].src;
    imageEl.alt = images[index].alt;

    // Fade in
    textEl.classList.remove("fade-out");
    textEl.classList.add("fade-in");

    imageEl.classList.remove("fade-out");
    imageEl.classList.add("fade-in");

    // Reset fade-in class after animation
    setTimeout(() => {
      textEl.classList.remove("fade-in");
      imageEl.classList.remove("fade-in");
    }, 500); // should match animation duration
  }, 300); // wait for fade-out to finish

  index = (index + 1) % texts.length;
}

// Initial call
updateHeroContent();

// Repeat every 4 seconds
setInterval(updateHeroContent, 4000);
