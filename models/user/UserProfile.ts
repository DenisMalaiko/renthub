import {User} from "~/models/user/User";
import {City} from "~/models/City";

export class UserProfile extends User {
  _id: string;
  token: string;
  tokenExpiration: number;

  constructor(_id: string, token: string, tokenExpiration: number, name: string, login: string, email: string, city: City) {
    super()
    this._id = _id ?? "";
    this.token = token ?? "";
    this.tokenExpiration = tokenExpiration ?? 0;
    this.name = name ?? "";
    this.login = login ?? "";
    this.email = email ?? "";
    this.city = city ?? null;
  }

  clear() {
    this._id = "";
    this.name = "";
    this.login = "";
    this.email = "";
    this.token = "";
    this.tokenExpiration = 0;
  }
}