<script setup lang="ts">
import {ref} from "vue";

const dialog = ref(false);
const message = ref("Default message");
let resolver: ((value: boolean) => void) | null = null;

const open = (newMessage: string) => {
  dialog.value = true;
  message.value = newMessage;

  return new Promise((resolve) => {
    resolver = resolve;
  })
}

const confirm = () => {
  dialog.value = false;
  resolver?.(true);
  resolver = null;
}

const cancel = () => {
  dialog.value = false;
  resolver?.(false);
  resolver = null;
}

defineExpose({
  open
});
</script>

<template>
  <v-dialog v-model="dialog" style="max-width: 400px">
    <v-card>
      <v-card-title class="px-3 pt-3">
        Confirm
      </v-card-title>

      <v-card-text class="px-3">
        <p>{{ message }}</p>
      </v-card-text>

      <v-card-actions class="justify-start px-3 pb-3">
        <v-btn @click="confirm()" class="mr-1" color="primary" variant="outlined">Confirm</v-btn>
        <v-btn @click="cancel()" color="primary" variant="outlined">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>