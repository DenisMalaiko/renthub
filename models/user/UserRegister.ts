import {User} from "~/models/user/User";
import {City} from "~/models/City";
import {UserTypes} from "~/enum/UserTypes";

export class UserRegister extends User {
  password?: string;
  repeatPassword?: string;

  constructor() {
    super()
    this.password = "";
    this.repeatPassword = "";
  }

  clear() {
    this.name = "";
    this.login = "";
    this.email = "";
    this.city = new City();
    this.role = UserTypes.User;
    this.password = "";
    this.repeatPassword = "";
  }
}