import {reactive, ref, watchEffect} from "vue";
import { askLangChain } from "~/composables/LangChainRequests";

export function useChatLogic() {
  const title = ref("AI Support");
  const isOpen = ref(false);
  const message = ref("");
  const messages: any = reactive([]);
  const loading = ref(false);

  const open = () => {
    isOpen.value = !isOpen.value;
    message.value = "";
  }

  const sendMessage = async () => {
    messages.push({
      sender: "me",
      message: message.value
    });

    loading.value = true;

    const { result  } = await askLangChain(message.value);
    message.value = "";

    watchEffect(() => {
      if (result.value) {

        messages.push({
          sender: "AI",
          message: result.value.askLangChain
        });

        loading.value = false;
      }
    });
  }

  return {
    title,
    isOpen,
    open,
    message,
    sendMessage,
    messages,
    loading
  }
}