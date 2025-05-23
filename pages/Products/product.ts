import {ProductModule} from "~/store/products";
import {UserModule} from "~/store/user";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "nuxt/app";

export function useProductLogic() {
  const productModel = ProductModule();
  const userModule = UserModule();

  const route = useRoute();

  const productId = route.params.id as string;
  const bookDlgRef = ref();
  const isAuth: any = computed(() => userModule.user.token);

  onMounted(() => {
    productModel.getProductById(productId)
  });

  const product: any = computed(() => productModel.product);
  const isOwner: any = computed(() => product.value?.user?._id === userModule.user?._id);
  const categories = computed(() => product?.value.categories?.map((x: any) => x.name).join(', '));


  const bookProduct = () => {
    bookDlgRef.value.open(product.value);
  }

  return {
    product,
    categories,
    bookProduct,
    bookDlgRef,
    isAuth,
    isOwner
  }
}