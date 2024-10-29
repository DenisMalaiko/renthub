import {User} from "~/models/user/User";
import {City} from "~/models/City";

export class UserRegister extends User {
  city?: City;
  password?: string;
  repeatPassword?: string;

  constructor() {
    super()
    this.city = new City();
    this.password = "";
    this.repeatPassword = "";
  }

  clear() {
    this.name = "";
    this.login = "";
    this.email = "";
    this.city = new City();
    this.password = "";
    this.repeatPassword = "";
  }
}