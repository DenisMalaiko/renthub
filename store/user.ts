import { defineStore } from "pinia";
import { UserProfile } from "~/models/user/UserProfile";
import { createUser, updateUser, login } from "~/composables/UsersRequests";
import { watch } from "vue";

export const UserModule = defineStore('userModule', {
  state: () => ({
    user: JSON.parse(JSON.stringify(new UserProfile())),
  }),
  actions: {
    setUser(user: UserProfile) {
      this.user = user;
    },
    async login(form: any) {
      const { result } = await login(form.email, form.password);

      return new Promise((resolve, reject) => {
        const stop = watch(
          () => result.value,
          (newValue) => {
            if (newValue) {
              this.setUser(newValue.login);
              stop();
              resolve(newValue);
            }
          },
          { immediate: true }
        );
      });
    },
    async createUser(form: any) {
      const { mutate } = await createUser();

      return await mutate({
        userInput: {
          name: form?.name,
          login: form?.login,
          email: form?.email,
          city: {
            cityId: form.city.cityId,
            cityName: form.city.cityName,
            countryId: form.city.countryId,
            countryName: form.city.countryName,
            fullAddress: form.city.fullAddress
          },
          password: form.password
        }
      }).then(() => {
        console.log("SUCCESS CREATED")
      })
    },
    async updateUser(form: any) {
      const { mutate } = await updateUser();

      return await mutate({
        userUpdateInput: {
          _id: form?._id,
          name: form?.name,
          login: form?.login,
          email: form?.email,
          city: {
            cityId: form.city?.cityId,
            cityName: form.city?.cityName,
            countryId: form?.city?.countryId,
            countryName: form?.city?.countryName,
            fullAddress: form?.city?.fullAddress
          }
        }
      }).then((response) => {
        console.log("SUCCESS UPDATED ", response);

        this.user = {
          ...this.user,
          ...response?.data?.updateUser
        }
      })
    },
    logoutUser() {
      this.user = {}
    }
  },
});