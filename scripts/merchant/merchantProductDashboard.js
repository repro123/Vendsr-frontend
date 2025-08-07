"use strict";

// document.addEventListener("DOMContentLoaded", function () {
//   // Mobile Menu Toggle Logic
//   const mobileMenuToggle = document.getElementById("mobileMenuToggle");
//   const mobileSidebar = document.getElementById("mobile-sidebar");
//   const closeMobileMenu = document.getElementById("close-mobile-menu");
//   const overlay = document.getElementById("overlay");

//   mobileMenuToggle.addEventListener("click", function () {
//     mobileSidebar.classList.toggle("-translate-x-full");
//     overlay.classList.toggle("hidden");
//     overlay.classList.toggle("block");
//   });

//   closeMobileMenu.addEventListener("click", function () {
//     mobileSidebar.classList.add("-translate-x-full");
//     overlay.classList.add("hidden");
//     overlay.classList.remove("block");
//   });

//   overlay.addEventListener("click", function () {
//     mobileSidebar.classList.add("-translate-x-full");
//     overlay.classList.add("hidden");
//     overlay.classList.remove("block");
//   });

//   // Add Product Form Toggle Logic
//   const openAddProductFormDesktop = document.getElementById(
//     "openAddProductFormDesktop"
//   );
//   const openAddProductFormMobile = document.getElementById(
//     "openAddProductFormMobile"
//   );
//   const productPageMainContent = document.getElementById(
//     "productPageMainContent"
//   );
//   const addProductsContainer = document.getElementById("addProductsContainer");
//   const previewAddedProducts = document.getElementById("previewAddedProducts");
//   const productUploadedConfirmation = document.getElementById(
//     "productUploadedConfirmation"
//   );

//   function toggleAddProductForm() {
//     productPageMainContent.classList.add("hidden");
//     addProductsContainer.classList.remove("hidden");
//     previewAddedProducts.classList.add("hidden");
//     openAddProductFormDesktop.setAttribute("aria-expanded", "true");
//     openAddProductFormMobile.setAttribute("aria-expanded", "true");
//   }

//   openAddProductFormDesktop.addEventListener("click", toggleAddProductForm);
//   openAddProductFormMobile.addEventListener("click", toggleAddProductForm);

//   // Form Elements
//   const addProductsForm = document.getElementById("addProductsForm");
//   const previewProductBtn = document.getElementById("previewProductBtn");
//   const cancelAddingProductBtn = document.getElementById(
//     "cancelAddingProductBtn"
//   );
//   const addProductName = document.getElementById("addProductName");
//   const addProductCategory = document.getElementById("addProductCategory");
//   const addProductPrice = document.getElementById("addProductPrice");
//   const addProductQuantity = document.getElementById("addProductQuantity");
//   const addProductDescription = document.getElementById(
//     "addProductDescription"
//   );
//   const addProductMainImage = document.getElementById("addProductMainImage");
//   const addProductSecondImage = document.getElementById(
//     "addProductSecondImage"
//   );
//   const addProductThirdImage = document.getElementById("addProductThirdImage");

//   // Error Elements
//   const addProductNameError = document.getElementById("addProductNameError");
//   const categoryError = document.getElementById("categoryError");
//   const addProductPriceError = document.getElementById("addProductPriceError");
//   const addProductQuantityError = document.getElementById(
//     "addProductQuantityError"
//   );
//   const addProductMainImageError = document.getElementById(
//     "addProductMainImageError"
//   );
//   const addProductSecondImageError = document.getElementById(
//     "addProductSecondImageError"
//   );
//   const addProductThirdImageError = document.getElementById(
//     "addProductThirdImageError"
//   );

//   // Preview Section Elements
//   const previewAddedImage = document.getElementById("previewAddedImage");
//   const previewAddedProductName = document.getElementById(
//     "previewAddedProductName"
//   );
//   const previewAddedProductQuantity = document.getElementById(
//     "previewAddedProductQuantity"
//   );
//   const previewAddedProductCategory = document.getElementById(
//     "previewAddedProductCategory"
//   );
//   const previewAddedProductPrice = document.getElementById(
//     "previewAddedProductPrice"
//   );
//   const previewAddedProductDescription = document.getElementById(
//     "previewAddedProductDescription"
//   );

