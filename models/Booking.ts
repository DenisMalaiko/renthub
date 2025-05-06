export class Booking {
  startDate: Date | string;
  endDate: Date | string;
  productId: string;
  userId: string;

  constructor() {
    this.startDate = new Date();
    this.endDate =  new Date();
    this.productId = "";
    this.userId = "";
  }
}