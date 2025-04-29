import { TodoList } from "../models/todoList.js";
import { Storage } from "../models/storage.js";
import { TodoView } from "../views/todoView.js";

export class TodoController {
  constructor() {
    this.todoList = new TodoList();
    this.view = new TodoView();

    this.loadTodoList();

    this.initBindings();

    this.renderTodoList();
  }

  loadTodoList() {
    const storedTodoList = Storage.getList();
    this.todoList.list = storedTodoList;
  }

  initBindings() {
    this.view.addTaskBtn.addEventListener('click', () => this.addTask());
  }
  renderTodoList() {
    this.view.renderList();
  }
}

