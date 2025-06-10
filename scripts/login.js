"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{8,15}$/;

  // Form submission handler
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset errors
    usernameError.textContent = "";
    passwordError.textContent = "";
    usernameInput.classList.remove("border-red-500");
    passwordInput.classList.remove("border-red-500");

    // Get values
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation flags
    let isValid = true;

    // Username validation
    if (!username) {
      showError(
        usernameInput,
        usernameError,
        "Phone Number or Email is required"
      );
      isValid = false;
    } else if (!emailRegex.test(username) && !phoneRegex.test(username)) {
      showError(
        usernameInput,
        usernameError,
        "Please enter a valid email or phone number"
      );
      isValid = false;
    }

    // Password validation
    if (!password) {
      showError(passwordInput, passwordError, "Password is required");
      isValid = false;
    } else if (password.length < 8) {
      showError(
        passwordInput,
        passwordError,
        "Password must be at least 8 characters"
      );
      isValid = false;
    }

    // Submit if valid
    if (isValid) {
      try {
        // For demo purposes - will be replaced with actual fetch later
        console.log("Submitting:", { username, password });

        // Simulate API call
        await simulateAPICall();

        // On successful authentication:
        // window.location.href = '/dashboard';
      } catch (error) {
        // Handle server errors
        showError(usernameInput, usernameError, "Invalid credentials", true);
        showError(passwordInput, passwordError, "Invalid credentials", true);
        console.error("Login failed:", error.message);
      }
    }
  });

  // Real-time validation
  usernameInput.addEventListener("input", () => validateUsername());
  passwordInput.addEventListener("input", () => validatePassword());

  function validateUsername() {
    const username = usernameInput.value.trim();
    usernameError.textContent = "";
    usernameInput.classList.remove("border-red-500");

    if (username && !emailRegex.test(username) && !phoneRegex.test(username)) {
      showError(
        usernameInput,
        usernameError,
        "Please enter a valid email or phone number"
      );
    }
  }

  function validatePassword() {
    const password = passwordInput.value.trim();
    passwordError.textContent = "";
    passwordInput.classList.remove("border-red-500");

    if (password && password.length < 8) {
      showError(
        passwordInput,
        passwordError,
        "Password must be at least 8 characters"
      );
    }
  }

  function showError(input, errorElement, message, isGeneral = false) {
    if (!isGeneral) {
      errorElement.textContent = message;
      input.classList.add("border-red-500");
    } else {
      // For server-side errors
      errorElement.textContent = message;
    }
  }

  // Simulate API call (to be replaced with actual fetch)
  function simulateAPICall() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 70% success rate
        Math.random() > 0.3
          ? resolve()
          : reject(new Error("Authentication failed"));
      }, 1000);
    });
  }
});
