import {reactive, ref, computed } from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {Auth} from "~/models/Auth";
import {UserModule} from "~/store/user";
import {useRouter} from "nuxt/app";

export function useLoginLogic() {
  const router = useRouter()
  const user = UserModule();
  const signInFormRef = ref();
  const signInForm: Auth = reactive(new Auth());
  const toastAlertRef = ref();
  const loading = reactive({
    creating: false
  })
  const password = reactive({
    isShowPassword: false,
    isShowRepeatPassword: false
  });

  const rules = computed(() => {
    return {
      email: [ValidationsRules.required],
      password: [ValidationsRules.required],
    }
  })

  async function login() {
    const valid = signInFormRef.value.isValid;
    if(!valid) return;

    loading.creating = true;

    try {
      await user.login(signInForm);

      toastAlertRef.value.open({ status: "success", message: "User has been successfully logined!" });
      router.push('/auth/profile')
    } catch (err: any) {
      toastAlertRef.value.open({ status: "error", message: err.message });
    } finally {
      loading.creating = false;
    }
  }

  return {
    signInForm,
    signInFormRef,
    rules,
    login,
    toastAlertRef,
    loading,
    password
  }
}