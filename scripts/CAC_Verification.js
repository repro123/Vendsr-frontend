document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    form.noValidate = true; // Disable default browser validation

    const inputs = [
        { id: "CAC_Number", message: "You are required to input CAC Number" },
        { id: "Business_name", message: "You are required to input Business Name" },
        { id: "Business_Owner_Name", message: "You are required to input Business Owner Name" },
        { id: "phoneNumber", message: "You are required to input a valid Phone Number (11 digits)", type: "phone" },
        { id: "cac", message: "You are required to upload a CAC Certificate", type: "file" }
    ];

    function validateInput(input, message, type) {
        let errorSpan = document.getElementById(`${input.id}-error`);

        if (!errorSpan) {
            errorSpan = document.createElement("span");
            errorSpan.id = `${input.id}-error`;
            errorSpan.className = "text-red-500 text-sm hidden";
            input.parentNode.appendChild(errorSpan);
        }

        if (!input.value.trim() || (type === "file" && !input.files.length)) {
            errorSpan.textContent = message;
            errorSpan.classList.remove("hidden");
            return false;
        }

        if (type === "phone" && !/^\d{11}$/.test(input.value.trim())) {
            errorSpan.textContent = "Phone number must be exactly 11 digits.";
            errorSpan.classList.remove("hidden");
            return false;
        }

        errorSpan.classList.add("hidden");
        return true;
    }

    inputs.forEach(({ id, message, type }) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("blur", () => validateInput(input, message, type));
        }
    });

    form.addEventListener("submit", function (event) {
        let isValid = true;

        inputs.forEach(({ id, message, type }) => {
            const input = document.getElementById(id);
            if (input && !validateInput(input, message, type)) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault(); // Stops form submission and displays errors
        }
    });
});




