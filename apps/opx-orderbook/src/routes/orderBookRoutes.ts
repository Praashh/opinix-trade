import { Router } from "express";
import { intializeOrderbook } from "../services/fakeLiquidity";
import { WebsocketServer } from "./webSockets";

const router = Router();

const inMemoryOrderBooks: { [eventId: string]: any } = {};

router.post("/initialize-worker", async (req, res) => {
  const { workerOB } = req.body;
 
  const eventId = workerOB.eventId;
  if (!eventId || inMemoryOrderBooks[eventId]) {
    return res.json({
      message: "Invalid event ID or order book already exists",
    });
  }

  console.log("Initializing order book for eventId:", eventId);
  inMemoryOrderBooks[eventId] = intializeOrderbook(workerOB);

  const orderBook = inMemoryOrderBooks[eventId];
  const broadcastData = {
    orderbook: {
      yes: orderBook.yes,
      no: orderBook.no,
      topYesPrice: orderBook.topYesPrice,
      topNoPrice: orderBook.topNoPrice,
    },
  };

  WebsocketServer.broadcast(eventId, broadcastData);
  res.status(200).json({ message: "Order book initialized successfully" });
});

export default router;
