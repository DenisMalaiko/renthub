import { ref } from 'vue';
import {Toast} from "~/models/Toast";

export function useToastAlert() {
  const toast = ref(false);
  const message = ref("");

  function open(Toast: Toast): void {
    toast.value = true;
    message.value = Toast.message;
  }

  return {
    toast,
    message,
    open
  };
}
