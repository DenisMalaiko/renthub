import {ProductModule} from "~/store/products";
import {CategoryModule} from "~/store/categories";
import {computed, onMounted, ref} from "vue";
import {useFetch} from "nuxt/app";

export function useHomeLogic() {
  const productModule = ProductModule();
  const categoryModule = CategoryModule();
  const loading = ref(true);
  const selectedCategories = ref([]);


  const products = computed(() => {
    return productModule.products.filter((product: any) => {
      if(selectedCategories.value.length === 0) return true;


      return product?.categories?.some((category: any) =>
        selectedCategories.value.includes(category._id)
      );
    })
  });

  onMounted(async () => {
    await categoryModule.getCategories();
    await productModule.getProducts()
      .then(() => {
        loading.value = false;
      })
  });

  const { data, error } = useFetch('api/products');
  const categories = computed(() => categoryModule.categories);

  return {
    products,
    categories,
    selectedCategories,
    loading,
    data
  }
}