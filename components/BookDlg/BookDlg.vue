<template>
  <v-dialog v-model="dialog" style="max-width: 450px">
    <v-card>
      <v-card-title>
        Book Product
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {BookDlgLogic} from "~/components/BookDlg/BookDlg";

const { dialog, open, close } = BookDlgLogic();

defineExpose({
  open
});
</script>

<style scoped>

</style>