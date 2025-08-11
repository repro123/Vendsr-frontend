"use strict";

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("dashboard.js loaded"); // Debug: Confirm script loads

//   // Check for email and token in sessionStorage
//   const email = sessionStorage.getItem("email");
//   const token = sessionStorage.getItem("token");
//   const addProductNameError = document.getElementById("addProductNameError");
//   if (!email || !token) {
//     console.warn(
//       "Missing email or token in sessionStorage, redirecting to signup"
//     ); // Debug
//     if (addProductNameError) {
//       addProductNameError.textContent =
//         "Authentication required. Please sign up or log in.";
//       addProductNameError.setAttribute("aria-live", "polite");
//     }
//     setTimeout(() => {
//       window.location.href = "../sign-up/";
//     }, 2000);
//     return;
//   }
//   console.log("Email from sessionStorage:", email); // Debug
//   console.log("Token from sessionStorage:", token); // Debug

//   // Mobile Menu Toggle Logic
//   const mobileMenuToggle = document.getElementById("mobileMenuToggle");
//   const mobileSidebar = document.getElementById("mobile-sidebar");
//   const closeMobileMenu = document.getElementById("close-mobile-menu");
//   const overlay = document.getElementById("overlay");

//   function toggleMobileMenu() {
//     const isOpen = !mobileSidebar.classList.contains("-translate-x-full");
//     mobileSidebar.classList.toggle("-translate-x-full");
//     overlay.classList.toggle("hidden", isOpen);
//   }

//   mobileMenuToggle.addEventListener("click", toggleMobileMenu);
//   closeMobileMenu.addEventListener("click", toggleMobileMenu);
//   overlay.addEventListener("click", toggleMobileMenu);

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
//   const errorElements = {
//     name: document.getElementById("addProductNameError"),
//     category: document.getElementById("categoryError"),
//     price: document.getElementById("addProductPriceError"),
//     quantity: document.getElementById("addProductQuantityError"),
//     description:
//       document.getElementById("addProductDescriptionError") ||
//       document.createElement("p"),
//     mainImage: document.getElementById("addProductMainImageError"),
//     secondImage: document.getElementById("addProductSecondImageError"),
//     thirdImage: document.getElementById("addProductThirdImageError"),
//   };

//   // Add aria-live to error elements
//   Object.values(errorElements).forEach((el) => {
//     if (el && el.tagName === "P") el.setAttribute("aria-live", "polite");
//   });

//   // Preview Section Elements
//   const previewElements = {
//     image: document.getElementById("previewAddedImage"),
//     name: document.getElementById("previewAddedProductName"),
//     quantity: document.getElementById("previewAddedProductQuantity"),
//     category: document.getElementById("previewAddedProductCategory"),
//     price: document.getElementById("previewAddedProductPrice"),
//     description: document.getElementById("previewAddedProductDescription"),
//     secondImage:
//       document.getElementById("previewAddedSecondImage") ||
//       document.createElement("img"),
//     thirdImage:
//       document.getElementById("previewAddedThirdImage") ||
//       document.createElement("img"),
//   };

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

//   // Product Grid Elements
//   const productGrid = document.getElementById(
//     "productDisplayContainerOfMaximumTwentyProducts"
//   );
//   const numberOfCurrentProductsShown = document.getElementById(
//     "numberOfCurrentProductsShown"
//   );
//   const totalNumberOfProducts = document.getElementById(
//     "totalNumberOfProducts"
//   );

//   // Filter Buttons
//   const filterByNameBtn = document.getElementById("filterProductsByName");
//   const filterByPriceBtn = document.getElementById("filterByPrice");
//   const filterByInStockBtn = document.getElementById("filterByInStock");

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

//   // Validation rules
//   const rules = {
//     name: /^[a-zA-Z\s-]{2,50}$/,
//     price: /^[0-9]+(\.[0-9]{1,2})?$/,
//     quantity: /^[0-9]+$/,
//     description: /^.{0,500}$/,
//     fileSize: 3 * 1024 * 1024, // 3MB
//     fileType: /^image\/.*$/,
//   };

