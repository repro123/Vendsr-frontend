"use strict";

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("profileSetup.js loaded"); // Debug: Confirm script loads
//   const profileForm = document.getElementById("profileSetup");
//   const coverPhotoInput = document.getElementById("coverPhoto");
//   const profilePictureInput = document.getElementById("profilePicture");
//   const storeNameInput = document.getElementById("storeName");
//   const usernameInput = document.getElementById("username");
//   const categoryInput = document.getElementById("category");
//   const descriptionInput = document.getElementById("description");
//   const storeColorInputs = document.querySelectorAll(
//     'input[name="storeColor"]'
//   );
//   const storeUrlInput = document.getElementById("storeUrl");
//   const colorPickerButton = document.getElementById("colorPicker");
//   const storeNameError = document.getElementById("storeNameError");
//   const usernameError = document.getElementById("usernameError");
//   const categoryError = document.getElementById("categoryError");
//   const descriptionError = document.getElementById("descriptionError");
//   const storeColorError = document.getElementById("storeUrlError"); // Reusing for storeColor
//   const storeUrlError = document.getElementById("storeUrlError");
//   const submitButton = profileForm.querySelector('button[type="submit"]');
//   const confirmationDialog = document.getElementById("createStoreConfirmation");
//   const goToStoreButton = document.getElementById("goToStore");

//   // Check for email in sessionStorage
//   const email = sessionStorage.getItem("email");
//   if (!email) {
//     console.warn("No email in sessionStorage, redirecting to signup"); // Debug
//     window.location.href = "../sign-up/";
//     return;
//   }
//   console.log("Email from sessionStorage:", email); // Debug

//   // Regular expressions for validation
//   const rules = {
//     storeName: /^[a-zA-Z\s-]{2,50}$/,
//     username: /^[a-zA-Z0-9_]{3,50}$/,
//     storeUrl: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.vendsr\.com$/, // Allow subdomains
//     description: /^.{0,500}$/, // Optional, max 500 characters
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

//   // Update color picker button background
//   storeColorInputs.forEach((input) => {
//     input.addEventListener("change", () => {
//       if (input.checked) {
//         colorPickerButton.style.backgroundColor = input.value;
//         console.log("Selected store color:", input.value); // Debug
//         validateForm();
//       }
//     });
//   });

//   // Validate form
//   function validateForm() {
//     console.log("Validating profile setup form"); // Debug
//     const coverPhoto = coverPhotoInput.files[0];
//     const profilePicture = profilePictureInput.files[0];
//     const storeName = storeNameInput.value.trim();
//     const username = usernameInput.value.trim();
//     const category = categoryInput.value;
//     const description = descriptionInput.value.trim();
//     const storeColor = document.querySelector(
//       'input[name="storeColor"]:checked'
//     )?.value;
//     const storeUrl = storeUrlInput.value.trim();

//     // Reset error states
//     [
//       coverPhotoInput,
//       profilePictureInput,
//       storeNameInput,
//       usernameInput,
//       categoryInput,
//       descriptionInput,
//       ...storeColorInputs,
//       storeUrlInput,
//     ].forEach((input) => {
//       input.setAttribute("data-invalid", "false");
//       input.classList.remove("border-red-500");
//     });
//     [
//       storeNameError,
//       usernameError,
//       categoryError,
//       descriptionError,
//       storeColorError,
//       storeUrlError,
//     ].forEach((error) => {
//       error.textContent = "";
//     });

//     let isValid = true;

//     // Cover Photo
//     if (!coverPhoto) {
//       showError(coverPhotoInput, storeNameError, "Cover photo is required");
//       isValid = false;
//     } else if (coverPhoto.size > rules.fileSize) {
//       showError(
//         coverPhotoInput,
//         storeNameError,
//         "Cover photo must be under 5MB"
//       );
//       isValid = false;
//     } else if (!coverPhoto.type.match(/^image\/.*$/)) {
//       showError(
//         coverPhotoInput,
//         storeNameError,
//         "Cover photo must be an image"
//       );
//       isValid = false;
//     }

