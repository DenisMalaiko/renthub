import {defineStore} from "pinia";
import {Booking} from "~/models/Booking";
import {bookProduct, getBookingsByUser, deleteBooking} from "~/composables/BookingRequests";
import {UserModule} from "~/store/user";
import {getProductsByUser} from "~/composables/ProductsRequests";
import {watchEffect} from "vue";

export const BookingModule = defineStore('bookingModule', {
  state: () => ({
    bookings: null,
    bookingsUser: []
  }),
  actions: {
    async bookProduct(booking: Booking | any) {
      const { mutate } = await bookProduct();

      await mutate({
        bookingInput: {
          range: booking?.range,
          createdAt: booking?.createdAt,
          owner: booking?.ownerId,
          renter: booking?.renterId,
          product: booking.productId,
        },
      }).then((response) => {
        console.log("SUCCESS BOOKED ", response)
      }).catch((error) => {
        throw error.graphQLErrors;
      })
    },

    async deleteBooking(bookingId: string) {
      const { mutate } = await deleteBooking();

      await mutate({
        bookingId: bookingId
      }).then(() => {
        this.getBookingsByUser();
      })
    },

    async getBookingsByUser() {
      const userModule = UserModule();
      const userId = userModule.user._id;
      const { result } = await getBookingsByUser(userId);

      watchEffect(() => {
        if (result.value) {
          this.bookingsUser = result.value?.bookingsByUser;
        }
      });
    }
  }
})