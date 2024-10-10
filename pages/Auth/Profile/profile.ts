import {UserModule} from "~/store";

export function useProfileLogic() {
  const user = UserModule();

  return {
    user
  }
}