//     // Profile Picture
//     if (!profilePicture) {
//       showError(
//         profilePictureInput,
//         storeNameError,
//         "Profile picture is required"
//       );
//       isValid = false;
//     } else if (profilePicture.size > rules.fileSize) {
//       showError(
//         profilePictureInput,
//         storeNameError,
//         "Profile picture must be under 5MB"
//       );
//       isValid = false;
//     } else if (!profilePicture.type.match(/^image\/.*$/)) {
//       showError(
//         profilePictureInput,
//         storeNameError,
//         "Profile picture must be an image"
//       );
//       isValid = false;
//     }

//     // Store Name
//     if (!storeName) {
//       showError(storeNameInput, storeNameError, "Store Name is required");
//       isValid = false;
//     } else if (!rules.storeName.test(storeName)) {
//       showError(
//         storeNameInput,
//         storeNameError,
//         "Store Name must be 2–50 characters, letters, spaces, or hyphens"
//       );
//       isValid = false;
//     }

//     // Username
//     if (!username) {
//       showError(usernameInput, usernameError, "Username is required");
//       isValid = false;
//     } else if (!rules.username.test(username)) {
//       showError(
//         usernameInput,
//         usernameError,
//         "Username must be 3–50 characters, alphanumeric or underscores"
//       );
//       isValid = false;
//     }

//     // Category
//     if (!category) {
//       showError(categoryInput, categoryError, "Category is required");
//       isValid = false;
//     }

//     // Description (optional)
//     if (description && !rules.description.test(description)) {
//       showError(
//         descriptionInput,
//         descriptionError,
//         "Description must be 500 characters or less"
//       );
//       isValid = false;
//     }

//     // Store Color
//     if (!storeColor) {
//       showError(colorPickerButton, storeColorError, "Store color is required");
//       isValid = false;
//     }

//     // Store URL
//     if (!storeUrl) {
//       showError(storeUrlInput, storeUrlError, "Store URL is required");
//       isValid = false;
//     } else if (!rules.storeUrl.test(storeUrl)) {
//       showError(
//         storeUrlInput,
//         storeUrlError,
//         "Store URL must be in the format: mystore.vendsr.com or mystore.sub.vendsr.com"
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
//   profileForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log("Profile setup form submitted"); // Debug
//     validateForm();

//     const isValid = ![
//       coverPhotoInput,
//       profilePictureInput,
//       storeNameInput,
//       usernameInput,
//       categoryInput,
//       ...storeColorInputs,
//       storeUrlInput,
//     ].some((input) => input.getAttribute("data-invalid") === "true");

//     if (isValid) {
//       const formData = new FormData();
//       formData.append("storePhoto", coverPhotoInput.files[0]);
//       formData.append("profile_picture", profilePictureInput.files[0]);
//       formData.append("store_name", storeNameInput.value.trim());
//       formData.append("username", usernameInput.value.trim());
//       formData.append("category", categoryInput.value);
//       formData.append("description", descriptionInput.value.trim());
//       formData.append(
//         "storeColor",
//         document.querySelector('input[name="storeColor"]:checked').value
//       );
//       formData.append("store_url", storeUrlInput.value.trim());
//       formData.append("email", email);

//       try {
//         submitButton.disabled = true;
//         submitButton.textContent = "Creating Store...";
//         console.time("profileSetupRequest"); // Debug: Measure API time
//         const response = await fetch(
//           "https://vendsr-backend.onrender.com/api/store/create",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
//         console.timeEnd("profileSetupRequest"); // Debug

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.message || "Failed to create store. Please try again."
//           );
//         }

//         const data = await response.json();
//         console.log("Store creation success:", data); // Debug
//         // Clear sessionStorage
//         sessionStorage.removeItem("email");
//         // Show confirmation dialog
//         confirmationDialog.showModal();
//       } catch (error) {
//         console.error("Error:", error.message);
//         showError(storeUrlInput, storeUrlError, error.message);
//         submitButton.classList.remove("bg-primary", "cursor-pointer");
//         submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
//       } finally {
//         submitButton.disabled = false;
//         submitButton.textContent = "Create Store";
//       }
//     }
//   });

//   // Go to store handler
//   goToStoreButton.addEventListener("click", () => {
//     console.log("Go to Store clicked"); // Debug
//     window.location.href = "../../user-dashboard-profile/";
//   });

