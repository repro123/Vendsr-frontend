

document.addEventListener("DOMContentLoaded", ()=>{

  let data = []

  fetch("https://github.com/repro123/Vendsr-frontend", {
    method: "POST",
  }
  .then(res => res.son())
  .then(res => {
    data  = res
  })
)

          
  const availpro = document.querySelector("#availableProducts")
  const popularstores = document.querySelector("#popularstores")
  console.log(data)


  
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

  let popStores = [
    {name: "Benard grocery", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Chic Boutique", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Umble gold", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Benard grocery", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Benard grocery", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Chic Boutique", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Umble gold", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Benard grocery", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Benard grocery", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Chic Boutique", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Umble gold", src: "../../assets/images/smiley-african-woman-working-market.png"},
    {name: "Benard grocery", src: "../../assets/images/smiley-african-woman-working-market.png"},
  ]

  availlist.forEach((item, index) =>{
    let itemName = item.name
    let itemSrc = item.src

    availpro.innerHTML +=
      `
      <li class="px-2 rounded-sm" id = "item1">
        <img src="${itemSrc}" class="" alt="" >
        <p class="py-2 text-[12px] md:text-[14px] text-center">${itemName}</p>
      </li> 
      `
  }) 

  popStores.forEach((item, index) =>{
    let itemName = item.name
    let itemSrc = item.src


    popularstores.innerHTML +=
      `
      <li class="px-2 rounded-sm" id = "item1">
        <img src="${itemSrc}" class="rounded-[18px]" alt="" >
        <p class="pt-1 md:pt-2 pb-5 text-[13px] md:text-[16px] text-center">${itemName}</p>
      </li> 
      `
  })

})
