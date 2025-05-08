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
    this.view.connectModalToController(this);
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

    this.view.taskContainer.addEventListener('change', e => {
      if (e.target.classList.contains('task-checkbox')) {
        const taskId = e.target.closest('.task-item').dataset.id;
        this.toggleTask(taskId);
      }
    });
    this.view.taskContainer.addEventListener('click', e => {
      const deleteBtn = e.target.closest('.delete-btn');
      if (deleteBtn) {
        const taskId = deleteBtn.closest('.task-item').dataset.id;
        this.removeTask(taskId);
      }
    });
    this.view.taskContainer.addEventListener('click', e => {
      const editBtn = e.target.closest('.edit-btn');
      if (editBtn) {
        const taskId = editBtn.closest('.task-item').dataset.id;
        this.editTask(taskId);
      }
    });
        

  }
  renderTodoList() {
    this.view.renderList(this.todoList.list);
    this.view.updateSummary(this.todoList);
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
    this.view.updateSummary(this.todoList);
    console.log('added a task');
  }
  removeTask(taskId) {
    this.todoList.deleteItem(taskId);
    Storage.saveList(this.todoList.list);
    this.renderTodoList();
  }
  toggleTask(taskId) {
    this.todoList.toggleItem(taskId);
    Storage.saveList(this.todoList.list);
    this.view.updateSummary(this.todoList);
  }
  editTask(taskId) {
    const task = this.todoList.list.find(task => task.id === taskId);
    if (task) {
      this.view.showModal(task, this);
    }
  }
  saveTask(taskId, title) {
    const task = this.todoList.list.find(task => task.id === taskId);
    if (task) {
      task.title = title;
      Storage.saveList(this.todoList.list);
      this.renderTodoList();
    }
  }
}

