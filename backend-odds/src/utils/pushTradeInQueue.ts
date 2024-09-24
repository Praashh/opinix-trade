import redis from "../services/redis";
import { Order } from "../types/orderbook";

interface redisDataProps{
    key:string,
    Trade: Order
}

export async function pushTradeInQueue({key, Trade}:redisDataProps){
    await redis.lPush(
        key,
        JSON.stringify({
           Trade
        })
      );
}
// pushTradeInQueue({key:"NoTrade", Trade:{ id: `sell2`, quantity: 10, price: 5, timeStamp: Date.now()}}) // example