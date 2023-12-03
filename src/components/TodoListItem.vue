<script setup lang="ts">
import { toRefs, computed } from 'vue';

import { Todo } from '../types';

const emit = defineEmits<{
  (e: 'remove', idx: number): void;
  (e: 'toggle', idx: number, isDone: boolean): void;
}>();

const props = defineProps<{
  todoItem: Todo;
  index: number;
}>();
const { todoItem, index } = toRefs(props);

// computed
const getTitle = computed(() => todoItem.value.title);
const getDone = computed(() => todoItem.value.done);

const removeItem = () => {
  emit('remove', index.value);
};
const toggleItem = () => {
  emit('toggle', index.value, !getDone.value);
};
</script>

<template>
  <li>
    <span :class="{ done: getDone }" @click="toggleItem">
      {{ getTitle }}
    </span>
    <button type="button" @click="removeItem">X</button>
  </li>
</template>

<style scoped>
span {
  cursor: pointer;
  margin-right: 20px;
}
span.done {
  text-decoration: line-through;
}
</style>
