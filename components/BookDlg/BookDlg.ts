import {ref} from "vue";

export function BookDlgLogic() {
  const dialog = ref(false);

  function open(): void {
    dialog.value = true;
  }

  function close(): void {
    dialog.value = false;
  }

  return {
    dialog,
    open,
    close
  }
}