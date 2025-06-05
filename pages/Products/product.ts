import { computed, ref } from "vue";
import { useAsyncData, useRoute } from "nuxt/app";
import { useToast } from "~/.nuxt/imports";
import { UserModule } from "~/store/user";
import { Product } from "~/models/Product";
import { RequestStatus } from "~/enum/RequestStatus";

export function useProductLogic() {
  const toast = useToast();
  const userModule = UserModule();
  const route = useRoute();
  const productId = route.params.id as string;
  const bookDlgRef = ref();
  const loading = ref(false);

  const { data } = useAsyncData<{ product: Product }>("product-page", async () => {
    try {
      loading.value = true;

      const [product] = await Promise.allSettled([
        $fetch<Product>(`/api/products/${productId}`),
      ]);

      return {
        product: product.status === RequestStatus.Fulfilled ? product.value : new Product(userModule.user._id)
      }
    } catch (error) {
      const err = error as Error;
      toast.error({
        title: "Unhandled error",
        message: err.message,
        position: 'topCenter',
      });

      return { product: {} }
    } finally {
      loading.value = false;
    }
  });

  const product: any = computed(() => data.value?.product);
  const isAuth: any = computed(() => userModule.user.token);
  const isOwner: any = computed(() => product.value?.user?._id === userModule.user?._id);
  const categories = computed(() => product?.value?.categories?.map((x: any) => x.name).join(', '));

  const bookProduct = () => {
    bookDlgRef.value.open(product.value);
  }

  return {
    product,
    categories,
    bookProduct,
    bookDlgRef,
    isAuth,
    isOwner,
    data,
    loading
  }
}