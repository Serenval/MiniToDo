import { TodoItem } from "./todoItem.js";

export class TodoList {
  constructor() {
    this.list = [];
  }
  
  addItem(title) {
    const id = Date.now().toString();
    const newItem = new TodoItem(id, title, false);
    this.list.push(newItem);
    return newItem;
  }
}