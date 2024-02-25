const container = document.querySelector(".container");
const LoginLink = document.querySelector(".SignInLink");
const RegisterLink = document.querySelector(".SignUpLink");
const loginbtn = document.getElementById("loginbtn");

RegisterLink.addEventListener("click", () => {
  container.classList.add("active");
});

LoginLink.addEventListener("click", () => {
  container.classList.remove("active");
});

const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
  window.location.href = "../home_page/index.html";
});

const handleRegistration = async () => {
  let userName = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  let signin = document.querySelector("SignInLink");
  // Regular expression to validate email format and domain
  const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com)$/i;

  // Check if any of the fields are blank
  if (!userName || !email || !pass) {
    alert("Please fill in all the details.");
    return; // Stop execution if any field is blank
  }

  // Check if email format and domain are valid
  if (!emailRegex.test(email)) {
    alert("Invalid email format or domain not allowed.");
    return;
  }

  // Check if password is at least 8 characters long
  if (pass.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  const payload = {
    userName,
    email,
    pass,
  };

  try {
    const response = await fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      // Successful registration
      const data = await response.json();
      console.log(data);

      alert("User Successfully Registered");
      if (data) {
        // window.location.href = "register.html";
        container.classList.remove("active");
      }
    } else if (response.status === 400) {
      // User already registered
      const { msg } = await response.json();
      alert(msg);
    } else {
      // Other errors
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error(error);
    alert("Error in user registration. Please try again later.");
  }
};

// Function to show login success popup
function showLoginSuccessPopup(username) {
  const modal = document.getElementById("loginSuccessModal");
  const message = document.getElementById("loginSuccessMessage");
  message.innerText = `Login successful. Welcome, ${username}!`;
  modal.style.display = "block";
  setTimeout(() => {
    modal.style.display = "none";
  }, 3000); // Close the popup after 3 seconds
}

const handleLogin = async () => {
  const email = document.getElementById("Email").value;
  const pass = document.getElementById("password").value;
  const payload = { email, pass };

  try {
    const response = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.status === 200) {
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

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin();
});