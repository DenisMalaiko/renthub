import {UserProfile} from "~/models/user/UserProfile";

export class Product {
  name: string | null;
  price: number | null;
  categories?: [] | null;
  userId: string | null;
  photo: File | string | null;

  constructor(userId: string) {
    this.name = null;
    this.price = null;
    this.categories = null;
    this.userId = userId ?? null;
    this.photo = null;
  }
}