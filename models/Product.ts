import {UserProfile} from "~/models/user/UserProfile";

export class Product {
  name: string | null;
  description: string | null;
  price: number | null;
  categories?: [] | null;
  owner: string | null;
  photo: File | BlobPart | string | null | any;

  constructor(owner: string) {
    this.name = null;
    this.description = null;
    this.price = null;
    this.categories = null;
    this.owner = owner ?? null;
    this.photo = null;
  }
}