
window.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('createPen')) {
        createPen();
    }
});

function createPen() {
    var pensContainer = document.getElementById('main-box-pen');

    var htmlCode = localStorage.getItem('htmlCode') || '';
    var cssCode = localStorage.getItem('cssCode') || '';
    var jsCode = localStorage.getItem('jsCode') || '';

    var penCard = createPenCard(htmlCode, cssCode, jsCode);
    pensContainer.appendChild(penCard);
}

function createPenCard(htmlCode, cssCode, jsCode) {

    var penDiv = document.createElement('div');
    penDiv.className = 'background-enclose';
    penDiv.style.backgroundColor = 'rgb(154, 152, 152)';
    penDiv.style.width = '400%';

    var innerDiv = document.createElement('div');
    innerDiv.style.backgroundColor = 'white';
    innerDiv.style.border = 'solid black 1px';
    innerDiv.style.borderRadius = '6px';
    innerDiv.style.margin = '15px';
    innerDiv.style.width = '90%';

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
    anchor.textContent = 'Open Pen';

    var penLink = document.createElement('a');
    penLink.href = 'pen.html'; 
    penLink.appendChild(penDiv);

    // Append the anchor tag to penDiv
    penDiv.appendChild(anchor);

    var problemDiv = document.createElement('div');
    problemDiv.style.marginLeft = '10px';

    var heading = document.createElement('h3');
    heading.textContent = 'DOM-1 Problem';

    problemDiv.appendChild(heading);

    var buttons = ['favorite', 'comment', 'visibility'];

    buttons.forEach(function(btnText) {
        var button = document.createElement('button');
        var span = document.createElement('span');
        span.className = 'material-symbols-outlined';
        span.textContent = btnText;
        button.appendChild(span);
        problemDiv.appendChild(button);
    });

    penDiv.appendChild(problemDiv);
    return penLink;
}


function createMorePens() {
    for (var i = 0; i < 6; i++) {
        createPen();
    }
}

