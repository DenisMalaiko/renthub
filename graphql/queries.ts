import {gql} from "graphql-tag";

export const GET_PRODUCTS_BY_USER = gql`
  query products($userId: String!){
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
  query products {
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
  query categories {
    categories {
      _id
      name
    }
  }
`

export const LOGIN = gql`
  query user($email: String!, $password: String!) { 
    login(email: $email, password: $password) {
      _id 
      token
      tokenExpiration
      name
      login
      email
      city { 
        cityId
        cityName
        countryId
        countryName
        fullAddress
      }
    }
  }  
`