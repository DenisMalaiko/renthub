import {gql} from "graphql-tag";

export const GET_PRODUCTS_BY_USER = gql`
  query($userId: String!){
    productsByUser(userId: $userId) {
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

export const GET_PRODUCTS = gql`
  query {
    products {
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
`

export const GET_CATEGORIES = gql`
  query {
    categories {
      _id
      name
    }
  }
`