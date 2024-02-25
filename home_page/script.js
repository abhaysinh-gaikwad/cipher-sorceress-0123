const { set } = require("mongoose");

const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
  window.location.href = "../home_page/index.html";
});


document.addEventListener("DOMContentLoaded", function() {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("token") !== null;

  // Select the element with class "register" which contains the login link
  const loginLink = document.querySelector(".register a");

  if (isLoggedIn) {
      // Get the username from localStorage
      const username = localStorage.getItem("username");

      // If the username exists, change the text to the username
      if (username) {
          loginLink.textContent = username;
      } else {
          // If the username doesn't exist, keep the text as "Login"
          loginLink.textContent = "Login";
      }

      // Redirect user to profile page when clicking on username button
      loginLink.addEventListener("click", (event) => {
          event.preventDefault(); // Prevent default anchor tag behavior
          window.location.href = "../newProfile_page/profile.html";
      });
  } else {
      // If the user is not logged in, keep the text as "Login"
      loginLink.textContent = "Login";
  }
});


document.getElementById('admin-button').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('submitCode').addEventListener('click', function() {
    const secretCode = document.getElementById('secretCode').value;

    if (secretCode === 'YOUR_SECRET_CODE') {

        alert('Admin validated!');
        setTimeout(() => {
            window.location.href = "../admin/signup.html";
        }, 8000);
       
    } else {
        alert('Invalid secret code. Please try again.');
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
});
