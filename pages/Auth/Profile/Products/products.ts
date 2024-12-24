import {onMounted, ref} from "vue";
import {ProductModule} from "~/store";

export function useProductsLogic() {
  const productDlgRef = ref();
  const product = ProductModule();

  function addProduct() {
    productDlgRef.value.open();
  }

  onMounted(async () => {
    await product.getCategories();
  })

  return {
    addProduct,
    productDlgRef
  }
}