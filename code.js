//Global selections and variables
const todoInput = document.querySelector(".todo-input");
const todoInputBtn = document.querySelector(".btn-input");
const todoDays = document.querySelectorAll(".week");
const todoDaysCanvas = document.querySelectorAll(".todo-canva");
const daySelected = document.querySelector(".day-selected");
const targetday = document.querySelectorAll(".target-day");
const taskNum = document.querySelectorAll(".task-num");
const todoItem = document.querySelectorAll(".todo-container");
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
    //adding classes to identify different day's tasks
    if (day1.classList.contains("active")) {
      divItem.classList.add("d1");
    } else if (day2.classList.contains("active")) {
      divItem.classList.add("d2");
    } else if (day3.classList.contains("active")) {
      divItem.classList.add("d3");
    } else if (day4.classList.contains("active")) {
      divItem.classList.add("d4");
    } else if (day5.classList.contains("active")) {
      divItem.classList.add("d5");
    } else if (day6.classList.contains("active")) {
      divItem.classList.add("d6");
    } else {
      divItem.classList.add("d7");
    }

    const newItem = document.createElement("li");
    newItem.innerText = todoInput.value;
    newItem.classList.add("todo-item");
    //this appends the input to the active day in the app
    divItem.appendChild(newItem);
    for (let i = 0; i < todoDaysCanvas.length; i++) {
      if (todoDaysCanvas[i].classList.contains("active")) {
        todoDaysCanvas[i].appendChild(divItem);
      }
    }
  } else {
    alert("Add some text before adding your task");
  }
  // Update the tasks quantity num on sidebar
  (function () {
    for (let i = 0; i < todoDays.length; i++) {
      if (todoDays[i].classList.contains("active")) {
        taskNum[i].innerText++;
      }
    }
  })();

  todoInput.value = "";
}
//checks for which day is active, and checks when user clicks on diferent day and performs the change
function checkForActiveDay() {
  for (let i = 0; i < todoDaysCanvas.length; i++) {
    if (todoDaysCanvas[i].classList.contains("active") && todoDays[i].classList.contains("active")) {
      todoDaysCanvas[i].classList.remove("active");
      todoDays[i].classList.remove("active");
    }
  }
}

//focus on input when loading page
function FocusOnInput() {
  todoInput.focus();
}

function openSunday() {
  checkForActiveDay();
  daySelected.innerText = "Sunday";
  day1.classList.add("active");
  sunday.classList.add("active");
}
function openMonday() {
  checkForActiveDay();
  daySelected.innerText = "Monday";
  day2.classList.add("active");
  monday.classList.add("active");
}
function openTuesday() {
  checkForActiveDay();
  daySelected.innerText = "Tuesday";
  day3.classList.add("active");
  tuesday.classList.add("active");
}
function openWednensday() {
  checkForActiveDay();
  daySelected.innerText = "Wednesday";
  day4.classList.add("active");
  wednesday.classList.add("active");
}
function openThursday() {
  checkForActiveDay();
  daySelected.innerText = "Thursday";
  day5.classList.add("active");
  thursday.classList.add("active");
}
function openFriday() {
  checkForActiveDay();
  daySelected.innerText = "Friday";
  day6.classList.add("active");
  friday.classList.add("active");
}
function openSaturday() {
  checkForActiveDay();
  daySelected.innerText = "Saturday";
  day7.classList.add("active");
  saturday.classList.add("active");
}
