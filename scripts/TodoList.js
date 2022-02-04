import Todo from "./Todo.js";

class TodoList {
<<<<<<< HEAD
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
=======
    constructor(list) {
        this.list = list;
    }

    init() {
        this.renderList(this.list);
    }

    renderList(listObj) {
        const todoListCtn = document.querySelector(".todo-list-ctn");
        todoListCtn.innerText = "";
        listObj.forEach((task) => this.addNewTask(task, todoListCtn));
    }

    addNewTask(task, ctn) {
        ctn.appendChild(new Todo(task, this).init());
    }
>>>>>>> a04644533daedf9a3c177d8015ec311349dab5ca

    removeTask(id) {
        const taskId = this.list.findIndex((task) => task.id === id);
        this.list.splice(taskId, 1);
    }

    orderBy(category) {
        const categoryValues = this.list.map((task) => task[category]);
    }
}

<<<<<<< HEAD
const data = [
  {
    id: 1,
    name: "todo1",
    description: "todo1 leírás",
    createAt: "2020.02.02",
    deadline: "2022.03.01",
    priority: 1,
    taskDone: true,
  },
  {
    id: 5,
    name: "todo5",
    description: "todo5 leírás",
    createAt: "2020.02.07",
    deadline: "2022.03.30",
    priority: 1,
    taskDone: false,
  },
  {
    id: 2,
    name: "todo2",
    description: "todo2 leírás",
    createAt: "2020.02.01",
    deadline: "2022.03.07",
    priority: 2,
    taskDone: true,
  },
  {
    id: 3,
    name: "todo3",
    description: "todo3 leírás",
    createAt: "2020.02.04",
    deadline: "2022.03.12",
    priority: 3,
    taskDone: false,
  },
];

const myTodo = new TodoList(data, new Date());
=======
const myTodo = new TodoList([{
        id: 1,
        name: "todo1",
        description: "todo1 leírás",
        createAt: "2020.02.02",
        deadline: "2022.03.01",
        priority: 1,
    },
    {
        id: 5,
        name: "todo5",
        description: "todo5 leírás",
        createAt: "2020.02.07",
        deadline: "2022.03.30",
        priority: 1,
    },
    {
        id: 2,
        name: "todo2",
        description: "todo2 leírás",
        createAt: "2020.02.01",
        deadline: "2022.03.07",
        priority: 2,
    },
    {
        id: 3,
        name: "todo3",
        description: "todo3 leírás",
        createAt: "2020.02.04",
        deadline: "2022.03.12",
        priority: 3,
    },
]);
>>>>>>> a04644533daedf9a3c177d8015ec311349dab5ca

myTodo.init();
myTodo.orderBy("priority");

export default TodoList;