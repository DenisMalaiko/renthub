import { reactive, ref, computed, watch } from "vue";
import { ValidationsRules } from "~/utils/validations-rules";
import { useRouter } from "nuxt/app";
import { UserRegister } from "~/models/user/UserRegister";
import { UserModule } from "~/store/user";

export function useRegisterLogic() {
  const userModule = UserModule();
  const router = useRouter()
  const signUpFormRef = ref();
  const toastAlertRef = ref();
  const loading = reactive({
    creating: false
  });
  const password = reactive({
    isShowPassword: false,
    isShowRepeatPassword: false
  });

  let signUpForm: any = reactive(new UserRegister());

  const rules = computed(() => {
    return {
      name: [ValidationsRules.required],
      login: [ValidationsRules.required],
      email: [ValidationsRules.required, ValidationsRules.email],
      city: [ValidationsRules.required],
      password: [
        ValidationsRules.required,
        ValidationsRules.minPassword,
        ValidationsRules.hasUpperCase,
        ValidationsRules.hasNumber
      ],
      repeatPassword: [ValidationsRules.required, ValidationsRules.match(signUpForm?.password, signUpForm.repeatPassword, "Passwords")],
    };
  });

  const score = computed(() => {
    const result = calculateScore(signUpForm.password);

    switch (result) {
      case 4:
        return { color: "light-blue", value: 100 };
      case 3:
        return { color: "light-green", value: 75 };
      case 2:
        return { color: "yellow", value: 50 };
      case 1:
        return { color: "orange", value: 25 };
      default:
        return { color: "red", value: 0 };
    }
  });

  function calculateScore(password: string) {
    return rules.value.password.reduce((count, rule) => {
      return count + (rule(password) === true ? 1 : 0);
    }, 0);
  }

  async function createUser() {
    const formValue = signUpForm;
    const valid = signUpFormRef.value.isValid;
    if (!valid) return;

    loading.creating = true;

    try {
      await userModule.createUser(formValue);

      console.log("CREATED")
      toastAlertRef.value.open({ status: "success", message: "User has been successfully created!" });
      signUpForm.clear();
      router.push('/auth/login');
    } catch (err: any) {
      toastAlertRef.value.open({ status: "error", message: err.message });
    } finally {
      loading.creating = true;
    }




  /*  const requestBody = {
      query: `mutation user { createUser(userInput: { name: "${signUpForm.name}", login: "${signUpForm.login}", email: "${signUpForm.email}", city: { cityId: "${signUpForm.city.cityId}", cityName: "${signUpForm.city.cityName}", countryId: "${signUpForm.city.countryId}", countryName: "${signUpForm.city.countryName}", fullAddress: "${signUpForm.city.fullAddress}"}, password: "${signUpForm.password}" }) { _id email } }`
    };

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

      toastAlertRef.value.open({ status: "success", message: "User has been successfully created!" });
      signUpForm.clear();
      router.push('/auth/login')
    } catch (err: any) {
      toastAlertRef.value.open({ status: "error", message: err.message });
    } finally {
      loading.creating = true;
    }*/
  }

  return {
    signUpFormRef,
    signUpForm,
    loading,
    password,
    rules,
    score,
    createUser,
    toastAlertRef
  };
}