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
    this.toggleEmptyContainer(list);
    list.forEach(item => {
      this.renderItem(item);
    });
  }

  toggleEmptyContainer(list) {
    if(list.length === 0) {
      this.emptyContainer.classList.add('show');
      return;
    }
    this.emptyContainer.classList.remove('show');
  }

  renderItem(item) {
    const htmlItem = document.createElement('li');
    htmlItem.classList.add('task-item');
    htmlItem.dataset.id = item.id;

    htmlItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${item.completed ? 'checked' : ''}>
      <div class="task-content">
        <div class="task-text">${item.title}</div>
        <div class="task-meta">Created at 00:00:</div>
      </div>
    `;
    this.taskContainer.appendChild(htmlItem);
  }
}
