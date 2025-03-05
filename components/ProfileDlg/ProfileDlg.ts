import {computed, reactive, ref} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {UserProfile} from "~/models/user/UserProfile";
import {UserModule} from "~/store/user";

export function useProfileDlgLogic() {
  const dialog = ref(false);
  const loading = ref(false);
  const toastAlertRef = ref();
  const editProfileFormRef = ref();
  const user = UserModule();
  let editProfileForm = ref<UserProfile | null>(null);

  const rules = computed(() => {
    return {
      name: [ValidationsRules.required],
      login: [ValidationsRules.required],
      email: [ValidationsRules.required, ValidationsRules.email],
      city: [ValidationsRules.required],
    }
  });

  function open(profile: any): void {
    dialog.value = true;

    editProfileForm.value = reactive(
      new UserProfile(
        profile._id,
        profile.token,
        profile.tokenExpiration,
        profile.name,
        profile.login,
        profile.email,
        profile.city
      )
    )
  }

  function close(): void {
    editProfileForm.value = reactive(new UserProfile());
    dialog.value = false;
  }

  async function editProfile() {
    const formValue = editProfileForm.value;
    const valid = editProfileFormRef.value.isValid;
    if (!valid) return;

    loading.value = true;

    try {
      await user.updateUser(formValue);
      close();
    } catch (err: any) {
      toastAlertRef.value.open({ status: "error", message: err.message });
    } finally {
      loading.value = false;
    }
  }

  return {
    dialog,
    editProfileFormRef,
    editProfileForm,
    rules,
    open,
    close,
    editProfile,
    loading,
    toastAlertRef
  }
}