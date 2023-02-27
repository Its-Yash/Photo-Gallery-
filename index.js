const btnEl = document.getElementById("btn")
const errorMessageEl = document.getElementById("errorMessage")
const galleryEL = document.getElementById("galery")

async function fetchImage(){
    const inputValue = document.getElementById("input").value;

    if(inputValue > 10 || inputValue < 1){
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "Numer Should be between 0 and 11"
        return
    }

    imgs = ""

    try { 
        btnEl.style.display = "none";
        const loading = `<img src="spinner.svg" />`;
        galleryEL.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=kEUm5vLMsvlV6vMMgsAU2rUbI4eHx_Y7yhDLH_Ax_Gw`).then(
        (res) =>
             res.json().then((data) => {
                if(data){
                    data.forEach((pic)=>{
                        imgs += `
                        <img src=${pic.urls.small} alt="img"/>
                        `;
                        galleryEL.style.display = "block"
                        galleryEL.innerHTML = imgs;
                        btnEl.style.display = "block"
                        errorMessageEl.style.display = "none"
                    })
                }
             })
        );    
    } catch (error) {
        errorMessageEl.style.display = "block"
        errorMessageEl.ATTRIBUTE_NODE.innerText = "An error occured, try again later"
        btnEl.style.display = "block"
        galleryEL.style.display = "none"
    }
   
}


btnEl.addEventListener("click", fetchImage)