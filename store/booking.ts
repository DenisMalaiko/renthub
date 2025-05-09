import {defineStore} from "pinia";
import {Booking} from "~/models/Booking";
import {bookProduct, getBookingsByUser} from "~/composables/BookingRequests";
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
    },

    async getBookingsByUser() {
      const userModule = UserModule();
      const userId = userModule.user._id;
      console.log("START GET BOOKINGS BY USER ", userId)
      const { result } = await getBookingsByUser(userId);

      watchEffect(() => {
        if (result.value) {
          this.bookingsUser = result.value?.bookingsByUser;
        }
      });
    }
  }
})