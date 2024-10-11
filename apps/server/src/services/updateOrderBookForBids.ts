import prisma from "@repo/db/client";
import { OrderbookForOrders } from "../utils/marketMaker";

export async function updateOrderbookAfterBid(orderbook: OrderbookForOrders) {
  try {
    await prisma.orderBook.update({
      where: {
        id: orderbook.id,
      },
      data: {
        topPriceNo: orderbook.topNoPrice,
        topPriceYes: orderbook.topYesPrice,
        yes: {
          updateMany: orderbook.yes.map((order) => ({
            where: {
              id: order.id,
            },
            data: {
              quantity: order.quantity,
            },
          })),
        },
        no: {
          updateMany: orderbook.no.map((order) => ({
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
    console.log("updating orderbook")
  } catch (e) {
    console.log("error updating the orderbook", e);
  }
}
