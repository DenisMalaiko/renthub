export class Booking {
  range: Date[] | null;
  createdAt: Date | string;
  productId: string;
  ownerId: string;
  renterId: string;

  constructor() {
    this.range = [new Date()];
    this.createdAt = new Date();
    this.productId = "";
    this.ownerId = "";
    this.renterId = "";
  }
}