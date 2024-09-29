import { processOrder } from './../utils/marketMaker';
import { Router } from "express";
import prisma from "../utils/db";

const router = Router();


// router.post("/place-order", async(req, res) => {
//   const { eventId ,side, quantity, price } = req.body;

//   if ( !eventId ||!["yes", "no"].includes(side) || !quantity || !price) {
//     return res.status(400).json({ error: "Invalid order data" });
//   }

//   try{
//     const orderbook = await prisma.orderBook.findUnique({
//         where :{
//             id : eventId
//         },include:{
//             yes : true,
//             no : true
//         }
//     })
//     if(!orderbook){
//         return res.status(403).json({message : "no orderbook found for this event(event closed or doesn't exists"})
//     }
//     const result = processOrder(side , price , quantity, orderbook);
    
//   }catch(e){
//     console.log("Error placing order",e)
//     res.status(500).json({ error: "Internal Server Error" });
//   }


// });



export default router;
