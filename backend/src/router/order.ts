import { Router } from "express";
import prisma from "../utils/db";
import {
  OrderbookForOrders,
  OrderStatus,
  processOrder,
} from "../utils/marketMaker";

const router = Router();

router.post("/place-order", async (req, res) => {
  const { eventId, side, quantity, price } = req.body;

  if (!eventId || !["yes", "no"].includes(side) || !quantity || !price) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    const orderbook = await prisma.orderBook.findUnique({
      where: {
        eventId : eventId
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
      yes: orderbook.yes.map((order) => ({
        price: order.price,
        quantity: order.quantity,
        id: order.id,
        createdAt: order.createdAt,
        orderBookId: order.orderBookId,
        status: order.status as OrderStatus,
      })),
      no: orderbook.no.map((order) => ({
        price: order.price,
        quantity: order.quantity,
        id: order.id,
        createdAt: order.createdAt,
        orderBookId: order.orderBookId,
        status: order.status as OrderStatus,
      })),
    };

    const result = processOrder(side, price, quantity, typedOrderbook);

    return res
      .status(200)
      .json({ message: "Order processed successfully", result });
  } catch (e) {
    console.log("Error placing order", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
