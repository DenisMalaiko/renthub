import { ref } from 'vue';
import { UserModule } from "~/store";

export function useHeaderLogic() {
  const userModule = UserModule();

  const user = userModule.user;
  const logo = ref("RentHub")

  return {
    logo,
    user
  }
}