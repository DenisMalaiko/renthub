import { defineStore } from "pinia";
import { Product } from "~/models/Product";
import { addProduct, getProducts, getProductsByUser } from "~/composables/ProductsRequests";
import { watchEffect } from "vue";
import { UserModule } from "~/store/user";

export const ProductModule = defineStore('productModule', {
  state: () => ({
    products: [],
    productsUser: []
  }),
  actions: {
    async addProduct(product: Product | null) {
/*      console.log("START UPLOAD PRODUCT")
      console.log(product?.photo)

      const { mutate } = await uploadPhoto()

      await mutate({
        file: product?.photo
      }).then(() => {
        console.log("SUCCESS UPLOAD TO SERVER")
      })*/



      const { mutate } = await addProduct();

      await mutate({
        productInput: {
          name: product?.name,
          price: product?.price,
          user: product?.user,
          categories: product?.categories || [],
        },
      }).then((response) => {
        this.getProductsByUser();
      })
    },
    async getProducts() {
      const { result } = await getProducts();

      watchEffect(() => {
        if (result.value) {
          this.products = result.value?.products;
        }
      });
    },
    async getProductsByUser() {
      const userModule = UserModule();
      const userId = userModule.user._id;
      const { result } = await getProductsByUser(userId);

      watchEffect(() => {
        if (result.value) {
          this.productsUser = result.value?.productsByUser;
        }
      });
    },
  }
})