import {computed, reactive, ref} from "vue";
import {Product} from "~/models/Product";
import {ValidationsRules} from "~/utils/validations-rules";
import {ProductModule} from "~/store";

export function useProductLogic() {
  const productModule = ProductModule();
  const dialog = ref(false);
  const loading = ref(false);
  const addProductFormRef = ref();
  const searchCategoryQuery = ref("");
  let addProductForm = ref<Product | null>(null);

  const rules = computed(() => {
    return {
      name: [ValidationsRules.required],
      price: [ValidationsRules.required],
      categories: [ValidationsRules.required],
    }
  });

  const categories = computed(() => {
    return productModule.categories;
  })

  function open(): void {
    dialog.value = true;
    addProductForm.value = reactive(new Product())
  }

  function close(): void {
    dialog.value = false;
  }

  async function addProduct() {
    console.log("START add")
  }

  return {
    dialog,
    loading,
    addProductForm,
    addProductFormRef,
    searchCategoryQuery,

    rules,
    categories,

    open,
    close,
    addProduct
  }
}