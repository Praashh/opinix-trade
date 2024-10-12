import { Router } from "express";
import { intializeOrderbook } from "../services/InitializeOB";
import { WebsocketServer } from "./webSockets";
import { startLiquidity } from "../services/fakeLiquidity";

const router = Router();

export const inMemoryOrderBooks: { [eventId: string]: any } = {};

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
      topPriceYes: orderBook.topPriceYes,
      topPriceNo: orderBook.topPriceNo,
    },
  };

  WebsocketServer.broadcast(eventId, broadcastData);
  startLiquidity(eventId);
  res.status(200).json({ message: "Order book initialized successfully" });
});

export default router;
