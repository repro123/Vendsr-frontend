"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("storeSetupForm");
  const errorFields = {
    images: document.getElementById("imagesError"),
    storeName: document.getElementById("storeNameError"),
    storeDescription: document.getElementById("storeDescriptionError"),
    storeProduct: document.getElementById("storeProductError"),
    storeLocation: document.getElementById("storeLocationError"),
    storeWhatsappNumber: document.getElementById("storeWhatsappNumberError"),
  };

  // Debounce timers object
  const debounceTimers = {};

  // Validation functions
  const validateField = {
    images: function () {
      const logo = document.getElementById("storeLogo").files;
      const cover = document.getElementById("coverImage").files;
      let error = "";

      if (!logo.length || !cover.length) {
        error = "Both logo and cover image are required";
      } else {
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(logo[0].type)) {
          error = "Logo must be JPEG or PNG";
        } else if (!validTypes.includes(cover[0].type)) {
          error = "Cover image must be JPEG or PNG";
        }
      }

      errorFields.images.textContent = error;
      return !error;
    },

    storeName: function () {
      const value = document.getElementById("storeName").value.trim();
      const error = value ? "" : "Store name is required";
      errorFields.storeName.textContent = error;
      return !error;
    },

    storeDescription: function () {
      const value = document.getElementById("storeDescription").value.trim();
      const error = value ? "" : "Store description is required";
      errorFields.storeDescription.textContent = error;
      return !error;
    },

    storeProduct: function () {
      const value = document.getElementById("storeProduct").value.trim();
      const error = value ? "" : "Product type is required";
      errorFields.storeProduct.textContent = error;
      return !error;
    },

    storeLocation: function () {
      const value = document.getElementById("storeLocation").value.trim();
      const error = value ? "" : "Business location is required";
      errorFields.storeLocation.textContent = error;
      return !error;
    },

    storeWhatsappNumber: function () {
      const value = document.getElementById("storeWhatsappNumber").value.trim();
      const digits = value.replace(/\D/g, "");
      let error = "";

      if (!value) {
        error = "WhatsApp number is required";
      } else if (digits.length < 10) {
        error = "Enter a valid phone number (at least 10 digits)";
      }

      errorFields.storeWhatsappNumber.textContent = error;
      return !error;
    },
  };

  // Setup validation events for text fields
  const setupValidation = (fieldId, validator) => {
    const field = document.getElementById(fieldId);

    field.addEventListener("blur", () => validator());

    field.addEventListener("input", () => {
      clearTimeout(debounceTimers[fieldId]);
      debounceTimers[fieldId] = setTimeout(() => validator(), 500);
    });
  };

  // Apply validation to fields
  setupValidation("storeName", validateField.storeName);
  setupValidation("storeDescription", validateField.storeDescription);
  setupValidation("storeProduct", validateField.storeProduct);
  setupValidation("storeLocation", validateField.storeLocation);
  setupValidation("storeWhatsappNumber", validateField.storeWhatsappNumber);

  // Setup validation for file inputs
  const fileInputs = ["storeLogo", "coverImage"];
  fileInputs.forEach((id) => {
    document
      .getElementById(id)
      .addEventListener("change", () => validateField.images());
  });

  // Form submission handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const results = [
      validateField.images(),
      validateField.storeName(),
      validateField.storeDescription(),
      validateField.storeProduct(),
      validateField.storeLocation(),
      validateField.storeWhatsappNumber(),
    ];

    // If all validations pass
    if (results.every((valid) => valid)) {
      window.location.href = "../cac/";
    }
  });
});
