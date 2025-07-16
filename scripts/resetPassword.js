"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const resetForm = document.getElementById("resetPassword");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const submitButton = resetForm.querySelector('button[type="submit"]');
  const passwordRules = document.querySelectorAll("#passwordRules li");
  const togglePasswordButtons = resetForm.querySelectorAll(
    'button[aria-label="Toggle password visibility"]'
  );

  // Regular expressions for password validation
  const rules = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/,
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
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      button.setAttribute("data-state", isHidden ? "visible" : "hidden");
      icon.alt = isHidden ? "Hide password" : "Show password";
      button.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
      );
    });
  });

  // Validate password and update rules
  function validatePassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Reset error styling
    passwordInput.classList.remove("border-red-500");
    confirmPasswordInput.classList.remove("border-red-500");
    confirmPasswordError.textContent = "";

    // Update password rules
    passwordRules.forEach((rule) => {
      const ruleType = rule.dataset.rule;
      const icon = rule.querySelector(".icon");
      if (rules[ruleType].test(password)) {
        icon.textContent = "✅";
        icon.classList.remove("text-red-500");
        icon.classList.add("text-green-500");
      } else {
        icon.textContent = "❌";
        icon.classList.remove("text-green-500");
        icon.classList.add("text-red-500");
      }
    });

    // Check if all password rules are met
    const allRulesMet = Array.from(passwordRules).every((rule) =>
      rules[rule.dataset.rule].test(password)
    );

    // Validate confirm password
    const passwordsMatch =
      password === confirmPassword && confirmPassword !== "";

    // Update submit button state
    if (allRulesMet && passwordsMatch) {
      submitButton.disabled = false;
      submitButton.classList.remove("bg-[#757575]");
      submitButton.classList.add("bg-primary");
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove("bg-primary");
      submitButton.classList.add("bg-[#757575]");
    }

    // Show confirm password error if needed
    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match";
      confirmPasswordInput.classList.add("border-red-500");
    }
  }

  // Form submission handler (with API placeholder)
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset errors
    confirmPasswordError.textContent = "";
    passwordInput.classList.remove("border-red-500");
    confirmPasswordInput.classList.remove("border-red-500");

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Client-side validation
    let isValid = true;

    // Validate password rules
    for (const [ruleType, regex] of Object.entries(rules)) {
      if (!regex.test(password)) {
        passwordInput.classList.add("border-red-500");
        isValid = false;
      }
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match";
      confirmPasswordInput.classList.add("border-red-500");
      isValid = false;
    }

    if (isValid) {
      try {
        submitButton.disabled = true;
        submitButton.textContent = "Resetting...";
        // Placeholder for API integration
        /*
        const response = await fetch("https://your-api-endpoint/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to reset password");
        }
        const data = await response.json();
        console.log("Password reset successful:", data);
        */
      } catch (error) {
        console.error("Password reset failed:", error.message);
        confirmPasswordError.textContent = error.message || "An error occurred";
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Reset Password";
      }
    }
  });

  // Real-time validation with debounce
  passwordInput.addEventListener("input", debounce(validatePassword, 300));
  confirmPasswordInput.addEventListener(
    "input",
    debounce(validatePassword, 300)
  );
});
