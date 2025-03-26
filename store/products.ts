import { defineStore } from "pinia";
import { Product } from "~/models/Product";
import { addProduct, getProducts, getProductsByUser, uploadPhoto } from "~/composables/ProductsRequests";
import { watchEffect } from "vue";
import { UserModule } from "~/store/user";

export const ProductModule = defineStore('productModule', {
  state: () => ({
    products: [],
    productsUser: []
  }),
  actions: {
    async addProduct(product: Product | any) {
      const uploadedPhoto = await uploadPhoto(product.photo);
      const { mutate } = await addProduct();

      await mutate({
        productInput: {
          name: product?.name,
          price: product?.price,
          photo: `http://localhost:8080${uploadedPhoto.url}`,
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