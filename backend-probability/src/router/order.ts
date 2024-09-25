import { Router } from "express";
import {
  calculateProbabilty,
  getPortfolio,
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

  const result = processOrder(side, quantity, price, orderBook);

  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.json({ message: "Order processed successfully." });
});

router.get("/portfolio", (req, res) => {
  const portfolio = getPortfolio();
  if (!portfolio.success) {
    return res.status(400).json({ message: portfolio.message });
  }
  return res.json(portfolio);
});

export default router;
