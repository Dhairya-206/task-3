function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var taskId = event.dataTransfer.getData("text");
    var taskElement = document.getElementById(taskId);
    event.target.appendChild(taskElement);
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
        task.innerHTML = taskContent;

        taskList.appendChild(task);
    }
}

