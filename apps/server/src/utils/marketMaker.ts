import axios from "axios";
import { redisClient } from "@repo/order-queue";


redisClient.connect().then(() => {
  console.log("Connected to redisclient");
});

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

export const initializeOrderBook = (): OrderBook => {
  const orderBook: OrderBook = {
    yes: [],
    no: [],
    topYesPrice: 5,
    topNoPrice: 5,
  };

  for (let price = 0.5; price <= 9.5; price += 0.5) {
    if (price < 5) {
      orderBook.yes.push({
        price,
        quantity: 0,
      });
      orderBook.no.push({
        price,
        quantity: 0,
      });
    } else {
      orderBook.yes.push({
        price,
        quantity: Math.floor(Math.random() * 100) + 1,
      });
      orderBook.no.push({
        price,
        quantity: Math.floor(Math.random() * 100) + 1,
      });
    }
  }
  orderBook.topYesPrice = 5;
  orderBook.topNoPrice = 5;

  return orderBook;
};
export let orderBook = initializeOrderBook();

export enum OrderStatus {
  PENDING = "PENDING",
  PLACED = "PLACED",
}
export interface YesOrder {
  id: string;
  orderBookId: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  createdAt: Date;
}
export interface NoOrder {
  id: string;
  orderBookId: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderbookForOrders {
  id: string;
  eventId: string;
  topYesPrice: number;
  topNoPrice: number;
  yes: YesOrder[];
  no: NoOrder[];
}

export async function incomingOrder(
  userId: string,
  side: "yes" | "no",
  price: number,
  quantity: number,
  orderbook: OrderbookForOrders
) {
  await queuePlacedOrder(userId, side, price, quantity);
  console.log("after being added to queue");
  await executePlacedOrder(orderbook);
}
export async function queuePlacedOrder(
  userId: string,
  side: "yes" | "no",
  price: number,
  quantity: number
) {
  const order = JSON.stringify({ userId, side, price, quantity });
  await redisClient.lPush("placedOrderQueue", order);
  console.log(`Placed order queued: ${order}`);
}

export async function executePlacedOrder(orderbook: OrderbookForOrders) {
  let order = await redisClient.rPop("placedOrderQueue");
  while (order) {
    const parsedOrder = JSON.parse(order);
    const topPrice =
      parsedOrder.side === "yes" ? orderbook.topYesPrice : orderbook.topNoPrice;
    if (topPrice > parsedOrder.price) {
      await queueOrder(
        parsedOrder.userId,
        parsedOrder.side,
        parsedOrder.price,
        parsedOrder.quantity
      );
    } else {
      console.log("order sent to the process");

      await axios.post("http://localhost:3002/v1/orderbook/place-order", {
        userId: parsedOrder.userId,
        side: parsedOrder.side,
        price: parsedOrder.price,
        quantity: parsedOrder.quantity,
        eventId: orderbook.eventId,
      });
    }
    order = await redisClient.rPop("placedOrderQueue");
  }
}

async function queueOrder(
  userId: string,
  side: "yes" | "no",
  price: number,
  quantity: number
) {
  const order = JSON.stringify({ userId, side, price, quantity });
  await redisClient.lPush("orderQueue", order);
  console.log(`Order queued: ${order}`);
}
async function checkAndExecuteQueueOrders(orderbook: OrderbookForOrders) {
  let order = await redisClient.rPop("orderQueue");
  while (order) {
    console.log(`Popped order from queue: ${order}`);
    const parsedOrder = JSON.parse(order);
    const topPrice =
      parsedOrder.side === "yes" ? orderbook.topYesPrice : orderbook.topNoPrice;
    if (parsedOrder.price >= topPrice) {
      await axios.post("http://localhost:3002/v1/orderbook/place-order", {
        userId: parsedOrder.userId,
        side: parsedOrder.side,
        price: parsedOrder.price,
        quantity: parsedOrder.quantity,
        eventId: orderbook.eventId,
      });
    } else {
      redisClient.lPush("orderQueue", order);
    }
    order = await redisClient.rPop("orderQueue");
  }
}
