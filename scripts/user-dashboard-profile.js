"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const productsBtn = document.getElementById("productsBtn");
  const activityBtn = document.getElementById("activityBtn");

  const addProductItemDesktop = document.getElementById(
    "addProductItemDesktop"
  );
  const addProductItemMobile = document.getElementById("addProductItemMobile");

  const productsContainer = document.getElementById("productsContainer");
  const activitiesContainer = document.getElementById("activitiesContainer");

  function handleTabClick(tab) {
    if (tab === "products") {
      // Set active class
      productsBtn.classList.add("activeProfileContentButton");
      activityBtn.classList.remove("activeProfileContentButton");

      // Show product container, hide activities
      productsContainer.classList.remove("hidden");
      activitiesContainer.classList.add("hidden");

      // Show Add Item buttons based on screen width
      const screenWidth = window.innerWidth;
      const mdBreakpoint = 768;

      if (screenWidth >= mdBreakpoint) {
        addProductItemDesktop.classList.remove("hidden");
        addProductItemMobile.classList.add("hidden");
      } else {
        addProductItemMobile.classList.remove("hidden");
        addProductItemDesktop.classList.add("hidden");
      }
    } else if (tab === "activity") {
      // Set active class
      activityBtn.classList.add("activeProfileContentButton");
      productsBtn.classList.remove("activeProfileContentButton");

      // Show activities, hide products
      activitiesContainer.classList.remove("hidden");
      productsContainer.classList.add("hidden");

      // Hide both Add Item buttons
      addProductItemDesktop.classList.add("hidden");
      addProductItemMobile.classList.add("hidden");
    }
  }

  productsBtn.addEventListener("click", () => handleTabClick("products"));
  activityBtn.addEventListener("click", () => handleTabClick("activity"));

  //Update button visibility on window resize
  window.addEventListener("resize", () => {
    if (!productsContainer.classList.contains("hidden")) {
      const screenWidth = window.innerWidth;
      const mdBreakpoint = 768;
      if (screenWidth >= mdBreakpoint) {
        addProductItemDesktop.classList.remove("hidden");
        addProductItemMobile.classList.add("hidden");
      } else {
        addProductItemMobile.classList.remove("hidden");
        addProductItemDesktop.classList.add("hidden");
      }
    }
  });
});
