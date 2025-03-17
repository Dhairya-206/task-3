document.addEventListener("DOMContentLoaded", loadTasks);

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, columnId) {
    event.preventDefault();
    var taskId = event.dataTransfer.getData("text");
    var taskElement = document.getElementById(taskId);
    document.getElementById(columnId).querySelector(".task-list").appendChild(taskElement);
    saveTasks();
}

function addTask(columnId) {
    var taskContent = prompt("Enter Task:");
    if (taskContent) {
        var taskList = document.getElementById(columnId).querySelector('.task-list');
        var task = document.createElement("div");
        var taskId = "task-" + Date.now();
        
        task.className = "task";
        task.id = taskId;
        task.draggable = true;
        task.ondragstart = drag;
        task.innerHTML = `
            <span>${taskContent}</span>
            <button class="delete-btn" onclick="deleteTask('${taskId}')">X</button>
        `;

        taskList.appendChild(task);
        saveTasks();
    }
}

function deleteTask(taskId) {
    document.getElementById(taskId).remove();
    saveTasks();
}

function saveTasks() {
    var tasks = {};
    document.querySelectorAll(".column").forEach(column => {
        var columnId = column.id;
        var taskArray = [];
        column.querySelectorAll(".task").forEach(task => {
            taskArray.push(task.querySelector("span").innerText);
        });
        tasks[columnId] = taskArray;
    });

    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("kanbanTasks"));
    if (tasks) {
        Object.keys(tasks).forEach(columnId => {
            var taskList = document.getElementById(columnId).querySelector(".task-list");
            tasks[columnId].forEach(taskContent => {
                var task = document.createElement("div");
                var taskId = "task-" + Date.now();
                
                task.className = "task";
                task.id = taskId;
                task.draggable = true;
                task.ondragstart = drag;
                task.innerHTML = `
                    <span>${taskContent}</span>
                    <button class="delete-btn" onclick="deleteTask('${taskId}')">X</button>
                `;

                taskList.appendChild(task);
            });
        });
    }
}