//   // Real-time validation with debounce
//   [
//     coverPhotoInput,
//     profilePictureInput,
//     storeNameInput,
//     usernameInput,
//     categoryInput,
//     descriptionInput,
//     ...storeColorInputs,
//     storeUrlInput,
//   ].forEach((input) => {
//     input.addEventListener("input", debounce(validateForm, 300));
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("profileSetup.js loaded"); // Debug: Confirm script loads
//   const profileForm = document.getElementById("profileSetup");
//   const coverPhotoInput = document.getElementById("coverPhoto");
//   const profilePictureInput = document.getElementById("profilePicture");
//   const storeNameInput = document.getElementById("storeName");
//   const usernameInput = document.getElementById("username");
//   const categoryInput = document.getElementById("category");
//   const descriptionInput = document.getElementById("description");
//   const storeColorInputs = document.querySelectorAll(
//     'input[name="storeColor"]'
//   );
//   const storeUrlInput = document.getElementById("storeUrl");
//   const colorPickerButton = document.getElementById("colorPicker");
//   const coverPhotoError = document.getElementById("coverPhotoError");
//   const profilePictureError = document.getElementById("profilePictureError");
//   const storeNameError = document.getElementById("storeNameError");
//   const usernameError = document.getElementById("usernameError");
//   const categoryError = document.getElementById("categoryError");
//   const descriptionError = document.getElementById("descriptionError");
//   const storeColorError = document.getElementById("storeColorError"); // Unique ID
//   const storeUrlError = document.getElementById("storeUrlError");
//   const submitButton = profileForm.querySelector('button[type="submit"]');
//   const confirmationDialog = document.getElementById("createStoreConfirmation");
//   const goToStoreButton = document.getElementById("goToStore");

//   // Check for email in sessionStorage
//   const email = sessionStorage.getItem("email");
//   if (!email) {
//     console.warn("No email in sessionStorage, redirecting to signup"); // Debug
//     storeNameError.textContent = "Please sign up again.";
//     setTimeout(() => {
//       window.location.href = "../sign-up/";
//     }, 2000);
//     return;
//   }
//   console.log("Email from sessionStorage:", email); // Debug

//   // Regular expressions for validation
//   const rules = {
//     storeName: /^[a-zA-Z\s-]{2,50}$/,
//     username: /^[a-zA-Z0-9_]{3,50}$/,
//     storeUrl: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.vendsr\.com$/,
//     description: /^.{0,500}$/, // Optional, max 500 characters
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

//   // Update color picker button background
//   storeColorInputs.forEach((input) => {
//     input.addEventListener("change", () => {
//       if (input.checked) {
//         colorPickerButton.style.backgroundColor = input.value;
//         console.log("Selected store color:", input.value); // Debug
//         validateForm();
//       }
//     });
//   });

//   // Validate form
//   function validateForm() {
//     console.log("Validating profile setup form"); // Debug
//     const coverPhoto = coverPhotoInput.files[0];
//     const profilePicture = profilePictureInput.files[0];
//     const storeName = storeNameInput.value.trim();
//     const username = usernameInput.value.trim();
//     const category = categoryInput.value;
//     const description = descriptionInput.value.trim();
//     const storeColor = document.querySelector(
//       'input[name="storeColor"]:checked'
//     )?.value;
//     const storeUrl = storeUrlInput.value.trim();

//     // Reset error states
//     [
//       coverPhotoInput,
//       profilePictureInput,
//       storeNameInput,
//       usernameInput,
//       categoryInput,
//       descriptionInput,
//       ...storeColorInputs,
//       storeUrlInput,
//     ].forEach((input) => {
//       input.classList.remove("border-red-500");
//     });
//     [
//       coverPhotoError,
//       profilePictureError,
//       storeNameError,
//       usernameError,
//       categoryError,
//       descriptionError,
//       storeColorError,
//       storeUrlError,
//     ].forEach((error) => {
//       error.textContent = "";
//     });

//     let isValid = true;

//     // Cover Photo
//     if (!coverPhoto) {
//       showError(coverPhotoInput, coverPhotoError, "Cover photo is required");
//       isValid = false;
//     } else if (coverPhoto.size > rules.fileSize) {
//       showError(
//         coverPhotoInput,
//         coverPhotoError,
//         "Cover photo must be under 5MB"
//       );
//       isValid = false;
//     } else if (!coverPhoto.type.match(/^image\/.*$/)) {
//       showError(
//         coverPhotoInput,
//         coverPhotoError,
//         "Cover photo must be an image"
//       );
//       isValid = false;
//     }

