const reviews = [
  {
    name: "Sophia Carter",
    avatar: "../../assets/images/Felicity.png",
    timeAgo: "2 weeks ago",
    text: "This dress is absolutely stunning! The fabric is high quality and it fits perfectly. I received so many compliments when I wore it to my friend's wedding.",
    rating: 5,
  },
  {
    name: "Emma Johnson",
    avatar: "../../assets/images/Felicity.png",
    timeAgo: "3 weeks ago",
    text: "Beautiful dress, but it runs a bit small. I would recommend sizing up. The material is comfortable and the design is elegant.",
    rating: 4,
  },
  {
    name: "Olivia Martinez",
    avatar: "../../assets/images/Felicity.png",
    timeAgo: "1 month ago",
    text: "This dress exceeded my expectations! The stitching is perfect and it drapes beautifully. I'll definitely be purchasing more colors.",
    rating: 5,
  },
];

const ul = document.getElementById("productReviews");

reviews.forEach((r) => {
  ul.innerHTML += `
      <li class="w-full">
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex flex-row gap-3 items-center mb-3">
            <img class="w-11 h-11 rounded-full" src="${r.avatar}">
            <div>
              <p class="text-gray-900 font-medium">${r.name}</p>
              <p class="text-sm text-gray-600">${r.timeAgo}</p>
            </div>
          </div>
          <p class="text-gray-600 text-sm mb-3">${r.text}</p>
          <p class="text-yellow-500">${"⭐".repeat(r.rating)}</p>
        </div>
      </li>
    `;
});

const products = [
  {
    title: "Elegant Women's Dress",
    desc: "A stylish and comfortable dress, perfect for any occasion. Made with high-quality fabric, it offers a flattering fit and timeless elegance.",
    price: "₦180,000",
    img: "../../assets/images/smiley-african-woman-working-market.png",
    rating: "4.5",
    sizes: ["Small", "Medium", "Large"],
    colors: ["red", "yellow", "blue", "green", "orange"],
  },
];

const section = document.getElementById("productSection");

products.forEach((p, index) => {
  section.innerHTML += `
      <div class="flex flex-col md:flex-row md:gap-8 w-full md:mb-16">
        <div class="md:w-1/2 relative mb-6 md:mb-0">
          <img src="${p.img}" alt="${p.title}" class="w-full rounded-lg">
          <button class="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md cursor-pointer">
            <img src="../../assets/icons/shop.png" alt="View shop" class="h-5 w-5">
          </button>
          <p class="absolute bottom-4 left-4 bg-white rounded-full px-4 py-1 cursor-pointer text-sm font-medium shadow-md">In Stock</p>
        </div>

        <div class="md:w-1/2">
          <div class="md:w-[90%] gap-6 flex flex-col justify-between">
            <h1 class="font-bold text-2xl md:text-3xl">${p.title}</h1>
            <p class="text-gray-600 md:text-lg">${p.desc}</p>
            
            <div class="flex items-center gap-2">
              <img src="../../assets/icons/Verified.png" alt="Rating" class="h-5 w-5">
              <p class="font-medium">${p.rating}</p>
            </div>
            
            <div>
              <p class="py-2 text-gray-700 font-medium">Size</p>
              <form class="flex gap-2 text-sm md:text-base">
                ${p.sizes
                  .map(
                    (size) => `
                  <label class="cursor-pointer">
                    <input type="radio" name="size${index}" value="${size}" class="hidden peer">
                    <span class="px-3 py-1.5 border border-gray-400 rounded-md peer-checked:bg-bodyBackground peer-checked:text-primary peer-checked:border-primary">${size}</span>
                  </label>
                `
                  )
                  .join("")}
              </form>
            </div>
            
            <div>
              <p class="text-gray-500 py-2 font-medium">Color</p>
              <form class="flex gap-3">
                ${p.colors
                  .map(
                    (c) => `
                  <label class="cursor-pointer">
                    <input type="radio" name="color${index}" value="${c}" class="hidden peer">
                    <span class="bg-${c}-500 w-6 h-6 block rounded-full peer-checked:border-primary peer-checked:border-2"></span>
                  </label>
                `
                  )
                  .join("")}
              </form>
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-gray-500 font-medium">Quantity</p>
              <div class="flex items-center gap-4">
                <button class="qty-btn rounded-md w-7 h-7 bg-gray-300 text-white cursor-pointer flex items-center justify-center" data-type="minus">-</button>
                <p class="font-medium qty-count">1</p>
                <button class="qty-btn rounded-md w-7 h-7 bg-primary text-white cursor-pointer flex items-center justify-center" data-type="plus">+</button>
              </div>
              <h3 class="text-2xl font-bold my-2">${p.price}</h3>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between md:justify-start gap-4">
              <button class="bg-primary py-3 w-full md:w-[45%] rounded-full text-white font-semibold cursor-pointer">Add to Cart</button>
              <button class="w-full md:w-[45%] py-3 rounded-full border border-primary font-semibold cursor-pointer text-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    `;
});

// Counter logic
section.addEventListener("click", (e) => {
  if (e.target.classList.contains("qty-btn")) {
    const parent = e.target.closest("div");
    const countEl = parent.querySelector(".qty-count");
    let count = parseInt(countEl.textContent);

    if (e.target.dataset.type === "plus") count++;
    if (e.target.dataset.type === "minus" && count > 1) count--;

    countEl.textContent = count;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const availpro = document.querySelector("#availableProducts");
  const popularstores = document.querySelector("#popularstores");

  //Remember to  Replace dummy holder data below with the API
  let availlist = [
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

  availlist.forEach((item, index) => {
    let itemName = item.name;
    let itemSrc = item.src;

    availpro.innerHTML += `
      <li class="px-2 rounded-sm" id = "item1">
        <img src="${itemSrc}" class="" alt="" >
        <p class="py-2 text-[12px] md:text-[14px] text-center">${itemName}</p>
      </li> 
      `;
  });
});
