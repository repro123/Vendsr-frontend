"use strict";

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("cacVerification.js loaded"); // Debug: Confirm script loads
//   const cacForm = document.getElementById("cacVerificationForm");
//   const cacNumberInput = document.getElementById("CAC_Number");
//   const businessNameInput = document.getElementById("businessName");
//   const businessOwnerNameInput = document.getElementById("businessOwnerName");
//   const cacCertificateInput = document.getElementById("cacCertificate");
//   const cacNumberError = document.getElementById("CAC_NumberError");
//   const businessNameError = document.getElementById("businessNameError");
//   const businessOwnerNameError = document.getElementById(
//     "businessOwnerNameError"
//   );
//   const submitButton = cacForm.querySelector('button[type="submit"]');

//   // Check for email in sessionStorage
//   const email = sessionStorage.getItem("email");
//   if (!email) {
//     console.warn("No email in sessionStorage, redirecting to signup"); // Debug
//     window.location.href = "../sign-up/";
//     return;
//   }
//   console.log("Email from sessionStorage:", email); // Debug

//   // Regular expressions for validation (aligned with cacVerificationSchema)
//   const rules = {
//     cacNumber: /^[A-Z0-9]{6,20}$/, // 6–20 characters, alphanumeric
//     businessName: /^[a-zA-Z\s-]{2,}$/,
//     businessOwnerName: /^[a-zA-Z\s-]{2,}$/,
//     fileSize: 5 * 1024 * 1024, // 5MB max
//   };

//   // Debounce function for real-time validation
//   function debounce(func, wait) {
//     let timeout;
//     return function (...args) {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func.apply(this, args), wait);
//     };
//   }

//   // Validate form
//   function validateForm() {
//     console.log("Validating CAC form"); // Debug
//     const cacNumber = cacNumberInput.value.trim();
//     const businessName = businessNameInput.value.trim();
//     const businessOwnerName = businessOwnerNameInput.value.trim();
//     const cacCertificate = cacCertificateInput.files[0];

//     // Reset error states
//     [cacNumberInput, businessNameInput, businessOwnerNameInput].forEach(
//       (input) => {
//         input.setAttribute("data-invalid", "false");
//         input.classList.remove("border-red-500");
//       }
//     );
//     [cacNumberError, businessNameError, businessOwnerNameError].forEach(
//       (error) => {
//         error.textContent = "";
//       }
//     );

//     let isValid = true;

//     // CAC Number (rcNumber)
//     if (!cacNumber) {
//       showError(cacNumberInput, cacNumberError, "CAC Number is required");
//       isValid = false;
//     } else if (!rules.cacNumber.test(cacNumber)) {
//       showError(
//         cacNumberInput,
//         cacNumberError,
//         "CAC Number must be 6–20 alphanumeric characters"
//       );
//       isValid = false;
//     }

//     // Business Name
//     if (!businessName) {
//       showError(
//         businessNameInput,
//         businessNameError,
//         "Business Name is required"
//       );
//       isValid = false;
//     } else if (!rules.businessName.test(businessName)) {
//       showError(
//         businessNameInput,
//         businessNameError,
//         "Business Name must be at least 2 characters, letters, spaces, or hyphens"
//       );
//       isValid = false;
//     }

//     // Business Owner Name
//     if (!businessOwnerName) {
//       showError(
//         businessOwnerNameInput,
//         businessOwnerNameError,
//         "Business Owner Name is required"
//       );
//       isValid = false;
//     } else if (!rules.businessOwnerName.test(businessOwnerName)) {
//       showError(
//         businessOwnerNameInput,
//         businessOwnerNameError,
//         "Business Owner Name must be at least 2 characters, letters, spaces, or hyphens"
//       );
//       isValid = false;
//     }

//     // CAC Certificate
//     if (!cacCertificate) {
//       showError(
//         cacCertificateInput,
//         businessOwnerNameError,
//         "CAC Certificate file is required"
//       );
//       isValid = false;
//     } else if (cacCertificate.size > rules.fileSize) {
//       showError(
//         cacCertificateInput,
//         businessOwnerNameError,
//         "File must be under 5MB"
//       );
//       isValid = false;
//     } else if (!cacCertificate.type.match(/^(application\/pdf|image\/.*)$/)) {
//       showError(
//         cacCertificateInput,
//         businessOwnerNameError,
//         "File must be a PDF or image"
//       );
//       isValid = false;
//     }

