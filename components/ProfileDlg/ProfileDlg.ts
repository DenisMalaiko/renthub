import {ref} from "vue";

export function useProfileDlgLogic() {
  const dialog = ref(false);

  function open(): void {
    console.log("OPEN")
    dialog.value = true;
  }

  return {
    dialog,
    open
  }
}