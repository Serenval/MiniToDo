export class UIComponents {
  constructor() {
    this.modalContainer = document.getElementById('edit-modal');
    this.inputTaskText = document.getElementById('edit-task-text');
    this.actionCancelBtn = document.getElementById('cancel-btn');
    this.actionSaveBtn = document.getElementById('save-btn');
  }
  static showModal() {
    this.modalContainer.classList.add('show');
  }
  static hideModal() {
    this.modalContainer.classList.remove('show');
  }
}
