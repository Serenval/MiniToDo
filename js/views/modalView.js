export class modalView {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.editInput = this.modal.querySelector('#edit-task-text');
    this.cancelBtn = this.modal.querySelector('#cancel-btn');
    this.closeBtn = this.modal.querySelector('#close-btn');
    this.saveBtn = this.modal.querySelector('#save-btn');
    this.currentTaskId = null;
    this.onSave = null;
    
    this.initBindings();
  }

  initBindings() {
    this.cancelBtn.addEventListener('click', () => this.hide());
    this.closeBtn.addEventListener('click', () => this.hide());
    this.saveBtn.addEventListener('click', () => {
      if (this.onSave) {
        this.onSave(this.currentTaskId, this.getEditedValue());
        this.hide();
      }
    });
  }

  show(task) {
    this.currentTaskId = task.id;
    this.editInput.value = task.title;
    this.modal.classList.add('show');
  }

  hide() {
    this.modal.classList.remove('show');
    this.currentTaskId = null;
    this.editInput.value = '';
  }

  setOnSave(callback) {
    this.onSave = callback;
  }

  getCurrentTaskId() {
    return this.currentTaskId;
  }

  getEditedValue() {
    return this.editInput.value.trim();
  }
}