

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


// signup js

// const handleRegistration =() =>{
//     let userName =document.getElementById("userName").value
//     let email =document.getElementById("email").value
//     let pass =document.getElementById("pass").value
//     const payload ={
//         userName,
//         email,
//         pass
//     }
//     console.log(payload)

//     fetch("http://localhost:4000/users/register",{
//         method:"POST",
//         headers:{
//             "Content-type":"application/json"
//         },
//         body:JSON.stringify(payload)
//     }).then(res =>res.json())
//     .then(data =>console.log(data))
//     .catch(err => console.log(err))

//     setTimeout(()=>{
//     window.location.href ="register.html"
//    },3000)

// }


const handleRegistration = async () => {
    let userName = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    // Check if any of the fields are blank
    if (!userName || !email || !pass) {
        alert("Please fill in all the details.");
        return; // Stop execution if any field is blank
    }

    const payload = {
        userName,
        email,
        pass
    };

    try {
        const response = await fetch("http://localhost:4000/users/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Successful registration
            const data = await response.json();
            console.log(data);
            // Redirect to another page after 3 seconds
            window.location.href = "register.html";
        } else if (response.status === 400) {
            // User already registered
            throw new Error("User already registered");
        } else {
            // Other errors
            throw new Error("Registration failed");
        }
    } catch (error) {
        alert(error.message); // Display relevant error message
    }
};




// login

// const handleLogin = () => {
//     let email = document.getElementById("Email").value;
//     let pass = document.getElementById("password").value;
//     const payload = {
//         email,
//         pass
//     };

//     fetch('http://localhost:4000/users//login', {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         localStorage.setItem("token", data.token);
//     })
//     .catch(err => console.log(err));

//     setTimeout(() => {
//         window.location.href = "index.html";
//     }, 3000);
// }

// Function to show login success popup
function showLoginSuccessPopup(username) {
    const modal = document.getElementById("loginSuccessModal");
    const message = document.getElementById("loginSuccessMessage");
    message.innerText = `Login successful. Welcome, ${username}!`;

    modal.style.display = "block";
    setTimeout(() => {
        modal.style.display = "none";
    }, 10000); // Close the popup after 3 seconds
}


const handleLogin = async () => {
    const email = document.getElementById("Email").value;
    const pass = document.getElementById("password").value;
    const payload = { email, pass };

    try {
        const response = await fetch('http://localhost:4000/users/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();

        if (response.ok) {
            // Successful login
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            showLoginSuccessPopup(data.username);
            setTimeout(() => {
                window.location.href = "../home_page/index.html";
            }, 3000);
        } else {
            // Failed login
            if (response.status === 400) {
                alert(data.msg); // Display error message from server
            } else if (response.status === 401) {
                alert("Wrong password."); // Incorrect password
            } else {
                alert("Login failed. Please try again."); // Other errors
            }
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while processing your request.");
    }
};
