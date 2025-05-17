import { modalView } from './modalView.js';
import { confirmView } from './confirmView.js';
export class TodoView {
  constructor() {
    this.taskContainer = document.getElementById('task-container');
    this.taskInput = document.getElementById('task-input');
    this.addTaskBtn = document.getElementById('add-task-btn');
    this.emptyContainer = document.getElementById('empty-state');
    this.summaryContainer = document.getElementById('summary-container');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.searchInput = document.getElementById('search-input');
    this.currentFilter = null;
    this.searchText = "";
    this.onReorder = null;
    this.draggedItem = null;
    
    this.modal = new modalView('edit-modal');
    this.dialogue = new confirmView('confirm-dialogue');
  }

  // Observer Pattern for Modal and Dialogue Confirm
  connectModalToController(todoController) {
    this.modal.setOnSave((taskId, newTitle) => {
      todoController.saveTask(taskId, newTitle);
    });
  }
  connetDialogueToController(todoController) {
    this.dialogue.setOnConfirm((taskId) => {
      todoController.removeTask(taskId);
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

  initDragAndDrop() {
    this.taskContainer.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.taskContainer.addEventListener('dragenter', this.handleDragEnter.bind(this));
    this.taskContainer.addEventListener('dragover', this.handleDragOver.bind(this));
    this.taskContainer.addEventListener('dragleave', this.handleDragLeave.bind(this));
    this.taskContainer.addEventListener('drop', this.handleDrop.bind(this));
    this.taskContainer.addEventListener('dragend', this.handleDragEnd.bind(this));
  }

  handleDragStart(e) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    this.draggedItem = taskItem;
    taskItem.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData('text/plain', taskItem.dataset.id);
  }

  handleDragEnter(e) {
    e.preventDefault();
    const taskItem = e.target.closest('.task-item');
    if (taskItem && taskItem !== this.draggedItem) {
      document.querySelectorAll('.task-item.drag-over').forEach(item => {
        if (item !== taskItem) {
          item.classList.remove('drag-over');
        }
      });
      taskItem.classList.add('drag-over');
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  handleDragLeave(e) {
    e.preventDefault();
    const taskItem = e.target.closest('.task-item');
    const relatedTarget = e.relatedTarget;
    if (taskItem && !taskItem.contains(relatedTarget)) {
      taskItem.classList.remove('drag-over');
    }
  }

  handleDrop(e) {
    e.preventDefault();

    if (this.onReorder && this.draggedItem) {
      const taskItems = Array.from(this.taskContainer.querySelectorAll('.task-item'));
      const oldIndex = taskItems.indexOf(this.draggedItem);
      const targetItem = e.target.closest('.task-item');
      
      if (targetItem && targetItem !== this.draggedItem) {
        
        let newIndex = taskItems.indexOf(targetItem);
        targetItem.parentNode.insertBefore(this.draggedItem, targetItem);

        if (oldIndex !== newIndex) {
          console.log(`Reordering from ${oldIndex} to ${newIndex}`);
          this.onReorder(oldIndex, newIndex);
        }
      }
    }
  }

  handleDragEnd(e) {
    if (this.draggedItem) {
      this.draggedItem.classList.remove('dragging');
      this.draggedItem = null;
    }
    document.querySelectorAll('.task-item.drag-over').forEach(item => {
      item.classList.remove('drag-over');
    });
  }

  renderItem(item) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const htmlItem = document.createElement('li');
    htmlItem.classList.add('task-item');
    htmlItem.dataset.id = item.id;
    htmlItem.draggable = true;
    htmlItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${item.completed ? 'checked' : ''}>
      <div class="task-content">
        <div class="task-text">${item.title}</div>
        <div class="task-meta">${item.createdAt.toLocaleDateString('en-US', options)}</div>
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

  showConfirmDialogue(taskId) {
    this.dialogue.show(taskId);
  }
}
