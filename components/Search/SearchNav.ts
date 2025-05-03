import { ref, watch, reactive } from 'vue';
import {useRuntimeConfig} from "nuxt/app";

export function setupSearchComponent() {
  const config = useRuntimeConfig();
  const loading = reactive({
    city: false,
    product: false
  });
  const today = ref(new Date().toISOString().substr(0, 10))
  const searchForm = reactive({
    city: null,
    product: null,
    startDate: null,
    endDate: null,
  });
  const menuStart = ref(false);
  const menuEnd = ref(false);
  const searchProductQuery = ref('');
  const products: any = ref([]);
  const searchCityQuery = ref('');
  let cities: any = ref([]);

  async function searchPlaces(city: string) {
    const url = `${config.public.API_URL}/searchCity?city=${encodeURIComponent(city)}`;

    try {
      loading.city = true;
      const response = await fetch(url);
      const data = await response.json();
      console.log("RESPONSE ", data)
      cities.value = data;
      loading.city = false;
    } catch (error) {
      console.error('Помилка при пошуку місця:', error);
      return [];
    }
  }

  /*watch(searchForm.city, (newValue: any) => {
    console.log("WATCH ", newValue)
    if(newValue && newValue.length >= 2) {
      searchPlaces(newValue);
    }
  });*/

  watch(() => searchForm.city, (newValue: any) => {
    console.log("WATCH ", newValue)
    if (newValue && newValue.length >= 2) {
      searchPlaces(newValue);
    }
  });

  return {
    loading,
    today,
    searchForm,
    menuStart,
    menuEnd,
    searchProductQuery,
    products,
    searchCityQuery,
    cities,
  };
}
