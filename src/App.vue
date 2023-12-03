<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import _ from 'lodash';

import TodoInput from './components/TodoInput.vue';
import TodoListItem from './components/TodoListItem.vue';

import { Todo } from './types';
import Storage from './storage';

const todoText = ref('');
const todoItems: Todo[] = reactive([]);

const initTodoText = () => {
  todoText.value = '';
};
const updateTodoText = (item: string) => {
  todoText.value = item;
};
const addTodoItem = () => {
  if (chkDupItemTitle(todoText.value)) {
    alert('중복된 할 일이 존재합니다.');
    return;
  }
  const todoItem: Todo = {
    title: todoText.value,
    done: false,
  };
  todoItems.push(todoItem);
  Storage.save(todoItems);
  initTodoText();
};

const removeTodoItem = (idx: number) => {
  todoItems.splice(idx, 1);
  Storage.save(todoItems);
};

const toggleItem = (idx: number, isDone: boolean) => {
  const todoItem: Todo = todoItems[idx];
  todoItems.splice(idx, 1, {
    ...todoItem,
    done: isDone,
  });
  Storage.save(todoItems);
};

const chkDupItemTitle = (title: string) => {
  const result = _.find(todoItems, ['title', title]);
  return !result ? false : true;
};

const fetchLocalStorage = () => {
  todoItems.length = 0;
  const result = Storage.fetch();
  for (const todoItem of result) {
    todoItems.push(todoItem);
  }
};

// watch
watch(todoItems, () => {
  todoItems.sort((a, b): number => {
    const upperA = a.title.toUpperCase();
    const upperB = b.title.toUpperCase();
    if (upperA > upperB) return 1;
    else if (upperA == upperB) return 0;
    else return -1;
  });
});

// mounted
onMounted(() => {
  fetchLocalStorage();
});
</script>

<template>
  <div>
    <header>
      <h1>Vue Todo with Typescript</h1>
    </header>
    <main>
      <TodoInput
        :item="todoText"
        @input="updateTodoText"
        @add="addTodoItem"
      ></TodoInput>
      <TransitionGroup name="fade" tag="ul" class="container">
        <TodoListItem
          v-for="(todoItem, index) in todoItems"
          :key="todoItem.title"
          :todoItem="todoItem"
          :index="index"
          @remove="removeTodoItem"
          @toggle="toggleItem"
        ></TodoListItem>
      </TransitionGroup>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
ul {
  list-style: none;
}
.container {
  position: relative;
}
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* transform: scaleY(0.01) translate(30px, 0); */
  transform: scaleY(0.01);
}
/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  display: block;
  position: relative;
}
</style>
