import {defineStore} from "pinia";
import {UserProfile} from "~/models/user/UserProfile";
import {Product} from "~/models/Product";

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

export const CategoryModule = defineStore('categoryModel', {
  state: () => ({
    categories: [],
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
    },
  }
});

export const ProductModule = defineStore('productModule', {
  state: () => ({
    products: []
  }),
  actions: {
    async addProduct(product: Product | null) {
      const requestBody = {
        query: `mutation {
          createProduct(productInput: {
            name: "${product?.name}",
            price: ${product?.price}
            userId: "${product?.userId}"
          }) {
            _id
            name
            price
            userId
          }
        }`
      };

      try {
        await fetch('http://localhost:8080/graphql', {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {'Content-Type': 'application/json'},
        }).then(() => {
          this.getProducts()
        })
      } catch (err) {
        return err;
      }
    },
    async getProducts() {
      const userModule = UserModule();
      const userId = userModule.user._id;

      console.log("USER ID ", userId)

      const requestBody = {
        query: `query {
          products(userId: "${userId}") {
            _id
            name
            price
            userId
          }
        }`
      };

      try {
        const response = await fetch('http://localhost:8080/graphql', {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {'Content-Type': 'application/json'},
        });
        const responseData: any = await response.json();

        this.products = responseData.data.products;
      } catch (err) {
        console.log("ERROR ", err)
      }
    }
  }
})