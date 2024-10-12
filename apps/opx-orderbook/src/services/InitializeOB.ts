import { orderBook } from "../utils/orderbook";

export function intializeOrderbook(intitalData: any): orderBook {
  const {
    id,
    eventId,
    topPriceYes,
    topPriceNo,
    yes: yesOrders,
    no: noOrders,
  } = intitalData;

  const inMemoryOrderBook = new orderBook(id, eventId, topPriceYes, topPriceNo);

  inMemoryOrderBook.yes = yesOrders.map((order: any) => ({
    id: order.id,
    orderBookId: inMemoryOrderBook.id,
    price: order.price,
    quantity: order.quantity,
    status: order.status,
  }));

  inMemoryOrderBook.no = noOrders.map((order: any) => ({
    id: order.id,
    orderBookId: inMemoryOrderBook.id,
    price: order.price,
    quantity: order.quantity,
    status: order.status,
  }));
  console.log(inMemoryOrderBook);
  console.log(`Order book initialized for event: ${eventId}`);

  return inMemoryOrderBook;
}
