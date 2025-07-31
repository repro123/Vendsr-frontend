// Mobile menu toggle functionality
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
});
