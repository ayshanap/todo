import Todo from "./Todo.js";

class TodoList {
  constructor(list, date) {
    this.list = list;
    this.date = date;
  }

  init() {
    const date = document.querySelector("#date");
    date.innerHTML = `${this.getDate()}<br />${this.getToday()}`;

    const newTodoBtn = document.querySelector("#newBtn");
    newTodoBtn.addEventListener("click", () => {});

    this.setNumberOfTaskLeft(this.list);

    this.renderList(this.list);
  }

  getDate() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
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
    const activeTodosCtn = document.querySelector("#active-todos-ctn");
    const completedTodosCtn = document.querySelector("#completed-todos-ctn");
    activeTodosCtn.innerText = "";
    completedTodosCtn.innerText = "";
    listObj.forEach((task) =>
      this.createTask(task, activeTodosCtn, completedTodosCtn)
    );
  }

  createTask(task) {
    const activeTodosCtn = document.querySelector("#active-todos-ctn");
    const completedTodosCtn = document.querySelector("#completed-todos-ctn");
    task.taskDone
      ? new Todo(task, this).init(completedTodosCtn)
      : new Todo(task, this).init(activeTodosCtn);
  }

    removeTask(id) {
        const taskId = this.list.findIndex((task) => task.id === id);
        this.list.splice(taskId, 1);
    }

    orderBy(category) {
        const categoryValues = this.list.map((task) => task[category]);
    }
}

const myTodo = new TodoList(data, new Date());

myTodo.init();
myTodo.orderBy("priority");

export default TodoList;
