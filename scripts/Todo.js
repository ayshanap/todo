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
      const taskInDom = Todo.getTaskElement(this.task.id);
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
      const itemForDelete = Todo.getTaskElement(this.task.id);
      itemForDelete.remove();
      this.removeTask(this.task.id);
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
               <li>Created: ${this.todoList.getFormatedDate(
                 new Date(this.task.createAt),
                 "."
               )}</li>
               <li>Deadline: ${this.todoList.getFormatedDate(
                 new Date(this.task.deadline),
                 "."
               )}</li>
             </ul>`;

    todoDescr.appendChild(detailsCtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Edit";

    editBtn.addEventListener("click", () => {
      const editTodoModal = document.querySelector(".modal-new");
      editTodoModal.style.top = `${window.scrollY}px`;
      editTodoModal.dataset.type = "edit";
      editTodoModal.dataset.taskid = this.task.id;
      const newTodoModalTitle = document.querySelector(".newTodoModalTitle");
      newTodoModalTitle.innerText = "Edit Todo";

      const editTodoName = document.querySelector("#newTodoName");
      editTodoName.value = this.task.name;

      const editTodoDescription = document.querySelector("#newTodoDescription");
      editTodoDescription.value = this.task.description;

      const editTodoDeadline = document.querySelector("#newTodoDeadline");

      editTodoDeadline.value = this.todoList.getFormatedDate(
        new Date(this.task.deadline),
        "-"
      );
      const prioSelector = document.querySelector("#prioSelector");
      prioSelector.value = this.task.priority;

      const createNewTodoModalBtn = document.querySelector(
        "#createNewTodoModalBtn"
      );
      createNewTodoModalBtn.innerText = "Edit";
      editTodoModal.classList.remove("inactive");
      const body = document.querySelector("body");
      body.classList.add("modalActive");
    });

    detailsCtn.appendChild(editBtn);
    return todoMain;
  }

  removeTask(id) {
    const taskId = this.todoList.list.findIndex((task) => task.id === id);
    this.todoList.list.splice(taskId, 1);
  }

  static editTodo(domElement, todoObj, getFormatedDate) {
    domElement.children[0].children[1].innerText = todoObj.name;
    domElement.children[1].children[0].innerText = todoObj.description;
    domElement.children[1].children[1].children[0].children[0].innerHTML = `Prio: ${todoObj.priority}`;
    domElement.children[1].children[1].children[0].children[2].innerHTML = `Deadline: ${getFormatedDate(
      new Date(todoObj.deadline),
      "."
    )}`;
  }

  static getTaskElement(taskId) {
    const todoList = [...document.querySelectorAll(".todo")];
    return todoList.find((task) => parseFloat(task.dataset.id) === taskId);
  }
}

export default Todo;
