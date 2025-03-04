import {gql} from "graphql-tag";

export const CREATE_PRODUCT = gql`
  mutation product ($productInput: ProductInput!) {
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

export const UPLOAD_PHOTO = gql`
  mutation($file: Upload!) {
    uploadPhoto(file: $file) {
      id
      filename
    }
  }
`;

export const CREATE_USER = gql`
  mutation user ($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id 
      email
    }
  }
`