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
  public topPriceYes: number;
  public topPriceNo: number;
  public yes: Order[];
  public no: Order[];

  constructor(
    id: string,
    eventId: string,
    topPriceYes: number,
    topPriceNo: number
  ) {
    (this.id = id),
      (this.eventId = eventId),
      (this.topPriceYes = topPriceYes),
      (this.topPriceNo = topPriceNo),
      (this.yes = []),
      (this.no = []);
  }
}