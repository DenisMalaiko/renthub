import {UserModule} from "~/store";
import {UserProfile} from "~/models/user/UserProfile";

export function useProfileLogic() {
  const userModule = UserModule();
  const user: UserProfile = userModule.user;

  return {
    user
  }
}