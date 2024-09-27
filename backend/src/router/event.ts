import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { initializeOrderBook } from "../utils/marketMaker";

const router = Router();
const prisma = new PrismaClient();

router.post("/events", async (req, res) => {
  const { userId, title, description } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || user.role !== "ADMIN") {
      return res.json({ message: "Forbidden: Only admins can create events." });
    }
    const event = await prisma.event.create({
      data: {
        title: title,
        description: description,
        adminId: userId,
      },
    });
    const orderbook = initializeOrderBook();
    await prisma.orderBook.create({
      data: {
        eventId: event.id,
        yes: {
          create: orderbook.yes.map((order) => ({
            price: order.price,
            quantity: order.quantity,
          })),
        },
        no: {
          create: orderbook.no.map((order) => ({
            price: order.price,
            quantity: order.quantity,
          })),
        },
        topPriceYes: orderbook.topYesPrice,
        topPriceNo: orderbook.topNoPrice,
      },
    });

    return res.status(201).json(event);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
