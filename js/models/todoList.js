import { TodoItem } from "./todoItem.js";

export class TodoList {
  constructor() {
    this.list = [];
  }
  
  addItem(title) {
    const id = Date.now().toString();
    const position = this.list.length;
    const newItem = new TodoItem(id, title, false);
    this.list.push(newItem);
    return newItem;
  }

  deleteItem(id) {
    this.list = this.list.filter(item => item.id !== id);
    return this.list;
  }

  getItemById(id) {
    return this.list.find(item => item.id === id);
  }

  toggleItem(id) {
    const item = this.getItemById(id);
    if (item) {
      return item.toggleComplete();
    }
    return null;
  }
  getCompletedItems() {
    return this.list.filter(item => item.completed);
  }
  getActiveItems() {
    return this.list.filter(item => !item.completed);
  }
  getAllItems() {
    return this.list;
  }

  reorderItems(oldIndex, newIndex) {
    const item = this.list.splice(oldIndex, 1)[0];
    this.list.splice(newIndex, 0, item);

    this.list.forEach((item, index) => {
      item.position = index;
    });

    return this.list;
  }
}