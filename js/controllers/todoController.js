import { TodoList } from "../models/todoList.js";
import { Storage } from "../models/storage.js";
import { TodoView } from "../views/todoView.js";

export class TodoController {
  constructor() {
    this.todoList = new TodoList();
    this.view = new TodoView();
    this.settings = null;
    this.loadTodoList();
    this.initBindings();
    this.loadTheme();
    this.renderTodoList();
    this.view.connectModalToController(this);
    this.view.connetDialogueToController(this);
    this.initDragAndDrop();
  }

  loadTodoList() {
    let list;
    if (this.isFirstRun()) {
      list = Storage.getSampleTasks();
      Storage.saveList(list);
      // Update settings
      this.settings.firstRun = false;
      Storage.saveSettings(this.settings);
    } else {
      list = Storage.getList();
    }
    this.todoList.list = list.sort((a, b) => a.position - b.position);
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
        this.view.showConfirmDialogue(taskId);
      }
    });
    this.view.taskContainer.addEventListener('click', e => {
      const editBtn = e.target.closest('.edit-btn');
      if (editBtn) {
        const taskId = editBtn.closest('.task-item').dataset.id;
        this.editTask(taskId);
      }
    });

    this.view.filterBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        
        this.view.filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.filterTasks(e.target.dataset.filter);
      });
    });

    this.view.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (query) {
        this.view.searchText = query;
        this.renderTodoList();
      } else {
        this.view.searchText = "";
        this.renderTodoList();
      }
    });
    this.view.themeToggle.addEventListener('click', () => {
      this.switchTheme();
    });
  }

  filterTasks(filter) {
    this.view.currentFilter = filter;
    this.renderTodoList();
  }

  renderTodoList() {
    let list;
    const sortedList = [...this.todoList.list].sort((a, b) => a.position - b.position);
    
    switch (this.view.currentFilter) {
      case 'active':
        list = sortedList.filter(item => !item.completed);
        break;
      case 'completed':
        list = sortedList.filter(item => item.completed);
        break;
      default:
        list = sortedList;
    }

    if (this.view.searchText.length > 0) {
      list = this.searchItems(this.view.searchText, list);
    }
    
    this.view.renderList(list);
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
    this.renderTodoList();
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

  searchItems(query, list) {
    const queryText = query.toLowerCase();
    return list.filter(item => item.title.toLowerCase().includes(queryText));
  }

  initDragAndDrop() {
    this.view.initDragAndDrop();
    this.view.onReorder = (oldIndex, newIndex) => {
      console.log(`Controller reordering: ${oldIndex} -> ${newIndex}`);
      this.todoList.reorderItems(oldIndex, newIndex);
      Storage.saveList(this.todoList.list);
      this.renderTodoList();
    }
  }

  loadTheme() {
    const settings = Storage.getSettings();
    this.settings = settings;
    console.log(`loading theme: ${settings.theme}`);
    if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
  }

  switchTheme() {
    const currentTheme = this.settings.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.settings.theme = newTheme;
    
    if (newTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
    
    console.log(`Theme switched to: ${newTheme}`);
    Storage.saveSettings(this.settings);
  }

  isFirstRun() {
    const settings = Storage.getSettings();
    this.settings = settings;
    // Check if it's first run
    if (settings.firstRun === true) {
      return true;
    }
    return false;
  }
}