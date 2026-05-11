// Frontend Mentor | ToDo app:
// =====================================
// =====================================

// Selecting The Elements:
// ======================

let mainContainer = document.querySelector(".container");
let switchIcon = document.querySelector(".switch_icon");
let addIcon = document.querySelector(".icon_container .icon");
let inputContainer = document.querySelector(".input_container");
let inputTodo = document.querySelector(".input_todo");
let switchMode = document.querySelector(".switch_icon");
let todosContainer = document.querySelector(".todos_container");
let itemsContainer = document.querySelector(".items_container");
let todoItem = "";
let checkIconContainer = "";
let checkIcon = "";
let todoInfo = "";
let controlItem = "";
let deleteIcon = "";
let listOfTodos = [];
let listOfTodosDes = [];
let allBtn = document.querySelector(".all");
let activeBtn = document.querySelector(".active");
let completedBtn = document.querySelector(".completed");
let deleteCompletedBtn = document.querySelector(".clear_completed");
let leftTodos = document.querySelector(".left");
let choicesContainer = document.querySelector(".todos_container_footer");
let choices = document.querySelector(".choices");
let choicesControl = document.querySelectorAll(".choices span");
let todosArray = [];
let todoData = {};

let activeTodoCounter = 0;

// ===================

if (JSON.parse(window.localStorage.getItem(`Todos List`))) {
  if (JSON.parse(window.localStorage.getItem(`Todos List`)).length > 0) {
    for (todo of JSON.parse(window.localStorage.getItem(`Todos List`))) {
      createTodoContainer(todo.description, todo.status);
      if (todo.status === "active") {
        activeTodoCounter++;
      }
    }

    leftTodos.innerHTML = activeTodoCounter;
    choicesContainer.style.display = "flex";
    controlTodos(listOfTodos);
  }
}

// Adding New Todo:
// ================

addIcon.onclick = () => {
  if (inputTodo.value !== "") {
    addTodoFunc();
    inputTodo.value = "";
    inputTodo.focus();
  }
};

function addTodoFunc() {
  activeTodoCounter++;
  leftTodos.innerHTML = activeTodoCounter;
  choicesContainer.style.display = "flex";

  createTodoContainer();

  listOfTodos = document.querySelectorAll(".todo_item");
  listOfTodosDes = document.querySelectorAll(".info");

  deleteItem(todoItem, listOfTodos, listOfTodosDes);
  changeItemStatus(todoItem, checkIconContainer);
  controlTodos(listOfTodos);
  storingTodos();
}

// Create Todo Container:
// =====================

function createTodoContainer(todoDes = inputTodo.value, todoStatus = "active") {
  // Create Item container
  todoItem = document.createElement("div");
  todoItem.className = "todo_item";
  todoItem.setAttribute("data-status", todoStatus);

  itemsContainer.appendChild(todoItem);

  // Create Check Box:
  checkIconContainer = document.createElement("div");
  checkIconContainer.className = "icon_container";
  if (todoStatus === "completed") {
    checkIconContainer.className = "icon_container checked";
  }

  checkIcon = document.createElement("span");
  checkIcon.className = "icon";

  checkIconContainer.appendChild(checkIcon);
  todoItem.appendChild(checkIconContainer);

  // Create Todo Info:
  todoInfo = document.createElement("div");
  todoInfo.className = "info";
  todoInfo.innerHTML = todoDes;

  todoItem.appendChild(todoInfo);

  // Create Control Item:
  controlItem = document.createElement("div");
  controlItem.className = "control_item";

  deleteIcon = document.createElement("span");
  deleteIcon.className = "delete";

  controlItem.appendChild(deleteIcon);
  todoItem.appendChild(controlItem);

  deleteItem(todoItem, listOfTodos, listOfTodosDes);
  changeItemStatus(todoItem, checkIconContainer);
}

// Delete Item:
// ============

function deleteItem(todoItem, listOfTodos, listOfTodosDes) {
  controlItem.onclick = () => {
    todoItem.remove();
    if (todoItem.dataset.status === "active") {
      activeTodoCounter--;
      leftTodos.innerHTML = activeTodoCounter;
    }
    if (itemsContainer.innerHTML === "") {
      choicesContainer.style.display = "none";
    } else {
      choicesContainer.style.display = "flex";
    }

    storingTodos();
  };
}
// Change Item Status:
// ===================

