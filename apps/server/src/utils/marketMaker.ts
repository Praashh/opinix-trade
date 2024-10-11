import { redisClient } from "@repo/order-queue";
import { WebsocketServer } from "../router/websockets";
import { updateOrderbookAfterBid } from "../services/updateOrderBookForBids";
import prisma from "@repo/db/client";

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
      await processOrder(
        parsedOrder.userId,
        parsedOrder.side,
        parsedOrder.price,
        parsedOrder.quantity,
        orderbook
      );
    }
    order = await redisClient.rPop("placedOrderQueue");
  }
}

export async function processOrder(
  userId: string,
  side: "yes" | "no",
  price: number,
  quantity: number,
  orderbook: OrderbookForOrders
) {
  const opposingSide = side === "yes" ? "no" : "yes";
  let topPrice = side === "yes" ? orderbook.topYesPrice : orderbook.topNoPrice;
  let opposingTopPrice =
    side == "yes" ? orderbook.topNoPrice : orderbook.topYesPrice;
  let totalfilledQty = 0;

  orderBook[side].sort((a, b) => a.price - b.price);
  if (price < topPrice) {
    await queueOrder(userId, side, price, quantity);
    return;
  } else {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const cost = price * quantity;
    if (user) {
      if (user?.balance < cost) {
        throw new Error("Insufficient balance.");
      }
      await prisma.user.update({
        where: { id: userId },
        data: { balance: user.balance - cost },
      });
    }

    let portfolio = await prisma.portfolio.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!portfolio) {
      portfolio = await prisma.portfolio.create({
        data: {
          userId: userId,
        },
      });
    }
    const buyPrice =
      side === "yes" ? orderbook.topYesPrice : orderbook.topNoPrice;
    const tradeSide = side === "yes" ? "YES" : "NO";
    await prisma.trade.create({
      data: {
        portfolioId: portfolio?.id,
        eventId: orderbook.eventId,
        price: Number(buyPrice),
        quantity: Number(quantity),
        side: tradeSide,
      },
    });
    let currentTopPrice = topPrice;
    while (totalfilledQty < quantity && currentTopPrice <= 9.5) {
      const currentOrders = orderbook[side].filter(
        (order) => order.price === currentTopPrice
      );
      if (currentOrders.length > 0) {
        for (const order of currentOrders) {
          if (totalfilledQty < quantity) {
            const qtyToFill = Math.min(
              quantity - totalfilledQty,
              order.quantity
            );
            order.quantity -= qtyToFill;
            totalfilledQty += qtyToFill;

            if (order.quantity === 0) {
              currentTopPrice += 0.5;
            }
          }
        }
      } else {
        currentTopPrice += 0.5;
      }

      topPrice = currentTopPrice;
      if (side === "yes") {
        orderbook.topYesPrice = topPrice;
        orderbook.topNoPrice = 10 - topPrice;
      } else {
        orderbook.topNoPrice = topPrice;
        orderbook.topYesPrice = 10 - topPrice;
      }
      const oldOppTop = opposingTopPrice;
      const newTopOpposing =
        side === "yes" ? orderbook.topNoPrice : orderbook.topYesPrice;

      if (newTopOpposing < oldOppTop) {
        for (let price = oldOppTop; price >= newTopOpposing; price -= 0.5) {
          const matchingOrder = orderbook[opposingSide].find(
            (order) => order.price === price
          );
          if (matchingOrder && matchingOrder.quantity === 0) {
            matchingOrder.quantity =
              Math.floor(Math.random() * (50 - 30 + 1)) + 30;
          }
        }
      }

      console.log(
        `Updated top prices: ${side} = ${topPrice}, ${opposingSide} = ${
          10 - topPrice
        }`
      );
    }
    WebsocketServer.broadcast(orderbook.eventId, {
      orderBook: {
        yes: orderbook.yes.map((order) => ({
          price: order.price,
          quantity: order.quantity,
        })),
        no: orderBook.no.map((order) => ({
          price: order.price,
          quantity: order.quantity,
        })),
        topPriceYes: orderbook.topYesPrice,
        topPriceNo: orderbook.topNoPrice,
      },
    });
    console.log("ws broadcast");
    await updateOrderbookAfterBid(orderbook);

    console.log("after ordervbook yudated");

    const allTrades = await prisma.trade.findMany({
      where: {
        eventId: orderbook.eventId,
        status: "ACTIVE",
      },
    });
    for (const trade of allTrades) {
      const currentPrice =
        side === "yes" ? orderbook.topYesPrice : orderbook.topNoPrice;
      const gainloss = (currentPrice - trade.price) * trade.quantity;

      await prisma.portfolio.update({
        where: {
          id: trade.portfolioId,
        },
        data: {
          currentBalances: {
            increment: gainloss,
          },
        },
      });
    }
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
      await processOrder(
        parsedOrder.userId,
        parsedOrder.side,
        parsedOrder.price,
        parsedOrder.quantity,
        orderbook
      );
    } else {
      redisClient.lPush("orderQueue", order);
    }
    order = await redisClient.rPop("orderQueue");
  }
}
