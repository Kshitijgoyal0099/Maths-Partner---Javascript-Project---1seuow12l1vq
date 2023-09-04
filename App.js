//INDEX PAGE JS

let displayResults = document.getElementById("resultDisplay");
let clearBtn = document.getElementById("clearBtn");


let existingSolutions = JSON.parse(window.localStorage.getItem("solutions"));


// if(!existingSolutions && !Array.isArray(existingSolutions)){
//   existingSolutions = [];
// }

document.addEventListener("DOMContentLoaded", function() {
    var getValueButton = document.getElementById("searchResult");
    getValueButton.addEventListener("click", getInputValue);  
});

function getInputValue(){
    let expression = document.getElementById("problemID").value;
    let operation = document.getElementById("category").value;
    var encodedExpression = encodeURIComponent(expression);
    var API= `https://newton.vercel.app/api/v2/${operation}/${encodedExpression}`;
    console.log("GIV Running: " + API);
    displayResults.innerHTML = "calculating...";
    let printOperation = toSentenceCase(operation);
    fetch(API)
  .then(response => response.json())
  .then(data => {
    const result = data.result;
    const answer = 
    ` <h4>${printOperation} : ${expression}</h4>
      <p>Result : ${result}</p>
    `;
    displayResults.innerHTML = answer;
    updateSolutions(operation,expression,result);
  })
  .catch(error => {
    console.error('An error occurred:',error);
  });
}

function toSentenceCase(str){
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);;
}

function updateSolutions(ope,exp,res){
    const tempSol = {
        "operation":ope,
        "expression":exp,
        "result":res
    };
    // debugger
    let existingSolutions = JSON.parse(window.localStorage.getItem("solutions"));
    if(existingSolutions){
      existingSolutions.push(tempSol);
      window.localStorage.setItem("solutions",JSON.stringify(existingSolutions));
    }else{
      window.localStorage.setItem("solutions",JSON.stringify([tempSol]));
    }
}

// HISTORY PAGE JS


let tb = document.getElementById("tableBody");

var i = 0;
console.log(existingSolutions);
const tContent = existingSolutions.map((e,index) => `
    <tr>
      <td>${index+1}</td>
      <td>${e.expression}</td>
      <td>${e.operation}</td>
      <td>${e.result}</td>
      <td><button class = "delBtn" id = "delBtn-${index} delBtnID"><i class="fa-solid fa-trash-can"></i></button></td>    
    </tr>
`).join('');

tb.innerHTML = tContent;
const container = document.getElementById('tableContent');

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('delBtn')) {
    const index = parseInt(event.target.id.split('-')[1]);
    existingSolutions.splice(index, 1); 
    window.localStorage.setItem("solutions",JSON.stringify(existingSolutions));
    
    location.reload(); 

  }
});


clearBtn.addEventListener("click",(event) =>{
    displayResults.innerHTML = "";
});

