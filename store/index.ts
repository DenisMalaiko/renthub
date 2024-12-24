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
});


export const ProductModule = defineStore('productModule', {
  state: () => ({
    categories: []
  }),
  actions: {
    async getCategories() {
      const requestBody = {
        query: `query {
          categories {
            _id
            name
          }
        }`
      }

      try {
        const response = await fetch('http://localhost:8080/graphql', {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {'Content-Type': 'application/json'},
        });
        const responseData: any = await response.json();

        this.categories = responseData.data.categories;
      } catch (err) {
        console.log("ERROR ", err)
      }
    }
  }
})