//   // Product list state
//   let products = JSON.parse(sessionStorage.getItem("products")) || [];

//   // Debounce function for real-time validation
//   function debounce(func, wait) {
//     let timeout;
//     return function (...args) {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func.apply(this, args), wait);
//     };
//   }

//   // Render product grid
//   function renderProducts(productList = products) {
//     productGrid.innerHTML = ""; // Clear grid
//     const displayProducts = productList.slice(0, 20); // Limit to 20
//     displayProducts.forEach((product) => {
//       const productDiv = document.createElement("div");
//       productDiv.className = "rounded-lg text-sm";
//       productDiv.innerHTML = `
//         <img src="${product.imageUrl[0] || ""}" alt="${
//         product.name
//       }" class="rounded-lg mb-4 w-full aspect-square object-cover" />
//         <div class="flex items-start justify-between">
//           <p>${product.name}</p>
//           <button class="cursor-pointer">
//             <img src="../../assets/icons/vertical-dots-menu.png" class="w-4 h-4" />
//           </button>
//         </div>
//         <div class="flex flex-col mt-2">
//           <span>₦<span class="text-gray-400 mb-2">${product.price.toFixed(
//             2
//           )}</span></span>
//           <div class="flex flex-row gap-1 items-center">
//             <span class="w-2 h-2 rounded-full ${
//               product.stock > 0 ? "bg-green-500" : "bg-red-500"
//             }"></span>
//             <p class="text-gray-500">${product.stock} in stock</p>
//           </div>
//         </div>
//       `;
//       productGrid.appendChild(productDiv);
//     });

//     // Update counts
//     const shownCount = displayProducts.length;
//     numberOfCurrentProductsShown.textContent = `1–${shownCount}`;
//     totalNumberOfProducts.textContent = productList.length;
//   }

//   // Fetch products from backend API
//   async function fetchProducts() {
//     try {
//       console.time("fetchProductsRequest"); // Debug
//       // Timeout promise (60 seconds)
//       const timeoutPromise = new Promise((_, reject) => {
//         setTimeout(
//           () => reject(new Error("Request timed out. Please try again.")),
//           60000
//         );
//       });
//       const response = await Promise.race([
//         fetch("https://vendsr-backend.onrender.com/api/stores/my-store", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),
//         timeoutPromise,
//       ]);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to fetch products");
//       }
//       const data = await response.json();
//       products = data.store.products || [];
//       sessionStorage.setItem("products", JSON.stringify(products));
//       renderProducts();
//       console.log("Fetched products:", products); // Debug
//     } catch (error) {
//       console.error("Fetch products failed:", error.message); // Debug
//       if (addProductNameError) {
//         addProductNameError.textContent = error.message.includes("token")
//           ? "Authentication failed. Please sign up or log in."
//           : "Failed to load products. Please try again.";
//       }
//       if (error.message.includes("token")) {
//         setTimeout(() => {
//           window.location.href = "../sign-up/";
//         }, 2000);
//       }
//     } finally {
//       console.timeEnd("fetchProductsRequest"); // Debug
//     }
//   }

//   // Sort products by filter
//   function sortProducts(criterion) {
//     const sortedProducts = [...products];
//     if (criterion === "name") {
//       sortedProducts.sort((a, b) => b.name.localeCompare(a.name)); // Z–A
//     } else if (criterion === "price") {
//       sortedProducts.sort((b, a) => a.price - b.price); // High–low
//     } else if (criterion === "stock") {
//       sortedProducts.sort((b, a) => a.stock - b.stock); // High–low
//     }
//     renderProducts(sortedProducts);
//   }

//   // Filter button handlers
//   filterByNameBtn.addEventListener("click", () => {
//     filterByNameBtn.setAttribute("aria-expanded", "true");
//     filterByPriceBtn.setAttribute("aria-expanded", "false");
//     filterByInStockBtn.setAttribute("aria-expanded", "false");
//     sortProducts("name");
//   });

