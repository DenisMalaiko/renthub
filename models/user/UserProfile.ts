import {User} from "~/models/user/User";

export class UserProfile extends User {
  _id: string;
  token: string;
  tokenExpiration: number;

  constructor() {
    super()
    this._id = "";
    this.token = "";
    this.tokenExpiration = 0;
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