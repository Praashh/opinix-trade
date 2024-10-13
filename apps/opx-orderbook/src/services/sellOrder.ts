import prisma from "@repo/db/client";
import { inMemoryOrderBooks } from "../routes/orderBookRoutes";
import { WebsocketServer } from "../routes/webSockets";

export async function sellOrder(
  eventId: string,
  side: string,
  quantity: number,
  price: number
) {
  const orderBook = inMemoryOrderBooks[eventId];
  if (!orderBook) {
    return { success: false };
  }
  const oppositeSide = side === "yes" ? "no" : "yes";
  const oppositeOrder = orderBook[oppositeSide];
  oppositeOrder.sort((a : any, b : any) => a.price - b.price);

  for (let order of oppositeOrder) {
    if (order.quantity >= quantity) {
      order.quantity -= quantity;

      if (side === "yes") {
        await prisma.noOrder.update({
          where: {
            id: order.id,
          },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });
      } else {
        await prisma.yesOrder.update({
          where: {
            id: order.id,
          },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });
      }
    //  const gainLoss = 10 * quantity - (price + order.price) * quantity;
    //   await prisma.trade.update({
    //     where: {
    //       id: tradeId,
    //     },
    //     data: {
    //       status: "PAST",
    //       gainloss: gainLoss,
    //     },
    //   });

    const broadcastData = {
        orderbook: {
          yes: orderBook.yes,
          no: orderBook.no,
          topPriceYes: orderBook.topPriceYes,
          topPriceNo: orderBook.topPriceNo,
        },
      };
    
      WebsocketServer.broadcast(eventId, broadcastData);

    //   const trade = await prisma.trade.findUnique({
    //     where: {
    //       id: tradeId,
    //     },
    //     include: {
    //       portfolio: {
    //         include: {
    //           user: true,
    //         },
    //       },
    //     },
    //   });
    //   await prisma.user.update({
    //     where: {
    //       id: trade?.portfolio.userId,
    //     },
    //     data: {
    //       balance: order.price * quantity,
    //     },
    //   });

      return { success: true, message: "Order executed successfully." };
    }
  }
  return {
    success: false,
    message: "Order execution failed: insufficient opposite orders.",
  };
}