//   filterByPriceBtn.addEventListener("click", () => {
//     filterByNameBtn.setAttribute("aria-expanded", "false");
//     filterByPriceBtn.setAttribute("aria-expanded", "true");
//     filterByInStockBtn.setAttribute("aria-expanded", "false");
//     sortProducts("price");
//   });

//   filterByInStockBtn.addEventListener("click", () => {
//     filterByNameBtn.setAttribute("aria-expanded", "false");
//     filterByPriceBtn.setAttribute("aria-expanded", "false");
//     filterByInStockBtn.setAttribute("aria-expanded", "true");
//     sortProducts("stock");
//   });

//   // Enable/disable preview button based on required fields
//   function updatePreviewButtonState() {
//     const isValid =
//       addProductName.value.trim() &&
//       rules.name.test(addProductName.value.trim()) &&
//       validCategories.includes(addProductCategory.value) &&
//       rules.price.test(addProductPrice.value.trim()) &&
//       parseFloat(addProductPrice.value) > 0 &&
//       rules.quantity.test(addProductQuantity.value.trim()) &&
//       parseInt(addProductQuantity.value) >= 0 &&
//       addProductMainImage.files.length > 0 &&
//       addProductMainImage.files[0].size <= rules.fileSize &&
//       rules.fileType.test(addProductMainImage.files[0].type);
//     previewProductBtn.disabled = !isValid;
//     previewProductBtn.classList.toggle("bg-disabledBtn", !isValid);
//     previewProductBtn.classList.toggle("bg-primary", isValid);
//     previewProductBtn.classList.toggle("cursor-not-allowed", !isValid);
//     previewProductBtn.classList.toggle("hover:bg-purple-700", isValid);
//   }

//   // Validate form inputs
//   function validateForm() {
//     console.log("Validating add product form"); // Debug
//     let isValid = true;

//     // Reset error messages and styles
//     Object.values(errorElements).forEach((el) => {
//       if (el && el.tagName === "P") el.textContent = "";
//     });
//     [
//       addProductName,
//       addProductCategory,
//       addProductPrice,
//       addProductQuantity,
//       addProductDescription,
//     ].forEach((input) => {
//       input.classList.remove("border-red-500");
//       input.setAttribute("data-invalid", "false");
//     });

//     // Validate name
//     if (!addProductName.value.trim()) {
//       showError(addProductName, errorElements.name, "Product name is required");
//       isValid = false;
//     } else if (!rules.name.test(addProductName.value.trim())) {
//       showError(
//         addProductName,
//         errorElements.name,
//         "Product name must be 2–50 characters, letters, spaces, or hyphens"
//       );
//       isValid = false;
//     }

//     // Validate category
//     if (!validCategories.includes(addProductCategory.value)) {
//       showError(
//         addProductCategory,
//         errorElements.category,
//         "Please select a valid product category"
//       );
//       isValid = false;
//     }

//     // Validate price
//     const priceValue = parseFloat(addProductPrice.value);
//     if (!addProductPrice.value.trim() || isNaN(priceValue) || priceValue <= 0) {
//       showError(
//         addProductPrice,
//         errorElements.price,
//         "Price must be a positive number"
//       );
//       isValid = false;
//     }

//     // Validate quantity
//     const quantityValue = parseInt(addProductQuantity.value);
//     if (
//       !addProductQuantity.value.trim() ||
//       isNaN(quantityValue) ||
//       quantityValue < 0
//     ) {
//       showError(
//         addProductQuantity,
//         errorElements.quantity,
//         "Quantity must be a non-negative number"
//       );
//       isValid = false;
//     }

//     // Validate description (optional)
//     if (
//       addProductDescription.value.trim() &&
//       !rules.description.test(addProductDescription.value.trim())
//     ) {
//       showError(
//         addProductDescription,
//         errorElements.description,
//         "Description must be 500 characters or less"
//       );
//       isValid = false;
//     }

