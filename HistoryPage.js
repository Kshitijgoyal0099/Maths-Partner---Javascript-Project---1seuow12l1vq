// HISTORY PAGE
let existingSolutions = JSON.parse(window.localStorage.getItem("solutions"));

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



