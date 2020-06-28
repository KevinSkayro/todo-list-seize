//Global selections and variables
const todoInput = document.querySelector(".todo-input");
const todoInputBtn = document.querySelector(".btn-input");
const todoCanvas = document.querySelector(".todo-list");
//Event listeners
todoInputBtn.addEventListener("click", addTodoItem);

//Functions
function addTodoItem(event) {
  //prevent btn from reseting page
  event.preventDefault();
  //if statement to avoid the input of empty tasks
  if (todoInput.value.length != 0) {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");

    const newItem = document.createElement("li");
    newItem.innerText = todoInput.value;
    newItem.classList.add("todo-item");

    divItem.appendChild(newItem);
    todoCanvas.appendChild(divItem);
  } else {
    alert("add some text before adding your task");
  }
}
