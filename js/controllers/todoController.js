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
    console.log('TodoController constructor is running');
  }

  loadTodoList() {
    const storedTodoList = Storage.getList();
    this.todoList.list = storedTodoList;
  }

  initBindings() {
    this.view.addTaskBtn.addEventListener('click', () => this.addTask());
    this.view.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTask();
      }
    });
  }
  renderTodoList() {
    this.view.renderList(this.todoList.list);
  }
  addTask() {
    const taskText = this.view.taskInput.value.trim();

    if(!taskText) {
      return;
    }
    const newTask = this.todoList.addItem(taskText);
    Storage.saveList(this.todoList.list);
    this.view.taskInput.value = "";
    this.view.toggleEmptyContainer(this.todoList.list);
    this.view.renderItem(newTask);
    this.view.taskInput.focus();
    console.log('added a task');
  }
}