//   // Confirmation Dialog Elements
//   const uploadPreviewedProduct = document.getElementById(
//     "uploadPreviewedProduct"
//   );
//   const confirmedProductName = document.getElementById("confirmedProductName");
//   const confirmedProductCategory = document.getElementById(
//     "confirmedProductCategory"
//   );
//   const addNewProduct = document.getElementById("addNewProduct");
//   const navigateToProductList = document.getElementById(
//     "navigateToProductList"
//   );

//   // Valid product categories
//   const validCategories = [
//     "Apparel & Accessories",
//     "Fashion",
//     "Electronics",
//     "Health Beauty",
//     "Home Living",
//     "Grocery",
//     "Home & Kitchen",
//     "Beauty & Personal Care",
//     "Toys & Games",
//     "Baby & Kids",
//     "Books & Media",
//     "Sports & Outdoors",
//   ];

//   // Enable/disable preview button based on required fields
//   function updatePreviewButtonState() {
//     const isValid =
//       addProductName.value.trim() !== "" &&
//       addProductCategory.value !== "" &&
//       addProductPrice.value.trim() !== "" &&
//       addProductQuantity.value.trim() !== "" &&
//       addProductMainImage.files.length > 0;
//     previewProductBtn.disabled = !isValid;
//     previewProductBtn.classList.toggle("bg-disabledBtn", !isValid);
//     previewProductBtn.classList.toggle("bg-primary", isValid);
//     previewProductBtn.classList.toggle("cursor-not-allowed", !isValid);
//     previewProductBtn.classList.toggle("hover:bg-purple-700", isValid);
//   }

//   // Validate form inputs
//   function validateForm() {
//     let isValid = true;
//     const errors = {};

//     // Reset error messages and styles
//     addProductNameError.textContent = "";
//     categoryError.textContent = "";
//     addProductPriceError.textContent = "";
//     addProductQuantityError.textContent = "";
//     addProductMainImageError.textContent = "";
//     addProductSecondImageError.textContent = "";
//     addProductThirdImageError.textContent = "";
//     [
//       addProductName,
//       addProductCategory,
//       addProductPrice,
//       addProductQuantity,
//       addProductDescription,
//     ].forEach((input) => {
//       input.setAttribute("data-invalid", "false");
//       input.classList.remove("border-red-500");
//     });

//     // Validate name
//     if (!addProductName.value.trim()) {
//       errors.name = "Product name required";
//       addProductNameError.textContent = errors.name;
//       addProductName.setAttribute("data-invalid", "true");
//       addProductName.classList.add("border-red-500");
//       isValid = false;
//     }

//     // Validate category
//     if (!validCategories.includes(addProductCategory.value)) {
//       errors.category = "Invalid product category";
//       categoryError.textContent = errors.category;
//       addProductCategory.setAttribute("data-invalid", "true");
//       addProductCategory.classList.add("border-red-500");
//       isValid = false;
//     }

//     // Validate price
//     const priceValue = parseFloat(addProductPrice.value);
//     if (!addProductPrice.value.trim() || isNaN(priceValue) || priceValue <= 0) {
//       errors.price = "Price must be a positive number";
//       addProductPriceError.textContent = errors.price;
//       addProductPrice.setAttribute("data-invalid", "true");
//       addProductPrice.classList.add("border-red-500");
//       isValid = false;
//     }

//     // Validate quantity
//     const quantityValue = parseInt(addProductQuantity.value);
//     if (
//       !addProductQuantity.value.trim() ||
//       isNaN(quantityValue) ||
//       quantityValue < 0
//     ) {
//       errors.quantity = "Quantity must be a non-negative number";
//       addProductQuantityError.textContent = errors.quantity;
//       addProductQuantity.setAttribute("data-invalid", "true");
//       addProductQuantity.classList.add("border-red-500");
//       isValid = false;
//     }

