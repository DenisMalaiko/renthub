import {UserProfile} from "~/models/user/UserProfile";

export class Product {
  name: string | null;
  price: number | null;
  categories?: [] | null;
  user: string | null;
  photo: File | string | null;

  constructor(user: string) {
    this.name = null;
    this.price = null;
    this.categories = null;
    this.user = user ?? null;
    this.photo = null;
  }
}