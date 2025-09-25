<script setup lang="ts">
import { ref } from "vue"

const data = ref<string | null>(null)

async function fetchData() {
  return new Promise<string>(resolve =>
      setTimeout(() => resolve("Hello from async setup!"), 5000)
  )
}

const result = await fetchData()

console.log(result)
</script>

<template>
  <div>
    <p>DATA: {{ result }}</p>
  </div>
</template>

<style scoped>

</style>