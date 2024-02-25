const fetchbtn = document.getElementById("fetchbtn");
const logoutbtn = document.getElementById("logoutbtn");
const logoutuser = document.getElementById("logout");
const typingbtn =document.getElementById("typingbtn");
const mainBoxPen = document.getElementById("main-box-pen");

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
      data.code.forEach(code => {
        // Create 
        var card = createPenCard(code);

        mainBoxPen.appendChild(card);
    });
    })
    .catch((err) => console.log(err));
};

fetchbtn.addEventListener("click", () => {
  fetchcodes();
});



typingbtn.addEventListener('click', () => {
  window.location.href ="../typing_speed/typing.html";
})


function createPenCard(data) {

  var penDiv = document.createElement('div');
  penDiv.className = 'background-enclose';
  penDiv.style.marginTop = '-50px';
  penDiv.style.borderRadius = '12px';


  var innerDiv = document.createElement('div');
  innerDiv.className = "white-pen";
  innerDiv.style.border = 'solid black 1px';
  innerDiv.style.borderRadius = '6px';
  innerDiv.style.width = '420px';
  innerDiv.style.height = '220px';
   innerDiv.style.marginLeft = '40px';

  // HTML box
  var htmlBox = document.createElement('div');
  htmlBox.className = 'code-editor';
  var htmlPre = document.createElement('pre');
  htmlPre.id = 'html-editor';
  htmlPre.textContent = data.htmlcode;;
  htmlBox.appendChild(htmlPre);

  // CSS box
  var cssBox = document.createElement('div');
  cssBox.className = 'code-editor';
  var cssPre = document.createElement('pre');
  cssPre.id = 'css-editor';
  cssPre.textContent = data.csscode;
  cssBox.appendChild(cssPre);

  var jsBox = document.createElement('div');
  jsBox.className = 'code-editor';
  var jsPre = document.createElement('pre');
  jsPre.id = 'js-editor';
  jsPre.textContent = data.jscode;
  jsBox.appendChild(jsPre);

  innerDiv.appendChild(htmlBox);
  innerDiv.appendChild(cssBox);
  innerDiv.appendChild(jsBox);

  penDiv.appendChild(innerDiv);

  var anchor = document.createElement('a');
  anchor.href = '../Code_Editor/editor.html'; 
  anchor.id = 'big-code-page';
  anchor.appendChild(innerDiv);

  penDiv.appendChild(anchor);

  var problemDiv = document.createElement('div');
  problemDiv.style.marginLeft = '10px';
  problemDiv.style.color = 'white';
  problemDiv.style.textDecoration = 'none';

  var heading = document.createElement('h3');
  heading.textContent = 'DOM-1 Problem';
  problemDiv.appendChild(heading);

  var buttons = ['Edit', 'Delete'];

  buttons.forEach(function(btnText) {
      var button = document.createElement('button');
      button.classList.add('buttons-like');
      button.textContent = '0';
      button.style.marginLeft = '3px';
      var span = document.createElement('span');
      span.className = 'material-symbols-outlined';
      span.textContent = btnText;
      button.appendChild(span);
      problemDiv.appendChild(button);
  });

  penDiv.appendChild(problemDiv);
  return penDiv;
}


function createMultiplePens() {
  createPenCard();
}
