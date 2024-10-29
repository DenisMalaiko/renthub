import { ref, computed } from 'vue';
import { UserModule } from "~/store";
import { useRouter } from "nuxt/app";
import {UserProfile} from "~/models/user/UserProfile";

export function useHeaderLogic() {
  const userModule = UserModule();
  const router = useRouter();

  //const user = userModule.user;
  const user = computed(() => {
    return userModule.user;
  })
  const logo = ref("RentHub");

  function logout() {
    userModule.logoutUser();
    router.push('/auth/login')
  }

  return {
    logo,
    user,
    logout
  }
}