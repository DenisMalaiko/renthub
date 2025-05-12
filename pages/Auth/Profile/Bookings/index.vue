<template>
  <section class="profile-section">
    <v-row>
      <v-col cols="12">
        <v-calendar
          :events="bookingsUser"
          mode="month"
        >
          <template v-slot:event="{ event }">
            <div class="booking-item pa-2" @click="openBooking(event)">
              <strong>{{ event.title }}</strong>
            </div>
          </template>
        </v-calendar>

        <BookDlg ref="bookDlgRef"/>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import {definePageMeta} from "~/.nuxt/imports";
import {useBookingsLogic} from "~/pages/Auth/Profile/Bookings/bookings";
import BookDlg from "~/components/BookDlg/BookDlg.vue";

definePageMeta({
  layout: "profile"
});

const {
  bookingsUser,
  bookDlgRef,
  openBooking
} = useBookingsLogic();
</script>

<style scoped>
.booking-item {
  background: rgb(24,103,192);
  cursor: pointer;
  color: white;
  border-radius: 5px;
}
</style>