import {City} from "~/models/City";

export class User {
  name: string;
  login: string;
  email: string;
  city?: City | null;

  constructor() {
    this.name = "";
    this.login = "";
    this.email = "";
    this.city = new City();
  }
}