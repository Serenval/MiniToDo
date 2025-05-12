export class TodoItem {
  constructor(id, title, completed = false, position) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.position = position;
  }

  toggleComplete() {
    this.completed = !this.completed;
    return this.completed;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed
    }
  }
}