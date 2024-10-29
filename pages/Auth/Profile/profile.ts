import {UserModule} from "~/store";
import {onMounted} from "vue";
import {UserProfile} from "~/models/user/UserProfile";
import {useRouter} from "nuxt/app";

export function useProfileLogic() {
  const router = useRouter()
  const userModule = UserModule();
  const user: UserProfile = userModule.user;

  onMounted(() => {
    if(!user.token) {
      router.push('/auth/login')
    }
  })

  return {
    user
  }
}