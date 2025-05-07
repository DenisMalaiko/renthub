import {useMutation} from "@vue/apollo-composable";
import {BOOK_PRODUCT} from "~/graphql/mutations";


export const bookProduct = async () => {
  return useMutation(BOOK_PRODUCT)
}