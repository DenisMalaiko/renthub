<script setup lang="ts">
import TestComponent from "~/components/TestComponent/TestComponent.vue";
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from "vue";

const title = ref("title");
const description = ref("description");

const testClick = () => {
  console.log("TEST CLICK")
}

console.log("------")
console.log("Index Created")
console.log("------")

onBeforeMount(() => {
  console.log("------")
  console.log("Index Before Mounted")
  console.log("------")
})

onMounted(() => {
  console.log("------")
  console.log("Index Mounted")
  console.log("------")
});

onBeforeUpdate(() => {
  console.log("------")
  console.log("Index Before Updated")
  console.log("------")
})

onUpdated(() => {
  console.log("------")
  console.log("Index Updated")
  console.log("------")
});

onBeforeUnmount(() => {
  console.log("Index Before Unmounted")
})

onUnmounted(() => {
  console.log("Index Unmounted")
})
</script>

<template>
  <section class="mt-10 pt-10">
    <v-container class="px-0 mt-10">
      <v-row>
        <v-col cols="12">
          <p>Parent title: {{ title }}</p>
          <p>Parent description: {{ description }}</p>
        </v-col>

        <v-col cols="12">
          <TestComponent
            v-model:title="title"
            v-model:description="description"
            @myCustomEvent="testClick"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>

</style>