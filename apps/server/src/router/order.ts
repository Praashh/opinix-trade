import { Router } from "express";
import prisma from "../utils/db";
import {
  incomingOrder,
  OrderbookForOrders,
  OrderStatus,
} from "../utils/marketMaker";
import { sellOrder } from "../utils/sellOrder";

const router = Router();

router.post("/place-order", async (req, res) => {
  const { userId, eventId, side, quantity, price } = req.body;

  if (
    !userId ||
    !eventId ||
    !["yes", "no"].includes(side) ||
    !quantity ||
    !price
  ) {
    return res.status(400).json({ error: "Invalid order data" });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }
  try {
    const orderbook = await prisma.orderBook.findUnique({
      where: {
        eventId: eventId,
      },
      include: {
        yes: true,
        no: true,
      },
    });

    if (!orderbook) {
      return res.status(403).json({
        message:
          "no orderbook found for this event(event closed or doesn't exists)",
      });
    }
    if (
      orderbook.topPriceYes === undefined ||
      orderbook.topPriceNo === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Order book is missing topPrice data." });
    }

    const typedOrderbook: OrderbookForOrders = {
      id: orderbook.id,
      eventId: orderbook.eventId,
      topYesPrice: orderbook.topPriceYes,
      topNoPrice: orderbook.topPriceNo,
      yes: orderbook.yes.map((order: any) => ({
        price: order.price,
        quantity: order.quantity,
        id: order.id,
        createdAt: order.createdAt,
        orderBookId: order.orderBookId,
        status: order.status as OrderStatus,
      })),
      no: orderbook.no.map((order: any) => ({
        price: order.price,
        quantity: order.quantity,
        id: order.id,
        createdAt: order.createdAt,
        orderBookId: order.orderBookId,
        status: order.status as OrderStatus,
      })),
    };

    await incomingOrder(userId, side, price, quantity, typedOrderbook);

    return res.status(200).json({ message: "Order processed successfully" });
  } catch (e) {
    console.log("Error placing order", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sell-order", async (req, res) => {
  const { tradeId, eventId, side, quantity, price } = req.body;
  if (!tradeId || !eventId || !side || !quantity || !price) {
    return res.status(400).json({ error: "Invalid order data" });
  }
  const trade = await prisma.trade.findUnique({
    where: {
      id: tradeId,
    },
    include: {
      event: true,
    },
  });
  if (!trade) {
    return res.status(400).json({ error: "No trade found" });
  }
  if (trade.event.status !== "ONGOING") {
    return res.status(400).json({ error: "Event is not ongoing" });
  }
  if (trade.price !== price || trade.quantity !== quantity) {
    return res.status(400).json({
      error: "Trade price or quantity does not match the stored trade data",
    });
  }
  const orderbook = await prisma.event.findUnique({
    where: {
      id: trade.eventId,
    },
    include: {
      orderBook: {
        include: {
          yes: true,
          no: true,
        },
      },
    },
  });
  if (!orderbook?.orderBook) {
    return res
      .status(400)
      .json({ error: "Order book not found for this event" });
  }
 if(!orderbook.orderBook.topPriceNo || !orderbook.orderBook.topPriceYes){
  return
 }
 const { topPriceYes, topPriceNo } = orderbook.orderBook;
  const sellResult = await sellOrder(
    tradeId,
    eventId,
    side,
    quantity,
    price,
    orderbook.orderBook,
    topPriceYes, 
    topPriceNo
  );

  return res.json({ message: "Order processed successfully" });
});

export default router;
