import prisma from "@repo/db/client";
import { inMemoryOrderBooks } from "../routes/orderBookRoutes";
import { WebsocketServer } from "../routes/webSockets";

export async function placeOrder(
  userId: string,
  eventId: string,
  side: string,
  quantity: number,
  price: number
) {
  const orderBook = inMemoryOrderBooks[eventId];
  if (!orderBook) {
    return;
  }
  const opposingSide = side === "yes" ? "no" : "yes";
  let topPrice = side === "yes" ? orderBook.topPriceYes : orderBook.topPriceNo;
  let opposingTopPrice =
    side == "yes" ? orderBook.topPriceNo : orderBook.topPriceYes;
  let totalfilledQty = 0;

  orderBook[side].sort((a: any, b: any) => a.price - b.price);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  console.log("user check")
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
  console.log("portfolio creation/update")
  const buyPrice =
    side === "yes" ? orderBook.topPriceYes : orderBook.topPriceNo;
  const tradeSide = side === "yes" ? "YES" : "NO";
  await prisma.trade.create({
    data: {
      portfolioId: portfolio?.id,
      eventId: orderBook.eventId,
      price: Number(buyPrice),
      quantity: Number(quantity),
      side: tradeSide,
    },
  });
  let currentTopPrice = topPrice;
  while (totalfilledQty < quantity && currentTopPrice <= 9.5) {
    const currentOrders = orderBook[side].filter(
      (order: any) => order.price === currentTopPrice
    );
    if (currentOrders.length > 0) {
      for (const order of currentOrders) {
        if (totalfilledQty < quantity) {
          const qtyToFill = Math.min(quantity - totalfilledQty, order.quantity);
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
      orderBook.topPriceYes = topPrice;
      orderBook.topPriceNo = 10 - topPrice;
    } else {
      orderBook.topPriceNo = topPrice;
      orderBook.topPriceYes = 10 - topPrice;
    }
    const oldOppTop = opposingTopPrice;
    const newTopOpposing =
      side === "yes" ? orderBook.topPriceNo : orderBook.topPriceYes;

    if (newTopOpposing < oldOppTop) {
      for (let price = oldOppTop; price >= newTopOpposing; price -= 0.5) {
        const matchingOrder = orderBook[opposingSide].find(
          (order: any) => order.price === price
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
  const broadcastData = {
    orderbook: {
      yes: orderBook.yes,
      no: orderBook.no,
      topPriceYes: orderBook.topPriceYes,
      topPriceNo: orderBook.topPriceNo,
    },
  };

  WebsocketServer.broadcast(eventId, broadcastData);
  console.log("ws broadcast");

  console.log("after orderbook yudated");

  const allTrades = await prisma.trade.findMany({
    where: {
      eventId: eventId,
      status: "ACTIVE",
    },
  });
  for (const trade of allTrades) {
    const currentPrice =
      side === "yes" ? orderBook.topPriceYes : orderBook.topPriceNo;
    const gainloss = (currentPrice - trade.price) * trade.quantity;
    console.log("finding associate trades");
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
    console.log("updating portfolio balance");
  }
}
