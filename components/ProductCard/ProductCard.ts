import {Product} from "~/models/Product";
import { UserModule } from "~/store/user";
import { ProductModule } from "~/store/products";

export function useCardLogic() {
  const userModule = UserModule();
  const productModel = ProductModule();
  const isAuth = userModule.user.token;

  const deleteProduct = async (id: string) => {
    await productModel.deleteProduct(id);
  }

  return {
    deleteProduct,
    isAuth
  }
}