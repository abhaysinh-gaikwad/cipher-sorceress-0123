const fetchbtn = document.getElementById("fetchbtn");
const logoutbtn = document.getElementById("logoutbtn");
const logoutuser = document.getElementById("logout");

logoutuser.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
const typingbtn =document.getElementById("typingbtn");

const fetchcodes = () => {
  fetch("http://localhost:4000/code", {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // displayNotes(data.notes);
      console.log(data);
    })
    .catch((err) => console.log(err));
};

fetchbtn.addEventListener("click", () => {
  fetchcodes();
});

logoutbtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

// Function to log out the user
async function logout() {
  try {
    // Make a POST request to the logout endpoint
    const response = await fetch("http://localhost:4000/users/logout", {
      method: "GET", // or 'POST' depending on how your backend is configured
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (response.status === 200) {
      // Remove token from localStorage or any other cleanup you need to do
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      // Redirect or perform any other action after successful logout
      window.location.href = "../home_page/index.html"; // Redirect to login page
    } else {
      // Handle error response from the server
      const responseData = await response.json();
      console.error("Logout failed:", responseData.msg);
      // You can display an error message or handle the error in any other way
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
    // Handle unexpected errors
  }
}

typingbtn.addEventListener('click', () => {
  window.location.href ="../typing_speed/typing.html";
})
