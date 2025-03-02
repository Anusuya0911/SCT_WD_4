const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const taskTime = taskDate.value;

    if (taskText === "") return alert("Please enter a task!");

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span class="task-text">${taskText} <br><small>${taskTime}</small></span>
        <div class="actions">
            <button onclick="completeTask(this)">✔</button>
            <button onclick="editTask(this)">✏</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = "";
    taskDate.value = "";
}

function completeTask(button) {
    const taskText = button.parentElement.previousElementSibling;
    taskText.classList.toggle("completed");
}

function editTask(button) {
    const taskText = button.parentElement.previousElementSibling;
    const newText = prompt("Edit your task:", taskText.textContent.split("\n")[0]);
    if (newText) taskText.innerHTML = `${newText} <br><small>${taskText.innerHTML.split("<br>")[1]}</small>`;
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
}
