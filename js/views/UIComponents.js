// Reusable html components
export class UIComponents {
  constructor() {
    // modal container and its components
    this.modalContainer = document.getElementById('edit-modal');
  }
  static showModal() {
    this.modalContainer.classList.add('show');
  }
  static hideModal() {
    this.modalContainer.classList.remove('show');
  }
}
