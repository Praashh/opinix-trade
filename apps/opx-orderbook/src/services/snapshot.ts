import prisma from "@repo/db/client";
import { inMemoryOrderBooks } from "../routes/orderBookRoutes";

export async function snapshot() {
  const eventIds = Object.keys(inMemoryOrderBooks);
  for (const eventId of eventIds) {
    const orderBook = inMemoryOrderBooks[eventId];
    try {
      await prisma.orderBook.update({
        where: {
          eventId: eventId,
        },
        data: {
          topPriceYes: orderBook.topPriceYes,
          topPriceNo: orderBook.topPriceNo,
          yes: {
            updateMany: orderBook.yes.map((order: any) => ({
              where: {
                id: order.id,
              },
              data: {
                quantity: order.quantity,
              },
            })),
          },
          no: {
            updateMany: orderBook.no.map((order: any) => ({
              where: {
                id: order.id,
              },
              data: {
                quantity: order.quantity,
              },
            })),
          },
        },
      });
      console.log(`Successfully saved order book for event ${eventId}`);
      console.log(orderBook);
    } catch (e) {
      console.log("failed to save the orderbook", e);
    }
  }
}
