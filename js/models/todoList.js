import { TodoItem } from "./todoItem.js";

export class TodoList {
  constructor() {
    this.list = [];
  }
  
  addItem(title) {
    const id = Date.now().toString();
    const position = this.list.length;
    const newItem = new TodoItem(id, title, false, position);
    this.list.push(newItem);
    return newItem;
  }

  deleteItem(id) {
    this.list = this.list.filter(item => item.id !== id);
    this.updatePositions();
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
    if (oldIndex < 0 || oldIndex >= this.list.length || 
        newIndex < 0 || newIndex >= this.list.length) {
      console.error("Invalid index in reorderItems", oldIndex, newIndex);
      return this.list;
    }
    const itemToMove = this.list[oldIndex];
    
    this.list.splice(oldIndex, 1);
    this.list.splice(newIndex, 0, itemToMove);
    this.updatePositionsFromArray();
    
    return this.list;
  }
  
  updatePositionsFromArray() {
    this.list.forEach((item, index) => {
      const originalItem = this.getItemById(item.id);
      if (originalItem) {
        originalItem.position = index;
      }
    });
  }
  
  updatePositions() {
    const sortedList = [...this.list].sort((a, b) => a.position - b.position);
    sortedList.forEach((item, index) => {
      item.position = index;
    });
  }
}