import { Router } from "express";

const router = Router();


router.post("/place-order", (req, res) => {
  const { eventId ,side, quantity, price } = req.body;

  if ( !eventId ||!["yes", "no"].includes(side) || !quantity || !price) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try{

  }catch(e){
    console.log("Error placing order",e)
    res.status(500).json({ error: "Internal Server Error" });
  }


});



export default router;
