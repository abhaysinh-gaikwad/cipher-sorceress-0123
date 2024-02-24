let pens = JSON.parse(localStorage.getItem("pens")) || [];

const mainBoxPen = document.getElementById("main-box-pen");

pens.forEach((pen, index) => {
    var penCard = createPenCard(pen.html, pen.css, pen.js);
    mainBoxPen.appendChild(penCard);
});

function createPenCard(htmlCode, cssCode, jsCode) {

    var penDiv = document.createElement('div');
    penDiv.className = 'background-enclose';
    penDiv.style.marginTop = '-50px';
    penDiv.style.borderRadius = '12px';
    penDiv.style.marginLeft = 'auto';
    penDiv.style.marginTop = 'auto';


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
    htmlPre.textContent = htmlCode;
    htmlBox.appendChild(htmlPre);

    // CSS box
    var cssBox = document.createElement('div');
    cssBox.className = 'code-editor';
    var cssPre = document.createElement('pre');
    cssPre.id = 'css-editor';
    cssPre.textContent = cssCode;
    cssBox.appendChild(cssPre);

    var jsBox = document.createElement('div');
    jsBox.className = 'code-editor';
    var jsPre = document.createElement('pre');
    jsPre.id = 'js-editor';
    jsPre.textContent = jsCode;
    jsBox.appendChild(jsPre);

    // Append HTML, CSS, and JavaScript boxes to innerDiv
    innerDiv.appendChild(htmlBox);
    innerDiv.appendChild(cssBox);
    innerDiv.appendChild(jsBox);

    // Append innerDiv to penDiv
    penDiv.appendChild(innerDiv);

    var anchor = document.createElement('a');
    anchor.href = 'pen.html'; 
    anchor.id = 'big-code-page';
    anchor.appendChild(innerDiv);
    // Append the anchor tag to penDiv
    penDiv.appendChild(anchor);

    var problemDiv = document.createElement('div');
    problemDiv.style.marginLeft = '10px';
    problemDiv.style.color = 'white';
    problemDiv.style.textDecoration = 'none';

    var heading = document.createElement('h3');
    heading.textContent = 'DOM-1 Problem';
    problemDiv.appendChild(heading);

    var buttons = ['favorite', 'comment', 'visibility'];

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
