<template>
  <section class="profile-section">
    <v-row>
      <v-col cols="12">
        <v-calendar
          :events="bookingsUser"
        ></v-calendar>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import {definePageMeta} from "~/.nuxt/imports";
import {useBookingsLogic} from "~/pages/Auth/Profile/Bookings/bookings";

definePageMeta({
  layout: "profile"
});

const {
  bookingsUser
} = useBookingsLogic();
</script>

<style scoped>

</style>