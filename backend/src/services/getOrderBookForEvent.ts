import prisma from "../utils/db";

export const getOrderBookForEvent = async (eventId: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        orderBook: {
          include: {
            yes: true,
            no: true,
          },
        },
      },
    });

    if (!event || !event.orderBook) {
      throw new Error("Event or order book not found");
    }

    return {
      orderBook: {
        yes: event.orderBook.yes.map((order) => ({
          price: order.price,
          quantity: order.quantity,
        })),
        no: event.orderBook.no.map((order) => ({
          price: order.price,
          quantity: order.quantity,
        })),
        topPriceYes: event.orderBook.topPriceYes,
        topPriceNo: event.orderBook.topPriceNo,
      },
     
    };
  } catch (error) {
    console.error("Error fetching order book for event:", error);
    return null;
  }
};
