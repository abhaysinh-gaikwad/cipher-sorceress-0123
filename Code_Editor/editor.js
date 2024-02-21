

function run(){
    let htmlCode = document.getElementById("HTML-code").value;
    let cssCode = document.getElementById("CSS-code").value;
    let jsCode = document.getElementById("JS-code").value;
    let output = document.getElementById("live-output");

    output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
    output.contentWindow.eval(jsCode);
}