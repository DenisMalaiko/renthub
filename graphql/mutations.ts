import {gql} from "graphql-tag";

export const CREATE_PRODUCT = gql`
  mutation($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
      _id
      name
      price
      user {
        _id
        name
        login
        email
      }
      categories {
        _id
        name
      }
    }
  }
`;