//     // Update submit button
//     if (isValid) {
//       submitButton.disabled = false;
//       submitButton.classList.remove("bg-disabledBtn", "cursor-not-allowed");
//       submitButton.classList.add("bg-primary", "cursor-pointer");
//     } else {
//       submitButton.disabled = true;
//       submitButton.classList.remove("bg-primary", "cursor-pointer");
//       submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
//     }

//     console.log("Form validation result:", isValid); // Debug
//   }

//   function showError(input, errorElement, message) {
//     input.setAttribute("data-invalid", "true");
//     input.classList.add("border-red-500");
//     errorElement.textContent = message;
//   }

//   // Form submission handler
//   cacForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log("CAC form submitted"); // Debug
//     validateForm();

//     const isValid = ![
//       cacNumberInput,
//       businessNameInput,
//       businessOwnerNameInput,
//       cacCertificateInput,
//     ].some((input) => input.getAttribute("data-invalid") === "true");

//     if (isValid) {
//       const formData = new FormData();
//       formData.append("rcNumber", cacNumberInput.value.trim());
//       formData.append("businessName", businessNameInput.value.trim());
//       formData.append("businessOwnerName", businessOwnerNameInput.value.trim()); // Optional, included for frontend consistency
//       formData.append("cacCertificate", cacCertificateInput.files[0]);
//       formData.append("email", email);

//       try {
//         submitButton.disabled = true;
//         submitButton.textContent = "Submitting...";
//         console.time("cacVerificationRequest"); // Debug: Measure API time
//         const response = await fetch(
//           "https://vendsr-backend.onrender.com/api/verify/cac",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
//         console.timeEnd("cacVerificationRequest"); // Debug

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.message || "Failed to verify CAC. Please try again."
//           );
//         }

//         const data = await response.json();
//         console.log("CAC verification success:", data); // Debug
//         // Clear sessionStorage after successful verification
//         sessionStorage.removeItem("otpReference");
//         // Navigate to profile setup
//         window.location.href = "../profile-setup/";
//       } catch (error) {
//         console.error("Error:", error.message);
//         showError(cacCertificateInput, businessOwnerNameError, error.message);
//         submitButton.classList.remove("bg-primary", "cursor-pointer");
//         submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
//       } finally {
//         submitButton.disabled = false;
//         submitButton.textContent = "Submit";
//       }
//     }
//   });

