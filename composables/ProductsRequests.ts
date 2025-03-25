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

export const uploadPhoto = async (file: File) => {
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
    const response = await fetch("http://localhost:8080/graphql", {
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
