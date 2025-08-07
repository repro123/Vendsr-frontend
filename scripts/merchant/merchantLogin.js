"use strict";

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("login.js loaded"); // Debug: Confirm script loads
//   const loginForm = document.getElementById("login-form");
//   const usernameInput = document.getElementById("username");
//   const passwordInput = document.getElementById("password");
//   const usernameError = document.getElementById("usernameError");
//   const passwordError = document.getElementById("passwordError");
//   const submitButton = loginForm.querySelector('button[type="submit"]');
//   const togglePasswordButton = loginForm.querySelector(
//     'button[aria-label="Toggle password visibility"]'
//   );
//   const togglePasswordIcon = togglePasswordButton.querySelector("img");

//   // Regular expressions for validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^\+?[0-9]{8,15}$/;
//   const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

//   // Debounce function for real-time validation
//   function debounce(func, wait) {
//     let timeout;
//     return function (...args) {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func.apply(this, args), wait);
//     };
//   }

//   // Password visibility toggle
//   togglePasswordButton.addEventListener("click", () => {
//     const isHidden = passwordInput.type === "password";
//     passwordInput.type = isHidden ? "text" : "password";
//     togglePasswordButton.setAttribute(
//       "data-state",
//       isHidden ? "visible" : "hidden"
//     );
//     togglePasswordIcon.alt = isHidden ? "Hide password" : "Show password";
//     togglePasswordButton.setAttribute(
//       "aria-label",
//       isHidden ? "Hide password" : "Show password"
//     );
//   });

//   // Form submission handler
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log("Login form submitted"); // Debug

//     // Reset errors
//     usernameError.textContent = "";
//     passwordError.textContent = "";
//     usernameInput.classList.remove("border-red-500");
//     passwordInput.classList.remove("border-red-500");

//     // Get values
//     const username = usernameInput.value.trim();
//     const password = passwordInput.value.trim();

//     // Validation flags
//     let isValid = true;

//     // Username validation
//     if (!username) {
//       showError(
//         usernameInput,
//         usernameError,
//         "Phone Number or Email is required"
//       );
//       isValid = false;
//     } else if (!emailRegex.test(username) && !phoneRegex.test(username)) {
//       showError(
//         usernameInput,
//         usernameError,
//         "Please enter a valid email or phone number"
//       );
//       isValid = false;
//     }

//     // Password validation
//     if (!password) {
//       showError(passwordInput, passwordError, "Password is required");
//       isValid = false;
//     } else if (password.length < 8) {
//       showError(
//         passwordInput,
//         passwordError,
//         "Password must be at least 8 characters"
//       );
//       isValid = false;
//     } else if (!strongPasswordRegex.test(password)) {
//       showError(
//         passwordInput,
//         passwordError,
//         "Password must contain at least one uppercase letter, one lowercase letter, and one number"
//       );
//       isValid = false;
//     }

//     // Submit if valid
//     if (isValid) {
//       try {
//         submitButton.disabled = true;
//         submitButton.textContent = "Signing in...";
//         console.time("loginRequest"); // Debug

//         // Prepare payload based on username input
//         const payload = { password };
//         if (emailRegex.test(username)) {
//           payload.email = username;
//         } else if (phoneRegex.test(username)) {
//           payload.phoneNumber = username;
//         }

//         // Timeout promise (60 seconds)
//         const timeoutPromise = new Promise((_, reject) => {
//           setTimeout(
//             () => reject(new Error("Request timed out. Please try again.")),
//             60000
//           );
//         });

//         // API call without Authorization header
//         const response = await Promise.race([
//           fetch("https://vendsr-backend.onrender.com/api/auth/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//           }),
//           timeoutPromise,
//         ]);
//         console.timeEnd("loginRequest"); // Debug

//         if (!response.ok) {
//           const errorData = await response.json();
//           const errorMessage = errorData.message || "Invalid credentials";
//           throw new Error(errorMessage);
//         }

//         const data = await response.json();
//         console.log("Login successful:", data); // Debug

//         // Store email, userId, and token in sessionStorage
//         sessionStorage.setItem("email", data.email || username); // Use username if email not returned
//         sessionStorage.setItem("userId", data.userId);
//         sessionStorage.setItem("token", data.accessToken);

