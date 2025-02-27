import {computed, reactive, ref} from "vue";
import {Product} from "~/models/Product";
import {ValidationsRules} from "~/utils/validations-rules";
import { UserModule } from "~/store/user";
import { CategoryModule } from "~/store/categories";
import { ProductModule } from "~/store/products";

export function useProductLogic() {
  const productModule = ProductModule();
  const categoryModule = CategoryModule();
  const userModule = UserModule();
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
      photo: [ValidationsRules.required, ValidationsRules.photoSize]
    }
  });

  const categories = computed(() => {
    return categoryModule.categories;
  })

  function open(): void {
    dialog.value = true;
    addProductForm.value = reactive(new Product(userModule.user._id))
  }

  function close(): void {
    dialog.value = false;
  }

  async function addProduct() {
    const formValue = addProductForm.value;
    const valid = addProductFormRef.value.isValid;
    if (!valid) return;

    loading.value = true;

    await productModule.addProduct(formValue)
      .then(() => {
        console.log("SUCCESS ADDED DIALOG")
      }).catch((err) => {
        console.log("ERR ", err)
      }).finally(() => {
        loading.value = false;
        close();
      })
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