import { Todo } from './types';

const STORAGE_KEY = 'vue-todo-ts';
const Storage = {
  save(todoItems: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
  },
  fetch() {
    const todoItems = localStorage.getItem(STORAGE_KEY) || '[]';
    const result: Todo[] = JSON.parse(todoItems);
    return result;
  },
};

export default Storage;
