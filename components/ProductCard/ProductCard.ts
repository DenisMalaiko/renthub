import {Product} from "~/models/Product";
import { UserModule } from "~/store/user";
import { ProductModule } from "~/store/products";

export function useCardLogic() {
  const userModule = UserModule();
  const productModel = ProductModule();
  const isAuth = userModule.user.token;

  const deleteProduct = async (id: string) => {
    console.log("DELETE PRODUCT ", id);
    await productModel.deleteProduct(id);

    console.log("Successfully deleted!")
  }

  return {
    deleteProduct,
    isAuth
  }
}