function changeItemStatus(todoItem, checkIconContainer) {
  checkIconContainer.onclick = () => {
    if (checkIconContainer.classList.contains("checked")) {
      checkIconContainer.classList.remove("checked");
      todoItem.dataset.status = "active";
      activeTodoCounter++;
      leftTodos.innerHTML = activeTodoCounter;
    } else {
      checkIconContainer.classList.add("checked");
      todoItem.dataset.status = "completed";
      activeTodoCounter--;
      leftTodos.innerHTML = activeTodoCounter;
    }

    choicesControl.forEach((choice) => {
      if (choice.className === "all selected") selecAllTodos(listOfTodos);
      if (choice.className === "active selected") selecActiveTodos(listOfTodos);
      if (choice.className === "completed selected")
        selecCompletedTodos(listOfTodos);
    });

    storingTodos(listOfTodos, listOfTodosDes);
  };
}

// Control Todos:
// ==============

choicesControl.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    choicesControl.forEach((choice) => {
      choice.classList.remove("selected");
    });
    e.target.classList.add("selected");
  });
});

function controlTodos(listOfTodos) {
  completedBtn.onclick = selecCompletedTodos;
  activeBtn.onclick = selecActiveTodos;
  allBtn.onclick = selecAllTodos;
  deleteCompletedBtn.onclick = deleteCompletedTodos;
}

function selecCompletedTodos() {
  const todos = document.querySelectorAll(".todo_item");
  todos.forEach((todo) => {
    if (todo.dataset.status !== "completed") {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
}

function selecActiveTodos() {
  const todos = document.querySelectorAll(".todo_item");
  todos.forEach((todo) => {
    if (todo.dataset.status !== "active") {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
}

function selecAllTodos() {
  const todos = document.querySelectorAll(".todo_item");
  todos.forEach((todo) => {
    if (todo.style.display === "none") {
      todo.style.display = "flex";
    }
  });
}

function deleteCompletedTodos() {
  listOfTodos.forEach((todo) => {
    if (todo.dataset.status === "completed") {
      todo.remove();
    }
  });
  if (itemsContainer.innerHTML === "") {
    choicesContainer.style.display = "none";
  } else {
    choicesContainer.style.display = "flex";
  }

  storingTodos();
}

// Switching Mode:
// ==============

switchMode.onclick = () => {
  if (switchMode.classList.contains("light")) {
    lightMode();
  } else {
    darkMode();
  }
};

function lightMode() {
  switchMode.classList.remove("light");
  switchMode.classList.add("dark");

  mainContainer.classList.add("dark");
  mainContainer.classList.remove("light");

  inputContainer.classList.remove("light");
  inputContainer.classList.add("dark");

  todosContainer.classList.remove("light");
  todosContainer.classList.add("dark");

  choicesContainer.classList.remove("light");
  choicesContainer.classList.add("dark");

  choices.classList.remove("light");
  choices.classList.add("dark");

  window.localStorage.setItem(`Switch Mode`, `dark`);
}

function darkMode() {
  switchMode.classList.add("light");
  switchMode.classList.remove("dark");

  mainContainer.classList.remove("dark");
  mainContainer.classList.add("light");

  inputContainer.classList.add("light");
  inputContainer.classList.remove("dark");

  todosContainer.classList.add("light");
  todosContainer.classList.remove("dark");

  choicesContainer.classList.add("light");
  choicesContainer.classList.remove("dark");

  choices.classList.add("light");
  choices.classList.remove("dark");

  window.localStorage.setItem(`Switch Mode`, `light`);
}

if (window.localStorage.getItem(`Switch Mode`) === "dark") {
  lightMode();
} else {
  darkMode();
}

// Storing Todos At LocalStorage:
// =============================

function storingTodos() {
  listOfTodos = document.querySelectorAll(".todo_item");
  listOfTodosDes = document.querySelectorAll(".info");
  todosArray = [];
  listOfTodos.forEach((todo, index) => {
    todoData = {
      description: listOfTodosDes[index].innerHTML,
      status: todo.dataset.status,
    };

    todosArray.push(todoData);
  });

  window.localStorage.setItem("Todos List", JSON.stringify(todosArray));
}

// window.localStorage.clear();
itemsContainer.addEventListener("click", (e) => {
  console.log("target:", e.target);
  console.log("currentTarget:", e.currentTarget);
});
