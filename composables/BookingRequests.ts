import {useMutation, useQuery} from "@vue/apollo-composable";
import {BOOK_PRODUCT, DELETE_BOOKING} from "~/graphql/mutations";
import {GET_BOOKINGS_BY_USER} from "~/graphql/queries";


export const bookProduct = async () => {
  return useMutation(BOOK_PRODUCT)
}

export const getBookingsByUser = async (renterId: string) => {
  return useQuery(GET_BOOKINGS_BY_USER, {
    renterId
  });
}

export const deleteBooking = async () => {
  return useMutation(DELETE_BOOKING)
}