import {computed, onMounted} from "vue";
import {BookingModule} from "~/store/booking";

export function useBookingsLogic() {
  const bookingsModule = BookingModule();

  const bookingsUser = computed(() => {
    return bookingsModule.bookingsUser.map((booking: any) => {
      return {
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
        title: booking.product.name,
        allDay: false
      };
    })
  });


  onMounted(async () => {
    await bookingsModule.getBookingsByUser()
  })

  return {
    bookingsUser
  }
}