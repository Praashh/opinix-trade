"use server"
import prisma from "../../server/prisma"

interface PlaceOrderProps{
    userId: string;
    eventId: string;
    side: "YES" | "NO";
    quantity: string;
    price: string
}

export const PlaceOrder = async ({userId, eventId, price, quantity, side}:PlaceOrderProps) =>{
    let newOrder;
    try {
        if(side === "YES"){
        //   newOrder = await prisma.yesOrder.create({data:{
        //     quantity,
        //     price,

        //   }})
        }else{

        }
    } catch (error) {
        
    }
}