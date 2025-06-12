"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup");

  // Add active state to radio buttons
  const accountTypeRadios = document.querySelectorAll(
    'input[name="accountType"]'
  );
  accountTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const labels = document.querySelectorAll('label[for="' + this.id + '"]');
      labels.forEach((label) => {
        if (this.checked) {
          label.classList.add("has-checked");
        } else {
          label.classList.remove("has-checked");
        }
      });
    });
  });

  // Form validation on submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Full Name validation (min 3 characters, only letters and spaces)
    const fullName = document.getElementById("fullName").value.trim();
    const fullNameError = document.getElementById("fullNameError");
    if (
      !fullName ||
      fullName.length < 3 ||
      !/^[a-zA-Z\s]{3,}$/.test(fullName)
    ) {
      fullNameError.textContent = "Full name must be at least 3 letters";
      isValid = false;
    } else {
      fullNameError.textContent = "";
    }

    // Username validation (4-20 characters, alphanumeric + underscore)
    const username = document.getElementById("username").value.trim();
    const usernameError = document.getElementById("usernameError");
    if (
      !username ||
      username.length < 4 ||
      !/^[a-zA-Z0-9_]{4,20}$/.test(username)
    ) {
      usernameError.textContent =
        "4-20 characters (letters, numbers, underscores)";
      isValid = false;
    } else {
      usernameError.textContent = "";
    }

    // Phone validation (10 digits minimum)
    const phone = document
      .getElementById("phoneNumber")
      .value.replace(/\D/g, "");
    const phoneError = document.getElementById("phoneNumberError");
    if (!phone || phone.length < 10) {
      phoneError.textContent =
        "Please enter a valid phone number (min 10 digits)";
      isValid = false;
    } else {
      phoneError.textContent = "";
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Account type validation
    const accountType = document.querySelector(
      'input[name="accountType"]:checked'
    );
    const accountTypeError = document.getElementById("accountTypeError");
    if (!accountType) {
      accountTypeError.textContent = "Please select an account type";
      isValid = false;
    } else {
      accountTypeError.textContent = "";
    }

    // Password validation (min 8 chars with complexity)
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");
    if (
      password.length < 8 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(password)
    ) {
      passwordError.textContent =
        "Min 8 characters with uppercase, lowercase, number & symbol";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    // Confirm password validation
    const confirmPassword = document.getElementById("confirmPassword").value;
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    );
    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match";
      isValid = false;
    } else {
      confirmPasswordError.textContent = "";
    }

    // If form is valid, navigate to OTP page
    if (isValid) {
      window.location.href = "../otp/";
    }
  });

  // Real-time password matching
  const confirmPasswordInput = document.getElementById("confirmPassword");
  confirmPasswordInput.addEventListener("input", function () {
    const password = document.getElementById("password").value;
    const confirmPassword = this.value;
    const errorElement = document.getElementById("confirmPasswordError");

    if (password !== confirmPassword) {
      errorElement.textContent = "Passwords do not match";
    } else {
      errorElement.textContent = "";
    }
  });
});
