"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("cacVerification.js loaded"); // Debug: Confirm script loads
  const cacForm = document.getElementById("cacVerificationForm");
  const cacNumberInput = document.getElementById("CAC_Number");
  const businessNameInput = document.getElementById("businessName");
  const businessOwnerNameInput = document.getElementById("businessOwnerName");
  const cacCertificateInput = document.getElementById("cacCertificate");
  const cacNumberError = document.getElementById("CAC_NumberError");
  const businessNameError = document.getElementById("businessNameError");
  const businessOwnerNameError = document.getElementById(
    "businessOwnerNameError"
  );
  const submitButton = cacForm.querySelector('button[type="submit"]');

  // Check for phoneNumber in sessionStorage
  const phoneNumber = sessionStorage.getItem("phoneNumber");
  // if (!phoneNumber) {
  //   console.warn("No phone number in sessionStorage, redirecting to signup"); // Debug
  //   window.location.href = "../signup/";
  //   return;
  // }
  console.log("Phone number from sessionStorage:", phoneNumber); // Debug

  // Regular expressions for validation
  const rules = {
    cacNumber: /^[A-Z]{0,2}[0-9]{7,}$/, // e.g., RC1234567 or 1234567
    businessName: /^[a-zA-Z\s-]{2,}$/,
    businessOwnerName: /^[a-zA-Z\s-]{2,}$/,
    fileSize: 5 * 1024 * 1024, // 5MB max
  };

  // Debounce function for real-time validation
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Validate form
  function validateForm() {
    const cacNumber = cacNumberInput.value.trim();
    const businessName = businessNameInput.value.trim();
    const businessOwnerName = businessOwnerNameInput.value.trim();
    const cacCertificate = cacCertificateInput.files[0];

    // Reset error states
    [cacNumberInput, businessNameInput, businessOwnerNameInput].forEach(
      (input) => {
        input.setAttribute("data-invalid", "false");
        input.classList.remove("border-red-500");
      }
    );
    [cacNumberError, businessNameError, businessOwnerNameError].forEach(
      (error) => {
        error.textContent = "";
      }
    );

    let isValid = true;

    // CAC Number
    if (!cacNumber) {
      showError(cacNumberInput, cacNumberError, "CAC Number is required");
      isValid = false;
    } else if (!rules.cacNumber.test(cacNumber)) {
      showError(
        cacNumberInput,
        cacNumberError,
        "CAC Number must be at least 7 digits, optional RC/BN prefix"
      );
      isValid = false;
    }

    // Business Name
    if (!businessName) {
      showError(
        businessNameInput,
        businessNameError,
        "Business Name is required"
      );
      isValid = false;
    } else if (!rules.businessName.test(businessName)) {
      showError(
        businessNameInput,
        businessNameError,
        "Business Name must be at least 2 characters, letters, spaces, or hyphens"
      );
      isValid = false;
    }

    // Business Owner Name
    if (!businessOwnerName) {
      showError(
        businessOwnerNameInput,
        businessOwnerNameError,
        "Business Owner Name is required"
      );
      isValid = false;
    } else if (!rules.businessOwnerName.test(businessOwnerName)) {
      showError(
        businessOwnerNameInput,
        businessOwnerNameError,
        "Business Owner Name must be at least 2 characters, letters, spaces, or hyphens"
      );
      isValid = false;
    }

    // CAC Certificate
    if (!cacCertificate) {
      showError(
        cacCertificateInput,
        businessOwnerNameError,
        "CAC Certificate file is required"
      );
      isValid = false;
    } else if (cacCertificate.size > rules.fileSize) {
      showError(
        cacCertificateInput,
        businessOwnerNameError,
        "File must be under 5MB"
      );
      isValid = false;
    } else if (!cacCertificate.type.match(/^(application\/pdf|image\/.*)$/)) {
      showError(
        cacCertificateInput,
        businessOwnerNameError,
        "File must be a PDF or image"
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
  cacForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("CAC form submitted"); // Debug
    validateForm();

    const isValid = ![
      cacNumberInput,
      businessNameInput,
      businessOwnerNameInput,
      cacCertificateInput,
    ].some((input) => input.getAttribute("data-invalid") === "true");

    if (isValid) {
      const formData = new FormData();
      formData.append("CAC_Number", cacNumberInput.value.trim());
      formData.append("businessName", businessNameInput.value.trim());
      formData.append("businessOwnerName", businessOwnerNameInput.value.trim());
      formData.append("cacCertificate", cacCertificateInput.files[0]);
      formData.append("phoneNumber", phoneNumber.replace(/\s/g, ""));

      try {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        console.time("cacVerificationRequest"); // Debug: Measure API time
        const response = await fetch("http://localhost:5001/api/verify/cac", {
          method: "POST",
          body: formData,
        });
        console.timeEnd("cacVerificationRequest"); // Debug

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to verify CAC. Please try again."
          );
        }

        const data = await response.json();
        console.log("CAC verification success:", data); // Debug
        // Clear sessionStorage after successful verification
        sessionStorage.removeItem("phoneNumber");
        // Navigate to profile setup
        window.location.href = "../merchant/profile-setup/";
      } catch (error) {
        console.error("Error:", error.message);
        showError(cacCertificateInput, businessOwnerNameError, error.message);
        submitButton.classList.remove("bg-primary", "cursor-pointer");
        submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      }
    }
  });

  // Real-time validation with debounce
  [
    cacNumberInput,
    businessNameInput,
    businessOwnerNameInput,
    cacCertificateInput,
  ].forEach((input) => {
    input.addEventListener("input", debounce(validateForm, 300));
  });
});
