import { orderBook } from "./../utils/marketMaker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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
    orderBook.yes.forEach((order) => {
      if (order.price >= orderBook.topPriceYes) {
        const change = Math.floor(Math.random() * 5) - 2;
        order.quantity = Math.max(0, order.quantity + change);
      }
    });
    orderBook.no.forEach((order) => {
      if (order.price >= orderBook.topPriceNo) {
        const change = Math.floor(Math.random() * 5) - 2;
        order.quantity = Math.max(0, order.quantity + change);
      }
    });

    await prisma.orderBook.update({
      where: {
        id: orderBook.id,
      },
      data: {
        yes: {
          update: orderBook.yes.map((order) => ({
            where: { id: order.id },
            data: {
              quantity: order.quantity,
            },
          })),
        },
        no: {
          update: orderBook.no.map((order) => ({
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
    console.log("Order books updated successfully.");
  }
}
