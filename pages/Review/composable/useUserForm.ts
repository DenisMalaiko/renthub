import {ref, computed, onBeforeMount, onMounted} from "vue";

export function useUserForm() {
  const message = ref();
  const messageComputed = computed(() => `${message.value} Computed`);

  onBeforeMount(() => {
    console.log("ON BEFORE MOUNT COMPOSABLE")
  });

  onMounted(() => {
    console.log("ON MOUNTED COMPOSABLE")
  });

  const log = () => {
    console.log("CONSOLE LOG");
  }

  return {
    message,
    messageComputed,
    log
  };
}