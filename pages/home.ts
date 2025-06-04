import { ref, computed } from "vue";
import { useAsyncData } from "nuxt/app";
import { useToast } from "~/.nuxt/imports";
import { Product } from "~/models/Product";
import { Category } from "~/models/Category";
import { RequestStatus } from "~/enum/RequestStatus";

export function useHomeLogic() {
  const toast = useToast()
  const loading = ref(true);
  const selectedCategories = ref<string[]>([]);

  const { data } = useAsyncData<{ products: Product[]; categories: Category[] }>('home-page', async () => {
    try {
      const [products, categories] = await Promise.allSettled([
        $fetch<Product[]>(`/api/products`),
        $fetch<Category[]>(`/api/categories`),
      ]);
      loading.value = false;

      return {
        products: products.status === RequestStatus.Fulfilled ? products.value : [],
        categories: categories.status === RequestStatus.Fulfilled ? categories.value : [],
      }
    } catch (error) {
      const err = error as Error;
      toast.error({
        title: "Unhandled error",
        message: err.message,
        position: 'topCenter',
      });

      return { products: [], categories: [] }
    }
  });

  const products = computed(() => {
    const allProducts = data.value?.products || [];

    return allProducts.filter((product: Product) => {
      if (selectedCategories.value.length === 0) return true;

      return product?.categories?.some((category: Category) =>
        selectedCategories.value.includes(category._id)
      )
    })
  });

  return {
    data,
    loading,
    products,
    selectedCategories
  }
}