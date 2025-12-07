<script setup lang="ts">
import {defineProps, defineEmits, onBeforeMount, onMounted} from 'vue'
import type { User } from "~/pages/Review/interfaces/User";
import fetch from "cross-fetch";

const props = defineProps<{
  user: User
}>();

const emit = defineEmits<{
  (event: 'sendForm', user: User): void;
}>();

const submit = () => {
  emit('sendForm', props.user);
}

const todo = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json())

onBeforeMount(() => {
  console.log("ON BEFORE MOUNT CHILD")
});

onMounted(() => {
  console.log("ON MOUNTED CHILD")
});
</script>

<template>
  <div>
    <b>Child Component</b>

    <pre> {{ todo }} </pre>

    <v-form @submit.prevent="submit">
      <v-text-field v-model.trim="user.name" label="Name"></v-text-field>

      <v-text-field v-model.trim="user.email" label="Email"></v-text-field>

      <v-text-field v-model.number="user.age" label="Age"></v-text-field>

      <v-text-field v-model.number="user.location.country" label="Country"></v-text-field>

      <v-text-field v-model.number="user.location.city" label="City"></v-text-field>

      <v-btn type="submit">Submit</v-btn>

      <div id="alert"></div>
    </v-form>
  </div>
</template>

<style scoped>

</style>