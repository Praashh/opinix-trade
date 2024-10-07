import { Router } from "express";
import { initializeOrderBook } from "../utils/marketMaker";
import prisma from "@repo/db/client";
import { WebsocketServer } from "./websockets";

const router = Router();

router.post("/intialize", async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      }
    });
    if (!event) {
      return res.status(403).json({ message: "No event found" });
    }
    const orderbook = initializeOrderBook();
    await prisma.orderBook.create({
      data: {
        eventId: event.id,
        topPriceYes: orderbook.topYesPrice,
        topPriceNo: orderbook.topNoPrice,
        yes: {
          create: orderbook.yes.map((order) => ({
            price: order.price,
            quantity: order.quantity,
            status : 'PLACED'
          })),
          
        },
        no: {
          create: orderbook.no.map((order) => ({
            price: order.price,
            quantity: order.quantity,
            status : 'PLACED'
          })),
        },
      },
    });
    WebsocketServer.broadcast(eventId, {
      orderbook: {
        yes: orderbook.yes,
        no: orderbook.no,
        topYesPrice: orderbook.topYesPrice,
        topNoPrice: orderbook.topNoPrice,
      },
    });
    return res
      .status(201)
      .json({ message: "Order book initialized successfully" });
  } catch (e) {
    console.log("error intializing the event", e);
    return res.status(500).json({ message: "Error intializing event" });
  }
});

export default router;