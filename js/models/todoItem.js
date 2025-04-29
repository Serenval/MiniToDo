export class TodoItem {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed
    }
  }
}