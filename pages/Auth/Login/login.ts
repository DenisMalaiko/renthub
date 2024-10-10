import {reactive, ref, computed} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {Auth} from "~/models/Auth";
import {UserModule} from "~/store";
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

  const rules = computed(() => {
    return {
      email: [ValidationsRules.required],
      password: [ValidationsRules.required],
    }
  })

  async function login(){
    const valid = signInFormRef.value.isValid;
    if(!valid) return;

    loading.creating = true;

    const requestBody = {
      query: `query { login(email: "${signInForm.email}", password: "${signInForm.password}") { _id token tokenExpiration name login email } }`
    }

    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.errors ? responseData.errors.map((e: any) => e.message).join(', ') : 'Unknown error');
      }

      console.log("RESPONSE DATA ", responseData.data.login)
      user.setUser(responseData.data.login)

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
    loading
  }
}