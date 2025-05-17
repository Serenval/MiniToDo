export class TodoItem {
  constructor(id, title, completed = false, position) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.position = position;
    this.createdAt = new Date();
  }

  toggleComplete() {
    this.completed = !this.completed;
    return this.completed;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      position: this.position,
      createdAt: this.createdAt ,
    }
  }
}