//     // Validate main image
//     if (addProductMainImage.files.length === 0) {
//       errors.mainImage = "Main product image required";
//       addProductMainImageError.textContent = errors.mainImage;
//       isValid = false;
//     } else if (addProductMainImage.files[0].size > 3 * 1024 * 1024) {
//       errors.mainImage = "Main image must be less than 3MB";
//       addProductMainImageError.textContent = errors.mainImage;
//       isValid = false;
//     }

//     // Validate secondary images (optional, but check size if provided)
//     if (
//       addProductSecondImage.files.length > 0 &&
//       addProductSecondImage.files[0].size > 3 * 1024 * 1024
//     ) {
//       errors.secondImage = "Secondary image must be less than 3MB";
//       addProductSecondImageError.textContent = errors.secondImage;
//       isValid = false;
//     }
//     if (
//       addProductThirdImage.files.length > 0 &&
//       addProductThirdImage.files[0].size > 3 * 1024 * 1024
//     ) {
//       errors.thirdImage = "Third image must be less than 3MB";
//       addProductThirdImageError.textContent = errors.thirdImage;
//       isValid = false;
//     }

//     return { isValid, errors };
//   }

//   // Handle image input for storage
//   function handleImageInput(input, storageKey) {
//     input.addEventListener("change", function () {
//       if (input.files && input.files[0]) {
//         const file = input.files[0];
//         const errorElement = document.getElementById(`${input.id}Error`);
//         if (file.size > 3 * 1024 * 1024) {
//           errorElement.textContent = "Image must be less than 3MB";
//           input.value = "";
//           localStorage.removeItem(storageKey);
//           updatePreviewButtonState();
//           return;
//         }
//         const reader = new FileReader();
//         reader.onload = function (e) {
//           localStorage.setItem(storageKey, e.target.result);
//           errorElement.textContent = "";
//           updatePreviewButtonState();
//         };
//         reader.readAsDataURL(file);
//       } else {
//         localStorage.removeItem(storageKey);
//         updatePreviewButtonState();
//       }
//     });
//   }

//   // Set up image input handlers
//   handleImageInput(addProductMainImage, "productMainImage");
//   handleImageInput(addProductSecondImage, "productSecondImage");
//   handleImageInput(addProductThirdImage, "productThirdImage");

//   // Update preview button state on input change
//   [
//     addProductName,
//     addProductCategory,
//     addProductPrice,
//     addProductQuantity,
//     addProductDescription,
//     addProductMainImage,
//   ].forEach((input) => {
//     input.addEventListener("input", updatePreviewButtonState);
//     input.addEventListener("change", updatePreviewButtonState);
//   });

//   // Cancel button handler
//   cancelAddingProductBtn.addEventListener("click", function () {
//     productPageMainContent.classList.remove("hidden");
//     addProductsContainer.classList.add("hidden");
//     previewAddedProducts.classList.add("hidden");
//     openAddProductFormDesktop.setAttribute("aria-expanded", "false");
//     openAddProductFormMobile.setAttribute("aria-expanded", "false");
//     addProductsForm.reset();
//     localStorage.removeItem("productName");
//     localStorage.removeItem("productCategory");
//     localStorage.removeItem("productPrice");
//     localStorage.removeItem("productQuantity");
//     localStorage.removeItem("productDescription");
//     localStorage.removeItem("productMainImage");
//     localStorage.removeItem("productSecondImage");
//     localStorage.removeItem("productThirdImage");
//     updatePreviewButtonState();
//   });

//   // Form submission (Preview Product)
//   addProductsForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const { isValid } = validateForm();
//     if (isValid) {
//       // Store form data in localStorage
//       localStorage.setItem("productName", addProductName.value.trim());
//       localStorage.setItem("productCategory", addProductCategory.value);
//       localStorage.setItem(
//         "productPrice",
//         parseFloat(addProductPrice.value).toFixed(2)
//       );
//       localStorage.setItem(
//         "productQuantity",
//         parseInt(addProductQuantity.value)
//       );
//       localStorage.setItem(
//         "productDescription",
//         addProductDescription.value.trim()
//       );

//       // Show preview section
//       productPageMainContent.classList.add("hidden");
//       addProductsContainer.classList.add("hidden");
//       previewAddedProducts.classList.remove("hidden");

