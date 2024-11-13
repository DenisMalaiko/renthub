import {UserModule} from "~/store";
import {UserProfile} from "~/models/user/UserProfile";
import {ref} from "vue";

export function useProfileLogic() {
  const userModule = UserModule();
  const user: UserProfile = userModule.user;
  const profileDlgRef = ref();

  function editProfile() {
    console.log("EDIT PROFILE")
    console.log(profileDlgRef.value)
    profileDlgRef.value.open()
  }

  return {
    user,
    editProfile,
    profileDlgRef
  }
}