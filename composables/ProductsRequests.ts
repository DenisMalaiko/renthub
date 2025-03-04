import { useQuery, useMutation } from "@vue/apollo-composable";
import { GET_PRODUCTS, GET_PRODUCTS_BY_USER, GET_CATEGORIES } from "~/graphql/queries";
import { CREATE_PRODUCT, UPLOAD_PHOTO } from "~/graphql/mutations";

export const getProducts = async () => {
  return useQuery(GET_PRODUCTS);
}

export const getProductsByUser = async (userId: string) => {
  return useQuery(GET_PRODUCTS_BY_USER, {
    userId
  });
}

export const addProduct = async () => {
  return useMutation(CREATE_PRODUCT);
}

export const getCategories = async () => {
  return useQuery(GET_CATEGORIES);
}

export const uploadPhoto = async () => {
  return useMutation(UPLOAD_PHOTO);
}