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
                    <div class="item todoName">${this.name}</div>
                    <div class="item todoDescription">${this.description}</div>
                    <div class="item todoCreated">${this.createAt}</div>
                    <div class="item todoDeadline">${this.deadline}</div>
                    <div class="item todoPriority">${this.priority}</div>
        `;



        const createBtn = (allClass, title) => {
            const btn = document.createElement("div");
            btn.classList.add(`${title}-btn`);
            let classes = allClass.split(" ");
            classes.forEach(element => btn.classList.add(element));
            btn.innerText = title;
            return btn;
        };

        const editBtn = createBtn("item todoControl todoEdit", "edit");
        newTask.appendChild(editBtn);
        editBtn.addEventListener("click", () => {
            //edit modal apeare, fields filled with task data
        });

        const delBtn = createBtn("item todoControl todoDelete", "X");
        newTask.appendChild(delBtn);
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
        checkInput.classList.add("item");
        checkInput.classList.add("todoControl");
        checkInput.classList.add("todoUnDone");
        checkInput.setAttribute("type", "checkbox");

        checkInput.addEventListener("click", (e) => {
            if (e.target.checked) {
                // task done
            } else {
                //   task not done
            }
        });

        newTask.appendChild(checkInput);
        return newTask;
    }
}

export default Todo;