//       // Populate preview section
//       previewAddedImage.src = localStorage.getItem("productMainImage") || "";
//       previewAddedProductName.textContent = localStorage.getItem("productName");
//       previewAddedProductQuantity.textContent =
//         localStorage.getItem("productQuantity");
//       previewAddedProductCategory.textContent =
//         localStorage.getItem("productCategory");
//       previewAddedProductPrice.textContent =
//         localStorage.getItem("productPrice");
//       previewAddedProductDescription.textContent =
//         localStorage.getItem("productDescription") || "No description provided";
//     }
//   });

//   // Upload product to backend
//   uploadPreviewedProduct.addEventListener("click", async function () {
//     const formData = new FormData();
//     formData.append("name", localStorage.getItem("productName"));
//     formData.append("category", localStorage.getItem("productCategory"));
//     formData.append("price", parseFloat(localStorage.getItem("productPrice")));
//     formData.append("stock", parseInt(localStorage.getItem("productQuantity")));
//     if (localStorage.getItem("productDescription")) {
//       formData.append(
//         "description",
//         localStorage.getItem("productDescription")
//       );
//     }
//     if (addProductMainImage.files[0]) {
//       formData.append("image", addProductMainImage.files[0]);
//     }

//     try {
//       const response = await fetch(
//         "https://vendsr-backend.onrender.com/api/product/create",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload product");
//       }

//       // Show confirmation dialog
//       confirmedProductName.textContent = localStorage.getItem("productName");
//       confirmedProductCategory.textContent =
//         localStorage.getItem("productCategory");
//       productUploadedConfirmation.showModal();

//       // Clear form and localStorage
//       addProductsForm.reset();
//       localStorage.removeItem("productName");
//       localStorage.removeItem("productCategory");
//       localStorage.removeItem("productPrice");
//       localStorage.removeItem("productQuantity");
//       localStorage.removeItem("productDescription");
//       localStorage.removeItem("productMainImage");
//       localStorage.removeItem("productSecondImage");
//       localStorage.removeItem("productThirdImage");
//       updatePreviewButtonState();
//     } catch (error) {
//       alert("Error uploading product: " + error.message);
//     }
//   });

//   // Confirmation dialog navigation
//   addNewProduct.addEventListener("click", function () {
//     productUploadedConfirmation.close();
//     productPageMainContent.classList.add("hidden");
//     addProductsContainer.classList.remove("hidden");
//     previewAddedProducts.classList.add("hidden");
//     openAddProductFormDesktop.setAttribute("aria-expanded", "true");
//     openAddProductFormMobile.setAttribute("aria-expanded", "true");
//   });

