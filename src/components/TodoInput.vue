<script setup lang="ts">
const emit = defineEmits<{
  (e: 'input', item: string): void;
  (e: 'add'): void;
}>();
defineProps<{ item: string }>();

const addTodo = () => {
  emit('add');
};

const handleInput = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  emit('input', target.value);
};
</script>

<template>
  <div>
    <label for="todo-input">오늘 할 일: </label>
    <input
      type="text"
      id="todo-input"
      name="todo-input"
      :value="item"
      @input="handleInput"
      @keyup.enter="addTodo"
    />
    <button type="button" @click="addTodo">추가</button>
  </div>
</template>

<style scoped>
button {
  margin-left: 10px;
}
</style>
