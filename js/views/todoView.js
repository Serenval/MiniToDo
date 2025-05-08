import { modalView } from './modalView.js';
export class TodoView {
  constructor() {
    this.taskContainer = document.getElementById('task-container');
    this.taskInput = document.getElementById('task-input');
    this.addTaskBtn = document.getElementById('add-task-btn');
    this.emptyContainer = document.getElementById('empty-state');
    this.summaryContainer = document.getElementById('summary-container');
    
    this.modal = new modalView('edit-modal');
  }

  // Observer Pattern
  connectModalToController(todoController) {
    this.modal.setOnSave((taskId, newTitle) => {
      todoController.saveTask(taskId, newTitle);
    });
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

  updateSummary(todoListView) {
    const list = todoListView.list;
    if(list.length === 0) {
      this.summaryContainer.classList.remove('show');
      return;
    }
    this.summaryContainer.classList.add('show');
    const totalTasks = list.length;
    const completedTasks = todoListView.getCompletedItems().length;
    const activeTasks = totalTasks - completedTasks;

    this.summaryContainer.innerHTML = `
      ${totalTasks} total task${totalTasks !== 1 ? 's' : ''} • 
      ${completedTasks} completed • 
      ${activeTasks} remaining
    `;

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
      <div class="task-actions">
        <button class="task-btn edit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="task-btn delete-btn">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
         </svg>
        </button>
      </div>
    `;
    this.taskContainer.appendChild(htmlItem);
  }

  showModal(task) {
    this.modal.show(task);
  }
}
