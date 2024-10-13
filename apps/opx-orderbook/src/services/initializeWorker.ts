import prisma from "@repo/db/client";
import { inMemoryOrderBooks } from "../routes/orderBookRoutes";

export async function startWorker() {
  const activeEvents = await prisma.event.findMany({
    where: {
      status: "ONGOING",
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

  activeEvents.forEach((event) => {
    if (event.orderBook) {
      inMemoryOrderBooks[event.id] = {
        id: event.orderBook.id,
        eventId: event.id,
        topPriceYes: event.orderBook.topPriceYes,
        topPriceNo: event.orderBook.topPriceNo,
        yes: event.orderBook.yes,
        no: event.orderBook.no,
      };
    }
  });
  console.log(inMemoryOrderBooks);
  console.log("All active orderbooks reinitialized from database.");
}
