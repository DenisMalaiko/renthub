import {ProductModule} from "~/store/products";
import {computed, onMounted, ref} from "vue";

export function useHomeLogic() {
  const productModule = ProductModule();
  const products = computed(() => productModule.products);
  const loading = ref(true);

  onMounted(async () => {
    await productModule.getProducts()
    loading.value = false;
  });

  return {
    products,
    loading
  }
}