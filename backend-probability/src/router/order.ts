import { Router } from "express";
import { addOrder, broadcastUpdates, calculateProbabilty, orderbook } from "../utils/marketMaker";
import { WebsocketServer } from "..";
const router  = Router();

router.get("/orderbook",async(req,res)=>{
   const probabilties = calculateProbabilty();
   res.json({
    orderbook,
    probabilties
   })
})

router.post("/order",async(req,res)=>{
    const {option , price , quantity , type} = req.body;
    if(option != 'yes' && option != 'no'){
        res.status(401).json({message : "Invalid inputs"})
        return
    }
    if(quantity<0 || price <=0){
        res.status(400).json({ error: 'Invalid price or quantity' });
    return;
    }
    if (type !== 'buy' && type !== 'sell') {
        return res.status(400).json({ error: 'Invalid type. Must be "buy" or "sell".' });
    }
    addOrder(option,{price,quantity,type});
    broadcastUpdates(WebsocketServer);
    res.status(201).json({ message: 'Order placed successfully' });
})

export default router