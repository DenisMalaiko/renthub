import { ref, watch } from "vue";
import {useRuntimeConfig} from "nuxt/app";

export default function CitiesMixin() {
  const config = useRuntimeConfig();
  const cities = ref([]);
  const searchCityQuery = ref('');
  const loadingCity = ref(false)

  async function searchPlaces(city: string) {
    const url = `${config.public.API_URL}/searchCity?city=${city}`;

    try {
      loadingCity.value = true;
      const response = await fetch(url);
      const data = await response.json();
      cities.value = data;
      loadingCity.value = false;
    } catch (error) {
      console.error('Помилка при пошуку міста:', error);
    }
  }

  watch(searchCityQuery, (newValue) => {
    if (newValue && newValue.length >= 3) {
      searchPlaces(newValue);
    }
  });

  return {
    cities,
    searchCityQuery,
    loadingCity
  }
}