import { Input } from "./ui/input";

interface PlaceOrderProps {
  onClickYes: () => void;
  onClickNo: () => void;
  yesPrice: number;
  noPrice: number;
  price: number;
  availableQty: number;
  onPriceChange: (price: number) => void; // Handler for price change
  onQuantityChange: (quantity: number) => void; // Handler for quantity change
  onClickPlaceOrder: () => void;
}

const PlaceOrder: React.FC<PlaceOrderProps> = ({
  onClickYes,
  onClickNo,
  yesPrice,
  noPrice,
  price,
  availableQty,
  onPriceChange, // Handler for price change
  onQuantityChange, // Handler for quantity change
  onClickPlaceOrder,
}) => {
  return (
    <div>
      <div
        className="p-10 rounded-[20px]
        shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
      >
        {/* Yes and No Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClickYes}
            className="bg-blue-600 text-white font-semibold w-48 h-10 font-sora"
          >
            Yes - {yesPrice}
          </button>

          <button
            onClick={onClickNo}
            className="bg-[#FF426E] text-white font-semibold w-48 h-10 font-sora"
          >
            No - {noPrice}
          </button>
        </div>

        {/* Price and Available Quantity */}
        <div className="flex justify-between my-5">
          <p className="text-white font-sora">Price: {price}</p>
          <p className="text-white font-sora">Available Qty: {availableQty}</p>
        </div>

        {/* Price Input */}
        <div className="my-5">
          <p className="text-white font-sora mb-2">Price</p>
          <Input

            type="number"
            value={price}
            onChange={(e) => onPriceChange(Number(e.target.value))} // Handle price change
            className="w-full border border-gray text-white"
            placeholder="Enter Price"
          />
        </div>

        {/* Quantity Input */}
        <div className="my-5">
          <p className="text-white font-sora mb-2">Quantity</p>
          <Input
            type="number"
            value={availableQty}
            onChange={(e) => onQuantityChange(Number(e.target.value))} // Handle quantity change
            className="w-full border border-gray text-white"
            placeholder="Enter Quantity"
          />
        </div>

        {/* Investment and Returns Calculation */}
        <div className="text-white font-sora my-5">
          Total Investment: {price} x {availableQty} = ₹{price * availableQty}
        </div>

        <div className="text-white font-sora my-5">
          Maximum Returns: {price} x {availableQty} = ₹{price * availableQty}
        </div>

        {/* Place Order Button */}
        <button
          className="bg-blue-600 text-white font-semibold w-full h-10 font-sora"
          onClick={onClickPlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
