// import { orderbook } from "../index"
// import redis from "../services/redis"
// console.log("Inside process Orders");

// export async function orderServer() {
//     try {
//         while (true) {
//             const data = await redis.brPop("Trade", 0);
//             console.log("redis data", data);

//             if (data?.element) {
//                 const { Trade } = JSON.parse(
//                     data.element
//                 );

//                 await processOrders(Trade.side, { Trade });
//             }
//         }
//     } catch (error) {
//         console.log("Redis failed to connect", error);
//     }
// }
// orderServer();


// async function processOrders(side: string, Trade: any) {
//     if (side === "yes") {
//         orderbook.addBuyOrder(Trade)
//     } else {
//         orderbook.addSellOrder(Trade);
//     }

//     console.log(orderbook.getOrderBookState);
    
// }