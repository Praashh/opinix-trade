export interface Order {
    id: string;
    side:string;
    quantity: number;
    price: number;
    timeStamp: number;
  }
  
 export interface OrderbookType {
    addBuyOrder(order: Order): void;
    addSellOrder(order: Order): void;
    getOrderBookState(): object;
    getOrderDepth(levels: number): object;
    getBestBuyPrice(): number | null;
    getBestSellPrice(): number | null ;
    calculateProbabilty(): {
        yesProb: number;
        noProb: number;
    }
    buyOrders:any,
    sellOrders:any
  }