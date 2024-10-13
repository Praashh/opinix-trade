import { Router } from "express";
import { intializeOrderbook } from "../services/InitializeOB";
import { WebsocketServer } from "./webSockets";
import { startLiquidity } from "../services/fakeLiquidity";
import { redisClient } from "@repo/order-queue";
import { placeOrder } from "../services/placeOrder";
import { sellOrder } from "../services/sellOrder";

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
  // startLiquidity(eventId);
  res.status(200).json({ message: "Order book initialized successfully" });
});

router.post("/place-order", async (req, res) => {
  try {
    const { userId, eventId, side, quantity, price } = req.body;
    if (!inMemoryOrderBooks[eventId]) {
      return res.json({ message: "No orderbook found for the event" });
    }
    if (!userId || !eventId || !side || !quantity || !price) {
      return res.status(401).json({ message: "Invalid order information" });
    }
    await placeOrder(userId, eventId, side, quantity, price);
    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error: any) {
    console.error("Error placing order:", error);
    return res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
});

router.post("/sell-order", async (req, res) => {
  const { eventId, side, quantity, price } = req.body;
  if (!eventId || !side || !quantity || !price) {
    return res.status(401).json({ message: "Invalid information" });
  }

  try {
    const result = await sellOrder(eventId, side, quantity, price);

    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during order processing." });
  }
});

export default router;