//   navigateToProductList.addEventListener("click", function () {
//     productUploadedConfirmation.close();
//     productPageMainContent.classList.remove("hidden");
//     addProductsContainer.classList.add("hidden");
//     previewAddedProducts.classList.add("hidden");
//     openAddProductFormDesktop.setAttribute("aria-expanded", "false");
//     openAddProductFormMobile.setAttribute("aria-expanded", "false");
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  console.log("dashboard.js loaded"); // Debug: Confirm script loads

  // Check for email and token in sessionStorage
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const addProductNameError = document.getElementById("addProductNameError");
  if (!email || !token) {
    console.warn(
      "Missing email or token in sessionStorage, redirecting to signup"
    ); // Debug
    if (addProductNameError) {
      addProductNameError.textContent =
        "Authentication required. Please sign up or log in.";
      addProductNameError.setAttribute("aria-live", "polite");
    }
    setTimeout(() => {
      window.location.href = "../sign-up/";
    }, 2000);
    return;
  }
  console.log("Email from sessionStorage:", email); // Debug
  console.log("Token from sessionStorage:", token); // Debug

  // Mobile Menu Toggle Logic
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const overlay = document.getElementById("overlay");

  function toggleMobileMenu() {
    const isOpen = !mobileSidebar.classList.contains("-translate-x-full");
    mobileSidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden", isOpen);
  }

  mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  closeMobileMenu.addEventListener("click", toggleMobileMenu);
  overlay.addEventListener("click", toggleMobileMenu);

  // Add Product Form Toggle Logic
  const openAddProductFormDesktop = document.getElementById(
    "openAddProductFormDesktop"
  );
  const openAddProductFormMobile = document.getElementById(
    "openAddProductFormMobile"
  );
  const productPageMainContent = document.getElementById(
    "productPageMainContent"
  );
  const addProductsContainer = document.getElementById("addProductsContainer");
  const previewAddedProducts = document.getElementById("previewAddedProducts");
  const productUploadedConfirmation = document.getElementById(
    "productUploadedConfirmation"
  );

  function toggleAddProductForm() {
    productPageMainContent.classList.add("hidden");
    addProductsContainer.classList.remove("hidden");
    previewAddedProducts.classList.add("hidden");
    openAddProductFormDesktop.setAttribute("aria-expanded", "true");
    openAddProductFormMobile.setAttribute("aria-expanded", "true");
  }

  openAddProductFormDesktop.addEventListener("click", toggleAddProductForm);
  openAddProductFormMobile.addEventListener("click", toggleAddProductForm);

  // Form Elements
  const addProductsForm = document.getElementById("addProductsForm");
  const previewProductBtn = document.getElementById("previewProductBtn");
  const cancelAddingProductBtn = document.getElementById(
    "cancelAddingProductBtn"
  );
  const addProductName = document.getElementById("addProductName");
  const addProductCategory = document.getElementById("addProductCategory");
  const addProductPrice = document.getElementById("addProductPrice");
  const addProductQuantity = document.getElementById("addProductQuantity");
  const addProductDescription = document.getElementById(
    "addProductDescription"
  );
  const addProductMainImage = document.getElementById("addProductMainImage");
  const addProductSecondImage = document.getElementById(
    "addProductSecondImage"
  );
  const addProductThirdImage = document.getElementById("addProductThirdImage");

  // Error Elements
  const errorElements = {
    name: document.getElementById("addProductNameError"),
    category: document.getElementById("categoryError"),
    price: document.getElementById("addProductPriceError"),
    quantity: document.getElementById("addProductQuantityError"),
    description:
      document.getElementById("addProductDescriptionError") ||
      document.createElement("p"),
    mainImage: document.getElementById("addProductMainImageError"),
    secondImage: document.getElementById("addProductSecondImageError"),
    thirdImage: document.getElementById("addProductThirdImageError"),
  };

  // Add aria-live to error elements
  Object.values(errorElements).forEach((el) => {
    if (el && el.tagName === "P") el.setAttribute("aria-live", "polite");
  });

  // Preview Section Elements
  const previewElements = {
    image: document.getElementById("previewAddedImage"),
    name: document.getElementById("previewAddedProductName"),
    quantity: document.getElementById("previewAddedProductQuantity"),
    category: document.getElementById("previewAddedProductCategory"),
    price: document.getElementById("previewAddedProductPrice"),
    description: document.getElementById("previewAddedProductDescription"),
    secondImage:
      document.getElementById("previewAddedSecondImage") ||
      document.createElement("img"),
    thirdImage:
      document.getElementById("previewAddedThirdImage") ||
      document.createElement("img"),
  };

  // Confirmation Dialog Elements
  const uploadPreviewedProduct = document.getElementById(
    "uploadPreviewedProduct"
  );
  const confirmedProductName = document.getElementById("confirmedProductName");
  const confirmedProductCategory = document.getElementById(
    "confirmedProductCategory"
  );
  const addNewProduct = document.getElementById("addNewProduct");
  const navigateToProductList = document.getElementById(
    "navigateToProductList"
  );

  // Valid product categories
  const validCategories = [
    "Apparel & Accessories",
    "Fashion",
    "Electronics",
    "Health Beauty",
    "Home Living",
    "Grocery",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Toys & Games",
    "Baby & Kids",
    "Books & Media",
    "Sports & Outdoors",
  ];

  // Validation rules
  const rules = {
    name: /^[a-zA-Z\s-]{2,50}$/,
    price: /^[0-9]+(\.[0-9]{1,2})?$/,
    quantity: /^[0-9]+$/,
    description: /^.{0,500}$/,
    fileSize: 3 * 1024 * 1024, // 3MB
    fileType: /^image\/.*$/,
  };

  // Debounce function for real-time validation
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Enable/disable preview button based on required fields
  function updatePreviewButtonState() {
    const isValid =
      addProductName.value.trim() &&
      rules.name.test(addProductName.value.trim()) &&
      validCategories.includes(addProductCategory.value) &&
      rules.price.test(addProductPrice.value.trim()) &&
      parseFloat(addProductPrice.value) > 0 &&
      rules.quantity.test(addProductQuantity.value.trim()) &&
      parseInt(addProductQuantity.value) >= 0 &&
      addProductMainImage.files.length > 0 &&
      addProductMainImage.files[0].size <= rules.fileSize &&
      rules.fileType.test(addProductMainImage.files[0].type);
    previewProductBtn.disabled = !isValid;
    previewProductBtn.classList.toggle("bg-disabledBtn", !isValid);
    previewProductBtn.classList.toggle("bg-primary", isValid);
    previewProductBtn.classList.toggle("cursor-not-allowed", !isValid);
    previewProductBtn.classList.toggle("hover:bg-purple-700", isValid);
  }

  // Validate form inputs
  function validateForm() {
    console.log("Validating add product form"); // Debug
    let isValid = true;

    // Reset error messages and styles
    Object.values(errorElements).forEach((el) => {
      if (el && el.tagName === "P") el.textContent = "";
    });
    [
      addProductName,
      addProductCategory,
      addProductPrice,
      addProductQuantity,
      addProductDescription,
    ].forEach((input) => {
      input.classList.remove("border-red-500");
      input.setAttribute("data-invalid", "false");
    });

    // Validate name
    if (!addProductName.value.trim()) {
      showError(addProductName, errorElements.name, "Product name is required");
      isValid = false;
    } else if (!rules.name.test(addProductName.value.trim())) {
      showError(
        addProductName,
        errorElements.name,
        "Product name must be 2–50 characters, letters, spaces, or hyphens"
      );
      isValid = false;
    }

    // Validate category
    if (!validCategories.includes(addProductCategory.value)) {
      showError(
        addProductCategory,
        errorElements.category,
        "Please select a valid product category"
      );
      isValid = false;
    }

    // Validate price
    const priceValue = parseFloat(addProductPrice.value);
    if (!addProductPrice.value.trim() || isNaN(priceValue) || priceValue <= 0) {
      showError(
        addProductPrice,
        errorElements.price,
        "Price must be a positive number"
      );
      isValid = false;
    }

    // Validate quantity
    const quantityValue = parseInt(addProductQuantity.value);
    if (
      !addProductQuantity.value.trim() ||
      isNaN(quantityValue) ||
      quantityValue < 0
    ) {
      showError(
        addProductQuantity,
        errorElements.quantity,
        "Quantity must be a non-negative number"
      );
      isValid = false;
    }

    // Validate description (optional)
    if (
      addProductDescription.value.trim() &&
      !rules.description.test(addProductDescription.value.trim())
    ) {
      showError(
        addProductDescription,
        errorElements.description,
        "Description must be 500 characters or less"
      );
      isValid = false;
    }

    // Validate main image
    if (addProductMainImage.files.length === 0) {
      showError(
        addProductMainImage,
        errorElements.mainImage,
        "Main product image is required"
      );
      isValid = false;
    } else if (!rules.fileType.test(addProductMainImage.files[0].type)) {
      showError(
        addProductMainImage,
        errorElements.mainImage,
        "Main image must be an image file"
      );
      isValid = false;
    } else if (addProductMainImage.files[0].size > rules.fileSize) {
      showError(
        addProductMainImage,
        errorElements.mainImage,
        "Main image must be less than 3MB"
      );
      isValid = false;
    }

    // Validate secondary images (optional)
    if (addProductSecondImage.files.length > 0) {
      if (!rules.fileType.test(addProductSecondImage.files[0].type)) {
        showError(
          addProductSecondImage,
          errorElements.secondImage,
          "Secondary image must be an image file"
        );
        isValid = false;
      } else if (addProductSecondImage.files[0].size > rules.fileSize) {
        showError(
          addProductSecondImage,
          errorElements.secondImage,
          "Secondary image must be less than 3MB"
        );
        isValid = false;
      }
    }
    if (addProductThirdImage.files.length > 0) {
      if (!rules.fileType.test(addProductThirdImage.files[0].type)) {
        showError(
          addProductThirdImage,
          errorElements.thirdImage,
          "Third image must be an image file"
        );
        isValid = false;
      } else if (addProductThirdImage.files[0].size > rules.fileSize) {
        showError(
          addProductThirdImage,
          errorElements.thirdImage,
          "Third image must be less than 3MB"
        );
        isValid = false;
      }
    }

    updatePreviewButtonState();
    console.log("Form validation result:", isValid); // Debug
    return isValid;
  }

  function showError(input, errorElement, message) {
    if (input && errorElement && errorElement.tagName === "P") {
      errorElement.textContent = message;
      input.classList.add("border-red-500");
      input.setAttribute("data-invalid", "true");
    }
  }

  // Handle image input for storage
  function handleImageInput(input, storageKey) {
    input.addEventListener("input", () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (!rules.fileType.test(file.type)) {
          showError(
            input,
            errorElements[input.id.replace("addProduct", "").toLowerCase()],
            "Image must be an image file"
          );
          input.value = "";
          sessionStorage.removeItem(storageKey);
          validateForm();
          return;
        }
        if (file.size > rules.fileSize) {
          showError(
            input,
            errorElements[input.id.replace("addProduct", "").toLowerCase()],
            "Image must be less than 3MB"
          );
          input.value = "";
          sessionStorage.removeItem(storageKey);
          validateForm();
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          sessionStorage.setItem(storageKey, e.target.result);
          validateForm();
        };
        reader.readAsDataURL(file);
      } else {
        sessionStorage.removeItem(storageKey);
        validateForm();
      }
    });
  }

  // Set up image input handlers
  handleImageInput(addProductMainImage, "productMainImage");
  handleImageInput(addProductSecondImage, "productSecondImage");
  handleImageInput(addProductThirdImage, "productThirdImage");

  // Real-time validation with debounce
  [
    addProductName,
    addProductCategory,
    addProductPrice,
    addProductQuantity,
    addProductDescription,
  ].forEach((input) => {
    input.addEventListener("input", debounce(validateForm, 300));
  });

  // Cancel button handler
  cancelAddingProductBtn.addEventListener("click", () => {
    productPageMainContent.classList.remove("hidden");
    addProductsContainer.classList.add("hidden");
    previewAddedProducts.classList.add("hidden");
    openAddProductFormDesktop.setAttribute("aria-expanded", "false");
    openAddProductFormMobile.setAttribute("aria-expanded", "false");
    addProductsForm.reset();
    sessionStorage.removeItem("productName");
    sessionStorage.removeItem("productCategory");
    sessionStorage.removeItem("productPrice");
    sessionStorage.removeItem("productQuantity");
    sessionStorage.removeItem("productDescription");
    sessionStorage.removeItem("productMainImage");
    sessionStorage.removeItem("productSecondImage");
    sessionStorage.removeItem("productThirdImage");
    validateForm();
  });

  // Form submission (Preview Product)
  addProductsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Add product form submitted"); // Debug
    if (validateForm()) {
      // Store form data in sessionStorage
      sessionStorage.setItem("productName", addProductName.value.trim());
      sessionStorage.setItem("productCategory", addProductCategory.value);
      sessionStorage.setItem(
        "productPrice",
        parseFloat(addProductPrice.value).toFixed(2)
      );
      sessionStorage.setItem(
        "productQuantity",
        parseInt(addProductQuantity.value)
      );
      sessionStorage.setItem(
        "productDescription",
        addProductDescription.value.trim()
      );

      // Show preview section
      productPageMainContent.classList.add("hidden");
      addProductsContainer.classList.add("hidden");
      previewAddedProducts.classList.remove("hidden");

      // Populate preview section
      previewElements.image.src =
        sessionStorage.getItem("productMainImage") || "";
      previewElements.secondImage.src =
        sessionStorage.getItem("productSecondImage") || "";
      previewElements.thirdImage.src =
        sessionStorage.getItem("productThirdImage") || "";
      previewElements.name.textContent =
        sessionStorage.getItem("productName") || "";
      previewElements.quantity.textContent =
        sessionStorage.getItem("productQuantity") || "0";
      previewElements.category.textContent =
        sessionStorage.getItem("productCategory") || "";
      previewElements.price.textContent =
        sessionStorage.getItem("productPrice") || "0.00";
      previewElements.description.textContent =
        sessionStorage.getItem("productDescription") ||
        "No description provided";
    }
  });

  // Upload product to backend
  uploadPreviewedProduct.addEventListener("click", async () => {
    console.log("Uploading product to backend"); // Debug
    const formData = new FormData();
    formData.append("name", sessionStorage.getItem("productName"));
    formData.append("category", sessionStorage.getItem("productCategory"));
    formData.append(
      "price",
      parseFloat(sessionStorage.getItem("productPrice"))
    );
    formData.append(
      "stock",
      parseInt(sessionStorage.getItem("productQuantity"))
    );
    if (sessionStorage.getItem("productDescription")) {
      formData.append(
        "description",
        sessionStorage.getItem("productDescription")
      );
    }
    if (addProductMainImage.files[0]) {
      formData.append("productImage", addProductMainImage.files[0]);
    }
    if (addProductSecondImage.files[0]) {
      formData.append("productImage", addProductSecondImage.files[0]);
    }
    if (addProductThirdImage.files[0]) {
      formData.append("productImage", addProductThirdImage.files[0]);
    }

    try {
      uploadPreviewedProduct.disabled = true;
      uploadPreviewedProduct.textContent = "Uploading...";
      console.time("productUploadRequest"); // Debug

      // Timeout promise (60 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Request timed out. Please try again.")),
          60000
        );
      });

      // API call
      const response = await Promise.race([
        fetch("https://vendsr-backend.onrender.com/api/product/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }),
        timeoutPromise,
      ]);
      console.timeEnd("productUploadRequest"); // Debug

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload product");
      }

      const data = await response.json();
      console.log("Product upload success:", data); // Debug

      // Show confirmation dialog
      confirmedProductName.textContent =
        sessionStorage.getItem("productName") || "";
      confirmedProductCategory.textContent =
        sessionStorage.getItem("productCategory") || "";
      productUploadedConfirmation.showModal();

      // Clear form and sessionStorage
      addProductsForm.reset();
      sessionStorage.removeItem("productName");
      sessionStorage.removeItem("productCategory");
      sessionStorage.removeItem("productPrice");
      sessionStorage.removeItem("productQuantity");
      sessionStorage.removeItem("productDescription");
      sessionStorage.removeItem("productMainImage");
      sessionStorage.removeItem("productSecondImage");
      sessionStorage.removeItem("productThirdImage");
      validateForm();
    } catch (error) {
      console.error("Product upload failed:", error.message); // Debug
      showError(
        addProductMainImage,
        errorElements.mainImage,
        error.message.includes("token")
          ? "Authentication failed. Please sign up or log in."
          : error.message
      );
      if (error.message.includes("token")) {
        setTimeout(() => {
          window.location.href = "../sign-up/";
        }, 2000);
      }
    } finally {
      uploadPreviewedProduct.disabled = false;
      uploadPreviewedProduct.textContent = "Upload Product";
    }
  });

  // Confirmation dialog navigation
  addNewProduct.addEventListener("click", () => {
    productUploadedConfirmation.close();
    productPageMainContent.classList.add("hidden");
    addProductsContainer.classList.remove("hidden");
    previewAddedProducts.classList.add("hidden");
    openAddProductFormDesktop.setAttribute("aria-expanded", "true");
    openAddProductFormMobile.setAttribute("aria-expanded", "true");
  });

  navigateToProductList.addEventListener("click", () => {
    productUploadedConfirmation.close();
    productPageMainContent.classList.remove("hidden");
    addProductsContainer.classList.add("hidden");
    previewAddedProducts.classList.add("hidden");
    openAddProductFormDesktop.setAttribute("aria-expanded", "false");
    openAddProductFormMobile.setAttribute("aria-expanded", "false");
  });
});
