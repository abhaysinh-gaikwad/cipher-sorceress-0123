const fetchbtn = document.getElementById("fetchbtn");
const logoutbtn = document.getElementById("logoutbtn");
const logoutuser = document.getElementById("logout");
const profileName = document.getElementById("profile-name");

logoutuser.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

// Function to log out the user
async function logout() {
  try {
    // Make a POST request to the logout endpoint
    const response = await fetch("https://codecollab-backend-12un.onrender.com/users/logout", {
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

const fetchCodes = () => {
  fetch("https://codecollab-backend-12un.onrender.com/code", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      appendProducts(data.code);
    })
    .catch((err) => console.log(err));
};

fetchCodes();

function appendProducts(products) {
  let cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear previous cards
  profileName.innerHTML = localStorage.getItem("username");
  products.forEach((product, index) => {
    let card = createCard(product, index + 1); // Add 1 to index for 1-based numbering
    cardContainer.appendChild(card);
  });
}

function createCard(product, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  // const img = document.createElement('img');

  // if (product.imageUrl) {
  //   img.src = product.imageUrl;
  //   img.alt = product.name;
  // } else {
  //   img.src = 'placeholder_image_url.jpg';
  //   img.alt = 'Placeholder Image';
  // }

  const title = document.createElement("h2");
  title.textContent = `${product.filename}`; // Set title as "Pen 1", "Pen 2", and so on

  const htmlCode = document.createElement("p");
  htmlCode.textContent = product.htmlcode;

  const cssCode = document.createElement("p");
  cssCode.textContent = product.csscode;

  const jsCode = document.createElement("p");
  jsCode.textContent = product.jscode;

  const btndiv = document.createElement("div");
  btndiv.classList.add("button-div");

  const buttonEdit = document.createElement("button");
  buttonEdit.className = "button";
  buttonEdit.innerText = "Edit";

  buttonEdit.addEventListener("click", () => {
    // Redirect to edit page with the code ID or any necessary details
    console.log(product);
    localStorage.setItem("htmlcode", product.htmlcode);
    localStorage.setItem("csscode", product.csscode);
    localStorage.setItem("jscode", product.jscode);
    localStorage.setItem("filename", product.filename);
    localStorage.setItem("codeid", product._id);
    window.location.href = `../Code_Editor_ForPatch/editor.html`;
  });

  const buttonDelete = document.createElement("button");
  buttonDelete.className = "button";
  buttonDelete.innerText = "Delete";
  buttonDelete.addEventListener("click", () => {
    // Call function to delete code by ID
    deleteCode(product._id);
  });
  btndiv.append(buttonEdit, buttonDelete);
  card.append(title, btndiv);

  return card;
}

function deleteCode(codeId) {
  fetch(`https://codecollab-backend-12un.onrender.com/code/${codeId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // alert(data.msg);
      fetchCodes(); // Refresh notes after deletion
    })
    .catch((err) => console.log(err));
}
