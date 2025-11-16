<template>
  <div class="select">
    <div
      class="select-selected"
      @click="openList"
      :class="[color, type]"
    >
      {{ selected ? selected.name : 'Select option' }}
    </div>

    <div
      class="select-list"
      :class="{ 'show': show }"
    >
      <div v-for="option in options" :key="option.value" @click="select(option)" class="option">
        {{ option.name }}
      </div>
    </div>

    <slot :user="user"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

interface Option {
  name: string,
  value: string
}

const user = ref({
  name: "Test User",
  email: "test@gmail.com",
  age: 27
})

const show = ref(false);

const props = defineProps<{
  options: Option[];
  selected: Option;
  color?: string;
  type?: string;
}>();

const emit = defineEmits<{
  (event: "update:selected", value: Option): void;
}>()

const openList = () => {
  show.value = !show.value;
}

const select = (option: Option) => {
  emit("update:selected", option);
  show.value = !show.value;
}
</script>

<style scoped lang="scss">
.select {
  position: relative;
  &-selected {
    cursor: pointer;
    min-width: 300px;
    height: 40px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    &.underline {
      border: none;
      border-bottom: 1px solid #ccc;
    }
    &.grey {
      background: #bebebe;
    }
  }
  &-list {
    position: absolute;
    background-color: #fff;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 1;
    display: none;
    &.show {
      display: block;
    }
    .option {
      padding: 10px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>