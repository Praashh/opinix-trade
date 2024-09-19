import  Websocket, { WebSocketServer }  from 'ws';

interface Order{
    price : number,
    quantity : number
    type : 'buy'|'sell'
}
export const orderbook:{yes : Order[], no : Order[]} ={
    yes:[],
    no: []
}

export function calculateProbabilty(){
   let totalYesPrice = orderbook.yes.reduce((sum,order)=> sum + order.price*order.quantity,0);
   let totalNoPrice = orderbook.no.reduce((sum,order)=> sum + order.price*order.quantity,0);

   let totalPrice = totalNoPrice+totalYesPrice;
    const yesProbabilty = (totalYesPrice/totalPrice)*100;
    const noProbabilty = (totalNoPrice/totalPrice)*100;
   return{
    yesProbabilty,
    noProbabilty,
    totalPrice,
    totalNoPrice,
    totalYesPrice
   }
} 
   export function broadcastUpdates(wss : Websocket.Server){
     const probabilties = calculateProbabilty();
     const message = JSON.stringify({
        orderbook,
        probabilties
     })
     wss.clients.forEach((client)=>{
        if(client.readyState === Websocket.OPEN){
            client.send(message)
        }
     })
   }
   
 export function marketMakerOrders(wss : Websocket.Server){
    const interval = 10000;
    setInterval(()=>{
        const newYesOrder: Order = {
             price: parseFloat((Math.random() * 9.99).toFixed(1)), 
             quantity: Math.floor(Math.random() * 50) + 1 , 
             type : 'buy'};
        const newNoOrder: Order ={
            price : parseFloat((Math.random()*9.99).toFixed(1)), 
            quantity: Math.floor(Math.random()*50)+1, 
            type : 'buy'}
        const newYesSellOrder: Order = {
            price: parseFloat((Math.random() * 9.99).toFixed(1)),
            quantity: Math.floor(Math.random() * 50) + 1,
            type: 'sell',
        };
        const newNoSellOrder: Order = {
            price: parseFloat((Math.random() * 9.99).toFixed(1)),
            quantity: Math.floor(Math.random() * 50) + 1,
            type: 'sell',
        };
        orderbook.yes.push(newYesOrder,newYesSellOrder)
        orderbook.no.push(newNoOrder,newNoSellOrder)
        console.log(`${new Date().toLocaleTimeString()},Added new orders: YES ${JSON.stringify(newYesOrder)}, NO ${JSON.stringify(newNoOrder)}`)
        console.log(`${new Date().toLocaleTimeString()},Added new Sell orders: YES ${JSON.stringify(newYesSellOrder)}, NO ${JSON.stringify(newNoSellOrder)}`)
        broadcastUpdates(wss);
    },interval)
 }

 export function addOrder(option : 'yes'|'no' ,order : Order){
    const orderList = orderbook[option];
    if(order.type == 'buy'){
        const sellOrders = orderList.filter(x => x.type === 'sell').sort((a, b) => a.price - b.price);
        for(let i=0;i<sellOrders.length;i++){
            const sellOrder = orderList[i];

            if(sellOrder.type == 'sell'  && sellOrder.price <= order.price){
                const quantityToMatch = Math.min(order.quantity, sellOrder.quantity);
                console.log(`Matching buy order for ${option.toUpperCase()} at price ${order.price} with sell order at price ${sellOrder.price}. Matched quantity: ${quantityToMatch}`);
                order.quantity -= sellOrder.quantity
                sellOrder.quantity -= quantityToMatch;

                if(sellOrder.quantity == 0){
                    orderList.splice(i,1);
                    i--;
                }
                if(order.quantity == 0){
                    break;
                }
            }
        }

    } else if(order.type === 'sell'){
        const buyOrders = orderList.filter(x => x.type === 'buy').sort((a, b) => b.price - a.price);
        for (let i = 0; i < buyOrders.length; i++) {
            const buyOrder = orderList[i];

            
            if (buyOrder.type === 'buy' && buyOrder.price >= order.price) {
                const quantityToMatch = Math.min(order.quantity, buyOrder.quantity);
                console.log(`Matching sell order for ${option.toUpperCase()} at price ${order.price} with buy order at price ${buyOrder.price}. Matched quantity: ${quantityToMatch}`);
               
                order.quantity -= quantityToMatch;
                buyOrder.quantity -= quantityToMatch;

               
                if (buyOrder.quantity === 0) {
                    orderList.splice(i, 1);
                    i--; 
                }

                
                if (order.quantity === 0) {
                    break;
                }
            }
        }
    
    }
    if (order.quantity > 0) {
        orderList.push(order);
    }
 }
