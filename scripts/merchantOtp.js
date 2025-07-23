"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("otp.js loaded"); // Debug: Confirm script loads
  const otpForm = document.getElementById("otp-form");
  const otpInputs = document.querySelectorAll(".otp-input");
  const fullOtpInput = document.getElementById("full-otp");
  const errorMessage = document.getElementById("errorMessage");
  const verifyButton = otpForm.querySelector('button[type="submit"]');
  const emailElement = document.getElementById("userEmail");
  const resendButton = document.getElementById("resendOTP");
  const countdownElement = document.getElementById("otpCountdown");

  // Retrieve email from sessionStorage
  const email = sessionStorage.getItem("email");
  if (!email) {
    emailElement.textContent = "No email provided";
    errorMessage.textContent = "Please sign up again to receive an OTP.";
    verifyButton.disabled = true;
    verifyButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
    resendButton.classList.add("cursor-not-allowed", "disabled");
    resendButton.disabled = true;
    console.warn("Missing email in sessionStorage"); // Debug
    setTimeout(() => {
      window.location.href = "../sign-up/";
    }, 2000);
    return;
  }
  emailElement.textContent = email;
  console.log("SessionStorage email:", email); // Debug

  // 10-minute countdown timer
  let countdownSeconds = 10 * 60; // 10 minutes
  function updateCountdown() {
    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;
    countdownElement.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      resendButton.classList.remove("cursor-not-allowed", "disabled");
      resendButton.disabled = false;
      countdownElement.textContent = "Expired";
      console.log("Countdown expired, resend enabled"); // Debug
    }
    countdownSeconds--;
  }
  const countdownInterval = setInterval(updateCountdown, 1000);

  // OTP input handling
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      console.log(`OTP input ${index + 1}: ${e.target.value}`); // Debug
      const value = e.target.value;
      if (value && !/^[0-9]$/.test(value)) {
        e.target.value = "";
        showError("Enter a single digit (0-9)");
        return;
      }
      if (value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
      validateOtp();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").trim();
      if (/^[0-9]{6}$/.test(pastedData)) {
        pastedData.split("").forEach((char, i) => {
          if (otpInputs[i]) otpInputs[i].value = char;
        });
        otpInputs[otpInputs.length - 1].focus();
        validateOtp();
      } else {
        showError("Pasted OTP must be 6 digits");
      }
    });
  });

  // Validate OTP inputs
  function validateOtp() {
    console.log("Validating OTP"); // Debug
    const otpValues = Array.from(otpInputs).map((input) => input.value);
    const isValid = otpValues.every((value) => /^[0-9]$/.test(value));
    const fullOtp = otpValues.join("");
    fullOtpInput.value = fullOtp;

    if (isValid) {
      errorMessage.textContent = "";
      otpInputs.forEach((input) => input.classList.remove("border-red-500"));
      verifyButton.disabled = false;
      verifyButton.classList.remove("bg-disabledBtn", "cursor-not-allowed");
      verifyButton.classList.add("bg-primary", "cursor-pointer");
    } else {
      showError("Enter all 6 digits");
      verifyButton.disabled = true;
      verifyButton.classList.remove("bg-primary", "cursor-pointer");
      verifyButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
    }
  }

  function showError(message) {
    errorMessage.textContent = message;
    otpInputs.forEach((input) => input.classList.add("border-red-500"));
  }

  // Form submission handler with timeout
  otpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("OTP form submitted"); // Debug
    validateOtp();

    const fullOtp = fullOtpInput.value;
    if (fullOtp.length === 6) {
      try {
        verifyButton.disabled = true;
        verifyButton.textContent = "Verifying...";
        console.time("verifyOtpRequest"); // Debug: Measure API time

        // Create a timeout promise
        // const timeoutPromise = new Promise((_, reject) => {
        //   setTimeout(
        //     () => reject(new Error("Request timed out. Please try again.")),
        //     60000
        //   );
        // });

        // API call with timeout
        const response = await Promise.race([
          fetch("https://vendsr-backend.onrender.com/api/verify/otp/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp: fullOtp }),
          }),
          timeoutPromise,
        ]);
        console.timeEnd("verifyOtpRequest"); // Debug

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to verify OTP. Please try again."
          );
        }

        const data = await response.json();
        console.log("OTP verification success:", data); // Debug
        // Clear sessionStorage
        // sessionStorage.removeItem("email");
        // sessionStorage.removeItem("userId");
        // Redirect to Business verification
        window.location.href = "../business_verification/";
      } catch (error) {
        console.error("Error:", error.message);
        showError(error.message);
        verifyButton.classList.remove("bg-primary", "cursor-pointer");
        verifyButton.classList.add("bg-disabledBtn", "cursor-not-allowed");
      } finally {
        verifyButton.disabled = false;
        verifyButton.textContent = "Verify";
      }
    }
  });

  // Resend OTP handler
  resendButton.addEventListener("click", async () => {
    if (!resendButton.disabled) {
      console.log("Resend OTP clicked"); // Debug
      try {
        resendButton.disabled = true;
        resendButton.classList.add("cursor-not-allowed", "disabled");
        countdownSeconds = 10 * 60; // Reset to 10 minutes
        updateCountdown();
        clearInterval(countdownInterval);
        const newCountdown = setInterval(updateCountdown, 1000);

        console.time("resendOtpRequest"); // Debug: Measure API time
        const response = await fetch(
          "https://vendsr-backend.onrender.com/api/verify/email/send-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        console.timeEnd("resendOtpRequest"); // Debug

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to resend OTP. Please try again."
          );
        }

        const data = await response.json();
        console.log("OTP resent successfully:", data); // Debug
        // Clear previous OTP inputs
        otpInputs.forEach((input) => {
          input.value = "";
          input.classList.remove("border-red-500");
        });
        fullOtpInput.value = "";
        errorMessage.textContent = "";
        otpInputs[0].focus();
      } catch (error) {
        console.error("Error:", error.message);
        showError(error.message);
        resendButton.disabled = false;
        resendButton.classList.remove("cursor-not-allowed", "disabled");
      }
    }
  });
});
