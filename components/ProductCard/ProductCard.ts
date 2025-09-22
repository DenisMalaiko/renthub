import { UserModule } from "~/store/user";
import { ProductModule } from "~/store/products";
import { ref } from "vue";

export function useCardLogic() {
  const userModule = UserModule();
  const productModel = ProductModule();
  const isAuth = userModule.user.token;
  const refConfirmDlg = ref();

  const deleteProduct = async (id: string) => {
    refConfirmDlg.value.open("Are you sure you want to delete this product?")
    .then(async (result: boolean | null) => {
      console.log("RESULT ", result)
      if(result) {
        await productModel.deleteProduct(id);
      }
    });
  }

  const updateProduct = async (id: string) => {
    console.log("Update ID ", id);
  }

  return {
    isAuth,
    refConfirmDlg,
    deleteProduct,
    updateProduct,
  }
}