import {computed, onMounted, ref} from "vue";
import {BookingModule} from "~/store/booking";

export function useBookingsLogic() {
  const bookingsModule = BookingModule();

  const bookDlgRef = ref();

  const bookingsUser = computed(() => {
    return bookingsModule.bookingsUser.map((booking: any) => {
      return {
        _id: booking._id,
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
        title: booking.product.name,
        allDay: true
      };
    })
  });


  onMounted(async () => {
    await bookingsModule.getBookingsByUser()
  })

  function openBooking(booking: any) {
    bookDlgRef.value.editBooking(booking);
  }

  return {
    bookingsUser,
    bookDlgRef,
    openBooking
  }
}