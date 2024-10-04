<template>
  <v-snackbar
    v-model="toast"
    vertical
    location="top"
    :color="status"
  >
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import { useToastAlert } from './ToastAlert.ts';

const { toast, message, status, open } = useToastAlert();

defineExpose({
  open
});
</script>
