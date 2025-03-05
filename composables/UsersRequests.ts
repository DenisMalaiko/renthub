import {useMutation, useQuery} from "@vue/apollo-composable";
import { LOGIN } from "~/graphql/queries";
import { CREATE_USER, UPDATE_USER } from "~/graphql/mutations";

export const login = async (email: string, password: string) => {
  return useQuery(LOGIN, {
    email,
    password
  })
}

export const createUser = async () => {
  return useMutation(CREATE_USER);
}

export const updateUser = async () => {
  return useMutation(UPDATE_USER);
}