import {computed, reactive, ref, watch} from "vue";
import { Booking } from "~/models/Booking";
import { BookingModule } from "~/store/booking";
import { UserModule } from "~/store/user";
import HandleServerErrorMixin from "~/composables/HandleServerError";
import {useToast} from "~/.nuxt/imports";

export function BookDlgLogic() {
  const toast = useToast()
  const { getMessageCodeError } = HandleServerErrorMixin();

  const bookingModule = BookingModule();
  const userModule = UserModule();

  const dialog = ref(false);
  const isEditBooking = ref(false);
  const bookingId = ref("");

  const bookingForm = reactive<Booking>(new Booking());
  const today = ref(new Date().toISOString().substr(0, 10));

  const user: any = computed(() => userModule.user);

  function open(product: any): void {
    dialog.value = true;
    bookingForm.productId = product._id;
    bookingForm.ownerId = product.user._id;
    bookingForm.renterId = user.value._id;
  }

  function editBooking(data: any): void {
    dialog.value = true;
    isEditBooking.value = true;
    bookingId.value = data._id;

    bookingForm.startDate = data.start;
    bookingForm.endDate = data.end;
  }

  function close(): void {
    dialog.value = false;
  }

  async function bookProduct() {
    try {
      await bookingModule.bookProduct(bookingForm);
      toast.success({
        title: 'Success!',
        position: 'topCenter',
      });
      close();
    } catch (err: any) {
      toast.error({
        title: 'Error!',
        message: getMessageCodeError(err),
        position: 'topCenter',
      })
    }
  }

  async function deleteBooking() {
    try {
      await bookingModule.deleteBooking(bookingId.value);

      toast.success({
        title: 'Success!',
        position: 'topCenter',
      });

      close();

    } catch (err: any) {
      toast.error({
        title: 'Error!',
        message: err.message,
        position: 'topCenter',
      })
    }
  }

  watch(
    () => bookingForm.startDate,
    (newValue, oldValue) => {
      if (isEditBooking) return;

      const end = new Date(newValue);
      end.setDate(end.getDate() + 1);
      bookingForm.endDate = end;
    }
  )

  return {
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
  }
}