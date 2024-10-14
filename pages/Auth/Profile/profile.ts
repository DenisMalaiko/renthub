import {UserModule} from "~/store";
import {reactive} from "vue/dist/vue";

export function useProfileLogic() {
  const userModule = UserModule();
  const user = userModule.user;

  return {
    user
  }
}