"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup");
  let validationTimers = {};

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
      validateAccountType();
    });
  });

  // Setup validation with delay for all fields
  const validationFields = [
    "fullName",
    "username",
    "phoneNumber",
    "email",
    "password",
    "confirmPassword",
  ];

  validationFields.forEach((field) => {
    const input = document.getElementById(field);

    // Input event with delay
    input.addEventListener("input", function () {
      clearTimeout(validationTimers[field]);
      validationTimers[field] = setTimeout(() => {
        validateField(field);
      }, 800);
    });

    // Blur event (immediate)
    input.addEventListener("blur", function () {
      clearTimeout(validationTimers[field]);
      validateField(field);

      // Special case: validate password match on confirmPassword blur
      if (field === "password") {
        validateField("confirmPassword");
      }
    });
  });

  // Field validation functions
  function validateFullName() {
    const fullName = document.getElementById("fullName").value.trim();
    const fullNameError = document.getElementById("fullNameError");
    if (
      !fullName ||
      fullName.length < 3 ||
      !/^[a-zA-Z\s]{3,}$/.test(fullName)
    ) {
      fullNameError.textContent = "Full name must be at least 3 letters";
      return false;
    }
    fullNameError.textContent = "";
    return true;
  }

  function validateUsername() {
    const username = document.getElementById("username").value.trim();
    const usernameError = document.getElementById("usernameError");
    if (
      !username ||
      username.length < 4 ||
      !/^[a-zA-Z0-9_]{4,20}$/.test(username)
    ) {
      usernameError.textContent =
        "4-20 characters (letters, numbers, underscores)";
      return false;
    }
    usernameError.textContent = "";
    return true;
  }

  function validatePhoneNumber() {
    const phone = document
      .getElementById("phoneNumber")
      .value.replace(/\D/g, "");
    const phoneError = document.getElementById("phoneNumberError");
    if (!phone || phone.length < 10) {
      phoneError.textContent =
        "Please enter a valid phone number (min 10 digits)";
      return false;
    }
    phoneError.textContent = "";
    return true;
  }

  function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      return false;
    }
    emailError.textContent = "";
    return true;
  }

  function validateAccountType() {
    const accountType = document.querySelector(
      'input[name="accountType"]:checked'
    );
    const accountTypeError = document.getElementById("accountTypeError");
    if (!accountType) {
      accountTypeError.textContent = "Please select an account type";
      return false;
    }
    accountTypeError.textContent = "";
    return true;
  }

  function validatePassword() {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");
    if (
      password.length < 8 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(password)
    ) {
      passwordError.textContent =
        "Min 8 characters with uppercase, lowercase, number & symbol";
      return false;
    }
    passwordError.textContent = "";
    return true;
  }

  function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    );
    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match";
      return false;
    }
    confirmPasswordError.textContent = "";
    return true;
  }

  // Master validation function
  function validateField(field) {
    switch (field) {
      case "fullName":
        return validateFullName();
      case "username":
        return validateUsername();
      case "phoneNumber":
        return validatePhoneNumber();
      case "email":
        return validateEmail();
      case "password":
        return validatePassword();
      case "confirmPassword":
        return validateConfirmPassword();
      default:
        return true;
    }
  }

  // Form validation on submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate all fields
    isValid &= validateFullName();
    isValid &= validateUsername();
    isValid &= validatePhoneNumber();
    isValid &= validateEmail();
    isValid &= validateAccountType();
    isValid &= validatePassword();
    isValid &= validateConfirmPassword();

    // If form is valid, send to backend
    if (isValid) {
      const formData = {
        fullName: document.getElementById("fullName").value.trim(),
        username: document.getElementById("username").value.trim(),
        phoneNumber: document.getElementById("phoneNumber").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        accountType: document.querySelector('input[name="accountType"]:checked')
          ?.value,
      };

      fetch("https://vendsr-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to register. Please try again.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          // Redirect to OTP page
          window.location.href = "../otp/";
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            "Registration failed. Please check your input or try again later."
          );
        });
    }
  });

  // Real-time password matching (without delay)
  document.getElementById("password").addEventListener("input", function () {
    validateConfirmPassword();
  });
});
