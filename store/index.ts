import {defineStore} from "pinia";
import {User} from "~/models/User";

export const UserModule = defineStore('counter', {
  state: () => ({
    user: {},
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
})