import { Response, Request } from "express"
import "../utils/processOrders"
import { pushTradeInQueue } from "../utils/pushTradeInQueue";
// orderServer();
export async function newOrder(req: Request, res: Response) {
    const { side, price, quantity } = req.body;
    
    // await pushTradeInQueue({key:"Trade", Trade:{ id: `buy-8341746736473647237FDJBSFJDBSDFB`,side, quantity, price, timeStamp: Date.now()}})
    try {
        if(side === 'yes'){
            // orderbook.addBuyOrder({
            //     id: `randomdjfjsdbfjsbgjsdbgjs`,
            //     side,
            //     quantity,
            //     price,
            //     timeStamp: Date.now(),
            //   });
        }else{
            // orderbook.addSellOrder({
            //     id: `randomdjfjsdbfjsbgjsdbgjs`,
            //     side,
            //     quantity,
            //     price,
            //     timeStamp: Date.now(),
            //   });
        }
          
          return res.json({ body:req.body})
    } catch (error) {   
        res.json(500).json({error})
    }
}