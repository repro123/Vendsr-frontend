"use strict";

// document.addEventListener("DOMContentLoaded", function () {
//   const mobileMenuToggle = document.getElementById("mobileMenuToggle");
//   const mobileSidebar = document.getElementById("mobile-sidebar");
//   const closeMobileMenu = document.getElementById("close-mobile-menu");
//   const overlay = document.getElementById("overlay");

//   mobileMenuToggle.addEventListener("click", function () {
//     mobileSidebar.classList.remove("-translate-x-full");
//     overlay.classList.remove("hidden");
//     overlay.classList.add("block");
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

//   // Add Product Form Toggle Logic with aria-expanded
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

//   function toggleAddProductForm() {
//     productPageMainContent.classList.add("hidden");
//     addProductsContainer.classList.remove("hidden");
//     openAddProductFormDesktop.setAttribute("aria-expanded", "true");
//     openAddProductFormMobile.setAttribute("aria-expanded", "true");
//   }

//   openAddProductFormDesktop.addEventListener("click", toggleAddProductForm);
//   openAddProductFormMobile.addEventListener("click", toggleAddProductForm);
// });

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle Logic
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const overlay = document.getElementById("overlay");

  mobileMenuToggle.addEventListener("click", function () {
    mobileSidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
    overlay.classList.toggle("block");
  });

  closeMobileMenu.addEventListener("click", function () {
    mobileSidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    overlay.classList.remove("block");
  });

  overlay.addEventListener("click", function () {
    mobileSidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    overlay.classList.remove("block");
  });

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
  const addProductNameError = document.getElementById("addProductNameError");
  const categoryError = document.getElementById("categoryError");
  const addProductPriceError = document.getElementById("addProductPriceError");
  const addProductQuantityError = document.getElementById(
    "addProductQuantityError"
  );
  const addProductMainImageError = document.getElementById(
    "addProductMainImageError"
  );
  const addProductSecondImageError = document.getElementById(
    "addProductSecondImageError"
  );
  const addProductThirdImageError = document.getElementById(
    "addProductThirdImageError"
  );

  // Preview Section Elements
  const previewAddedImage = document.getElementById("previewAddedImage");
  const previewAddedProductName = document.getElementById(
    "previewAddedProductName"
  );
  const previewAddedProductQuantity = document.getElementById(
    "previewAddedProductQuantity"
  );
  const previewAddedProductCategory = document.getElementById(
    "previewAddedProductCategory"
  );
  const previewAddedProductPrice = document.getElementById(
    "previewAddedProductPrice"
  );
  const previewAddedProductDescription = document.getElementById(
    "previewAddedProductDescription"
  );

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

  // Enable/disable preview button based on required fields
  function updatePreviewButtonState() {
    const isValid =
      addProductName.value.trim() !== "" &&
      addProductCategory.value !== "" &&
      addProductPrice.value.trim() !== "" &&
      addProductQuantity.value.trim() !== "" &&
      addProductMainImage.files.length > 0;
    previewProductBtn.disabled = !isValid;
    previewProductBtn.classList.toggle("bg-disabledBtn", !isValid);
    previewProductBtn.classList.toggle("bg-primary", isValid);
    previewProductBtn.classList.toggle("cursor-not-allowed", !isValid);
    previewProductBtn.classList.toggle("hover:bg-purple-700", isValid);
  }

  // Validate form inputs
  function validateForm() {
    let isValid = true;
    const errors = {};

    // Reset error messages and styles
    addProductNameError.textContent = "";
    categoryError.textContent = "";
    addProductPriceError.textContent = "";
    addProductQuantityError.textContent = "";
    addProductMainImageError.textContent = "";
    addProductSecondImageError.textContent = "";
    addProductThirdImageError.textContent = "";
    [
      addProductName,
      addProductCategory,
      addProductPrice,
      addProductQuantity,
      addProductDescription,
    ].forEach((input) => {
      input.setAttribute("data-invalid", "false");
      input.classList.remove("border-red-500");
    });

    // Validate name
    if (!addProductName.value.trim()) {
      errors.name = "Product name required";
      addProductNameError.textContent = errors.name;
      addProductName.setAttribute("data-invalid", "true");
      addProductName.classList.add("border-red-500");
      isValid = false;
    }

    // Validate category
    if (!validCategories.includes(addProductCategory.value)) {
      errors.category = "Invalid product category";
      categoryError.textContent = errors.category;
      addProductCategory.setAttribute("data-invalid", "true");
      addProductCategory.classList.add("border-red-500");
      isValid = false;
    }

    // Validate price
    const priceValue = parseFloat(addProductPrice.value);
    if (!addProductPrice.value.trim() || isNaN(priceValue) || priceValue <= 0) {
      errors.price = "Price must be a positive number";
      addProductPriceError.textContent = errors.price;
      addProductPrice.setAttribute("data-invalid", "true");
      addProductPrice.classList.add("border-red-500");
      isValid = false;
    }

    // Validate quantity
    const quantityValue = parseInt(addProductQuantity.value);
    if (
      !addProductQuantity.value.trim() ||
      isNaN(quantityValue) ||
      quantityValue < 0
    ) {
      errors.quantity = "Quantity must be a non-negative number";
      addProductQuantityError.textContent = errors.quantity;
      addProductQuantity.setAttribute("data-invalid", "true");
      addProductQuantity.classList.add("border-red-500");
      isValid = false;
    }

    // Validate main image
    if (addProductMainImage.files.length === 0) {
      errors.mainImage = "Main product image required";
      addProductMainImageError.textContent = errors.mainImage;
      isValid = false;
    } else if (addProductMainImage.files[0].size > 3 * 1024 * 1024) {
      errors.mainImage = "Main image must be less than 3MB";
      addProductMainImageError.textContent = errors.mainImage;
      isValid = false;
    }

    // Validate secondary images (optional, but check size if provided)
    if (
      addProductSecondImage.files.length > 0 &&
      addProductSecondImage.files[0].size > 3 * 1024 * 1024
    ) {
      errors.secondImage = "Secondary image must be less than 3MB";
      addProductSecondImageError.textContent = errors.secondImage;
      isValid = false;
    }
    if (
      addProductThirdImage.files.length > 0 &&
      addProductThirdImage.files[0].size > 3 * 1024 * 1024
    ) {
      errors.thirdImage = "Third image must be less than 3MB";
      addProductThirdImageError.textContent = errors.thirdImage;
      isValid = false;
    }

    return { isValid, errors };
  }

  // Handle image input for storage
  function handleImageInput(input, storageKey) {
    input.addEventListener("change", function () {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const errorElement = document.getElementById(`${input.id}Error`);
        if (file.size > 3 * 1024 * 1024) {
          errorElement.textContent = "Image must be less than 3MB";
          input.value = "";
          localStorage.removeItem(storageKey);
          updatePreviewButtonState();
          return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
          localStorage.setItem(storageKey, e.target.result);
          errorElement.textContent = "";
          updatePreviewButtonState();
        };
        reader.readAsDataURL(file);
      } else {
        localStorage.removeItem(storageKey);
        updatePreviewButtonState();
      }
    });
  }

  // Set up image input handlers
  handleImageInput(addProductMainImage, "productMainImage");
  handleImageInput(addProductSecondImage, "productSecondImage");
  handleImageInput(addProductThirdImage, "productThirdImage");

  // Update preview button state on input change
  [
    addProductName,
    addProductCategory,
    addProductPrice,
    addProductQuantity,
    addProductDescription,
    addProductMainImage,
  ].forEach((input) => {
    input.addEventListener("input", updatePreviewButtonState);
    input.addEventListener("change", updatePreviewButtonState);
  });

  // Cancel button handler
  cancelAddingProductBtn.addEventListener("click", function () {
    productPageMainContent.classList.remove("hidden");
    addProductsContainer.classList.add("hidden");
    previewAddedProducts.classList.add("hidden");
    openAddProductFormDesktop.setAttribute("aria-expanded", "false");
    openAddProductFormMobile.setAttribute("aria-expanded", "false");
    addProductsForm.reset();
    localStorage.removeItem("productName");
    localStorage.removeItem("productCategory");
    localStorage.removeItem("productPrice");
    localStorage.removeItem("productQuantity");
    localStorage.removeItem("productDescription");
    localStorage.removeItem("productMainImage");
    localStorage.removeItem("productSecondImage");
    localStorage.removeItem("productThirdImage");
    updatePreviewButtonState();
  });

  // Form submission (Preview Product)
  addProductsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const { isValid } = validateForm();
    if (isValid) {
      // Store form data in localStorage
      localStorage.setItem("productName", addProductName.value.trim());
      localStorage.setItem("productCategory", addProductCategory.value);
      localStorage.setItem(
        "productPrice",
        parseFloat(addProductPrice.value).toFixed(2)
      );
      localStorage.setItem(
        "productQuantity",
        parseInt(addProductQuantity.value)
      );
      localStorage.setItem(
        "productDescription",
        addProductDescription.value.trim()
      );

      // Show preview section
      productPageMainContent.classList.add("hidden");
      addProductsContainer.classList.add("hidden");
      previewAddedProducts.classList.remove("hidden");

      // Populate preview section
      previewAddedImage.src = localStorage.getItem("productMainImage") || "";
      previewAddedProductName.textContent = localStorage.getItem("productName");
      previewAddedProductQuantity.textContent =
        localStorage.getItem("productQuantity");
      previewAddedProductCategory.textContent =
        localStorage.getItem("productCategory");
      previewAddedProductPrice.textContent =
        localStorage.getItem("productPrice");
      previewAddedProductDescription.textContent =
        localStorage.getItem("productDescription") || "No description provided";
    }
  });

  // Upload product to backend
  uploadPreviewedProduct.addEventListener("click", async function () {
    const formData = new FormData();
    formData.append("name", localStorage.getItem("productName"));
    formData.append("category", localStorage.getItem("productCategory"));
    formData.append("price", parseFloat(localStorage.getItem("productPrice")));
    formData.append("stock", parseInt(localStorage.getItem("productQuantity")));
    if (localStorage.getItem("productDescription")) {
      formData.append(
        "description",
        localStorage.getItem("productDescription")
      );
    }
    if (addProductMainImage.files[0]) {
      formData.append("image", addProductMainImage.files[0]);
    }

    try {
      const response = await fetch(
        "https://vendsr-backend.onrender.com/api/product/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload product");
      }

      // Show confirmation dialog
      confirmedProductName.textContent = localStorage.getItem("productName");
      confirmedProductCategory.textContent =
        localStorage.getItem("productCategory");
      productUploadedConfirmation.showModal();

      // Clear form and localStorage
      addProductsForm.reset();
      localStorage.removeItem("productName");
      localStorage.removeItem("productCategory");
      localStorage.removeItem("productPrice");
      localStorage.removeItem("productQuantity");
      localStorage.removeItem("productDescription");
      localStorage.removeItem("productMainImage");
      localStorage.removeItem("productSecondImage");
      localStorage.removeItem("productThirdImage");
      updatePreviewButtonState();
    } catch (error) {
      alert("Error uploading product: " + error.message);
    }
  });

  // Confirmation dialog navigation
  addNewProduct.addEventListener("click", function () {
    productUploadedConfirmation.close();
    productPageMainContent.classList.add("hidden");
    addProductsContainer.classList.remove("hidden");
    previewAddedProducts.classList.add("hidden");
    openAddProductFormDesktop.setAttribute("aria-expanded", "true");
    openAddProductFormMobile.setAttribute("aria-expanded", "true");
  });

  navigateToProductList.addEventListener("click", function () {
    productUploadedConfirmation.close();
    productPageMainContent.classList.remove("hidden");
    addProductsContainer.classList.add("hidden");
    previewAddedProducts.classList.add("hidden");
    openAddProductFormDesktop.setAttribute("aria-expanded", "false");
    openAddProductFormMobile.setAttribute("aria-expanded", "false");
  });
});
