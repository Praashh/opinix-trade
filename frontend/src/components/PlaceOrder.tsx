interface PlaceOrderProps {
    onClickYes: () => void;
    onClickNo: () => void;
    yesPrice: number;
    noPrice: number;
    price: number;
    availableQty: number;
    onClickPlaceOrder: () => void;
  }
  
  const PlaceOrder: React.FC<PlaceOrderProps> = ({
    onClickYes,
    onClickNo,
    yesPrice,
    noPrice,
    price,
    availableQty,
    onClickPlaceOrder,
  }) => {
    return (
      <div>
        <div
          className="p-10 rounded-[20px]
          shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
        >
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
  
          <div className="flex justify-between my-5">
            <p className="text-white font-sora">Price: {price}</p>
            <p className="text-white font-sora">Available Qty: {availableQty}</p>
          </div>
  
        {/* Price Slider */}
        <div className="my-5">
          <input
            type="range"
            min={0} 
            max={10}
            className="w-full"
          />
        </div>

        {/* Quantity Slider */}
        <div className="my-5">
          <p className="text-white font-sora mb-2">Quantity: {availableQty}</p>
          <input
            type="range"
            min={1} 
            max={100}
            className="w-full"
          />
        </div>
  
          <div className="text-white font-sora my-5">
            Total Investment: {price} x {availableQty} = ₹{price * availableQty}
          </div>
  
          <div className="text-white font-sora my-5">
            Maximum Returns: {price} x {availableQty} = ₹{price * availableQty}
          </div>
  
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
  

