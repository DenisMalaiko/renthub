import {computed, onMounted, ref} from "vue";
import {ProductModule, CategoryModule} from "~/store";

export function useProductsLogic() {
  const productDlgRef = ref();
  const productModule = ProductModule();
  const categoryModule = CategoryModule()

  const productsUser = computed(() => {
    return productModule.productsUser;
  })

  function addProduct() {
    productDlgRef.value.open();
  }

  onMounted(async () => {
    await categoryModule.getCategories();
    await productModule.getProductsByUser();
  })

  return {
    addProduct,
    productDlgRef,
    productsUser
  }
}