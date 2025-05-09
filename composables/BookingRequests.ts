import {useMutation, useQuery} from "@vue/apollo-composable";
import {BOOK_PRODUCT} from "~/graphql/mutations";
import {GET_BOOKINGS_BY_USER} from "~/graphql/queries";


export const bookProduct = async () => {
  return useMutation(BOOK_PRODUCT)
}

export const getBookingsByUser = async (userId: string) => {
  return useQuery(GET_BOOKINGS_BY_USER, {
    userId
  });
}