"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("dashboard.js loaded"); // Debug: Confirm script loads

  // Check for email and token in sessionStorage
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const userEmailPrefix = document.getElementById("userEmailPrefix");
  const userEmailSuffix = document.getElementById("userEmailSuffix");

  // Populate userEmailPrefix and userEmailSuffix
  if (userEmailPrefix && userEmailSuffix) {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (email && emailRegex.test(email)) {
      const [prefix, suffix] = email.split("@");
      const truncatedPrefix =
        prefix.length > 10 ? prefix.slice(0, 10) + "..." : prefix;
      userEmailPrefix.textContent = truncatedPrefix;
      userEmailPrefix.setAttribute("title", email); // Tooltip with full email
      userEmailSuffix.textContent = `@${suffix}`;
      console.log("Email parsed:", {
        prefix,
        truncatedPrefix,
        suffix: `@${suffix}`,
      }); // Debug
    } else {
      userEmailPrefix.textContent = "User";
      userEmailPrefix.setAttribute("title", email || "No email available");
      userEmailSuffix.textContent = "";
      console.warn("Invalid or missing email in sessionStorage:", email); // Debug
    }
  } else {
    console.warn(
      "Element(s) with id 'userEmailPrefix' or 'userEmailSuffix' not found in DOM"
    ); // Debug
  }

  // Mobile Menu Toggle Logic
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const overlay = document.getElementById("overlay");

  function toggleMobileMenu() {
    const isOpen = !mobileSidebar.classList.contains("-translate-x-full");
    mobileSidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden", isOpen);
  }

  mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  closeMobileMenu.addEventListener("click", toggleMobileMenu);
  overlay.addEventListener("click", toggleMobileMenu);

  // Search Elements
  const searchInputDesktop = document.getElementById("searchInputDesktop");
  const searchInputMobile = document.getElementById("searchInputMobile");
  const cancelSearchBtnDesktop = document.getElementById(
    "cancelSearchBtnDesktop"
  );
  const cancelSearchBtnMobile = document.getElementById(
    "cancelSearchBtnMobile"
  );
  const mobileSearchIcon = document.getElementById("mobileSearchIcon");
});
