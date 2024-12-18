import {UserProfile} from "~/models/user/UserProfile";

export class Product {
  name: string | null;
  price: number | null;
  categories: [] | null;
  user: UserProfile | null;

  constructor() {
    this.name = null;
    this.price = null;
    this.categories = null;
    this.user = new UserProfile();
  }
}