import Todo from "./Todo.js";

class TodoList {
  constructor(list, date, lastID) {
    this.list = list;
    this.date = date;
    this.lastID = lastID;
  }

  init() {
    console.log();
    const date = document.querySelector("#date");
    date.innerHTML = `${this.getDate(this.date)}<br />${this.getToday()}`;

    const newTodoBtns = document.querySelectorAll(".newBtn");
    newTodoBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        const newTodoModal = document.querySelector(".modal-new");

        if (newTodoModal.classList.value.includes("inactive")) {
          newTodoModal.classList.remove("inactive");
        }
      })
    );

    this.setNumberOfTaskLeft(this.list);

    this.renderList(this.list);

    this.initFilters();
    this.initNewTodoModal();
  }

  getDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const setTwoDigit = (value) => {
      return value < 10 ? "0" + value : value;
    };
    return `${year}.${setTwoDigit(month)}.${setTwoDigit(day)}`;
  }

  getToday() {
    return this.date.toLocaleDateString("en-En", { weekday: "long" });
  }

  setNumberOfTaskLeft(todoList) {
    const getNumberOfTaskLeft = () => {
      if (!todoList.length) {
        return 0;
      }

      return todoList.filter((item) => item.taskDone === false).length;
    };

    const todoItemsLeft = document.querySelector("#todo-items-left");
    todoItemsLeft.innerText = `You have ${getNumberOfTaskLeft(
      todoList
    )} pending items.`;
  }

  renderList(listObj) {
    const activeTodosCtn = document.querySelector(".container-active");
    const completedTodosCtn = document.querySelector(".container-completed");
    activeTodosCtn.innerText = "";
    completedTodosCtn.innerText = "";
    listObj.forEach((task) => this.createTask(task));
  }

  createTask(task) {
    const activeTodosCtn = document.querySelector(".container-active");
    const completedTodosCtn = document.querySelector(".container-completed");
    task.taskDone
      ? new Todo(task, this).init(completedTodosCtn)
      : new Todo(task, this).init(activeTodosCtn);
  }

  removeTask(id) {
    const taskId = this.list.findIndex((task) => task.id === id);
    this.list.splice(taskId, 1);
  }

  // orderBy(category) {
  //   const categoryValues = this.list.map((task) => task[category]);
  // }

  initFilters() {
    const filterBtns = document.querySelectorAll(".filterBtn");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const datasetValue = btn.dataset.taskdone;

        const activeTodosCtn = document.querySelector(".container-active");
        const completedTodosCtn = document.querySelector(
          ".container-completed"
        );

        const removeInactiveClass = (ctn) => {
          if (ctn.classList.value.includes("inactive")) {
            ctn.classList.remove("inactive");
          }
        };

        const addInactiveClass = (ctn) => {
          if (!ctn.classList.value.includes("inactive")) {
            ctn.classList.add("inactive");
          }
        };

        if (datasetValue === "") {
          removeInactiveClass(activeTodosCtn);
          removeInactiveClass(completedTodosCtn);
        }

        if (datasetValue === "false") {
          removeInactiveClass(activeTodosCtn);
          addInactiveClass(completedTodosCtn);
        }

        if (datasetValue === "true") {
          removeInactiveClass(completedTodosCtn);
          addInactiveClass(activeTodosCtn);
        }
      });
    });
  }

  initNewTodoModal() {
    const newTodoModal = document.querySelector(".modal-new");
    const newTodoName = document.querySelector("#newTodoName");
    const newTodoDescription = document.querySelector("#newTodoDescription");
    const newTodoDeadline = document.querySelector("#newTodoDeadline");
    const prioSelector = document.querySelector("#prioSelector");
    const createNewTodoModalBtn = document.querySelector(
      "#createNewTodoModalBtn"
    );
    const modalCancel = document.querySelector(".modalCancel");

    console.log(newTodoName);
    const validateForm = (fieldsForValidate) => {
      fieldsForValidate.forEach((field) => console.log(field.value));
    };

    createNewTodoModalBtn.addEventListener("click", () => {
      validateForm([newTodoName, newTodoDeadline, prioSelector]); // Validation need to solve
      console.log();
      this.lastID++;

      this.list.push({
        id: this.lastID,
        name: newTodoName.value,
        description: newTodoDescription.value,
        createAt: Date.parse(this.date),
        deadline: Date.parse(newTodoDeadline.value),
        priority: prioSelector.value,
        taskDone: false,
      });

      newTodoModal.classList.add("inactive");
      this.renderList(this.list);
    });
  }
}

const data = {
  todoList: [
    {
      id: 1,
      name: "todo1",
      description: "todo1 leírás",
      createAt: 1313174400000,
      deadline: 1813174400000,
      priority: 1,
      taskDone: true,
    },
    {
      id: 5,
      name: "todo5",
      description: "todo5 leírás",
      createAt: 1513174400000,
      deadline: 1813174400000,
      priority: 1,
      taskDone: false,
    },
    {
      id: 2,
      name: "todo2",
      description: "todo2 leírás",
      createAt: 1613174400000,
      deadline: 1713174400000,
      priority: 2,
      taskDone: true,
    },
    {
      id: 3,
      name: "todo3",
      description: "todo3 leírás",
      createAt: 1234483200000,
      deadline: 1134483200000,
      priority: 3,
      taskDone: false,
    },
  ],
  lastID: 5,
};

const myTodo = new TodoList(data.todoList, new Date(), data.lastID);

myTodo.init();
// myTodo.orderBy("priority");

export default TodoList;
