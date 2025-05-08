import { reactive, ref } from "vue";
import { Booking } from "~/models/Booking";
import { BookingModule } from "~/store/booking";
import HandleServerErrorMixin from "~/composables/HandleServerError";
import {useToast} from "~/.nuxt/imports";

export function BookDlgLogic() {
  const toast = useToast()
  const { getMessageCodeError } = HandleServerErrorMixin();

  const dialog = ref(false);
  const bookingForm = reactive<Booking>(new Booking());
  const today = ref(new Date().toISOString().substr(0, 10));
  const bookingModule = BookingModule();

  function open(product: any): void {
    dialog.value = true;
    bookingForm.productId = product._id;
    bookingForm.userId = product.user._id;
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

  return {
    dialog,
    bookProduct,
    open,
    close,
    bookingForm,
    today
  }
}