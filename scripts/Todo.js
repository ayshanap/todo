class Todo {
  constructor(task, list) {
    (this.task = task), (this.todoList = list);
    // (this.id = task.id),
    //   (this.name = task.name),
    //   (this.description = task.description),
    //   (this.createAt = task.createAt),
    //   (this.deadline = task.deadline),
    //   (this.priority = task.priority),
    //   (this.taskDone = task.taskDone),
    //   (this.todoList = list);
  }

  init(ctn) {
    const todoMain = document.createElement("div");
    todoMain.classList.add("todo-main");
    todoMain.dataset.id = this.task.id;
    todoMain.dataset.completed = this.task.taskDone;
    ctn.appendChild(todoMain);

    const checkInput = document.createElement("input");
    checkInput.setAttribute("type", "checkbox");
    checkInput.classList.add("check");

    if (this.task.taskDone) {
      checkInput.checked = true;
    } else {
      checkInput.checked = false;
    }

    checkInput.addEventListener("click", (e) => {
      const taskInDom = this.getTaskElement(this.task.id);
      const taskInObj = this.todoList.list.find(
        (elem) => elem.id === this.task.id
      );
      taskInDom.remove();

      let taskCtn;
      if (e.target.checked) {
        taskInObj.taskDone = true;
        taskCtn = document.querySelector("#completed-todos-ctn");
      } else {
        taskInObj.taskDone = false;
        taskCtn = document.querySelector("#active-todos-ctn");
      }

      this.init(taskCtn);

      this.todoList.setNumberOfTaskLeft(this.todoList.list);
    });
    todoMain.appendChild(checkInput);

    const taskName = document.createElement("h2");
    taskName.innerText = this.task.name;
    todoMain.appendChild(taskName);

    const delBtn = document.createElement("span");
    delBtn.classList.add("delBtn");
    delBtn.innerText = "X";
    todoMain.appendChild(delBtn);

    delBtn.addEventListener("click", () => {
      const itemForDelete = this.getTaskElement(this.task.id);
      itemForDelete.remove();
      this.todoList.removeTask(this.task.id);
      if (!this.task.taskDone) {
        this.todoList.setNumberOfTaskLeft(this.todoList.list);
      }
    });

    //   activeTodosCtn, completedTodosCtn;
    // <div class="todo-main active">
    //       <input type="radio" class="check" />
    //       <h2>Feed the cat</h2>
    //       <a class="delBtn" href="">X</a>
    //     </div>
    //     <div class="todo-descr active">
    //       <p>Lorem ipsum dolor sit amet</p>
    //       <div class="details-mobile">
    //         <ul>
    //           <li>Prio: 1</li>
    //           <li>Created: 2022.02.02</li>
    //           <li>Deadline: 2022.03.01</li>
    //         </ul>
    //         <button class="editBtn">Edit</button>
    //       </div>
    //     </div>

    // const createBtn = (title) => {
    //   const btn = document.createElement("span");
    //   btn.classList.add(`${title}-btn`);
    //   btn.innerText = title;
    //   return btn;
    // };

    // const editBtn = createBtn("edit");
    // interactCtn.appendChild(editBtn);
    // editBtn.addEventListener("click", () => {
    //edit modal apeare, fields filled with task data
    // });

    // const delBtn = createBtn("delete");
    // interactCtn.appendChild(delBtn);

    // interactCtn.appendChild(checkInput);
    return todoMain;
  }

  getTaskElement(taskId) {
    const todoList = [...document.querySelectorAll(".todo-main")];
    return todoList.find((task) => parseFloat(task.dataset.id) === taskId);
  }
}

export default Todo;
