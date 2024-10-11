export interface Order {
  id: string;
  orderBookId: string;
  price: number;
  quantity: number;
  status: "PENDING" | "PLACED";
  createdAt: Date;
}

export class orderBook {
  public id: string;
  public eventId: string;
  public topYesPrice: number;
  public topNoPrice: number;
  public yes: Order[];
  public no: Order[];

  constructor(
    id: string,
    eventId: string,
    topYesPrice: number,
    topNoPrice: number
  ) {
    (this.id = id),
      (this.eventId = eventId),
      (this.topYesPrice = topYesPrice),
      (this.topNoPrice = topNoPrice),
      (this.yes = []),
      (this.no = []);
  }
}
