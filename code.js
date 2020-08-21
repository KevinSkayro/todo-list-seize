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
const burgerMenuBtn = document.querySelector(".hamburger-menu");
const sideBar = document.querySelector(".side-bar");
const burgerRow = document.querySelectorAll(".row");
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
document.addEventListener("DOMContentLoaded", getLocalTasks);
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
burgerMenuBtn.addEventListener("click", function () {
  sideBar.classList.toggle("active");
  burgerRow.forEach((row) => {
    row.classList.toggle("active");
  });
});

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
      if (timerElement.innerText == "0:00") {
        timerElement.innerText = "Start Pomodoro";
        timerStartStopBtn.innerText = "Start Again";
        timerStartStopBtn.style.backgroundColor = "#403c3c";
        clearInterval(timeInterval);
        timeInterval = -1;
        time = startingTime * 60;
      }
    }, 1000);
    timerStartStopBtn.innerText = "Stop";
    timerStartStopBtn.style.backgroundColor = "#ff0000";
  } else {
    clearInterval(timeInterval);
    timeInterval = -1;
    time = startingTime * 60;
    timerElement.innerText = "Start Pomodoro";
    timerStartStopBtn.innerText = "Start";
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

    //Add task to local storage
    saveLocalTasks(todoInput.value);

    divItem.appendChild(completedBtn);
    divItem.appendChild(trashBtn);
    divItem.appendChild(timerBtn);
    todoDaysCanvas.forEach((day) => {
      if (day.classList.contains("active")) {
        day.appendChild(divItem);
      }
    });
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
    removeLocalTasks(deleteItem);
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
function saveLocalTasks(task) {
  if (day1.classList.contains("active")) {
    let taskList1;
    if (localStorage.getItem("taskList1") === null) {
      taskList1 = [];
    } else {
      taskList1 = JSON.parse(localStorage.getItem("taskList1"));
    }

    taskList1.push(task);
    localStorage.setItem("taskList1", JSON.stringify(taskList1));
  } else if (day2.classList.contains("active")) {
    let taskList2;
    if (localStorage.getItem("taskList2") === null) {
      taskList2 = [];
    } else {
      taskList2 = JSON.parse(localStorage.getItem("taskList2"));
    }

    taskList2.push(task);
    localStorage.setItem("taskList2", JSON.stringify(taskList2));
  } else if (day3.classList.contains("active")) {
    let taskList3;
    if (localStorage.getItem("taskList3") === null) {
      taskList3 = [];
    } else {
      taskList3 = JSON.parse(localStorage.getItem("taskList3"));
    }

    taskList3.push(task);
    localStorage.setItem("taskList3", JSON.stringify(taskList3));
  } else if (day4.classList.contains("active")) {
    let taskList4;
    if (localStorage.getItem("taskList4") === null) {
      taskList4 = [];
    } else {
      taskList4 = JSON.parse(localStorage.getItem("taskList4"));
    }

    taskList4.push(task);
    localStorage.setItem("taskList4", JSON.stringify(taskList4));
  } else if (day5.classList.contains("active")) {
    let taskList5;
    if (localStorage.getItem("taskList5") === null) {
      taskList5 = [];
    } else {
      taskList5 = JSON.parse(localStorage.getItem("taskList5"));
    }

    taskList5.push(task);
    localStorage.setItem("taskList5", JSON.stringify(taskList5));
  } else if (day6.classList.contains("active")) {
    let taskList6;
    if (localStorage.getItem("taskList6") === null) {
      taskList6 = [];
    } else {
      taskList6 = JSON.parse(localStorage.getItem("taskList6"));
    }

    taskList6.push(task);
    localStorage.setItem("taskList6", JSON.stringify(taskList6));
  } else if (day7.classList.contains("active")) {
    let taskList7;
    if (localStorage.getItem("taskList7") === null) {
      taskList7 = [];
    } else {
      taskList7 = JSON.parse(localStorage.getItem("taskList7"));
    }

    taskList7.push(task);
    localStorage.setItem("taskList7", JSON.stringify(taskList7));
  }
}
function getLocalTasks() {
  //task recovery for day1
  let taskList1;
  if (localStorage.getItem("taskList1") === null) {
    taskList1 = [];
  } else {
    taskList1 = JSON.parse(localStorage.getItem("taskList1"));
  }
  taskList1.forEach((task) => {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");
    //adding classes to identify different day's tasks
    const newItem = document.createElement("li");
    newItem.innerText = task;
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
    day1.appendChild(divItem);
    taskNum[0].innerText++;
  });

  //task recovery for day2
  let taskList2;
  if (localStorage.getItem("taskList2") === null) {
    taskList2 = [];
  } else {
    taskList2 = JSON.parse(localStorage.getItem("taskList2"));
  }
  taskList2.forEach((task) => {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");
    //adding classes to identify different day's tasks
    const newItem = document.createElement("li");
    newItem.innerText = task;
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
    day2.appendChild(divItem);
    taskNum[1].innerText++;
  });

  //task recovery for day3
  let taskList3;
  if (localStorage.getItem("taskList3") === null) {
    taskList3 = [];
  } else {
    taskList3 = JSON.parse(localStorage.getItem("taskList3"));
  }
  taskList3.forEach((task) => {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");
    //adding classes to identify different day's tasks
    const newItem = document.createElement("li");
    newItem.innerText = task;
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
    day3.appendChild(divItem);
    taskNum[2].innerText++;
  });

  //task recovery for day4

  let taskList4;
  if (localStorage.getItem("taskList4") === null) {
    taskList4 = [];
  } else {
    taskList4 = JSON.parse(localStorage.getItem("taskList4"));
  }
  taskList4.forEach((task) => {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");
    //adding classes to identify different day's tasks
    const newItem = document.createElement("li");
    newItem.innerText = task;
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
    day4.appendChild(divItem);
    taskNum[3].innerText++;
  });

  //task recovery for day5
  let taskList5;
  if (localStorage.getItem("taskList5") === null) {
    taskList5 = [];
  } else {
    taskList5 = JSON.parse(localStorage.getItem("taskList5"));
  }
  taskList5.forEach((task) => {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");
    //adding classes to identify different day's tasks
    const newItem = document.createElement("li");
    newItem.innerText = task;
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
    day5.appendChild(divItem);
    taskNum[4].innerText++;
  });

  //task recovery for day6
  let taskList6;
  if (localStorage.getItem("taskList6") === null) {
    taskList6 = [];
  } else {
    taskList6 = JSON.parse(localStorage.getItem("taskList6"));
  }
  taskList6.forEach((task) => {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");
    //adding classes to identify different day's tasks
    const newItem = document.createElement("li");
    newItem.innerText = task;
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
    day6.appendChild(divItem);
    taskNum[5].innerText++;
  });

  //task recovery for day7
  let taskList7;
  if (localStorage.getItem("taskList7") === null) {
    taskList7 = [];
  } else {
    taskList7 = JSON.parse(localStorage.getItem("taskList7"));
  }
  taskList7.forEach((task) => {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-container");
    //adding classes to identify different day's tasks
    const newItem = document.createElement("li");
    newItem.innerText = task;
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
    day7.appendChild(divItem);
    taskNum[6].innerText++;
  });
}

//remove local tasks
function removeLocalTasks(task) {
  //day1
  const taskIndex = task.children[0].innerText;
  if (day1.classList.contains("active")) {
    let taskList1;
    if (localStorage.getItem("taskList1") === null) {
      taskList1 = [];
    } else {
      taskList1 = JSON.parse(localStorage.getItem("taskList1"));
    }

    taskList1.splice(taskList1.indexOf(taskIndex), 1);
    localStorage.setItem("taskList1", JSON.stringify(taskList1));
  } else if (day2.classList.contains("active")) {
    //day2
    let taskList2;
    if (localStorage.getItem("taskList2") === null) {
      taskList2 = [];
    } else {
      taskList2 = JSON.parse(localStorage.getItem("taskList2"));
    }
    taskList2.splice(taskList2.indexOf(taskIndex), 1);
    localStorage.setItem("taskList2", JSON.stringify(taskList2));
  } else if (day3.classList.contains("active")) {
    //day3
    let taskList3;
    if (localStorage.getItem("taskList3") === null) {
      taskList3 = [];
    } else {
      taskList3 = JSON.parse(localStorage.getItem("taskList3"));
    }
    taskList3.splice(taskList3.indexOf(taskIndex), 1);
    localStorage.setItem("taskList3", JSON.stringify(taskList3));
  } else if (day4.classList.contains("active")) {
    //day4
    let taskList4;
    if (localStorage.getItem("taskList4") === null) {
      taskList4 = [];
    } else {
      taskList4 = JSON.parse(localStorage.getItem("taskList4"));
    }
    taskList4.splice(taskList4.indexOf(taskIndex), 1);
    localStorage.setItem("taskList4", JSON.stringify(taskList4));
  } else if (day5.classList.contains("active")) {
    //day5
    let taskList5;
    if (localStorage.getItem("taskList5") === null) {
      taskList5 = [];
    } else {
      taskList5 = JSON.parse(localStorage.getItem("taskList5"));
    }
    taskList5.splice(taskList5.indexOf(taskIndex), 1);
    localStorage.setItem("taskList5", JSON.stringify(taskList5));
  } else if (day6.classList.contains("active")) {
    //day6
    let taskList6;
    if (localStorage.getItem("taskList6") === null) {
      taskList6 = [];
    } else {
      taskList6 = JSON.parse(localStorage.getItem("taskList6"));
    }
    taskList6.splice(taskList6.indexOf(taskIndex), 1);
    localStorage.setItem("taskList6", JSON.stringify(taskList6));
  } else {
    //day7
    let taskList7;
    if (localStorage.getItem("taskList7") === null) {
      taskList7 = [];
    } else {
      taskList7 = JSON.parse(localStorage.getItem("taskList7"));
    }
    taskList7.splice(taskList7.indexOf(taskIndex), 1);
    localStorage.setItem("taskList7", JSON.stringify(taskList7));
  }
}
