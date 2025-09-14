
      const products = [
        {
          id: 1,
          name: "Elegant Women's Dress",
          price: 180000,
          img: "../../assets/images/portrait-happy-woman-holding-her-shopping-bags.png",
          inStock: true,
          quantity: 1,
        },
        {
          id: 2,
          name: "Stylish Men's Jacket",
          price: 250000,
          img: "../../assets/images/portrait-happy-woman-holding-her-shopping-bags.png",
          inStock: true,
          quantity: 1,
        },
      ];

      const cartContainer = document.getElementById("cart-container");

      function renderCart() {
        if (products.length === 0) {
          cartContainer.innerHTML = `
        <div class="w-full text-center py-12 text-xl font-semibold text-gray-500">
          Your cart is empty 🛒
        </div>`;
          return;
        }

        const productList = `
      <div class="md:w-1/2 flex flex-col gap-8">
        ${products
          .map(
            (p) => `
          <div class="flex flex-row justify-between border border-gray-300 rounded-lg px-4 py-4 md:px-6 md:py-8 select-none">
            <div class="flex flex-row gap-4">
              <img class="w-18 h-18" src="${p.img}">
              <div class="space-y-1">
                <h2 class="font-semibold text-[14px] md:text-[19px] ">${
                  p.name
                }</h2>
                <p class="text-sm">${
                  p.inStock ? "In Stock" : "Out of Stock"
                }</p>
                <button onclick="removeProduct(${p.id})" 
                class="text-sm text-red-500 hover:underline">Remove</button>
              </div>
            </div>
            <div class="space-y-4">
              <h2 class="font-bold text-[14px] md:text-[19px] text-center">
                N${(p.price * p.quantity).toLocaleString()}
              </h2>
              <div class="flex flex-row gap-4 items-center">
                <button onclick="updateQuantity(${p.id}, -1)" 
                        class="text-white w-6 h-6 bg-gray-300 rounded-md select-none">-</button>
                <p id="quantity-${p.id}" 
                   class="w-8 text-center">${p.quantity}</p>
                <button onclick="updateQuantity(${p.id}, 1)" 
                        class="text-white w-6 h-6 bg-primary rounded-md select-none">+</button>
              </div>
            </div>
          </div>
        `
          )
          .join("")}

  <div id = 'fillForm' class="w-full max-w-xl mx-auto flex flex-col gap-6 md:mt-20 border-t border-gray-200 pt-4">

  <!-- Section Title -->
  <h2 class="text-xl font-semibold">continue with</h2>

  <!-- Address -->
  <div class="flex flex-col gap-4">
    <label class="flex items-center gap-3 cursor-pointer">
      <input type="radio" name="addressType" value="home" class="hidden peer">
      <span class="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center peer-checked:bg-primary">
        <svg class="w-3 h-3 text-white hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.414a1 1 0 011.414-1.414l3.222 3.222 6.657-6.657a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </span>
      <span>Home Address</span>
    </label>

    <label class="flex items-center gap-3 cursor-pointer">
      <input type="radio" name="addressType" value="office" class="hidden peer">
      <span class="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center peer-checked:bg-primary">
        <svg class="w-3 h-3 text-white hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.414a1 1 0 011.414-1.414l3.222 3.222 6.657-6.657a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </span>
      <span>Office Address</span>
    </label>
  </div>

  <!-- Input Fields -->
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2 ">
      <label class="font-medium">Full Name</label>
      <input type="text" placeholder="Enter your full name" 
             class="bg-bodyBackground px-4 py-2  rounded-md text-gray-500">
    </div>

    <div class="flex flex-col gap-2">
      <label class="font-medium">Email Address</label>
      <input type="email" placeholder="Enter your email address" 
             class="bg-bodyBackground px-4 py-2  rounded-md text-gray-500">
    </div>

    <div class="flex flex-col gap-2">
      <label class="font-medium">Phone Number</label>
      <input type="tel" placeholder="Enter your phone number" 
             class="bg-bodyBackground px-4 py-2 rounded-md text-gray-500">
    </div>

    <div class="flex flex-col gap-2">
      <label class="font-medium">Delivery Address</label>
      <input type="text" placeholder="Enter your delivery address" 
             class="bg-bodyBackground px-4 py-2 rounded-md text-gray-500">
    </div>

    <div class="flex flex-col gap-2">
      <label class="font-medium">Landmark</label>
      <input type="text" placeholder="Nearest landmark" 
             class="bg-bodyBackground px-4 py-2 rounded-md text-gray-500">
    </div>

    <div class="flex flex-col gap-2">
      <label class="font-medium">City / State</label>
      <input type="text" placeholder="Enter your city/state" 
             class="bg-bodyBackground px-4 py-2 rounded-md text-gray-500">
    </div>

    <div class="flex flex-col gap-2">
      <label class="font-medium">Additional Notes</label>
      <input type="text" placeholder="Additional Notes" 
             class="bg-bodyBackground px-4 py-2 rounded-md text-gray-500">
    </div>
  </div>
</div>

      </div>
    `;

        const subtotal = products.reduce(
          (sum, p) => sum + p.price * p.quantity,
          0
        );
        const discount = subtotal * 0.2;
        const total = subtotal - discount;

        const summary = `
      <div class="md:w-1/2 md:h-[24vw] h-fit">
        <div class="flex flex-col justify-between border border-gray-300 h-full rounded-lg px-4 py-4 md:text-xl text-1xl md:gap-1 gap-4 select-none">
          <h2 class="font-semibold text-2xl">Cart Summary</h2>
          <div class="flex flex-row justify-between">
            <p class="text-gray-500">Subtotal</p>
            <p id="subtotal" class="font-bold">N${subtotal.toLocaleString()}</p>
          </div>
          <div class="flex flex-row justify-between">
            <p class="text-gray-500">Discount (-20%)</p>
            <p id="discount" class="font-bold text-red-500">-N${discount.toLocaleString()}</p>
          </div>
          <div class="flex flex-row justify-between border-t border-gray-400 pt-4">
            <p class="text-gray-600">Total</p>
            <p class="font-bold">N${total.toLocaleString()}</p>
          </div>
          <div  id = "checkoutButton">
            <button class="bg-primary w-full cursor-pointer rounded-full text-white text-xl py-4 my-2">Checkout</button>
          </div>
        </div>
      </div>
    `;

        cartContainer.innerHTML = productList + summary;
      }

      function updateQuantity(id, change) {
        const product = products.find((p) => p.id === id);
        if (!product) return;
        product.quantity = Math.max(1, product.quantity + change);
        renderCart();
      }

      function removeProduct(id) {
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
          products.splice(index, 1);
          renderCart();
        }
      }

      renderCart();

      document.addEventListener("DOMContentLoaded", () => {
        const similarProductHtml = document.querySelector("#similarProducts");

        //Remember to  Replace dummy holder data below with the API
        let similarProducts = [
          {
            name: "first item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "second item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "third item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "fourth item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "first item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "second item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "third item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "fourth item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "first item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "second item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "third item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
          {
            name: "fourth item",
            src: "../../assets/images/smiley-african-woman-working-market.png",
          },
        ];

        similarProducts.forEach((item, index) => {
          let itemName = item.name;
          let itemSrc = item.src;

          similarProductHtml.innerHTML += `
      <li class="px-2 rounded-sm" id = "item1">
        <img src="${itemSrc}" class="" alt="" >
        <p class="py-2 text-[12px] md:text-[14px] text-center">${itemName}</p>
      </li> 
      `;
        });

        const checkoutButton = document.getElementById("checkoutButton");
        const fillform = document.getElementById("fillForm");

        checkoutButton.addEventListener("click", () => {
          fillform.innerHTML = `

    <h2 class="text-xl font-semibold">Payment</h2>
    <!-- Payment Options -->
    <div class="flex flex-col gap-4">
      <label class="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="paymentType" value="card" class="hidden peer">
        <span class="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center peer-checked:bg-primary">
          <svg class="w-3 h-3 text-white hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.414a1 1 0 011.414-1.414l3.222 3.222 6.657-6.657a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </span>
        <span>Debit or Credit Card</span>
      </label>

      <label class="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="paymentType" value="transfer" class="hidden peer">
        <span class="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center peer-checked:bg-primary">
          <svg class="w-3 h-3 text-white hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.414a1 1 0 011.414-1.414l3.222 3.222 6.657-6.657a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </span>
        <span>Pay with Transfer</span>
      </label>
    </div>

    <!-- Payment Inputs -->
    <div class="flex flex-col gap-8 mt-6">
      <div class="relative">
        <img src="../../assets/images/portrait-happy-woman-holding-her-shopping-bags.png" class="absolute left-3 top-2 w-5 h-5">
        <input type="text" name = "cardNumber" placeholder="Card Number" 
          class="pl-10 pr-4 py-2 border border-gray-400 rounded-md w-full">
      </div>

      <div class="relative">
        <img src="../../assets/images/portrait-happy-woman-holding-her-shopping-bags.png" class="absolute left-3 top-2 w-5 h-5">
        <input type="text"  placeholder="Expiry Date (MM/YY)" 
          class="pl-10 pr-4 py-2 border border-gray-400 rounded-md w-full">
      </div>

      <div class="relative">
        <img src="../../assets/images/portrait-happy-woman-holding-her-shopping-bags.png" class="absolute left-3 top-2 w-5 h-5">
        <input type="text" placeholder="CVV" 
          class="pl-10 pr-4 py-2 border border-gray-400 rounded-md w-full">
      </div>

      <div class="relative">
        <img src="../../assets/images/portrait-happy-woman-holding-her-shopping-bags.png" class="absolute left-3 top-2 w-5 h-5">
        <input type="text" placeholder="Name on Card" 
          class="pl-10 pr-4 py-2 border border-gray-400 rounded-md w-full">
      </div>
    </div>
    `;
          checkoutButton.innerHTML = `<button id = "PlaceButton" class="w-full h-full py-4 bg-primary cursor-pointer rounded-full text-white text-xl">Place Order</button>`;

          let placeButton = document.getElementById("PlaceButton");

          placeButton.addEventListener("click", () => {
            console.log("lop");
            let overlay = document.creatElement();
          });
        });
      });
