<template>
  <div>
    <h3>V-Model</h3>
    <b>Props + Emit: {{ props.title }}</b>
    <v-text-field :model-value="props.title" @update:model-value="updateTitle"/>
    <b>Define model: {{ description }}</b>
    <v-text-field v-model="description"/>
    <hr><br>

    <h3>Computed</h3>
    <p>Origin: {{ message }}</p>
    <p>Computed: {{ messageComputed }}</p>
    <v-text-field v-model="message"/>
    <hr><br><br>

    <h3>Emit</h3>
    <v-btn @click="click">Click</v-btn>
    <br><hr><br><br><br>

    <h3>Ref/ShallowRef</h3>
    <pre> {{ refValue }} </pre>
    <pre> {{ shallowRefValue }} </pre>
    <v-btn @click="count">Count</v-btn>

  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  shallowRef
} from "vue";


// V-Model
const props = defineProps({ title: String });
const description = defineModel('description');
const emits = defineEmits(['update:title', 'myCustomEvent'])
const updateTitle = (value: string) => {
  emits('update:title', value)
}


// Emit
const click = () => {
  message.value = "Clicked"
  messageComputed.value = "Change By Click"
  emits('myCustomEvent', "Clicked")
}

// Computed
const message = ref("Default")
const messageComputed = computed({
  get: () => String(message.value).toUpperCase(),
  set: (value: string) => {
    message.value = value
  }
});


// Ref / ShallowRef
const refValue = ref({ nested: { count: 1 } });
const shallowRefValue = shallowRef({ nested: { count: 1 } });
const count = () => {
  refValue.value.nested.count++;
  shallowRefValue.value.nested.count++;
}


/*console.log("------")
console.log("Child Created")
console.log("------")
onBeforeMount(() => {
  console.log("------")
  console.log("Child Before Mounted")
  console.log("------")
})
onMounted(() => {
  console.log("------")
  console.log("Child Mounted")
  console.log("------")
});
onBeforeUpdate(() => {
  console.log("------")
  console.log("Child Before Updated")
  console.log("------")
})
onUpdated(() => {
  console.log("------")
  console.log("Child Updated")
  console.log("------")
});
onBeforeUnmount(() => {
  console.log("------")
  console.log("Child Before Unmounted")
  console.log("------")
})
onUnmounted(() => {
  console.log("------")
  console.log("Child Unmounted")
  console.log("------")
})*/
</script>

<style scoped>


</style>