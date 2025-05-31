import { defineStore } from "pinia";
import { Product } from "~/models/Product";
import { addProduct, getProducts, getProductsByUser, getProductsSearch, uploadPhoto, deleteProduct, getProductById } from "~/composables/ProductsRequests";
import { watchEffect } from "vue";
import { UserModule } from "~/store/user";
import { useRuntimeConfig } from "nuxt/app";

export const ProductModule = defineStore('productModule', {
  state: () => ({
    product: [],
    products: [],
    productsUser: [],
    productsSearch: [],
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
          owner: product?.owner,
          categories: product?.categories || [],
          city: product?.city
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
      const { result } = await getProductsByUser(ownerId);

      watchEffect(() => {
        if (result.value) {
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
    },
    async getProductsSearch(searchForm: any) {
      const { result } = await getProductsSearch(searchForm);

      watchEffect(() => {
        if (result.value) {
          this.productsSearch = result.value?.productsBySearch;
        }
      });
    }
  }
})