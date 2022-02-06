class Todo {
  constructor(task, list) {
    (this.task = task), (this.todoList = list);
    // (this.id = task.id),
  }

  init(ctn) {
    const todoCtn = document.createElement("div");
    todoCtn.classList.add("todo");
    todoCtn.classList.add("active"); //later not needed
    todoCtn.dataset.id = this.task.id;
    ctn.prepend(todoCtn);

    const todoMain = document.createElement("div");
    todoMain.classList.add("todo-main");
    todoMain.classList.add("active"); //later not needed
    todoMain.dataset.completed = this.task.taskDone;
    todoCtn.appendChild(todoMain);

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
      console.log(taskInDom);
      const taskInObj = this.todoList.list.find(
        (elem) => elem.id === this.task.id
      );
      taskInDom.remove();

      let taskCtn;
      if (e.target.checked) {
        taskInObj.taskDone = true;
        taskCtn = document.querySelector(".container-completed");
      } else {
        taskInObj.taskDone = false;
        taskCtn = document.querySelector(".container-active");
      }

      this.init(taskCtn);

      this.todoList.setNumberOfTaskLeft(this.todoList.list);
    });

    todoMain.appendChild(checkInput);

    const taskName = document.createElement("h2");
    taskName.classList.add("todoName");
    taskName.innerText = this.task.name;
    todoMain.appendChild(taskName);

    const delBtn = document.createElement("a");
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

    const todoDescr = document.createElement("div");
    todoDescr.classList = "todo-descr active";
    todoCtn.appendChild(todoDescr);

    const description = document.createElement("p");
    description.innerText = this.task.description;

    todoDescr.appendChild(description);

    const detailsCtn = document.createElement("div");
    detailsCtn.classList.add("details-mobile");

    detailsCtn.innerHTML = `<ul>
               <li>Prio: ${this.task.priority}</li>
               <li>Created: ${this.todoList.getDate(
                 new Date(this.task.createAt)
               )}</li>
               <li>Deadline: ${this.todoList.getDate(
                 new Date(this.task.deadline)
               )}</li>
             </ul>`;

    todoDescr.appendChild(detailsCtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Edit";

    editBtn.addEventListener("click", () => {});
    detailsCtn.appendChild(editBtn);
    return todoMain;
  }

  getTaskElement(taskId) {
    const todoList = [...document.querySelectorAll(".todo")];
    return todoList.find((task) => parseFloat(task.dataset.id) === taskId);
  }
}

export default Todo;
