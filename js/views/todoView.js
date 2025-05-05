import { UIComponents } from "./UIComponents.js";
export class TodoView {
  constructor() {
    this.taskContainer = document.getElementById('task-container');
    this.taskInput = document.getElementById('task-input');
    this.addTaskBtn = document.getElementById('add-task-btn');
    this.emptyContainer = document.getElementById('empty-state');
  }

  renderList(list) {
    this.taskContainer.innerHTML = "";

    if(list.length === 0) {
      this.emptyContainer.classList.add('show');
      return;
    }
    this.emptyContainer.classList.remove('show');

    list.forEach(item => {
      this.renderItem(item);
    });
  }
  renderItem(item) {
    const htmlItem = document.createElement('li');
    htmlItem.classList.add('todo-item');
    htmlItem.dataset.id = item.id;

    htmlItem.innerHTML = `
      <div class="todo-item-content">
        <input type="checkbox" class="toggle" ${item.completed ? 'checked' : ''}>
        <span class="todo-text">${item.title}</span>
        <input type="text" class="edit-input" value="${item.title}">
      </div>
    `;
    this.taskContainer.appendChild(htmlItem);
  }
}