//     // Validate main image
//     if (addProductMainImage.files.length === 0) {
//       showError(
//         addProductMainImage,
//         errorElements.mainImage,
//         "Main product image is required"
//       );
//       isValid = false;
//     } else if (!rules.fileType.test(addProductMainImage.files[0].type)) {
//       showError(
//         addProductMainImage,
//         errorElements.mainImage,
//         "Main image must be an image file"
//       );
//       isValid = false;
//     } else if (addProductMainImage.files[0].size > rules.fileSize) {
//       showError(
//         addProductMainImage,
//         errorElements.mainImage,
//         "Main image must be less than 3MB"
//       );
//       isValid = false;
//     }

//     // Validate secondary images (optional)
//     if (addProductSecondImage.files.length > 0) {
//       if (!rules.fileType.test(addProductSecondImage.files[0].type)) {
//         showError(
//           addProductSecondImage,
//           errorElements.secondImage,
//           "Secondary image must be an image file"
//         );
//         isValid = false;
//       } else if (addProductSecondImage.files[0].size > rules.fileSize) {
//         showError(
//           addProductSecondImage,
//           errorElements.secondImage,
//           "Secondary image must be less than 3MB"
//         );
//         isValid = false;
//       }
//     }
//     if (addProductThirdImage.files.length > 0) {
//       if (!rules.fileType.test(addProductThirdImage.files[0].type)) {
//         showError(
//           addProductThirdImage,
//           errorElements.thirdImage,
//           "Third image must be an image file"
//         );
//         isValid = false;
//       } else if (addProductThirdImage.files[0].size > rules.fileSize) {
//         showError(
//           addProductThirdImage,
//           errorElements.thirdImage,
//           "Third image must be less than 3MB"
//         );
//         isValid = false;
//       }
//     }

//     updatePreviewButtonState();
//     console.log("Form validation result:", isValid); // Debug
//     return isValid;
//   }

//   function showError(input, errorElement, message) {
//     if (input && errorElement && errorElement.tagName === "P") {
//       errorElement.textContent = message;
//       input.classList.add("border-red-500");
//       input.setAttribute("data-invalid", "true");
//     }
//   }

//   // Handle image input for storage
//   function handleImageInput(input, storageKey) {
//     input.addEventListener("input", () => {
//       if (input.files && input.files[0]) {
//         const file = input.files[0];
//         if (!rules.fileType.test(file.type)) {
//           showError(
//             input,
//             errorElements[input.id.replace("addProduct", "").toLowerCase()],
//             "Image must be an image file"
//           );
//           input.value = "";
//           sessionStorage.removeItem(storageKey);
//           validateForm();
//           return;
//         }
//         if (file.size > rules.fileSize) {
//           showError(
//             input,
//             errorElements[input.id.replace("addProduct", "").toLowerCase()],
//             "Image must be less than 3MB"
//           );
//           input.value = "";
//           sessionStorage.removeItem(storageKey);
//           validateForm();
//           return;
//         }
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           sessionStorage.setItem(storageKey, e.target.result);
//           validateForm();
//         };
//         reader.readAsDataURL(file);
//       } else {
//         sessionStorage.removeItem(storageKey);
//         validateForm();
//       }
//     });
//   }

//   // Set up image input handlers
//   handleImageInput(addProductMainImage, "productMainImage");
//   handleImageInput(addProductSecondImage, "productSecondImage");
//   handleImageInput(addProductThirdImage, "productThirdImage");

//   // Real-time validation with debounce
//   [
//     addProductName,
//     addProductCategory,
//     addProductPrice,
//     addProductQuantity,
//     addProductDescription,
//   ].forEach((input) => {
//     input.addEventListener("input", debounce(validateForm, 300));
//   });