//     // Profile Picture
//     if (!profilePicture) {
//       showError(
//         profilePictureInput,
//         profilePictureError,
//         "Profile picture is required"
//       );
//       isValid = false;
//     } else if (profilePicture.size > rules.fileSize) {
//       showError(
//         profilePictureInput,
//         profilePictureError,
//         "Profile picture must be under 5MB"
//       );
//       isValid = false;
//     } else if (!profilePicture.type.match(/^image\/.*$/)) {
//       showError(
//         profilePictureInput,
//         profilePictureError,
//         "Profile picture must be an image"
//       );
//       isValid = false;
//     }

//     // Store Name
//     if (!storeName) {
//       showError(storeNameInput, storeNameError, "Store Name is required");
//       isValid = false;
//     } else if (!rules.storeName.test(storeName)) {
//       showError(
//         storeNameInput,
//         storeNameError,
//         "Store Name must be 2–50 characters, letters, spaces, or hyphens"
//       );
//       isValid = false;
//     }

//     // Username
//     if (!username) {
//       showError(usernameInput, usernameError, "Username is required");
//       isValid = false;
//     } else if (!rules.username.test(username)) {
//       showError(
//         usernameInput,
//         usernameError,
//         "Username must be 3–50 characters, alphanumeric or underscores"
//       );
//       isValid = false;
//     }

//     // Category
//     if (!category) {
//       showError(categoryInput, categoryError, "Category is required");
//       isValid = false;
//     }

//     // Description (optional)
//     if (description && !rules.description.test(description)) {
//       showError(
//         descriptionInput,
//         descriptionError,
//         "Description must be 500 characters or less"
//       );
//       isValid = false;
//     }

//     // Store Color
//     if (!storeColor) {
//       showError(colorPickerButton, storeColorError, "Store color is required");
//       isValid = false;
//     }

//     // Store URL
//     if (!storeUrl) {
//       showError(storeUrlInput, storeUrlError, "Store URL is required");
//       isValid = false;
//     } else if (!rules.storeUrl.test(storeUrl)) {
//       showError(
//         storeUrlInput,
//         storeUrlError,
//         "Store URL must be in the format: mystore.vendsr.com or mystore.sub.vendsr.com"
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
//     input.classList.add("border-red-500");
//     errorElement.textContent = message;
//   }

//   // Form submission handler
//   profileForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log("Profile setup form submitted"); // Debug
//     validateForm();

//     if (!submitButton.disabled) {
//       const formData = new FormData();
//       formData.append("coverImage", coverPhotoInput.files[0]);
//       formData.append("storePhoto", profilePictureInput.files[0]);
//       formData.append("storeName", storeNameInput.value.trim());
//       formData.append("username", usernameInput.value.trim());
//       formData.append("category", categoryInput.value);
//       formData.append("description", descriptionInput.value.trim());
//       formData.append(
//         "colorPalette",
//         document.querySelector('input[name="storeColor"]:checked').value
//       );
//       formData.append("email", email);

//       try {
//         submitButton.disabled = true;
//         submitButton.textContent = "Creating Store...";
//         console.time("storeSetupRequest"); // Debug

//         // Timeout promise (60 seconds)
//         const timeoutPromise = new Promise((_, reject) => {
//           setTimeout(
//             () => reject(new Error("Request timed out. Please try again.")),
//             60000
//           );
//         });

//         // API call
//         const response = await Promise.race([
//           fetch("https://vendsr-backend.onrender.com/api/stores/store-set-up", {
//             method: "POST",
//             body: formData,
//           }),
//           timeoutPromise,
//         ]);
//         console.timeEnd("storeSetupRequest"); // Debug

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.message || "Failed to create store. Please try again."
//           );
//         }

//         const data = await response.json();
//         console.log("Store creation success:", data); // Debug
//         // Show confirmation dialog (no sessionStorage cleanup)
//         confirmationDialog.showModal();
//       } catch (error) {
//         console.error("Error:", error.message);
//         showError(storeUrlInput, storeUrlError, error.message);
//         submitButton.classList.remove("bg-primary", "cursor-pointer");
//         submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
//       } finally {
//         submitButton.disabled = false;
//         submitButton.textContent = "Create Store";
//       }
//     }
//   });

//   // Go to store handler
//   goToStoreButton.addEventListener("click", () => {
//     console.log("Go to Store clicked"); // Debug
//     window.location.href = "../../user-dashboard-profile/";
//   });

