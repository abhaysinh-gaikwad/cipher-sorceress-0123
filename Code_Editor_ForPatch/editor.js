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

let saveBtn = document.getElementById("save-btn");
let htmlCode = document.getElementById("HTML-code");
let cssCode = document.getElementById("CSS-code");
let jsCode = document.getElementById("JS-code");
let saveasInput = document.getElementById("saveasInput");

htmlCode.value = localStorage.getItem("htmlcode");
cssCode.value = localStorage.getItem("csscode");
jsCode.value = localStorage.getItem("jscode");
saveasInput.value = localStorage.getItem("filename");
async function saveCode() {
  try {
    const obj = {
      filename: saveasInput.value,
      htmlcode: htmlCode.value,
      csscode: cssCode.value,
      jscode: jsCode.value,
    };
    console.log(obj);
    if (!localStorage.getItem("token")) {
      //   alert("Please login first");
      // Assuming a toast function is already defined or a library like toastr is being used.
      toast("Please login first", { type: "error", duration: 3000 });
      setTimeout(() => {
        window.location.href = "../register_page/register.html";
      }, 5000);
    } else {
      if (saveasInput.value == "") {
        toast("Please enter a filename", { type: "error", duration: 3000 });
      } else {
        toast("Your code has been saved", { type: "success", duration: 3000 });
      }
    }
    const res = await fetch(
      `http://localhost:4000/code/${localStorage.getItem("codeid")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(obj),
      }
    );
    const data = await res.json();
    localStorage.removeItem("htmlcode");
    localStorage.removeItem("csscode");
    localStorage.removeItem("jscode");
    localStorage.removeItem("filename");
    localStorage.removeItem("codeid");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

saveBtn.addEventListener("click", saveCode);
