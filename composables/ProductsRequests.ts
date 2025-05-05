import { useQuery, useMutation } from "@vue/apollo-composable";
import {GET_PRODUCTS, GET_PRODUCTS_BY_USER, GET_CATEGORIES, GET_PRODUCT_BY_ID} from "~/graphql/queries";
import {CREATE_PRODUCT, DELETE_PRODUCT, UPLOAD_PHOTO} from "~/graphql/mutations";
import {useRuntimeConfig} from "nuxt/app";

export const getProducts = async () => {
  return useQuery(GET_PRODUCTS);
}

export const getProductById = async (productId: string) => {
  return useQuery(GET_PRODUCT_BY_ID, {
    productId
  });
}

export const getProductsByUser = async (userId: string) => {
  return useQuery(GET_PRODUCTS_BY_USER, {
    userId
  });
}

export const addProduct = async () => {
  return useMutation(CREATE_PRODUCT);
}

export const deleteProduct = async () => {
  return useMutation(DELETE_PRODUCT)
}

export const getCategories = async () => {
  return useQuery(GET_CATEGORIES);
}

export const uploadPhoto = async (file: File) => {
  const config = useRuntimeConfig()
  const formData = new FormData();
  formData.append("operations", JSON.stringify({
    query: `
      mutation UploadPhoto($photo: Upload!) {
        uploadPhoto(photo: $photo) {
          id
          filename
          url
        }
      }
    `,
    variables: { photo: null }
  }));

  formData.append("map", JSON.stringify({ "0": ["variables.photo"] }));
  formData.append("0", file, file.name);

  try {
    const response = await fetch(`${config.public.API_URL}/graphql`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const result = await response.json();
    console.log("Фото завантажено:", result);
    return result.data.uploadPhoto;
  } catch (error) {
    console.error("Помилка завантаження:", error);
    throw error;
  }
};

/*
export const uploadPhoto = async () => {
  return useMutation(UPLOAD_PHOTO, {
    context: { hasUpload: true }
  });
}*/
