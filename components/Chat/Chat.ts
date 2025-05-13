import {ref} from "vue";

export function useChatLogic() {
  const title = ref("AI Support");
  const isOpen = ref(false);
  const message = ref("");

  const open = () => {
    isOpen.value = !isOpen.value;
    message.value = "";
  }

  const sendMessage = () => {
    console.log("SEND MESSAGE ", message.value);
  }

  return {
    title,
    isOpen,
    open,
    message,
    sendMessage
  }
}