//   // Cancel button handler
//   cancelAddingProductBtn.addEventListener("click", () => {
//     productPageMainContent.classList.remove("hidden");
//     addProductsContainer.classList.add("hidden");
//     previewAddedProducts.classList.add("hidden");
//     openAddProductFormDesktop.setAttribute("aria-expanded", "false");
//     openAddProductFormMobile.setAttribute("aria-expanded", "false");
//     addProductsForm.reset();
//     sessionStorage.removeItem("productName");
//     sessionStorage.removeItem("productCategory");
//     sessionStorage.removeItem("productPrice");
//     sessionStorage.removeItem("productQuantity");
//     sessionStorage.removeItem("productDescription");
//     sessionStorage.removeItem("productMainImage");
//     sessionStorage.removeItem("productSecondImage");
//     sessionStorage.removeItem("productThirdImage");
//     validateForm();
//   });

//   // Form submission (Preview Product)
//   addProductsForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("Add product form submitted"); // Debug
//     if (validateForm()) {
//       // Store form data in sessionStorage
//       sessionStorage.setItem("productName", addProductName.value.trim());
//       sessionStorage.setItem("productCategory", addProductCategory.value);
//       sessionStorage.setItem(
//         "productPrice",
//         parseFloat(addProductPrice.value).toFixed(2)
//       );
//       sessionStorage.setItem(
//         "productQuantity",
//         parseInt(addProductQuantity.value)
//       );
//       sessionStorage.setItem(
//         "productDescription",
//         addProductDescription.value.trim()
//       );

//       // Show preview section
//       productPageMainContent.classList.add("hidden");
//       addProductsContainer.classList.add("hidden");
//       previewAddedProducts.classList.remove("hidden");

//       // Populate preview section
//       previewElements.image.src =
//         sessionStorage.getItem("productMainImage") || "";
//       previewElements.secondImage.src =
//         sessionStorage.getItem("productSecondImage") || "";
//       previewElements.thirdImage.src =
//         sessionStorage.getItem("productThirdImage") || "";
//       previewElements.name.textContent =
//         sessionStorage.getItem("productName") || "";
//       previewElements.quantity.textContent =
//         sessionStorage.getItem("productQuantity") || "0";
//       previewElements.category.textContent =
//         sessionStorage.getItem("productCategory") || "";
//       previewElements.price.textContent =
//         sessionStorage.getItem("productPrice") || "0.00";
//       previewElements.description.textContent =
//         sessionStorage.getItem("productDescription") ||
//         "No description provided";
//     }
//   });

//   // Upload product to backend
//   uploadPreviewedProduct.addEventListener("click", async () => {
//     console.log("Uploading product to backend"); // Debug
//     const formData = new FormData();
//     formData.append("name", sessionStorage.getItem("productName"));
//     formData.append("category", sessionStorage.getItem("productCategory"));
//     formData.append(
//       "price",
//       parseFloat(sessionStorage.getItem("productPrice"))
//     );
//     formData.append(
//       "stock",
//       parseInt(sessionStorage.getItem("productQuantity"))
//     );
//     if (sessionStorage.getItem("productDescription")) {
//       formData.append(
//         "description",
//         sessionStorage.getItem("productDescription")
//       );
//     }
//     if (addProductMainImage.files[0]) {
//       formData.append("productImage", addProductMainImage.files[0]);
//     }
//     if (addProductSecondImage.files[0]) {
//       formData.append("productImage", addProductSecondImage.files[0]);
//     }
//     if (addProductThirdImage.files[0]) {
//       formData.append("productImage", addProductThirdImage.files[0]);
//     }

//     try {
//       uploadPreviewedProduct.disabled = true;
//       uploadPreviewedProduct.textContent = "Uploading...";
//       console.time("productUploadRequest"); // Debug

//       // Timeout promise (60 seconds)
//       const timeoutPromise = new Promise((_, reject) => {
//         setTimeout(
//           () => reject(new Error("Request timed out. Please try again.")),
//           60000
//         );
//       });

//       // API call
//       const response = await Promise.race([
//         fetch("https://vendsr-backend.onrender.com/api/product/create", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }),
//         timeoutPromise,
//       ]);
//       console.timeEnd("productUploadRequest"); // Debug

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to upload product");
//       }