//         // Redirect to dashboard
//         window.location.href = "../dashboard_profile/";
//       } catch (error) {
//         console.error("Login failed:", error.message);
//         showError(usernameInput, usernameError, error.message);
//         showError(passwordInput, passwordError, error.message);
//       } finally {
//         submitButton.disabled = false;
//         submitButton.textContent = "Sign in";
//       }
//     }
//   });

//   // Real-time validation with debounce
//   usernameInput.addEventListener("input", debounce(validateUsername, 300));
//   passwordInput.addEventListener("input", debounce(validatePassword, 300));

//   function validateUsername() {
//     const username = usernameInput.value.trim();
//     usernameError.textContent = "";
//     usernameInput.classList.remove("border-red-500");

//     if (username && !emailRegex.test(username) && !phoneRegex.test(username)) {
//       showError(
//         usernameInput,
//         usernameError,
//         "Please enter a valid email or phone number"
//       );
//     }
//   }

//   function validatePassword() {
//     const password = passwordInput.value.trim();
//     passwordError.textContent = "";
//     passwordInput.classList.remove("border-red-500");

//     if (password && password.length < 8) {
//       showError(
//         passwordInput,
//         passwordError,
//         "Password must be at least 8 characters"
//       );
//     } else if (password && !strongPasswordRegex.test(password)) {
//       showError(
//         passwordInput,
//         passwordError,
//         "Password must contain at least one uppercase letter, one lowercase letter, and one number"
//       );
//     }
//   }

//   function showError(input, errorElement, message) {
//     if (input && errorElement) {
//       errorElement.textContent = message;
//       input.classList.add("border-red-500");
//     }
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  console.log("login.js loaded"); // Debug: Confirm script loads
  sessionStorage.removeItem("token");
  console.log(sessionStorage);
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const submitButton = loginForm.querySelector('button[type="submit"]');
  const togglePasswordButton = loginForm.querySelector(
    'button[aria-label="Toggle password visibility"]'
  );
  const togglePasswordIcon = togglePasswordButton.querySelector("img");

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{8,15}$/;
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  // Debounce function for real-time validation
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Password visibility toggle
  togglePasswordButton.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordButton.setAttribute(
      "data-state",
      isHidden ? "visible" : "hidden"
    );
    togglePasswordIcon.alt = isHidden ? "Hide password" : "Show password";
    togglePasswordButton.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password"
    );
  });

  // Form submission handler
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Login form submitted"); // Debug

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
    } else if (!strongPasswordRegex.test(password)) {
      showError(
        passwordInput,
        passwordError,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      isValid = false;
    }

    // Submit if valid
    if (isValid) {
      try {
        submitButton.disabled = true;
        submitButton.textContent = "Signing in...";
        console.time("loginRequest"); // Debug

        // Prepare payload based on username input
        const payload = { password };
        if (emailRegex.test(username)) {
          payload.email = username;
        } else if (phoneRegex.test(username)) {
          payload.phoneNumber = username;
        }

        // Timeout promise (60 seconds)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(
            () => reject(new Error("Request timed out. Please try again.")),
            60000
          );
        });

        // API call without Authorization header
        const response = await Promise.race([
          fetch("https://vendsr-backend.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }),
          timeoutPromise,
        ]);
        console.timeEnd("loginRequest"); // Debug

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || "Invalid credentials";
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Login successful:", data); // Debug: Still logs to console
        sessionStorage.setItem("loginResponse", JSON.stringify(data)); // Store response for debugging

        // Store email, userId, and token in sessionStorage
        sessionStorage.setItem("email", data.email || username); // Use username if email not returned
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("token", data.accessToken);

        // Redirect to dashboard
        window.location.href = "../dashboard_profile/";
      } catch (error) {
        console.error("Login failed:", error.message);
        showError(usernameInput, usernameError, error.message);
        showError(passwordInput, passwordError, error.message);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Sign in";
      }
    }
  });

  // Real-time validation with debounce
  usernameInput.addEventListener("input", debounce(validateUsername, 300));
  passwordInput.addEventListener("input", debounce(validatePassword, 300));

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
    } else if (password && !strongPasswordRegex.test(password)) {
      showError(
        passwordInput,
        passwordError,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }
  }

  function showError(input, errorElement, message) {
    if (input && errorElement) {
      errorElement.textContent = message;
      input.classList.add("border-red-500");
    }
  }
});
