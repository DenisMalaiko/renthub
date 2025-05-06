<template>
  <v-dialog v-model="dialog" style="max-width: 500px">
    <v-card>
      <v-card-title>
        Book Product
      </v-card-title>

      <v-card-text>
        <v-date-input
          v-model="bookingForm.startDate"
          :min="today"
          label="Start Date"
        ></v-date-input>

        <v-date-input
          v-model="bookingForm.endDate"
          :min="bookingForm.startDate"
          label="End Date"
        ></v-date-input>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="close" variant="outlined" color="primary">Cancel</v-btn>
        <v-btn @click="bookProduct" variant="elevated" color="primary">Book</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {BookDlgLogic} from "~/components/BookDlg/BookDlg";

const {
  dialog,
  bookProduct,
  open,
  close,
  bookingForm,
  today
} = BookDlgLogic();

defineExpose({
  open
});
</script>

<style scoped>

</style>