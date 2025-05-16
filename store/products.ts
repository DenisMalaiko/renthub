import { defineStore } from "pinia";
import { Product } from "~/models/Product";
import { addProduct, getProducts, getProductsByUser, getProductById, uploadPhoto, deleteProduct } from "~/composables/ProductsRequests";
import { watchEffect } from "vue";
import { UserModule } from "~/store/user";
import { useRuntimeConfig } from "nuxt/app";

export const ProductModule = defineStore('productModule', {
  state: () => ({
    products: [],
    product: [],
    productsUser: []
  }),
  actions: {
    async addProduct(product: Product | any) {
      const config = useRuntimeConfig()
      const uploadedPhoto = await uploadPhoto(product.photo);
      const { mutate } = await addProduct();

      await mutate({
        productInput: {
          name: product?.name,
          description: product?.description,
          price: product?.price,
          photo: `${config.public.API_URL}${uploadedPhoto.url}`,
          owner: product?.user,
          categories: product?.categories || [],
        },
      }).then((response) => {
        this.getProductsByUser();
      })
    },
    async deleteProduct(productId: string) {
      const { mutate } = await deleteProduct();

      await mutate({
        productId: productId
      }).then(() => {
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
      const ownerId = userModule.user._id;
      console.log("USER ID ", ownerId)
      const { result } = await getProductsByUser(ownerId);

      watchEffect(() => {
        if (result.value) {
          console.log("PRODUCTS USER ", result.value?.productsByUser)
          this.productsUser = result.value?.productsByUser;
        }
      });
    },
    async getProductById(id: string) {
      const { result } = await getProductById(id);

      watchEffect(() => {
        if (result.value) {
          this.product = result.value?.product;
        }
      });
    }
  }
})