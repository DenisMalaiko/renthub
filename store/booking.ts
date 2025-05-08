import {defineStore} from "pinia";
import {Booking} from "~/models/Booking";
import {bookProduct} from "~/composables/BookingRequests";

export const BookingModule = defineStore('bookingModule', {
  state: () => ({
   bookings: null
  }),
  actions: {
    async bookProduct(booking: Booking | any) {
      const { mutate } = await bookProduct();

      await mutate({
        bookingInput: {
          startDate: booking?.startDate,
          endDate: booking?.endDate,
          createdAt: booking?.createdAt,
          user: booking?.userId,
          product: booking.productId,
        },
      }).then((response) => {
        console.log("SUCCESS BOOKED ", response)
      }).catch((error) => {
        throw error.graphQLErrors;
      })
    }
  }
})