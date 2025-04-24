import { ref, computed } from "vue";
import { UserModule} from "~/store/user";
import {UserProfile} from "~/models/user/UserProfile";

export function useProfileLogic() {
  const userModule = UserModule();
  const profileDlgRef = ref();

  const user = computed<UserProfile>(() => {
    return userModule.user;
  })

  function editProfile() {
    profileDlgRef.value.open(user.value);
  }

  return {
    user,
    editProfile,
    profileDlgRef
  }
}