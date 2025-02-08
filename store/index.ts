import {defineStore} from "pinia";
import {UserProfile} from "~/models/user/UserProfile";
import {Product} from "~/models/Product";
import {checkCachedProducts} from "~/utils/cachedResponse";

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
    products: [],
    productsUser: []
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
          this.getProductsByUser()
        })
      } catch (err) {
        return err;
      }
    },
    async getProducts() {
      const requestBody = {
        query: `query {
          products{
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
        const cachedProducts: Product[] | [] = await checkCachedProducts(requestBody);
        this.products = responseData.data.products ?? cachedProducts;
      } catch (err) {
        console.log("ERROR ", err)
        const cachedProducts: Product[] | [] | any = await checkCachedProducts(requestBody);
        this.products = cachedProducts;
      }
    },
    async getProductsByUser() {
      const userModule = UserModule();
      const userId = userModule.user._id;

      console.log("USER ID ", userId)

      const requestBody = {
        query: `query {
          productsByUser(userId: "${userId}") {
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

        this.productsUser = responseData.data.productsByUser;
      } catch (err) {
        console.log("ERROR ", err)
      }
    },
  }
})