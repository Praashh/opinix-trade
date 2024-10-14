import { inMemoryOrderBooks } from "../routes/orderBookRoutes";
import { WebsocketServer } from "../routes/webSockets";

export function fakeliquidity(eventId: string) {
  const orderBook = inMemoryOrderBooks[eventId];
  if (!orderBook) {
    return;
  }
  orderBook.yes.forEach((order: any) => {
    if (order.price >= orderBook.topPriceYes) {
      const change = Math.floor(Math.random() * 5) - 2;
      order.quantity = Math.max(1, order.quantity + change);
    }
  });
  orderBook.no.forEach((order: any) => {
    if (order.price >= orderBook.topPriceNo) {
      const change = Math.floor(Math.random() * 5) - 2;
      order.quantity = Math.max(1, order.quantity + change);
    }
  });
  const broadcastData = {
    orderbook: {
      yes: orderBook.yes,
      no: orderBook.no,
      topPriceYes: orderBook.topPriceYes,
      topPriceNo: orderBook.topPriceNo,
    },
  };

  WebsocketServer.broadcast(eventId, broadcastData);
}
export function startLiquidity(eventId: string, interval = 20000) {
  setInterval(() => {
    fakeliquidity(eventId);
  }, interval);
}
