<template>
  <v-snackbar
    v-model="toast"
    vertical
  >
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import { useToastAlert } from './ToastAlert.ts';

const { toast, message, open } = useToastAlert();

defineExpose({
  open
});
</script>
