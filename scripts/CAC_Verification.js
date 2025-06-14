"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cacVerificationForm");
  const cacNumberInput = document.getElementById("CAC_Number");
  const businessNameInput = document.getElementById("businessName");
  const businessOwnerNameInput = document.getElementById("businessOwnerName");
  const fileInput = document.getElementById("cacCertificate");

  // CAC number validation pattern (e.g., RC123456, BN987654)
  const cacNumberPattern = /^(RC|BN|IT|ACN)\d{6,8}$/i;

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset previous error messages
    resetErrorMessages();

    // Validate form fields
    const isCacValid = validateCacNumber();
    const isBusinessNameValid = validateBusinessName();
    const isOwnerNameValid = validateBusinessOwnerName();
    const isFileValid = validateFile();

    if (isCacValid && isBusinessNameValid && isOwnerNameValid && isFileValid) {
      // Form is valid - submit the form or make an AJAX request here
      alert("Form submitted successfully!");
      form.reset();
    }
  });

  // Validate CAC Number
  function validateCacNumber() {
    const value = cacNumberInput.value.trim();
    const errorElement = document.getElementById("CAC_NumberError");

    if (!value) {
      errorElement.textContent = "CAC Number is required";
      cacNumberInput.focus();
      return false;
    }

    if (!cacNumberPattern.test(value)) {
      errorElement.textContent =
        "Please enter a valid CAC Number (e.g., RC123456)";
      cacNumberInput.focus();
      return false;
    }

    return true;
  }

  // Validate Business Name
  function validateBusinessName() {
    const value = businessNameInput.value.trim();
    const errorElement = document.getElementById("businessNameError");

    if (!value) {
      errorElement.textContent = "Business name is required";
      businessNameInput.focus();
      return false;
    }

    if (value.length < 3) {
      errorElement.textContent = "Business name must be at least 3 characters";
      businessNameInput.focus();
      return false;
    }

    return true;
  }

  // Validate Business Owner Name
  function validateBusinessOwnerName() {
    const value = businessOwnerNameInput.value.trim();
    const errorElement = document.getElementById("businessOwnerNameError");

    if (!value) {
      errorElement.textContent = "Business owner name is required";
      businessOwnerNameInput.focus();
      return false;
    }

    if (value.split(" ").length < 2) {
      errorElement.textContent = "Please enter full name";
      businessOwnerNameInput.focus();
      return false;
    }

    return true;
  }

  // Validate file input
  function validateFile() {
    const errorElement =
      document.getElementById("fileError") || createFileErrorElement();

    if (!fileInput.files || fileInput.files.length === 0) {
      errorElement.textContent = "Please upload a CAC certificate";
      return false;
    }

    const file = fileInput.files[0];
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    // Check file type
    if (!validTypes.includes(file.type)) {
      errorElement.textContent = "Only PDF, JPEG, and PNG files are allowed";
      return false;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      errorElement.textContent = "File size exceeds 5MB limit";
      return false;
    }

    errorElement.textContent = "";
    return true;
  }

  // Create file error element if it doesn't exist
  function createFileErrorElement() {
    const errorElement = document.createElement("p");
    errorElement.className = "text-red-500";
    errorElement.setAttribute("aria-live", "polite");
    errorElement.id = "fileError";

    // Find the upload container and insert error element
    const uploadContainer = fileInput.closest(".text-center");
    uploadContainer.appendChild(errorElement);

    return errorElement;
  }

  // Reset all error messages
  function resetErrorMessages() {
    const errorElements = document.querySelectorAll(".text-red-500");
    errorElements.forEach((element) => {
      element.textContent = "";
    });
  }

  // Real-time validation for CAC Number
  cacNumberInput.addEventListener("input", function () {
    const errorElement = document.getElementById("CAC_NumberError");
    const value = this.value.trim();

    if (!value) {
      errorElement.textContent = "";
      return;
    }

    if (!cacNumberPattern.test(value)) {
      errorElement.textContent =
        "Please enter a valid CAC Number (e.g., RC123456)";
    } else {
      errorElement.textContent = "";
    }
  });

  // Real-time validation for Business Name
  businessNameInput.addEventListener("input", function () {
    const errorElement = document.getElementById("businessNameError");
    const value = this.value.trim();

    if (!value) {
      errorElement.textContent = "";
      return;
    }

    if (value.length < 3) {
      errorElement.textContent = "Business name must be at least 3 characters";
    } else {
      errorElement.textContent = "";
    }
  });

  // Real-time validation for Business Owner Name
  businessOwnerNameInput.addEventListener("input", function () {
    const errorElement = document.getElementById("businessOwnerNameError");
    const value = this.value.trim();

    if (!value) {
      errorElement.textContent = "";
      return;
    }

    if (value.split(" ").length < 2) {
      errorElement.textContent = "Please enter full name";
    } else {
      errorElement.textContent = "";
    }
  });

  // File input validation on change
  fileInput.addEventListener("change", function () {
    const errorElement =
      document.getElementById("fileError") || createFileErrorElement();
    errorElement.textContent = "";

    if (this.files && this.files.length > 0) {
      validateFile();
    }
  });
});
