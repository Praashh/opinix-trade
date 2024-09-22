import { Router } from "express";
import {
  calculateProbabilty,
  orderBook,
  processOrder,
} from "../utils/marketMaker";
const router = Router();

router.get("/orderbook", async (req, res) => {
  const probability = calculateProbabilty(orderBook);
  res.json({
    orderBook,
    probability,
  });
});

router.post("/order", (req, res) => {
  const { side, quantity, price } = req.body;

  if (!["yes", "no"].includes(side) || !quantity || !price) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  processOrder(side, quantity, price, orderBook);
  res.json({ message: "Order processed" });
});

export default router;
