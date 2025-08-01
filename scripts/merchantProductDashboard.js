"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const overlay = document.getElementById("overlay");

  mobileMenuToggle.addEventListener("click", function () {
    mobileSidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    overlay.classList.add("block");
  });

  closeMobileMenu.addEventListener("click", function () {
    mobileSidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    overlay.classList.remove("block");
  });

  overlay.addEventListener("click", function () {
    mobileSidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    overlay.classList.remove("block");
  });

  // Add Product Form Toggle Logic with aria-expanded
  const openAddProductFormDesktop = document.getElementById(
    "openAddProductFormDesktop"
  );
  const openAddProductFormMobile = document.getElementById(
    "openAddProductFormMobile"
  );
  const productPageMainContent = document.getElementById(
    "productPageMainContent"
  );
  const addProductsContainer = document.getElementById("addProductsContainer");

  function toggleAddProductForm() {
    productPageMainContent.classList.add("hidden");
    addProductsContainer.classList.remove("hidden");
    openAddProductFormDesktop.setAttribute("aria-expanded", "true");
    openAddProductFormMobile.setAttribute("aria-expanded", "true");
  }

  openAddProductFormDesktop.addEventListener("click", toggleAddProductForm);
  openAddProductFormMobile.addEventListener("click", toggleAddProductForm);
});
