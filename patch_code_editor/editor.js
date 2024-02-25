const urlParams = new URLSearchParams(window.location.search);
const codeId = urlParams.get('_id');

    console.log("Note ID:", codeId);

   // Function to fetch code data by codeId
function getCodeById(codeId) {
  fetch(`http://localhost:4000/code/${codeId}`, {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  .then(res => res.json())
  .then(data => {
    // Populate the editor fields with the retrieved code data
    console.log(data)
   

    document.getElementById('HTML-code').value = data.htmlcode;
    document.getElementById('CSS-code').value = data.csscode;
    document.getElementById('JS-code').value = data.jscode;
    // console.log(data[htmlcode])
    // console.log(data[csscode])
    // console.log(data[jscode])
  })
  .catch(err => console.log(err));
}

// Fetch code data by codeId when the page loads
getCodeById(codeId);

// Function to update code data
function updateCode() {
  const htmlCode = document.getElementById("HTML-code").value;
  const cssCode = document.getElementById("CSS-code").value;
  const jsCode = document.getElementById("JS-code").value;
  
  const codeData = {
    htmlcode: htmlCode,
    csscode: cssCode,
    jscode: jsCode
  };

  fetch(`http://localhost:4000/code/${codeId}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(codeData)
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to update code: ${res.status} - ${res.statusText}`);
    }
  })
  .then(data => {
    console.log(data);
    toast("Code updated successfully", { type: "success" });
  })
  .catch(err => {
    console.error(err);
    toast("Failed to update code", { type: "error" });
  });
}

// Event listener for save button click
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", updateCode);




function run() {
  let htmlCode = document.getElementById("HTML-code").value;
  let cssCode = document.getElementById("CSS-code").value;
  let jsCode = document.getElementById("JS-code").value;
  let output = document.getElementById("live-output");

  output.contentDocument.body.innerHTML =
    htmlCode + "<style>" + cssCode + "</style>";
  output.contentWindow.eval(jsCode);
}

function toast(message, options) {
  const toastContainer = document.getElementById("toast-container");
  const toastMessage = document.createElement("div");

  toastMessage.className = `toast ${options.type}`;
  toastMessage.textContent = message;
  toastContainer.appendChild(toastMessage);

  setTimeout(() => {
    toastContainer.removeChild(toastMessage);
  }, options.duration || 3000);
}

// let saveBtn = document.getElementById("save-btn");
// let htmlCode = document.getElementById("HTML-code");
// let cssCode = document.getElementById("CSS-code");
// let jsCode = document.getElementById("JS-code");




