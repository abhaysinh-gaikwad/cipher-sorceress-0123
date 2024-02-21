

const container = document.querySelector(".container");
const LoginLink  = document.querySelector(".SignInLink");
const RegisterLink = document.querySelector(".SignUpLink");

RegisterLink.addEventListener("click", ()=>{
    container.classList.add("active");
})

LoginLink.addEventListener("click", ()=>{
    container.classList.remove("active");
})


const logo = document.querySelector(".logo");

logo.addEventListener("click", ()=>{

    window.location.href = "../home_page/index.html";
})
