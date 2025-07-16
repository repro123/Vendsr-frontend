"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup");
  const fullNameInput = document.getElementById("fullName");
  const usernameInput = document.getElementById("username");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const fullNameError = document.getElementById("fullNameError");
  const usernameError = document.getElementById("usernameError");
  const phoneNumberError = document.getElementById("phoneNumberError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const submitButton = signupForm.querySelector('button[type="submit"]');
  const togglePasswordButtons = signupForm.querySelectorAll(
    'button[aria-label="Toggle password visibility"]'
  );

  // Regular expressions for validation
  const rules = {
    fullName: /^[a-zA-Z\s-]{2,}$/,
    username: /^[a-zA-Z0-9_]{3,}$/,
    phoneNumber: /^\+?[0-9]{8,15}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
  };

  // Debounce function for real-time validation
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Password visibility toggle
  togglePasswordButtons.forEach((button) => {
    const input = button.closest(".relative").querySelector("input");
    const icon = button.querySelector("img");
    button.addEventListener("click", () => {
      console.log("Password toggle clicked"); // Debug
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      button.setAttribute("data-state", isHidden ? "visible" : "hidden");
      icon.alt = isHidden ? "Hide password" : "Show password";
      button.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Toggle password visibility"
      );
    });
  });

  // Validate all inputs
  function validateForm() {
    const fullName = fullNameInput.value.trim();
    const username = usernameInput.value.trim();
    const phoneNumber = phoneNumberInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Reset error states
    [
      fullNameInput,
      usernameInput,
      phoneNumberInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
    ].forEach((input) => {
      input.setAttribute("data-invalid", "false");
      input.classList.remove("border-red-500");
    });
    [
      fullNameError,
      usernameError,
      phoneNumberError,
      emailError,
      passwordError,
      confirmPasswordError,
    ].forEach((error) => {
      error.textContent = "";
    });

    // Validation flags
    let isValid = true;

    // Full Name
    if (!fullName) {
      showError(fullNameInput, fullNameError, "Full name is required");
      isValid = false;
    } else if (!rules.fullName.test(fullName)) {
      showError(
        fullNameInput,
        fullNameError,
        "Full name must be at least 2 characters, letters, spaces, or hyphens only"
      );
      isValid = false;
    }

    // Username
    if (!username) {
      showError(usernameInput, usernameError, "Username is required");
      isValid = false;
    } else if (!rules.username.test(username)) {
      showError(
        usernameInput,
        usernameError,
        "Username must be at least 3 characters, alphanumeric or underscores"
      );
      isValid = false;
    }

    // Phone Number
    if (!phoneNumber) {
      showError(phoneNumberInput, phoneNumberError, "Phone number is required");
      isValid = false;
    } else if (!rules.phoneNumber.test(phoneNumber)) {
      showError(
        phoneNumberInput,
        phoneNumberError,
        "Enter a valid phone number (8-15 digits, optional +)"
      );
      isValid = false;
    }

    // Email
    if (!email) {
      showError(emailInput, emailError, "Email is required");
      isValid = false;
    } else if (!rules.email.test(email)) {
      showError(emailInput, emailError, "Enter a valid email address");
      isValid = false;
    }

    // Password
    if (!password) {
      showError(passwordInput, passwordError, "Password is required");
      isValid = false;
    } else if (!rules.password.test(password)) {
      showError(
        passwordInput,
        passwordError,
        "Password must be at least 8 characters, with one uppercase, one lowercase, one number, and one special character"
      );
      isValid = false;
    }

    // Confirm Password
    if (!confirmPassword) {
      showError(
        confirmPasswordInput,
        confirmPasswordError,
        "Confirm password is required"
      );
      isValid = false;
    } else if (password !== confirmPassword) {
      showError(
        confirmPasswordInput,
        confirmPasswordError,
        "Passwords do not match"
      );
      isValid = false;
    }

    // Update submit button
    if (isValid) {
      submitButton.disabled = false;
      submitButton.classList.remove("bg-disabledBtn", "cursor-not-allowed");
      submitButton.classList.add("bg-primary", "cursor-pointer");
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove("bg-primary", "cursor-pointer");
      submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
    }
  }

  function showError(input, errorElement, message) {
    input.setAttribute("data-invalid", "true");
    input.classList.add("border-red-500");
    errorElement.textContent = message;
  }

  // Form submission handler
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug
    validateForm();

    const isValid = ![
      fullNameInput,
      usernameInput,
      phoneNumberInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
    ].some((input) => input.getAttribute("data-invalid") === "true");

    if (isValid) {
      const formData = {
        fullName: fullNameInput.value.trim(),
        username: usernameInput.value.trim(),
        phoneNumber: phoneNumberInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
      };

      try {
        submitButton.disabled = true;
        submitButton.textContent = "Signing up...";
        console.time("registerRequest"); // Debug: Measure registration API time
        const registerResponse = await fetch(
          "https://vendsr-backend.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        console.timeEnd("registerRequest"); // Debug

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          throw new Error(
            errorData.message || "Failed to register. Please try again."
          );
        }

        const registerData = await registerResponse.json();
        console.log("Registration success:", registerData); // Debug

        // Clean phone number for OTP API (remove spaces, keep optional +)
        const cleanPhoneNumber = formData.phoneNumber.replace(/\s/g, "");
        console.time("otpRequest"); // Debug: Measure OTP API time
        const otpResponse = await fetch(
          "http://localhost:5001/api/verify/phone/send-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phoneNumber: cleanPhoneNumber }),
          }
        );
        console.timeEnd("otpRequest"); // Debug

        if (!otpResponse.ok) {
          const otpErrorData = await otpResponse.json();
          throw new Error(
            otpErrorData.message || "Failed to send OTP. Please try again."
          );
        }

        const otpData = await otpResponse.json();
        console.log("OTP sent successfully:", otpData); // Debug

        // Store phone number in sessionStorage
        sessionStorage.setItem("phoneNumber", formData.phoneNumber);
        console.log(
          "Stored phoneNumber in sessionStorage:",
          formData.phoneNumber
        ); // Debug

        // Redirect to OTP page
        window.location.href = "../merchant/otp/";
      } catch (error) {
        console.error("Error:", error.message);
        submitButton.classList.remove("bg-primary", "cursor-pointer");
        submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
        alert("Registration failed: " + error.message);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Sign Up";
      }
    }
  });

  // Real-time validation with debounce
  [
    fullNameInput,
    usernameInput,
    phoneNumberInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
  ].forEach((input) => {
    input.addEventListener("input", debounce(validateForm, 300));
  });
});
