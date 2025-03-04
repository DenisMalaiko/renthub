import {useMutation, useQuery} from "@vue/apollo-composable";
import { LOGIN } from "~/graphql/queries";
import { CREATE_USER } from "~/graphql/mutations";

export const login = async (email: string, password: string) => {
  return useQuery(LOGIN, {
    email,
    password
  })
}

export const createUser = async () => {
  return useMutation(CREATE_USER)
}