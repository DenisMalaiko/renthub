import { ref, computed } from "vue";
import { UserModule} from "~/store/user";

export function useProfileLogic() {
  const userModule = UserModule();
  const profileDlgRef = ref();

  const user = computed(() => {
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