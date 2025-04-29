import { TodoItem } from "./todoItem.js";

export class Storage {
  static saveList(list) {
    localStorage.setItem('list', JSON.stringify(list));
  }

  static getList() {
    const jsonList = localStorage.getItem('list');

    if (!jsonList) return [];

    // Parse and return ToDo item objects
    const itemObjects = JSON.parse(jsonList);
    return itemObjects.map(object => {
      const todoItem = new TodoItem(
        object.id,
        object.title,
        object.completed
      );
      return todoItem;
    });
  }
  static clearList() {
    localStorage.removeItem('list');
  }
}