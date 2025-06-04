import { City } from "~/models/City";
import { Category } from "~/models/Category";

export class Product {
  name: string | null;
  description: string | null;
  price: number | null;
  categories: Category[] | null;
  owner: string | null;
  photo: File | BlobPart | string | null | any;
  city : City | null;

  constructor(owner: string) {
    this.name = null;
    this.description = null;
    this.price = null;
    this.categories = [];
    this.owner = owner ?? null;
    this.photo = null;
    this.city = new City();
  }
}