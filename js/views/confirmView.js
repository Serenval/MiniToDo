export class confirmView {
  constructor(dialogueId) {
    this.dialogue = document.getElementById(dialogueId);
    this.message = this.dialogue.querySelector('#dialogue-message');
    this.cancelBtn = this.dialogue.querySelector('.cancel-btn');
    this.confirmBtn = this.dialogue.querySelector('.save-btn');
    this.currentTaskId = null;
    this.onConfirm = null;
    this.initBindings();
  }

  initBindings() {
    this.cancelBtn.addEventListener('click', () => this.hide());
    this.confirmBtn.addEventListener('click', () => {
      if (this.onConfirm) {
        this.onConfirm(this.currentTaskId);
        this.hide();
      }
    });
  }

  show(taskId) {
    this.currentTaskId = taskId;
    this.message.textContent = 'Are you sure you want to delete this task?';
    this.dialogue.classList.add('show');
  }

  hide() {
    this.dialogue.classList.remove('show');
    this.currentTaskId = null;
  }

  setOnConfirm(callback) {
    this.onConfirm = callback;
  }

}