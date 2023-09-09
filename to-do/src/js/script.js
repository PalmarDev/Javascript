function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Por favor, ingresa una tarea válida.");
    return;
  }

  const taskList = document.getElementById("task-list");
  const div = document.createElement("div");
  div.innerHTML = `
        <span>${taskText}</span>
        <button onclick="completeTask(this)">Completar</button>
        <button onclick="removeTask(this)">Eliminar</button>
    `;
  taskList.appendChild(div);

  taskInput.value = "";
}

function completeTask(button) {
  const taskList = document.getElementById("task-list");
  const completedList = document.getElementById("completed-list");
  const div = button.parentElement;
  const taskText = div.querySelector("span").textContent;

  div.classList.add("completed");
  button.textContent = "Descompletar";
  button.onclick = function () {
    uncompleteTask(this);
  };

  completedList.appendChild(div);
  taskList.removeChild(div);
}

function uncompleteTask(button) {
  const taskList = document.getElementById("task-list");
  const completedList = document.getElementById("completed-list");
  const div = button.parentElement;
  const taskText = div.querySelector("span").textContent;

  div.classList.remove("completed");
  button.textContent = "Completar";
  button.onclick = function () {
    completeTask(this);
  };

  taskList.appendChild(div);
  completedList.removeChild(div);
}

function removeTask(button) {
  const taskList = document.getElementById("task-list");
  const completedList = document.getElementById("completed-list");
  const div = button.parentElement;

  if (div.classList.contains("completed")) {
    completedList.removeChild(div);
  } else {
    taskList.removeChild(div);
  }
}
