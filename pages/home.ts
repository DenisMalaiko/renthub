import {ProductModule} from "~/store/products";
import {useAsyncData} from "nuxt/app";
import {computed} from "vue";

export function useHomeLogic() {
  const productModule = ProductModule();
  const products = computed(() => productModule.products);
  useAsyncData('products', () => productModule.getProducts())

  return {
    products
  }
}