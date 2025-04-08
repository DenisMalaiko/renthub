<template>
  <div v-for="todo in todos" :key="todo.id" data-test="todo">
    {{ todo.text }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([
  {
    id: 1,
    text: 'Learn Vue.js 2',
    completed: false
  },
  {
    id: 2,
    text: 'Learn Vue.js 3',
    completed: false
  }
])
</script>