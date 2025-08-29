"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("settings.js loaded"); // Debug: Confirm script loads

  // Check for email and token in sessionStorage
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const storeName = sessionStorage.getItem("storeName");
  const addProductNameError = document.getElementById("addProductNameError");
  const userStoreName = document.getElementById("userStoreName");
  const userEmailPrefix = document.getElementById("userEmailPrefix");
  const userEmailSuffix = document.getElementById("userEmailSuffix");

  // Populate userStoreName
  if (userStoreName) {
    userStoreName.textContent = storeName || "Unknown Store";
    console.log("Store name from sessionStorage:", storeName); // Debug
    if (userStoreName.scrollWidth > userStoreName.clientWidth) {
      userStoreName.title = storeName;
    } else {
      userStoreName.removeAttribute("title");
    }
  } else {
    console.warn("Element with id 'userStoreName' not found in DOM"); // Debug
  }
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

  if (!email || !token) {
    console.warn(
      "Missing email or token in sessionStorage, redirecting to signup"
    ); // Debug
    if (addProductNameError) {
      addProductNameError.textContent =
        "Authentication required. Please sign up or log in.";
      addProductNameError.setAttribute("aria-live", "polite");
    }
    setTimeout(() => {
      window.location.href = "../sign-up/";
    }, 2000);
    return;
  }
  console.log("Email from sessionStorage:", email); // Debug
  console.log("Token from sessionStorage:", token); // Debug

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
  const settingsButtons = {
    profile: document.getElementById("profileSettingsBtn"),
    password: document.getElementById("passwordSettingsBtn"),
    security: document.getElementById("securitySettingsBtn"),
    notification: document.getElementById("notificationSettingsBtn"),
  };

  const settingsSections = {
    profile: document.getElementById("profileSettingsContainer"),
    password: document.getElementById("passwordSettingsContainer"),
    security: document.getElementById("securitySettingsContainer"),
    notification: document.getElementById("notificationSettingsSection"),
  };

  function showSettingsSection(sectionKey) {
    // Hide all sections
    Object.values(settingsSections).forEach((section) => {
      section.classList.add("hidden");
    });

    // Reset all buttons aria-expanded
    Object.values(settingsButtons).forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
    });

    // Show the selected section
    if (settingsSections[sectionKey]) {
      settingsSections[sectionKey].classList.remove("hidden");
    }

    // Set active button
    if (settingsButtons[sectionKey]) {
      settingsButtons[sectionKey].setAttribute("aria-expanded", "true");
    }
  }

  // Attach event listeners
  settingsButtons.profile?.addEventListener("click", () =>
    showSettingsSection("profile")
  );
  settingsButtons.password?.addEventListener("click", () =>
    showSettingsSection("password")
  );
  settingsButtons.security?.addEventListener("click", () =>
    showSettingsSection("security")
  );
  settingsButtons.notification?.addEventListener("click", () =>
    showSettingsSection("notification")
  );
});