//   // Real-time validation with debounce
//   [
//     coverPhotoInput,
//     profilePictureInput,
//     storeNameInput,
//     usernameInput,
//     categoryInput,
//     descriptionInput,
//     ...storeColorInputs,
//     storeUrlInput,
//   ].forEach((input) => {
//     input.addEventListener("input", debounce(validateForm, 300));
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  console.log("profileSetup.js loaded"); // Debug: Confirm script loads
  const profileForm = document.getElementById("profileSetup");
  const coverPhotoInput = document.getElementById("coverPhoto");
  const profilePictureInput = document.getElementById("profilePicture");
  const storeNameInput = document.getElementById("storeName");
  const usernameInput = document.getElementById("username");
  const categoryInput = document.getElementById("category");
  const descriptionInput = document.getElementById("description");
  const storeColorInputs = document.querySelectorAll(
    'input[name="storeColor"]'
  );
  const storeUrlInput = document.getElementById("storeUrl");
  const colorPickerButton = document.getElementById("colorPicker");
  const coverPhotoError = document.getElementById("coverPhotoError");
  const profilePictureError = document.getElementById("profilePictureError");
  const storeNameError = document.getElementById("storeNameError");
  const usernameError = document.getElementById("usernameError");
  const categoryError = document.getElementById("categoryError");
  const descriptionError = document.getElementById("descriptionError");
  const storeColorError = document.getElementById("storeColorError");
  const storeUrlError = document.getElementById("storeUrlError");
  const submitButton = profileForm.querySelector('button[type="submit"]');
  const confirmationDialog = document.getElementById("createStoreConfirmation");
  const goToStoreButton = document.getElementById("goToStore");

  // Check for email and token in sessionStorage
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  if (!email || !token) {
    console.warn(
      "Missing email or token in sessionStorage, redirecting to signup"
    ); // Debug
    storeNameError.textContent =
      "Authentication required. Please sign up again.";
    setTimeout(() => {
      window.location.href = "../sign-up/";
    }, 2000);
    return;
  }
  console.log("Email from sessionStorage:", email); // Debug
  console.log("Token from sessionStorage:", token); // Debug

  // Regular expressions for validation
  const rules = {
    storeName: /^[a-zA-Z\s-]{2,50}$/,
    username: /^[a-zA-Z0-9_]{3,50}$/,
    storeUrl: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.vendsr\.com$/,
    description: /^.{0,500}$/, // Optional, max 500 characters
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

  // Update color picker button background
  storeColorInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        colorPickerButton.style.backgroundColor = input.value;
        console.log("Selected store color:", input.value); // Debug
        validateForm();
      }
    });
  });

  // Validate form
  function validateForm() {
    console.log("Validating profile setup form"); // Debug
    const coverPhoto = coverPhotoInput.files[0];
    const profilePicture = profilePictureInput.files[0];
    const storeName = storeNameInput.value.trim();
    const username = usernameInput.value.trim();
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();
    const storeColor = document.querySelector(
      'input[name="storeColor"]:checked'
    )?.value;
    const storeUrl = storeUrlInput.value.trim();

    // Reset error states
    [
      coverPhotoInput,
      profilePictureInput,
      storeNameInput,
      usernameInput,
      categoryInput,
      descriptionInput,
      ...storeColorInputs,
      storeUrlInput,
    ].forEach((input) => {
      input.classList.remove("border-red-500");
    });
    [
      coverPhotoError,
      profilePictureError,
      storeNameError,
      usernameError,
      categoryError,
      descriptionError,
      storeColorError,
      storeUrlError,
    ].forEach((error) => {
      error.textContent = "";
    });

    let isValid = true;

    // Cover Photo
    if (!coverPhoto) {
      showError(coverPhotoInput, coverPhotoError, "Cover photo is required");
      isValid = false;
    } else if (coverPhoto.size > rules.fileSize) {
      showError(
        coverPhotoInput,
        coverPhotoError,
        "Cover photo must be under 5MB"
      );
      isValid = false;
    } else if (!coverPhoto.type.match(/^image\/.*$/)) {
      showError(
        coverPhotoInput,
        coverPhotoError,
        "Cover photo must be an image"
      );
      isValid = false;
    }

    // Profile Picture
    if (!profilePicture) {
      showError(
        profilePictureInput,
        profilePictureError,
        "Profile picture is required"
      );
      isValid = false;
    } else if (profilePicture.size > rules.fileSize) {
      showError(
        profilePictureInput,
        profilePictureError,
        "Profile picture must be under 5MB"
      );
      isValid = false;
    } else if (!profilePicture.type.match(/^image\/.*$/)) {
      showError(
        profilePictureInput,
        profilePictureError,
        "Profile picture must be an image"
      );
      isValid = false;
    }

    // Store Name
    if (!storeName) {
      showError(storeNameInput, storeNameError, "Store Name is required");
      isValid = false;
    } else if (!rules.storeName.test(storeName)) {
      showError(
        storeNameInput,
        storeNameError,
        "Store Name must be 2–50 characters, letters, spaces, or hyphens"
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
        "Username must be 3–50 characters, alphanumeric or underscores"
      );
      isValid = false;
    }

    // Category
    if (!category) {
      showError(categoryInput, categoryError, "Category is required");
      isValid = false;
    }

    // Description (optional)
    if (description && !rules.description.test(description)) {
      showError(
        descriptionInput,
        descriptionError,
        "Description must be 500 characters or less"
      );
      isValid = false;
    }

    // Store Color
    if (!storeColor) {
      showError(colorPickerButton, storeColorError, "Store color is required");
      isValid = false;
    }

    // Store URL
    if (!storeUrl) {
      showError(storeUrlInput, storeUrlError, "Store URL is required");
      isValid = false;
    } else if (!rules.storeUrl.test(storeUrl)) {
      showError(
        storeUrlInput,
        storeUrlError,
        "Store URL must be in the format: mystore.vendsr.com or mystore.sub.vendsr.com"
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

    console.log("Form validation result:", isValid); // Debug
  }

  function showError(input, errorElement, message) {
    input.classList.add("border-red-500");
    errorElement.textContent = message;
  }

  // Form submission handler
  profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Profile setup form submitted"); // Debug
    validateForm();

    if (!submitButton.disabled) {
      const formData = new FormData();
      formData.append("coverImage", coverPhotoInput.files[0]);
      formData.append("storePhoto", profilePictureInput.files[0]);
      formData.append("storeName", storeNameInput.value.trim());
      formData.append("username", usernameInput.value.trim());
      formData.append("category", categoryInput.value);
      formData.append("description", descriptionInput.value.trim());
      formData.append(
        "colorPalette",
        document.querySelector('input[name="storeColor"]:checked').value
      );
      formData.append("email", email);

      try {
        submitButton.disabled = true;
        submitButton.textContent = "Creating Store...";
        console.time("storeSetupRequest"); // Debug

        // Timeout promise (60 seconds)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(
            () => reject(new Error("Request timed out. Please try again.")),
            60000
          );
        });

        // API call with Authorization header
        const response = await Promise.race([
          fetch("https://vendsr-backend.onrender.com/api/stores/store-set-up", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }),
          timeoutPromise,
        ]);
        console.timeEnd("storeSetupRequest"); // Debug

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to create store. Please try again."
          );
        }

        const data = await response.json();
        console.log("Store creation success:", data); // Debug
        // Show confirmation dialog (no sessionStorage cleanup)
        confirmationDialog.showModal();
      } catch (error) {
        console.error("Error:", error.message);
        if (error.message.includes("token")) {
          showError(
            storeUrlInput,
            storeUrlError,
            "Authentication failed. Please sign up again."
          );
          setTimeout(() => {
            window.location.href = "../sign-up/";
          }, 2000);
        } else {
          showError(storeUrlInput, storeUrlError, error.message);
        }
        submitButton.classList.remove("bg-primary", "cursor-pointer");
        submitButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Create Store";
      }
    }
  });

  // Go to store handler
  goToStoreButton.addEventListener("click", () => {
    console.log("Go to Store clicked"); // Debug
    window.location.href = "../../user-dashboard-profile/";
  });

  // Real-time validation with debounce
  [
    coverPhotoInput,
    profilePictureInput,
    storeNameInput,
    usernameInput,
    categoryInput,
    descriptionInput,
    ...storeColorInputs,
    storeUrlInput,
  ].forEach((input) => {
    input.addEventListener("input", debounce(validateForm, 300));
  });
});
