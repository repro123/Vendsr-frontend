document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#forArfoEzekiel");
  const form = container.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop default submission and validation

    // Remove previous warnings
    container.querySelectorAll(".input-error").forEach(el => el.remove());

    let valid = true;

    // Validate inputs
    const inputs = form.querySelectorAll("input:not([type='file']):not([type='hidden']), textarea, select");
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        valid = false;
        const warning = document.createElement("p");
        warning.textContent = "Please fill the above field";
        warning.className = "text-red-600 text-sm mt-1 input-error";
        input.insertAdjacentElement("afterend", warning);
      }
    });

    if (!valid) return; // Stop if anything was empty

    // Collect data using FormData
    const formData = new FormData(form);
    console.log("FormData ready to be sent:", Object.fromEntries(formData.entries()));

    // You can send it off now via fetch, AJAX, or whatever you like!
  });
});
