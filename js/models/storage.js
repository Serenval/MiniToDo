import { TodoItem } from "./todoItem.js";
import { Settings } from "./settings.js";

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
        object.completed,
        object.position,
      );
      todoItem.createdAt = new Date(object.createdAt);
      return todoItem;
    });
  }
  static clearList() {
    localStorage.removeItem('list');
  }

  static getSampleTasks() { 
      const sampleList = [ 
          {
              id: '1',
              title: 'Welcome to Minimal Tasks! Click the checkbox to complete a task.',
              completed: false,
              position: 0,
              createdAt: new Date()
          },
          {
              id: '2',
              title: 'Add a new task using the input field above',
              completed: false,
              position: 1,
              createdAt: new Date()
          },
          {
              id: '3',
              title: 'Try using the search and filter options',
              completed: true,
              position: 2,
              createdAt: new Date()
          }
      ];
      return sampleList.map(item => {
          const todoItem = new TodoItem(
              item.id,
              item.title,
              item.completed,
              item.position
          );
          todoItem.createdAt = item.createdAt;
          return todoItem;
      });
  }

  static getSettings() {
    const jsonSettings = localStorage.getItem('settings');
    
    if (!jsonSettings) {
      // Return a new Settings object with defaults
      return new Settings('light', true);
    }

    const settingsObj = JSON.parse(jsonSettings);
    return new Settings(
      settingsObj.theme,
      settingsObj.firstRun
    );
  }
  static saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings.toJson()));
  }
}