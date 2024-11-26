import {computed, reactive, ref} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {UserProfile} from "~/models/user/UserProfile";

export function useProfileDlgLogic() {
  const dialog = ref(false);
  const editProfileFormRef = ref();
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
    dialog.value = false;
  }

  function editProfile() {
    console.log("EDIT PROFILE")
  }

  return {
    dialog,
    editProfileFormRef,
    editProfileForm,
    rules,
    open,
    close,
    editProfile
  }
}