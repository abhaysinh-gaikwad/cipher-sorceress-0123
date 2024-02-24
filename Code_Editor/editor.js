

function run(){
    let htmlCode = document.getElementById("HTML-code").value;
    let cssCode = document.getElementById("CSS-code").value;
    let jsCode = document.getElementById("JS-code").value;
    let output = document.getElementById("live-output");

    output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
    output.contentWindow.eval(jsCode);
}




let saveBtn = document.getElementById("save-btn");
let htmlCode = document.getElementById("HTML-code")
let cssCode = document.getElementById("CSS-code")
let jsCode = document.getElementById("JS-code")


async function saveCode(){
   try{
       const obj = {
           htmlcode: htmlCode.value,
           csscode: cssCode.value,
           jscode: jsCode.value,
       }
       console.log(obj);
       const res = await fetch("http://localhost:4000/code",{
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               authorization :`Bearer ${localStorage.getItem("token")}`
           },
        
           body:JSON.stringify(obj)
           
       })
       const data = await res.json(); 
       console.log(data)
   }catch(err){
       console.log(err)
   }
};

saveBtn.addEventListener("click", saveCode)