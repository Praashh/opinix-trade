import { redisClient } from "../redis/redisClient";
import { WebsocketServer } from "../router/websockets";

import { updateOrderbookAfterBid } from "../services/updateOrderBookForBids";
import prisma from "./db";

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

    const tradeSide = side === "yes" ? "YES" : "NO";
    await prisma.trade.create({
      data: {
        portfolioId: portfolio?.id,
        eventId: orderbook.eventId,
        price: Number(price),
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
            matchingOrder.quantity = Math.floor(Math.random() * 100) + 1;
          }
        }
      }

      console.log(
        `Updated top prices: ${side} = ${topPrice}, ${opposingSide} = ${
          10 - topPrice
        }`
      );
    }
    await updateOrderbookAfterBid(orderbook);

    WebsocketServer.broadcast(orderbook.eventId, {
      orderbook,
    });
    await checkAndExecuteQueueOrders(orderbook);
    WebsocketServer.broadcast(orderbook.eventId, {
      orderbook,
    });
    const allTrades = await prisma.trade.findMany({
      where: {
        eventId: orderbook.eventId,
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
  await redisClient.lpush("orderQueue", order);
  console.log(`Order queued: ${order}`);
}
async function checkAndExecuteQueueOrders(orderbook: OrderbookForOrders) {
  let order = await redisClient.rpop("orderQueue");
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
      redisClient.lpush("orderQueue", order);
    }
    order = await redisClient.rpop("orderQueue");
  }
}

// export const processOrder = (
//   side: "yes" | "no",
//   quantity: number,
//   price: number,
//   orderBook : any
// ) => {

//   if (side === "yes") {

//     if (price < orderBook.topYesPrice) {
//       return {
//         success: false,
//         message: "Invalid request: Price is lower than the top price for Yes.",
//       };
//     }

//     let remainingQty = quantity;
//     let currentPrice = orderBook.topYesPrice;

//     while (remainingQty > 0 && currentPrice <= price) {
//       const currentOrder = orderBook.yes.find((order) => order.price === currentPrice);
//       if (currentOrder && currentOrder.quantity > 0) {
//         const qtyToFill = Math.min(currentOrder.quantity, remainingQty);
//         currentOrder.quantity -= qtyToFill;
//         remainingQty -= qtyToFill;

//         if (currentOrder.quantity === 0) {
//           currentPrice += 0.5;
//         }
//       } else {
//         currentPrice += 0.5;
//       }
//     }

//     const nextTopYes = orderBook.yes.find((order) => order.quantity > 0);
//     if (nextTopYes) {
//       orderBook.topYesPrice = nextTopYes.price;
//     } else {
//       orderBook.topYesPrice = 9.5;
//     }

//     orderBook.topNoPrice = 10 - orderBook.topYesPrice;

//     return { success: true };
//   } else if (side === "no") {

//     if (price < orderBook.topNoPrice) {
//       return {
//         success: false,
//         message: "Invalid request: Price is lower than the top price for No.",
//       };
//     }

//     let remainingQty = quantity;
//     let currentPrice = orderBook.topNoPrice;

//     while (remainingQty > 0 && currentPrice <= price) {
//       const currentOrder = orderBook.no.find((order) => order.price === currentPrice);
//       if (currentOrder && currentOrder.quantity > 0) {
//         const qtyToFill = Math.min(currentOrder.quantity, remainingQty);
//         currentOrder.quantity -= qtyToFill;
//         remainingQty -= qtyToFill;

//         if (currentOrder.quantity === 0) {
//           currentPrice += 0.5;
//         }
//       } else {
//         currentPrice += 0.5;
//       }
//     }

//     const nextTopNo = orderBook.no.find((order) => order.quantity > 0);
//     if (nextTopNo) {
//       orderBook.topNoPrice = nextTopNo.price;
//     } else {
//       orderBook.topNoPrice = 9.5;
//     }

//     orderBook.topYesPrice = 10 - orderBook.topNoPrice;

//     return { success: true };
//   }
// };

