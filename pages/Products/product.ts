import {ProductModule} from "~/store/products";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "nuxt/app";

export function useProductLogic() {
  const productModel = ProductModule();
  const route = useRoute();

  const productId = route.params.id as string;
  const bookDlgRef = ref();

  const product: any = computed(() => productModel.product);
  const categories = computed(() => product?.value.categories?.map((x: any) => x.name).join(', '));

  onMounted(() => {
    productModel.getProductById(productId)
  });

  function bookProduct() {
    bookDlgRef.value.open(product.value);
  }

  return {
    product,
    categories,
    bookProduct,
    bookDlgRef
  }
}