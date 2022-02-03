import Todo from "./Todo.js";

class TodoList {
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

  removeTask(id) {
    const taskId = this.list.findIndex((task) => task.id === id);
    this.list.splice(taskId, 1);
  }

  orderBy(category) {
    const categoryValues = this.list.map((task) => task[category]);
  }
}

const myTodo = new TodoList([
  {
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

myTodo.init();
myTodo.orderBy("priority");

export default TodoList;
