//Global selections and variables
const todoInput = document.querySelector(".todo-input");
const todoInputBtn = document.querySelector(".btn-input");
const todoCanvas = document.querySelector(".todo-list");
const todoDays = document.querySelectorAll(".week");
const todoDaysCanvas = document.querySelectorAll(".todo-canva");
//days of the week selectors
const sunday = document.querySelector(".sunday");
const monday = document.querySelector(".monday");
const tuesday = document.querySelector(".tuesday");
const wednesday = document.querySelector(".wednesday");
const thursday = document.querySelector(".thursday");
const friday = document.querySelector(".friday");
const saturday = document.querySelector(".saturday");
const day1 = document.querySelector(".day1");
const day2 = document.querySelector(".day2");
const day3 = document.querySelector(".day3");
const day4 = document.querySelector(".day4");
const day5 = document.querySelector(".day5");
const day6 = document.querySelector(".day6");
const day7 = document.querySelector(".day7");

//Event listeners
todoInputBtn.addEventListener("click", addTodoItem);
sunday.addEventListener("click", openSunday);
monday.addEventListener("click", openMonday);
tuesday.addEventListener("click", openTuesday);
wednesday.addEventListener("click", openWednensday);
thursday.addEventListener("click", openThursday);
friday.addEventListener("click", openFriday);
saturday.addEventListener("click", openSaturday);

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
  todoInput.value = "";
}
function checkForActiveDay() {
  for (let i = 0; i < todoDaysCanvas.length; i++) {
    if (todoDaysCanvas[i].classList.contains("active")) {
      todoDaysCanvas[i].classList.remove("active");
    }
  }
}
function openSunday() {
  checkForActiveDay();
  day1.classList.add("active");
}
function openMonday() {
  checkForActiveDay();
  day2.classList.add("active");
}
function openTuesday() {
  checkForActiveDay();
  day3.classList.add("active");
}
function openWednensday() {
  checkForActiveDay();
  day4.classList.add("active");
}
function openThursday() {
  checkForActiveDay();
  day5.classList.add("active");
}
function openFriday() {
  checkForActiveDay();
  day6.classList.add("active");
}
function openSaturday() {
  checkForActiveDay();
  day7.classList.add("active");
}
