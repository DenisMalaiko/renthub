import {defineStore} from "pinia";
import {Booking} from "~/models/Booking";

export const BookingModule = defineStore('bookingModule', {
  state: () => ({
   bookings: null
  }),
  actions: {
    async bookProduct(booking: Booking) {
      console.log("Booking product: ", booking);
    }
  }
})