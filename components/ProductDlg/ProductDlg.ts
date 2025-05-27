import {computed, reactive, ref, watch} from "vue";
import {Product} from "~/models/Product";
import {ValidationsRules} from "~/utils/validations-rules";
import { UserModule } from "~/store/user";
import { CategoryModule } from "~/store/categories";
import { ProductModule } from "~/store/products";
import {useRuntimeConfig} from "nuxt/app";

export function useProductLogic() {
  const config = useRuntimeConfig();
  const productModule = ProductModule();
  const categoryModule = CategoryModule();
  const userModule = UserModule();
  const dialog = ref(false);
  const loading = ref(false);
  const loadingCity = ref(false);
  const addProductFormRef = ref();
  const searchCategoryQuery = ref("");
  const searchCityQuery = ref('');

  let addProductForm = ref<Product>(new Product(userModule.user._id));
  let cities: any = ref([]);

  const rules = computed(() => {
    return {
      name: [ValidationsRules.required],
      description: [ValidationsRules.required],
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

  async function searchPlaces(city: string) {
    const url = `${config.public.API_URL}/searchCity?city=${encodeURIComponent(city)}`;

    try {
      loadingCity.value = true;
      const response = await fetch(url);
      const data = await response.json();
      console.log("SEARCH CITY", data)
      cities.value = data;
      loadingCity.value = false;
    } catch (error) {
      console.error('Помилка при пошуку місця:', error);
      return [];
    }
  }

  watch(() => searchCityQuery.value, (newValue: any) => {
    if (newValue && newValue.length >= 2) {
      searchPlaces(newValue);
    }
  });


  return {
    dialog,
    loading,
    addProductForm,
    addProductFormRef,
    searchCategoryQuery,
    searchCityQuery,
    cities,
    loadingCity,

    rules,
    categories,

    open,
    close,
    addProduct
  }
}