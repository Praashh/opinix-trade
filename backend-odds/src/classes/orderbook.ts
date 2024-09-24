import redis from "../services/redis";
import { AVLTree } from "./avl-tree";

interface Order {
    id: string;
    quantity: number;
    price: number;
    timeStamp: number;
}

export class Orderbook {
    buyOrders: AVLTree<Order[]>;
    sellOrders: AVLTree<Order[]>;

    constructor() {
        this.buyOrders = new AVLTree<Order[]>();
        this.sellOrders = new AVLTree<Order[]>();
    }
    initiateEvent(){
        //  adding buy
        const buyOrder = {
            id: `buy1`,
            quantity: 100,
            price: 5,
            timeStamp: Date.now()
        }
        this.buyOrders.insert(buyOrder.price, [buyOrder]);
        //  adding sell
        const sellOrder = {
            id: `sell1`,
            quantity: 100,
            price: 5,
            timeStamp: Date.now()
        };
        this.sellOrders.insert(sellOrder.price, [sellOrder]);
        
        return {message: "Market Initiated", yes:{buyOrder}, no:{sellOrder}};
    }
    async addBuyOrder(): Promise<void> {
        const data = await redis.brPop("YesTrade", 0);
        const yesData = JSON.parse(data?.element!);
        console.log("YesRedis Data", yesData.Trade);
        
        const existingOrders = this.buyOrders.find(yesData.Trade.price);
        if (existingOrders) {
            existingOrders.push(yesData.Trade);
            existingOrders.sort((a, b) => a.timeStamp - b.timeStamp);
        } else {
            this.buyOrders.insert(yesData.Trade.price, [yesData.Trade]);
        }
        this.matchOrders();
    }

    async addSellOrder(): Promise<void> {
        const data = await redis.brPop("NoTrade", 0);
        const noData = JSON.parse(data?.element!);
        console.log("NoRedis Data", noData.Trade);

        const existingOrders = this.sellOrders.find(noData.Trade.price);
        if (existingOrders) {
            existingOrders.push(noData.Trade);
            existingOrders.sort((a, b) => a.timeStamp - b.timeStamp);
        } else {
            this.sellOrders.insert(noData.Trade.price, [noData.Trade]);
        }
        this.matchOrders();
    }

    private matchOrders(): void {
        let tradeCommision = 0.01;
        while (true) {
            const highestBuy = this.buyOrders.findMax();
            const lowestSell = this.sellOrders.findMin();

            if (!highestBuy || !lowestSell || highestBuy[0].price < lowestSell[0].price) {
                break;
            }
            // trade executing
            const buyOrder = highestBuy.shift()!;
            const sellOrder = lowestSell.shift()!;

            const matchedQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);
            const tradePrice = sellOrder.price; // Trade happens at the seller's price

            // 1% commission for both buyer and seller
            const buyerCommission = (matchedQuantity * tradePrice) * tradeCommision;
            const sellerCommission = (matchedQuantity * tradePrice) * tradeCommision;

            const totalPaidByBuyer = (matchedQuantity * tradePrice) + buyerCommission;
            const totalReceivedBySeller = (matchedQuantity * tradePrice) - sellerCommission;
            console.log("-------------------------------------------------------------");
            console.log(`Matched: ${matchedQuantity} units at price ${tradePrice}`);
            console.log(`Buyer pays: ${totalPaidByBuyer} (includes ${buyerCommission} commission)`);
            console.log(`Seller receives: ${totalReceivedBySeller} (after ${sellerCommission} commission)`);
            console.log("-------------------------------------------------------------");
            buyOrder.quantity -= matchedQuantity;
            sellOrder.quantity -= matchedQuantity;

            if (buyOrder.quantity > 0) {
                highestBuy.unshift(buyOrder);
            }
            if (sellOrder.quantity > 0) {
                lowestSell.unshift(sellOrder);
            }

            if (highestBuy.length === 0) {
                this.buyOrders.delete(buyOrder.price);
            }
            if (lowestSell.length === 0) {
                this.sellOrders.delete(sellOrder.price);
            }
        }
    }

    removeOrder(id: string, price: number, isBuyOrder: boolean): boolean {
        const tree = isBuyOrder ? this.buyOrders : this.sellOrders;
        const orders = tree.find(price);

        if (!orders) return false;

        const index = orders.findIndex(order => order.id === id);
        if (index === -1) return false;

        orders.splice(index, 1);
        if (orders.length === 0) {
            tree.delete(price);
        }

        return true;
    }

    getOrderBookState(): { buyOrders: Order[], sellOrders: Order[] } {
        const buyOrders: Order[] = [];
        const sellOrders: Order[] = [];

        this.traverseTree(this.buyOrders.root, buyOrders);
        this.traverseTree(this.sellOrders.root, sellOrders);

        return { buyOrders, sellOrders };
    }

    private traverseTree(node: any, result: Order[]): void {
        if (!node) return;

        this.traverseTree(node.left, result);
        result.push(...node.value);
        this.traverseTree(node.right, result);
    }

    getBestBuyPrice(): number | null {
        const highestBuy = this.buyOrders.findMax();
        return highestBuy ? highestBuy[0].price : null;
    }

    getBestSellPrice(): number | null {
        const lowestSell = this.sellOrders.findMin();
        return lowestSell ? lowestSell[0].price : null;
    }

    getOrderDepth(levels: number): { buyLevels: [number, number][], sellLevels: [number, number][] } {
        const buyLevels: [number, number][] = [];
        const sellLevels: [number, number][] = [];

        this.getDepthLevels(this.buyOrders.root, buyLevels, levels, true);
        this.getDepthLevels(this.sellOrders.root, sellLevels, levels, false);

        return { buyLevels, sellLevels };
    }

    private getDepthLevels(node: any, result: [number, number][], levels: number, isBuyOrder: boolean): void {
        if (!node || result.length >= levels) return;

        if (isBuyOrder) {
            this.getDepthLevels(node.right, result, levels, isBuyOrder);
        } else {
            this.getDepthLevels(node.left, result, levels, isBuyOrder);
        }

        if (result.length < levels) {
            const totalQuantity = node.value.reduce((sum: number, order: Order) => sum + order.quantity, 0);
            result.push([node.key, totalQuantity]);
        }

        if (isBuyOrder) {
            this.getDepthLevels(node.left, result, levels, isBuyOrder);
        } else {
            this.getDepthLevels(node.right, result, levels, isBuyOrder);
        }
    }
    calculateProbabilty(){
        const yesProb = (this.getBestBuyPrice()! / 10) * 100;
        const noProb = 100 - yesProb;
      
        return {
          yesProb,
          noProb,
        };
    }
}

