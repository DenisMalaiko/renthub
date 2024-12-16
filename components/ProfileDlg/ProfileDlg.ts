import {computed, reactive, ref} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {UserProfile} from "~/models/user/UserProfile";
import {UserModule} from "~/store";

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

    const requestBody = {
      query: `mutation { 
        updateUser(userUpdateInput:
          {
            _id: "${formValue._id}",
            name: "${formValue.name}",
            login: "${formValue.login}",
            email: "${formValue.email}",
            city: {
              cityId: "${formValue.city.cityId}",
              cityName: "${formValue.city.cityName}",
              countryId: "${formValue.city.countryId}",
              countryName: "${formValue.city.countryName}",
              fullAddress: "${formValue.city.fullAddress}"} 
            }) { 
              _id
              name
              login
              email
              city {
                cityId
                cityName
                countryId
                countryName
                fullAddress
              }
            }
          }`
    };

    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json'},
      });
      const responseData = await response.json();

      console.log("SUCCESS ", responseData.data.updateUser)

      if (!response.ok) {
        throw new Error(responseData.errors ? responseData.errors.map((e: any) => e.message).join(', ') : 'Unknown error');
      }

      user.updateUser(responseData.data.updateUser);

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