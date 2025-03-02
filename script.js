document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskText = document.getElementById("task").value;
    const taskTime = document.getElementById("task-time").value;
    if (taskText.trim() === "") return alert("Task cannot be empty!");

    const task = {
        text: taskText,
        time: taskTime,
        completed: false
    };

    saveTask(task);
    renderTasks();
    document.getElementById("task").value = "";
    document.getElementById("task-time").value = "";
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text} - ${task.time ? `Due: ${new Date(task.time).toLocaleString()}` : ""}
            </span>
            <div class="actions">
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const newTask = prompt("Edit Task:", tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}
