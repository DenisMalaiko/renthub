import {computed, onMounted, ref} from "vue";
import {ProductModule, CategoryModule} from "~/store";

export function useProductsLogic() {
  const productDlgRef = ref();
  const productModule = ProductModule();
  const categoryModule = CategoryModule()

  const products = computed(() => {
    return productModule.products;
  })

  function addProduct() {
    productDlgRef.value.open();
  }

  onMounted(async () => {
    await categoryModule.getCategories();
    await productModule.getProducts();
  })

  return {
    addProduct,
    productDlgRef,
    products
  }
}