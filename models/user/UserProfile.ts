import {User} from "~/models/user/User";

export class UserProfile extends User {
  _id: string;
  token: string;
  tokenExpiration: number;

  constructor(_id: string, token: string, tokenExpiration: number, name: string, login: string, email: string) {
    super()
    this._id = _id ?? "";
    this.token = token ?? "";
    this.tokenExpiration = tokenExpiration ?? 0;
    this.name = name ?? "";
    this.login = login ?? "";
    this.email = email ?? "";
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