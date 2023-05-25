let inputField = document.querySelector("#todoInput");
let todoList = document.querySelector("#todoList");

inputField.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    let newTask = document.createElement("li");
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
      if (this.checked) {
        newTask.remove();
        saveTasks();
      }
    });
    
    let taskText = document.createElement("span");
    taskText.textContent = event.target.value;

    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    todoList.appendChild(newTask);
    event.target.value = "";

    // Saving tasks to chrome storage
    saveTasks();
  }
});

// Function to save tasks
function saveTasks() {
  let tasks = document.querySelectorAll("li span");
  let tasksArr = [...tasks].map(task => task.textContent);
  chrome.storage.sync.set({"tasks": tasksArr});
}

// Loading saved tasks from chrome storage
window.onload = function() {
  chrome.storage.sync.get("tasks", function(data) {
    if (data.tasks) {
      data.tasks.forEach(taskText => {
        let task = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
          if (this.checked) {
            task.remove();
            saveTasks();
          }
        });

        let spanText = document.createElement("span");
        spanText.textContent = taskText;

        task.appendChild(checkbox);
        task.appendChild(spanText);
        todoList.appendChild(task);
      });
    }
  });
};
