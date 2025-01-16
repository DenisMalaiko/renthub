import {ProductModule} from "~/store";
import {computed, onMounted} from "vue";

export function useHomeLogic() {
  const productModule = ProductModule();

  const products = computed(() => {
    return productModule.products;;
  })

  onMounted(async () => {
    await productModule.getProducts();
  });

  return {
    products
  }
}