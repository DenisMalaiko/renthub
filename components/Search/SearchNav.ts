import {ref, watch, reactive, computed, onMounted} from 'vue';
import {useRuntimeConfig} from "nuxt/app";
import {CategoryModule} from "~/store/categories";
import {ProductModule} from "~/store/products";

export function setupSearchComponent() {
  const config = useRuntimeConfig();
  const productModule = ProductModule();
  const categoryModule = CategoryModule();
  const loading = reactive({
    city: false,
    product: false
  });
  const today = ref(new Date().toISOString().substr(0, 10))
  const searchForm = reactive({
    city: null,
    product: null,
    categories: null,
    range: null,
  });
  const searchProductQuery = ref('');
  const searchCityQuery = ref('');
  let cities: any = ref([]);

  onMounted(async () => {
    await categoryModule.getCategories();
  })

  const categories = computed(() => {
    return categoryModule.categories;
  })

  const products = computed(() => {
    return productModule.productsSearch;
  })

  const isSearch = computed(() => {
    return searchForm.city && searchForm.product && searchForm.categories && searchForm.range && products.value?.length;
  })

  async function searchPlaces(city: string) {
    const url = `${config.public.API_URL}/searchCity?city=${encodeURIComponent(city)}`;

    try {
      loading.city = true;
      const response = await fetch(url);
      const data = await response.json();
      cities.value = data;
      loading.city = false;
    } catch (error) {
      console.error('Помилка при пошуку місця:', error);
      return [];
    }
  }

  async function searchProducts() {
    try {
      await productModule.getProductsSearch(searchForm);
    } catch (error) {
      console.error("ERROR SEARCH PRODUCTS: ", error)
    }
  }

  watch(() => searchForm.city, (newValue: any) => {
    if (newValue && newValue.length >= 2) {
      searchPlaces(newValue);
    }
  });

  return {
    loading,
    today,
    searchForm,
    searchProductQuery,
    searchProducts,
    products,
    searchCityQuery,
    cities,
    categories,
    isSearch
  };
}
