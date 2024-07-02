import {City} from "~/models/City";

export class User {
  name: string;
  login: string;
  email: string;
  city: City;
  password: string;
  repeatPassword?: string;

  constructor() {
    this.name = "";
    this.login = "";
    this.email = "";
    this.city = new City();
    this.password = "";
    this.repeatPassword = "";
  }
}
