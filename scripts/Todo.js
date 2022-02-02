import TodoList from "./TodoList.js";

class Todo {
  constructor(task, list) {
    (this.id = task.id),
      (this.name = task.name),
      (this.description = task.description),
      (this.createAt = task.createAt),
      (this.deadline = task.deadline),
      (this.priority = task.priority),
      (this.todoList = list);
  }

  init() {
    const newTask = document.createElement("div");
    newTask.classList.add("todo-item");
    newTask.dataset.id = this.id;
    newTask.classList.add("row");

    newTask.innerHTML = `
                    <div class="inRow">${this.name}</div>
                    <div class="inRow">${this.description}</div>
                    <div class="inRow">${this.createAt}</div>
                    <div class="inRow">${this.deadline}</div>
                    <div class="inRow">${this.priority}</div>
        `;

    const interactCtn = document.createElement("div");
    newTask.appendChild(interactCtn);

    const createBtn = (title) => {
      const btn = document.createElement("span");
      btn.classList.add(`${title}-btn`);
      btn.innerText = title;
      return btn;
    };

    const editBtn = createBtn("edit");
    interactCtn.appendChild(editBtn);
    editBtn.addEventListener("click", () => {
      //edit modal apeare, fields filled with task data
    });

    const delBtn = createBtn("delete");
    interactCtn.appendChild(delBtn);
    delBtn.addEventListener("click", () => {
      const todoList = [...document.querySelectorAll(".todo-item")];
      todoList.forEach((task) => console.log(task.dataset.id, this.id));
      const itemForDelete = todoList.find(
        (task) => parseFloat(task.dataset.id) === this.id
      );
      itemForDelete.remove();
      this.todoList.removeTask(this.id);
    });

    const checkInput = document.createElement("input");
    checkInput.setAttribute("type", "checkbox");

    checkInput.addEventListener("click", (e) => {
      if (e.target.checked) {
        // task done
      } else {
        //   task not done
      }
    });

    interactCtn.appendChild(checkInput);
    return newTask;
  }
}

export default Todo;
