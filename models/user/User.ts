import {City} from "~/models/City";
import {UserTypes} from "~/enum/UserTypes";

export class User {
  name: string;
  login: string;
  email: string;
  city?: City | null;
  role: string;

  constructor() {
    this.name = "";
    this.login = "";
    this.email = "";
    this.city = new City();
    this.role = UserTypes.User;
  }
}