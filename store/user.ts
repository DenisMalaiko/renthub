import { defineStore } from "pinia";
import { UserProfile } from "~/models/user/UserProfile";
import { createUser, updateUser, login } from "~/composables/UsersRequests";
import { watch } from "vue";
import { useApolloClient } from "@vue/apollo-composable";
import { ApolloLink, HttpLink } from "@apollo/client/core";
import {useRuntimeConfig} from "nuxt/app";

interface UserState {
  user: UserProfile
}

export const UserModule = defineStore('userModule', {
  state: (): UserState => ({
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
              this.updateAuthLink(newValue.login.token);
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
          role: form?.role,
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
      this.user = JSON.parse(JSON.stringify(new UserProfile()))
    },
    updateAuthLink(token: string) {
      const apolloClient = useApolloClient().client;
      const config = useRuntimeConfig()

      const authLink = new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        return forward(operation);
      });

      apolloClient.setLink(authLink.concat(new HttpLink({ uri: `${config.public.API_URL}/graphql` })));
    },
  },
});