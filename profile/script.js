
const mainBoxPen = document.getElementById("main-box-pen");

fetch('http://localhost:4000/code')
    .then(response => response.json())
    .then(data => {
        clearCodeCards();

        data.forEach(code => {
            // Create 
            var card = createPenCard(code);

            mainBoxPen.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

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
    anchor.href = 'pen.html'; 
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



document.getElementById('search-button').addEventListener('click', handleSearch);

function handleSearch(){
     const searchTerm = document.getElementById('search-bar').value.trim();

     clearCodeCards();

     fetch(`http://localhost:4000/code?username=${searchTerm}`)  
     .then(response => response.json())
     .then(data => {
        data.forEach(code => {
            const card = document.createElement('div');
            card.classList.add('code-card');

            const htmlcode = document.createElement('pre');
            htmlcode.textContent = `HTML:\n${code.htmlcode}`;
            card.appendChild(htmlcode);

            const cssCode = document.createElement('pre');
            cssCode.textContent = `CSS:\n${code.csscode}`;
            card.appendChild(cssCode);
    
            const jsCode = document.createElement('pre');
            jsCode.textContent = `JavaScript:\n${code.jscode}`;
            card.appendChild(jsCode); 

            mainBoxPen.appendChild(card);

        });
     })
     .catch(error => {
        console.error('Error fetching data:',error);
     })
 }

        function clearCodeCards(){
            mainBoxPen.innerHTML = "";
        }