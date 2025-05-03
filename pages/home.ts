import {ProductModule} from "~/store/products";
import {useAsyncData, useRuntimeConfig} from "nuxt/app";
import {computed} from "vue";

export function useHomeLogic() {
  const productModule = ProductModule();
  const products = computed(() => productModule.products);
  const config = useRuntimeConfig();
  useAsyncData('products', () => productModule.getProducts())

  return {
    products,
    config
  }
}