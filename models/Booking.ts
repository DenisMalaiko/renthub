export class Booking {
  startDate: Date | string;
  endDate: Date | string;
  createdAt: Date | string;
  productId: string;
  ownerId: string;
  renterId: string;

  constructor() {
    this.startDate = new Date();
    this.endDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    this.createdAt = new Date();
    this.productId = "";
    this.ownerId = "";
    this.renterId = "";
  }
}