//   // Real-time validation with debounce
//   [
//     cacNumberInput,
//     businessNameInput,
//     businessOwnerNameInput,
//     cacCertificateInput,
//   ].forEach((input) => {
//     input.addEventListener("input", debounce(validateForm, 300));
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  console.log("cacVerification.js loaded"); // Debug: Confirm script loading
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
  const cacCertificateError = document.getElementById("cacCertificateError");
  const submitButton = cacForm.querySelector('button[type="submit"]');

  // Check for email in sessionStorage
  const email = sessionStorage.getItem("email");
  if (!email) {
    console.warn("No email in sessionStorage, redirecting to signup"); // Debug
    cacNumberError.textContent = "Please sign up again.";
    setTimeout(() => {
      window.location.href = "../sign-up/";
    }, 2000);
    return;
  }
  console.log("Email from sessionStorage:", email); // Debug

  // Validation rules (aligned with cacVerificationSchema)
  const rules = {
    // cacNumber: /^[A-Z0-9]{6,20}$/, // 6–20 alphanumeric
    cacNumber: /^[a-zA-Z0-9]{6,20}$/, // 6–20 alphanumeric, case-insensitive
    businessName: /^[a-zA-Z\s-]{2,}$/, // 2+ letters, spaces, hyphens
    businessOwnerName: /^[a-zA-Z\s-]{2,}$/, // Optional, same as businessName
    fileSize: 5 * 1024 * 1024, // 5MB max
    fileType: /^(application\/pdf|image\/.*)$/, // PDF or image
  };

  // Debounce for real-time validation
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Validate form
  function validateForm() {
    console.log("Validating CAC form"); // Debug
    const cacNumber = cacNumberInput.value.trim();
    const businessName = businessNameInput.value.trim();
    const businessOwnerName = businessOwnerNameInput.value.trim();
    const cacCertificate = cacCertificateInput.files[0];

    // Reset error states
    [
      cacNumberInput,
      businessNameInput,
      businessOwnerNameInput,
      cacCertificateInput,
    ].forEach((input) => {
      input.classList.remove("border-red-500");
    });
    [
      cacNumberError,
      businessNameError,
      businessOwnerNameError,
      cacCertificateError,
    ].forEach((error) => {
      error.textContent = "";
    });

    let isValid = true;

    // CAC Number (rcNumber)
    if (!cacNumber) {
      showError(cacNumberInput, cacNumberError, "CAC Number is required");
      isValid = false;
    } else if (!rules.cacNumber.test(cacNumber)) {
      showError(
        cacNumberInput,
        cacNumberError,
        "CAC Number must be 6–20 alphanumeric characters"
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
        "Business Name must be at least 2 characters (letters, spaces, hyphens)"
      );
      isValid = false;
    }

    // Business Owner Name (optional)
    if (businessOwnerName && !rules.businessOwnerName.test(businessOwnerName)) {
      showError(
        businessOwnerNameInput,
        businessOwnerNameError,
        "Business Owner Name must be at least 2 characters (letters, spaces, hyphens)"
      );
      isValid = false;
    }

    // CAC Certificate
    if (!cacCertificate) {
      showError(
        cacCertificateInput,
        cacCertificateError,
        "CAC Certificate file is required"
      );
      isValid = false;
    } else if (cacCertificate.size > rules.fileSize) {
      showError(
        cacCertificateInput,
        cacCertificateError,
        "File must be under 5MB"
      );
      isValid = false;
    } else if (!cacCertificate.type.match(rules.fileType)) {
      showError(
        cacCertificateInput,
        cacCertificateError,
        "File must be a PDF or image"
      );
      isValid = false;
    }

    // Update submit button
    submitButton.disabled = !isValid;
    if (isValid) {
      submitButton.classList.remove("bg-disabledBtn", "cursor-not-allowed");
      submitButton.classList.add("bg-primary", "cursor-pointer");
    } else {
      submitButton.classList.remove("bg-primary", "cursor-pointer");
      submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
    }

    console.log("Form validation result:", isValid); // Debug
  }

  function showError(input, errorElement, message) {
    input.classList.add("border-red-500");
    errorElement.textContent = message;
  }

  // Form submission handler
  cacForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("CAC form submitted"); // Debug
    validateForm();

    if (!submitButton.disabled) {
      const formData = new FormData();
      formData.append("rcNumber", cacNumberInput.value.trim().toUpperCase());
      formData.append("businessName", businessNameInput.value.trim());
      // formData.append("cacCertificate", cacCertificateInput.files[0]);

      try {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        console.time("cacVerificationRequest"); // Debug

        // Timeout promise (60 seconds)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(
            () => reject(new Error("Request timed out. Please try again.")),
            60000
          );
        });

        // API call
        const response = await Promise.race([
          fetch("https://vendsr-backend.onrender.com/api/verification/cac", {
            method: "POST",
            body: formData,
          }),
          timeoutPromise,
        ]);
        console.timeEnd("cacVerificationRequest"); // Debug

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to verify CAC. Please try again."
          );
        }

        const data = await response.json();
        console.log("CAC verification success:", data); // Debug
        // Redirect to profile setup (no sessionStorage cleanup)
        window.location.href = "../profile-setup/";
      } catch (error) {
        console.error("Error:", error.message);
        showError(cacCertificateInput, cacCertificateError, error.message);
        submitButton.classList.remove("bg-primary", "cursor-pointer");
        submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      }
    }
  });

  // Real-time validation
  [
    cacNumberInput,
    businessNameInput,
    businessOwnerNameInput,
    cacCertificateInput,
  ].forEach((input) => {
    input.addEventListener("input", debounce(validateForm, 300));
  });
});
