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
          hide-actions
        ></v-date-input>

        <v-date-input
          v-model="bookingForm.endDate"
          :min="bookingForm.startDate"
          label="End Date"
          hide-actions
        ></v-date-input>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="close" variant="outlined" color="primary">Cancel</v-btn>

        <div v-if="isEditBooking">
          <v-btn @click="deleteBooking()" variant="elevated" color="primary">Delete</v-btn>
        </div>

        <div v-else>
          <v-btn @click="bookProduct" variant="elevated" color="primary">Book</v-btn>
        </div>
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
  editBooking,
  close,
  bookingForm,
  today,
  user,
  isEditBooking,
  deleteBooking
} = BookDlgLogic();

defineExpose({
  open,
  editBooking
});
</script>

<style scoped>

</style>