//   const topYes = orderBook.yes.find(
//     (order) => order.price === orderBook.topYesPrice
//   );
//   const topNo = orderBook.no.find(
//     (order) => order.price === orderBook.topNoPrice
//   );

//   if (side === "yes") {
//     if (price < orderBook.topYesPrice) {
//       return {
//         success: false,
//         message: "Invalid request: Price is lower than the top price for Yes.",
//       };
//     }
//     if (topYes && topYes.quantity < quantity) {
//       return {
//         success: false,
//         message: "Invalid request: Not enough quantity available.",
//       };
//     }
//     if (!userPortfolio.initialPrice && !userPortfolio.side) {
//       userPortfolio.side = "yes";
//       userPortfolio.initialPrice = orderBook.topYesPrice;
//       userPortfolio.initialQuantity = quantity;
//     }

//     if (topYes && topNo && topYes.quantity >= quantity) {
//       topYes.quantity -= quantity;

//       if (topYes.quantity === 0) {
//         orderBook.topYesPrice += 0.5;
//         orderBook.topNoPrice -= 0.5;
//         broadcastPortfolio();
//         const newTopNo = orderBook.no.find(order => order.price === orderBook.topNoPrice);
//         if (newTopNo) {
//           newTopNo.quantity = Math.floor(Math.random() * 100) + 1;
//         }

//       }

//       broadcastOrderBook(orderBook);
//       return { success: true };
//     } else {
//       return { success: false, message: "Not enough quantity available." };
//     }
//   } else {
//     if (price < orderBook.topNoPrice) {
//       return {
//         success: false,
//         message: "Invalid request: Price is lower than the top price for No.",
//       };
//     }
//     if (topNo && topNo.quantity < quantity) {
//       return {
//         success: false,
//         message: "Invalid request: Not enough quantity available.",
//       };
//     }
//     if (!userPortfolio.initialPrice && !userPortfolio.side) {
//       userPortfolio.side = "no";
//       userPortfolio.initialPrice = orderBook.topNoPrice;
//       userPortfolio.initialQuantity = quantity;
//     }

//     if (topNo && topYes && topNo.quantity >= quantity) {
//       topNo.quantity -= quantity;

//       if (topNo.quantity === 0) {
//         orderBook.topNoPrice += 0.5;
//         orderBook.topYesPrice -= 0.5;
//         broadcastPortfolio()
//         const newTopYes = orderBook.yes.find(order => order.price === orderBook.topYesPrice);
//         if (newTopYes) {
//           newTopYes.quantity = Math.floor(Math.random() * 100) + 1;
//         }
//         ;
//       }

//       broadcastOrderBook(orderBook);
//       return { success: true };
//     } else {
//       return { success: false, message: "Not enough quantity available." };
//     }
//   }
// };

// export const calculateProbabilty = (orderBook: OrderBook) => {
//   const yesProb = (orderBook.topYesPrice / 10) * 100;
//   const noProb = 100 - yesProb;

//   return {
//     yesProb,
//     noProb,
//   };
// };

// export const getPortfolio = () => {
//   if (!userPortfolio.side || userPortfolio.initialPrice === null) {
//     return { success: false, message: "No orders placed yet." };
//   }

//   const currentPrice =
//     userPortfolio.side === "yes" ? orderBook.topYesPrice : orderBook.topNoPrice;
//   const gainLoss =
//     (currentPrice - userPortfolio.initialPrice) *
//     userPortfolio.initialQuantity!;

//   return {
//     success: true,
//     side: userPortfolio.side,
//     initialPrice: userPortfolio.initialPrice,
//     currentPrice,
//     quantity: userPortfolio.initialQuantity,
//     gainLoss: `${gainLoss.toFixed(2)} Rs`,
//   };
// };
// const broadcastOrderBook = (orderBook: OrderBook) => {
//   const probability = calculateProbabilty(orderBook);

//   WebsocketServer.broadcast({
//     orderBook,
//     probability,
//   });
// };
// const broadcastPortfolio = () => {
//   const portfolio = getPortfolio();
//   WebsocketServer.broadcast({
//     portfolio,
//   });
// };