//       const data = await response.json();
//       console.log("Product upload success:", data); // Debug

//       // Add new product to list
//       products.unshift(data.product);
//       sessionStorage.setItem("products", JSON.stringify(products));
//       renderProducts();

//       // Show confirmation dialog
//       confirmedProductName.textContent =
//         sessionStorage.getItem("productName") || "";
//       confirmedProductCategory.textContent =
//         sessionStorage.getItem("productCategory") || "";
//       productUploadedConfirmation.showModal();

//       // Clear form and sessionStorage
//       addProductsForm.reset();
//       sessionStorage.removeItem("productName");
//       sessionStorage.removeItem("productCategory");
//       sessionStorage.removeItem("productPrice");
//       sessionStorage.removeItem("productQuantity");
//       sessionStorage.removeItem("productDescription");
//       sessionStorage.removeItem("productMainImage");
//       sessionStorage.removeItem("productSecondImage");
//       sessionStorage.removeItem("productThirdImage");
//       validateForm();
//     } catch (error) {
//       console.error("Product upload failed:", error.message); // Debug
//       showError(
//         addProductMainImage,
//         errorElements.mainImage,
//         error.message.includes("token")
//           ? "Authentication failed. Please sign up or log in."
//           : error.message
//       );
//       if (error.message.includes("token")) {
//         setTimeout(() => {
//           window.location.href = "../sign-up/";
//         }, 2000);
//       }
//     } finally {
//       uploadPreviewedProduct.disabled = false;
//       uploadPreviewedProduct.textContent = "Upload Product";
//     }
//   });

//   // Confirmation dialog navigation
//   addNewProduct.addEventListener("click", () => {
//     productUploadedConfirmation.close();
//     productPageMainContent.classList.add("hidden");
//     addProductsContainer.classList.remove("hidden");
//     previewAddedProducts.classList.add("hidden");
//     openAddProductFormDesktop.setAttribute("aria-expanded", "true");
//     openAddProductFormMobile.setAttribute("aria-expanded", "true");
//   });

//   navigateToProductList.addEventListener("click", () => {
//     productUploadedConfirmation.close();
//     productPageMainContent.classList.remove("hidden");
//     addProductsContainer.classList.add("hidden");
//     previewAddedProducts.classList.add("hidden");
//     openAddProductFormDesktop.setAttribute("aria-expanded", "false");
//     openAddProductFormMobile.setAttribute("aria-expanded", "false");
//   });

