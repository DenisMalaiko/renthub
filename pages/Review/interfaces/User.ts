interface Location {
  country: string,
  city: string
}

export interface User {
  name: string,
  email: string,
  age: number | null,
  location: Location
}