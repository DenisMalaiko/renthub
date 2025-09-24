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
    <br><hr><br><br><br><br><br>


    <h3>To DO List</h3>
    <ul>
      <li
        v-for="item in arr"
        :key="item.id"
        v-memo="[item.done]"
        class="mb-2 d-flex justify-lg-space-between"
        style="width: 500px"
      >
        <div>
          <b>Name: {{ item.name }}</b>
          <p>Done: {{ item.done ? "True" : "False" }} </p>
        </div>

        <div>
          <v-btn @click="completeItem(item.id)" class="mr-4">Complete</v-btn>
          <v-btn :disabled="!item.done" @click="deleteItem(item.id)">Delete</v-btn>
        </div>
      </li>
    </ul>
    <v-btn @click="addItem">Add</v-btn>
    <br><br><br><br>

    <h3>V-MEMO</h3>
    <v-btn @click="next">Next</v-btn>
    <div v-for="item in items" :key="item" v-memo="[item === selected]">
      <p>ID: {{ item }} - selected: {{ item === selected }}</p>
    </div>
    <br><hr><br><br>


    <h3>Ref / ShallowRef</h3>
    <pre> {{ refValue.nested.count }} </pre>
    <pre> {{ shallowRefValue }} </pre>
    <v-btn @click="count">Count</v-btn>
    <br><hr><br><br>

    <h3>Reactive / ShallowReactive</h3>
    <pre> {{ reactiveValue.nested.count }} </pre>
    <pre> {{ reactiveShallow.nested.count }} </pre>
    <pre> {{ state }} </pre>
    <v-btn @click="countReactive">Count</v-btn>
    <br>

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
  reactive,
  ref, shallowReactive,
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
const shallowRefValue = shallowRef({ count: 1 })
const count = () => {
  refValue.value.nested.count++;

  // does NOT trigger change
  // shallowRefValue.value.count = 2

  // does trigger change
  shallowRefValue.value = { count: 2 }
}


// Reactive / shallowReactive
const reactiveValue = reactive({
  nested: { count: 1 },
});
const reactiveShallow = shallowReactive({
  nested: { count: 1 },
});
const state = shallowReactive({
  user: { name: 'Ivan' }
})

const countReactive = () => {
  reactiveValue.nested.count++;
  reactiveShallow.nested.count++;
  state.user.name = 'Oleh'
}


// TODOLIST
interface Item {
  id: number;
  name: string;
  done: boolean;
}

/*const arr = reactive<Item[]>([
  { id: 1, name: "Test", done: false },
  { id: 2, name: "Test2", done: true },
  { id: 3, name: "Test3", done: false }
]);*/

const arr = ref<Item[]>([
  { id: 1, name: "Test", done: false },
  { id: 2, name: "Test2", done: true },
  { id: 3, name: "Test3", done: false }
]);

let generateId = ref<number>(Math.max(...arr.value.map(x => x.id)) + 1);

const addItem = () => {
  const newId = generateId.value++
  arr.value.push({ id: newId, name: `Test${ newId }`, done: false })
}

const completeItem = (id: number) => {
  arr.value.find(x => x.id === id)!.done = true;
}

const deleteItem = (id: number) => {
  arr.value.splice(arr.value.findIndex(x => x.id === id), 1)
}


// V-MEMO
const items = ref([1, 2, 3, 4, 5])
const selected = ref(1)

function next() {
  selected.value = (selected.value % items.value.length) + 1
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