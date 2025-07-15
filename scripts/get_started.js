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

const form = document.querySelector("form");
const radioInputs = document.querySelectorAll("input[name='category']");
const labels = document.querySelectorAll(
  "label[for='merchant'], label[for='shopper']"
);

// Handle label border toggle
radioInputs.forEach((input) => {
  input.addEventListener("change", () => {
    labels.forEach((label) => {
      label.classList.remove("border-primary");
      label.classList.add("border-gray-200");
    });

    const selectedLabel = document.querySelector(`label[for="${input.id}"]`);
    selectedLabel.classList.add("border-primary");
    selectedLabel.classList.remove("border-gray-200");
  });
});

// On form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const selected = document.querySelector("input[name='category']:checked");

  if (!selected) {
    // Show red border if nothing is selected
    labels.forEach((label) => {
      label.classList.add("border-red-500");
      label.classList.remove("border-primary");
    });
    return;
  }

  const role = selected.value;

  if (role === "merchant") {
    window.location.href = "../merchant/sign-up";
  } else if (role === "customer") {
    window.location.href = "../shopper/sign-up";
  }
});
