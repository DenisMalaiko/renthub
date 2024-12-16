import {defineStore} from "pinia";
import {UserProfile} from "~/models/user/UserProfile";

export const UserModule = defineStore('userModule', {
  state: () => ({
    user: JSON.parse(JSON.stringify(new UserProfile())),
  }),
  actions: {
    setUser(user: UserProfile) {
      this.user = user;
    },
    updateUser(user: UserProfile) {
      this.user = {
        ...this.user,
        ...user
      }
    },
    logoutUser() {
      this.user = {}
    }
  },
})