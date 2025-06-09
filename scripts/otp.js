"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const otpForm = document.getElementById("otp-form");
  const otpInputs = document.querySelectorAll(".otp-input");
  const fullOtpInput = document.getElementById("full-otp");
  const errorMessage = document.getElementById("errorMessage");
  const resendOTPBtn = document.getElementById("resendOTP");
  const countdownElement = document.getElementById("otpCountdown");

  // Timer variables
  let countdown;
  let remainingSeconds = 60;

  // Initialize OTP functionality
  initOTPValidation();

  function initOTPValidation() {
    startCountdown();
    setupOTPInputs();
    setupFormSubmission();
    setupResendButton();
  }

  function startCountdown() {
    clearInterval(countdown);
    updateCountdownDisplay();

    countdown = setInterval(() => {
      remainingSeconds--;
      updateCountdownDisplay();

      if (remainingSeconds <= 0) {
        clearInterval(countdown);
        resendOTPBtn.disabled = false;
      }
    }, 1000);
  }

  function updateCountdownDisplay() {
    const minutes = Math.floor(remainingSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (remainingSeconds % 60).toString().padStart(2, "0");
    countdownElement.textContent = `${minutes}:${seconds}`;
  }

  function setupOTPInputs() {
    otpInputs.forEach((input, index) => {
      // Handle input
      input.addEventListener("input", (e) => {
        const value = e.target.value;

        if (/^\d$/.test(value)) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        } else {
          e.target.value = "";
        }
      });

      // Handle backspace
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });
  }

  function setupFormSubmission() {
    otpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      errorMessage.textContent = "";

      // Combine OTP digits
      const otp = Array.from(otpInputs)
        .map((input) => input.value)
        .join("");
      fullOtpInput.value = otp;

      // Validate OTP
      if (otp.length !== 6) {
        errorMessage.textContent = "Please enter a complete 6-digit code";
        return;
      }

      // to validate with the backend here
      console.log("Submitting OTP:", otp);
      alert("OTP validation successful!"); // Replace with actual submission logic
    });
  }

  function setupResendButton() {
    resendOTPBtn.disabled = true;

    resendOTPBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Reset OTP fields
      otpInputs.forEach((input) => {
        input.value = "";
      });
      otpInputs[0].focus();
      errorMessage.textContent = "";

      // Reset and restart timer
      remainingSeconds = 60;
      resendOTPBtn.disabled = true;
      startCountdown();

      //to  resend the OTP here
      console.log("Resending OTP...");
    });
  }
});
