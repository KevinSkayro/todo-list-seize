//Global selections and variables
const todoInput = document.querySelector(".todo-input");
const todoInputBtn = document.querySelector(".btn-input");
const todoDays = document.querySelectorAll(".week");
const todoDaysCanvas = document.querySelectorAll(".todo-canva");
const daySelected = document.querySelector(".day-selected");
const targetday = document.querySelectorAll(".target-day");
const taskNum = document.querySelectorAll(".task-num");
const todoItem = document.querySelectorAll(".todo-container");
const topBarDaySelector = document.querySelector(".day-selector-container");
const timerPopup = document.querySelector(".timer-popup-container");
const timerCloseBtn = document.querySelector(".close-popup-btn");
const timerElement = document.querySelector(".timer-countdown");
const timerStartStopBtn = document.querySelector(".timer-start-stop");
const filterTasksBtn = document.querySelector(".select-todo");
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
topBarDaySelector.addEventListener("click", daySelector);
timerCloseBtn.addEventListener("click", closeTimerPopup);
filterTasksBtn.addEventListener("click", filterTasks);

//event listener to start and stop timer

let startingTime = 25;
let time = startingTime * 60;
let timeInterval = -1;
timerStartStopBtn.addEventListener("click", function (e) {
  if (timeInterval == -1) {
    timeInterval = setInterval(function () {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timerElement.innerHTML = `${minutes}:${seconds}`;
      time--;
      time = time < 0 ? 0 : time;
    }, 1000);
    timerStartStopBtn.innerHTML = "Stop";
    timerStartStopBtn.style.backgroundColor = "#ff0000";
  } else {
    clearInterval(timeInterval);
    timeInterval = -1;
    time = startingTime * 60;
    timerElement.innerHTML = "Start Pomodoro";
    timerStartStopBtn.innerHTML = "Start";
    timerStartStopBtn.style.backgroundColor = "#403c3c";
  }
});

//deleteItem event listeners for each day
day1.addEventListener("click", tasksFunctions);
day2.addEventListener("click", tasksFunctions);
day3.addEventListener("click", tasksFunctions);
day4.addEventListener("click", tasksFunctions);
day5.addEventListener("click", tasksFunctions);
day6.addEventListener("click", tasksFunctions);
day7.addEventListener("click", tasksFunctions);

//Functions
function addTodoItem(e) {
  //prevent btn from reseting page
  e.preventDefault();
  //if statement to avoid the input of empty tasks
  if (todoInput.value.length != 0) {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");
    //adding classes to identify different day's tasks
    const newItem = document.createElement("li");
    newItem.innerText = todoInput.value;
    newItem.classList.add("todo-item");
    //Check mark button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = "<i class='fas fa-check'></i>";
    completedBtn.classList.add("completed-btn");
    //Trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    trashBtn.classList.add("trash-btn");
    const timerBtn = document.createElement("button");
    timerBtn.innerHTML = "<i class='fas fa-clock'></i>";
    timerBtn.classList.add("timer-btn");
    //this appends the input to the active day in the app
    divItem.appendChild(newItem);
    divItem.appendChild(completedBtn);
    divItem.appendChild(trashBtn);
    divItem.appendChild(timerBtn);
    for (let i = 0; i < todoDaysCanvas.length; i++) {
      if (todoDaysCanvas[i].classList.contains("active")) {
        todoDaysCanvas[i].appendChild(divItem);
      }
    }
    // Updates the tasks quantity num on sidebar
    for (let i = 0; i < todoDays.length; i++) {
      if (todoDays[i].classList.contains("active")) {
        taskNum[i].innerText++;
      }
    }
    todoInput.value = "";
  } else {
    alert("Add some text before adding your task");
  }
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
//Delete task items, mark task items as completed and timer
function tasksFunctions(e) {
  let item = e.target;
  if (item.classList[0] === "trash-btn") {
    const deleteItem = item.parentElement;
    deleteItem.remove();
    for (let i = 0; i < todoDays.length; i++) {
      if (todoDays[i].classList.contains("active")) {
        taskNum[i].innerText--;
      }
    }
  } else if (item.classList[0] === "completed-btn") {
    const completedItem = item.parentElement;
    completedItem.classList.toggle("completed");
  } else if (item.classList[0] === "timer-btn") {
    timerPopup.classList.add("active");
  }
}
//close timer window
function closeTimerPopup() {
  timerPopup.classList.remove("active");
}
//day selector with topbar arrows
function daySelector(e) {
  let item = e.target;
  if (item.classList[0] === "backwards-selector") {
    if (day7.classList.contains("active")) {
      checkForActiveDay();
      openFriday();
    } else if (day6.classList.contains("active")) {
      checkForActiveDay();
      openThursday();
    } else if (day5.classList.contains("active")) {
      checkForActiveDay();
      openWednensday();
    } else if (day4.classList.contains("active")) {
      checkForActiveDay();
      openTuesday();
    } else if (day3.classList.contains("active")) {
      checkForActiveDay();
      openMonday();
    } else if (day2.classList.contains("active")) {
      checkForActiveDay();
      openSunday();
    } else {
      checkForActiveDay();
      openSaturday();
    }
  } else if (item.classList[0] === "forwards-selector") {
    if (day1.classList.contains("active")) {
      checkForActiveDay();
      openMonday();
    } else if (day2.classList.contains("active")) {
      checkForActiveDay();
      openTuesday();
    } else if (day3.classList.contains("active")) {
      checkForActiveDay();
      openWednensday();
    } else if (day4.classList.contains("active")) {
      checkForActiveDay();
      openThursday();
    } else if (day5.classList.contains("active")) {
      checkForActiveDay();
      openFriday();
    } else if (day6.classList.contains("active")) {
      checkForActiveDay();
      openSaturday();
    } else {
      checkForActiveDay();
      openSunday();
    }
  }
}

function filterTasks(e) {
  todoDaysCanvas.forEach((day) => {
    const tasks = day.childNodes;
    console.log(tasks);
    tasks.forEach((task) => {
      switch (e.target.value) {
        case "all":
          task.style.display = "flex";
          break;
        case "completed":
          if (task.classList.contains("completed")) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!task.classList.contains("completed")) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
          break;
      }
    });
  });
}
