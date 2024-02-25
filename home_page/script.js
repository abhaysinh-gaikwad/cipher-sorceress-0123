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

