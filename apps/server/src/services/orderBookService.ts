import { WebsocketServer } from "../router/websockets";
import prisma from "@repo/db/client";

export async function updateOrderBook() {
  const onGoingEvents = await prisma.event.findMany({
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
  for (const event of onGoingEvents) {
    if (!event.orderBook) {
      console.warn(
        `Event ${event.id} has no associated orderBook. Skipping...`
      );
      continue;
    }
    const orderBook = event.orderBook;
    orderBook.yes.forEach((order:any) => {
      if (order.price >= orderBook.topPriceYes) {
        const change = Math.floor(Math.random() * 5) - 2;
        order.quantity = Math.max(2, order.quantity + change);
      }
    });
    orderBook.no.forEach((order:any) => {
      if (order.price >= orderBook.topPriceNo) {
        const change = Math.floor(Math.random() * 5) - 2;
        order.quantity = Math.max(2, order.quantity + change);
      }
    });

    await prisma.orderBook.update({
      where: {
        id: orderBook.id,
      },
      data: {
        yes: {
          update: orderBook.yes.map((order:any) => ({
            where: { id: order.id },
            data: {
              quantity: order.quantity,
            },
          })),
        },
        no: {
          update: orderBook.no.map((order:any) => ({
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
    WebsocketServer.broadcast(event.id, {
      orderBook: {
        yes: orderBook.yes,
        no: orderBook.no,
        topPriceYes: orderBook.topPriceYes,
        topPriceNo: orderBook.topPriceNo,
      },
     
    });
    console.log("Order books updated successfully.");
  }
}
