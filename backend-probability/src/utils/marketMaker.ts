import { WebsocketServer } from "../router/websockets";

interface Order {
  price: number;
  quantity: number;
}
type OrderBook = {
  yes: Order[];
  no: Order[];
  topYesPrice: number;
  topNoPrice: number;
};

const initializeOrderBook = (): OrderBook => {
  const orderBook: OrderBook = {
    yes: [],
    no: [],
    topYesPrice: 5,
    topNoPrice: 5,
  };

  for (let price = 0.5; price <= 9.5; price += 0.5) {
    orderBook.yes.push({
      price,
      quantity: Math.floor(Math.random() * 100) + 1,
    });
    orderBook.no.push({ price, quantity: Math.floor(Math.random() * 100) + 1 });
  }
  orderBook.topYesPrice = 5;
  orderBook.topNoPrice = 5;

  return orderBook;
};
export let orderBook = initializeOrderBook();

export const processOrder = (
  side: "yes" | "no",
  quantity: number,
  price: number,
  orderBook: OrderBook
) => {
  const topYes = orderBook.yes.find(
    (order) => order.price === orderBook.topYesPrice
  );
  const topNo = orderBook.no.find(
    (order) => order.price === orderBook.topNoPrice
  );

  if (side === "yes") {
    if (topYes && topNo && topYes.quantity >= quantity) {
      topYes.quantity -= quantity;
      topNo.quantity += quantity;
      if (topYes.quantity === 0) {
        orderBook.topYesPrice += 0.5;
        orderBook.topNoPrice -= 0.5;
      }
    }
  } else {
    if (topNo && topYes && topNo.quantity >= quantity) {
      topNo.quantity -= quantity;
      topYes.quantity += quantity;
      if (topNo.quantity === 0) {
        orderBook.topNoPrice -= 0.5;
        orderBook.topYesPrice += 0.5;
      }
    }
  }

  broadcastOrderBook(orderBook);
};
export const calculateProbabilty = (orderBook: OrderBook) => {
  const yesProb = (orderBook.topYesPrice / 10) * 100;
  const noProb = 100 - yesProb;

  return {
    yesProb,
    noProb,
  };
};
const broadcastOrderBook = (orderBook: OrderBook) => {
  const probability = calculateProbabilty(orderBook);

  WebsocketServer.broadcast({
    orderBook,
    probability,
  });
};
