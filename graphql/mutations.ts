import {gql} from "graphql-tag";

export const CREATE_PRODUCT = gql`
  mutation product ($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
      _id
      name
      description
      price
      photo
      owner {
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

export const DELETE_PRODUCT = gql`
  mutation product($productId: String!) {
    deleteProduct(productId: $productId) {
      status
      message
    }
  }
`

export const UPLOAD_PHOTO = gql`
  mutation UploadPhoto($photo: Upload!) {
    uploadPhoto(photo: $photo) {
      id
      filename
      url
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

export const UPDATE_USER = gql`
  mutation user ($userUpdateInput: UserUpdateInput!) { 
    updateUser(userUpdateInput: $userUpdateInput) {
      _id
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

export const BOOK_PRODUCT = gql`
  mutation booking ($bookingInput: BookingInput!) {
    bookProduct(bookingInput: $bookingInput) {
      _id
      startDate
      endDate
      createdAt
      owner {
        _id
        name
        login
        email 
      }
      renter {
        _id
        name
        login
        email
      }
      product {
        _id
        name
        description
        price
        photo
      }
    }
  }
`

export const DELETE_BOOKING = gql`
  mutation booking($bookingId: String!) {
    deleteBooking(bookingId: $bookingId) {
      status
      message
    }
  }
`