//   // Initialize product grid
//   if (products.length === 0) {
//     fetchProducts();
//   } else {
//     renderProducts();
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  console.log("dashboard.js loaded"); // Debug: Confirm script loads

  // Check for email and token in sessionStorage
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const storeName = sessionStorage.getItem("storeName");
  const addProductNameError = document.getElementById("addProductNameError");
  const userStoreName = document.getElementById("userStoreName");

  // Populate userStoreName
  if (userStoreName) {
    userStoreName.textContent = storeName || "Unknown Store";
    console.log("Store name from sessionStorage:", storeName); // Debug
  } else {
    console.warn("Element with id 'userStoreName' not found in DOM"); // Debug
  }

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

  // Product Grid Elements
  const productGrid = document.getElementById(
    "productDisplayContainerOfMaximumTwentyProducts"
  );
  const numberOfCurrentProductsShown = document.getElementById(
    "numberOfCurrentProductsShown"
  );
  const totalNumberOfProducts = document.getElementById(
    "totalNumberOfProducts"
  );

  // Filter Buttons
  const filterByNameBtn = document.getElementById("filterProductsByName");
  const filterByPriceBtn = document.getElementById("filterByPrice");
  const filterByInStockBtn = document.getElementById("filterByInStock");

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

  // Product list state
  let products = JSON.parse(sessionStorage.getItem("products")) || [];

  // Debounce function for real-time validation
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Render product grid
  function renderProducts(productList = products) {
    productGrid.innerHTML = ""; // Clear grid
    const displayProducts = productList.slice(0, 20); // Limit to 20
    displayProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "rounded-lg text-sm";
      productDiv.innerHTML = `
        <img src="${product.imageUrl[0] || ""}" alt="${
        product.name
      }" class="rounded-lg mb-4 w-full aspect-square object-cover" />
        <div class="flex items-start justify-between">
          <p>${product.name}</p>
          <button class="cursor-pointer">
            <img src="../../assets/icons/vertical-dots-menu.png" class="w-4 h-4" />
          </button>
        </div>
        <div class="flex flex-col mt-2">
          <span>₦<span class="text-gray-400 mb-2">${product.price.toFixed(
            2
          )}</span></span>
          <div class="flex flex-row gap-1 items-center">
            <span class="w-2 h-2 rounded-full ${
              product.stock > 0 ? "bg-green-500" : "bg-red-500"
            }"></span>
            <p class="text-gray-500">${product.stock} in stock</p>
          </div>
        </div>
      `;
      productGrid.appendChild(productDiv);
    });

    // Update counts
    const shownCount = displayProducts.length;
    numberOfCurrentProductsShown.textContent = `1–${shownCount}`;
    totalNumberOfProducts.textContent = productList.length;
  }

  // Fetch products from backend API
  async function fetchProducts() {
    try {
      console.time("fetchProductsRequest"); // Debug
      // Timeout promise (60 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Request timed out. Please try again.")),
          60000
        );
      });
      const response = await Promise.race([
        fetch("https://vendsr-backend.onrender.com/api/stores/my-store", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        timeoutPromise,
      ]);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }
      const data = await response.json();
      products = data.store.products || [];
      sessionStorage.setItem("products", JSON.stringify(products));
      renderProducts();
      console.log("Fetched products:", products); // Debug
    } catch (error) {
      console.error("Fetch products failed:", error.message); // Debug
      if (addProductNameError) {
        addProductNameError.textContent = error.message.includes("token")
          ? "Authentication failed. Please sign up or log in."
          : "Failed to load products. Please try again.";
      }
      if (error.message.includes("token")) {
        setTimeout(() => {
          window.location.href = "../sign-up/";
        }, 2000);
      }
    } finally {
      console.timeEnd("fetchProductsRequest"); // Debug
    }
  }

  // Sort products by filter
  function sortProducts(criterion) {
    const sortedProducts = [...products];
    if (criterion === "name") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name)); // Z–A
    } else if (criterion === "price") {
      sortedProducts.sort((b, a) => a.price - b.price); // High–low
    } else if (criterion === "stock") {
      sortedProducts.sort((b, a) => a.stock - b.stock); // High–low
    }
    renderProducts(sortedProducts);
  }

  // Filter button handlers
  filterByNameBtn.addEventListener("click", () => {
    filterByNameBtn.setAttribute("aria-expanded", "true");
    filterByPriceBtn.setAttribute("aria-expanded", "false");
    filterByInStockBtn.setAttribute("aria-expanded", "false");
    sortProducts("name");
  });

  filterByPriceBtn.addEventListener("click", () => {
    filterByNameBtn.setAttribute("aria-expanded", "false");
    filterByPriceBtn.setAttribute("aria-expanded", "true");
    filterByInStockBtn.setAttribute("aria-expanded", "false");
    sortProducts("price");
  });

  filterByInStockBtn.addEventListener("click", () => {
    filterByNameBtn.setAttribute("aria-expanded", "false");
    filterByPriceBtn.setAttribute("aria-expanded", "false");
    filterByInStockBtn.setAttribute("aria-expanded", "true");
    sortProducts("stock");
  });

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

      // Add new product to list
      products.unshift(data.product);
      sessionStorage.setItem("products", JSON.stringify(products));
      renderProducts();

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

  // Initialize product grid
  if (products.length === 0) {
    fetchProducts();
  } else {
    renderProducts();
  }
});
