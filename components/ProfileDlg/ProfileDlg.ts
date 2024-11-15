import {computed, reactive, ref} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {UserProfile} from "~/models/user/UserProfile";

export function useProfileDlgLogic() {
  const dialog = ref(false);
  const editProfileFormRef = ref();
  let editProfileForm;

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

    console.log(profile.name)
    editProfileForm = reactive(new UserProfile(
      profile._id,
      profile.token,
      profile.tokenExpiration,
      profile.name,
      profile.login,
      profile.email
    ));

    console.log("editProfileForm ", editProfileForm)
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