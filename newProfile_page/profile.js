const fetchbtn = document.getElementById("fetchbtn");
const logoutbtn = document.getElementById("logoutbtn");
const logoutuser = document.getElementById("logout");
const typingbtn =document.getElementById("typingbtn");

logoutuser.addEventListener("click", (e) => {
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
      window.location.href = "../home_page/index.html"; // Redirect to home page
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

logoutbtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});


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



typingbtn.addEventListener('click', () => {
  window.location.href ="../typing_speed/typing.html";
})


document.addEventListener('DOMContentLoaded', async () => {
  const userId = localStorage.getItem('userId');
  const response = await fetch(`http://localhost:4000/code?userId=${userId}`);
  const codeData = await response.json();

  const codeContainer = document.querySelector('.card');
  codeContainer.innerHTML = ''; // Clear existing code cards

  codeData.forEach(code => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <h2>${code.title}</h2>
          <p>${code.content}</p>
          <div class="card-actions">
              <button class="edit-btn" data-id="${code._id}">Edit</button>
              <button class="delete-btn" data-id="${code._id}">Delete</button>
          </div>
      `;
      codeContainer.appendChild(card);
  });

  // Logout button click handler
  document.getElementById('logoutbtn').addEventListener('click', () => {
      localStorage.clear();
      window.location.href = '../home_page/index.html';
  });

  // Edit button click handler
  document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', () => {
          const codeId = button.dataset.id;
          localStorage.setItem('editCodeId', codeId);
          window.location.href = '../codeeditor.html';
      });
  });

  // Delete button click handler
  document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async () => {
          const codeId = button.dataset.id;
          const confirmation = confirm('Are you sure you want to delete this code?');
          if (confirmation) {
              await fetch(`http://localhost:4000/code/${codeId}`, {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ userId })
              });
              window.location.reload();
          }
      });
  });
});
