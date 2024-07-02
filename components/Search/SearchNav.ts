import { ref, watch } from 'vue'

export function setupSearchComponent() {
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
    const url = `http://localhost:8080/searchCity?city=${encodeURIComponent(city)}`;

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

  watch(searchCityQuery, (newValue: any) => {
    console.log("WATCH ", newValue)
    if(newValue && newValue.length >= 2) {
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
