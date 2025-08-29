
  document.addEventListener("DOMContentLoaded", ()=>{
            
    const availpro = document.querySelector("#availableProducts")
    const popularstores = document.querySelector("#popularstores")

    //Remember to  Replace dummy holder data below with the API
    let availlist = [
      {name: "first item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "second item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "third item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "fourth item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "first item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "second item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "third item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "fourth item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "first item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "second item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "third item", src: "../../assets/images/smiley-african-woman-working-market.png"},
      {name: "fourth item", src: "../../assets/images/smiley-african-woman-working-market.png"},
    ]

    availlist.forEach((item, index) =>{
      let itemName = item.name
      let itemSrc = item.src

      availpro.innerHTML +=
        `
        <li class="px-2 md:px-8" id = "item1">
          <img src="${itemSrc}" class=" rounded-[30px]" alt="" >
          <p class="py-2 text-[14px] md:text-[14px] text-center">${itemName}</p>
        </li> 
        `
    }) 
  })
