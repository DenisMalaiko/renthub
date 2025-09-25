<script setup lang="ts">
import {ref} from "vue";

const counter = ref(0);
const count = () => {
  counter.value++;
}
</script>

<template>
  <div>
    <h3>Comp A {{ counter }}</h3>
    <v-btn @click="count">Count</v-btn>
  </div>
</template>

<style scoped>

</style>