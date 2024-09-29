interface TradeStatusProps {
  image: string;
  title: string;
  returns: number;
  investment: number;
}

const TradeStatus: React.FC<TradeStatusProps> = ({
  image,
  title,
  returns,
  investment,
}) => {
  return (
    <div className="flex flex-col items-center w-2/3"> {/* Center the component */}
      <div className="flex gap-6 p-3 justify-between w-full"> 
        <div className="flex gap-4">
          <p className="font-sora text-gray text-sm mt-3">Event</p> 
        </div>

        <div className="flex gap-10 mt-3">
          <p className="font-sora text-gray text-sm">Investment</p> 
          <p className="font-sora text-gray text-sm">Returns</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#212635] to-[#191B25] rounded-2xl flex gap-6 p-3 justify-between w-full"> 
        <div className="flex gap-4">
          <img src={image} alt={title} className="w-10 h-10" />
          <p className="font-sora text-gray text-sm mt-3">{title}</p>
        </div>

        <div className="flex gap-20 mt-3">
          <p className="font-sora text-gray text-sm pr-5">₹{investment}</p>
          <p className="font-sora text-gray text-sm pr-5">₹{returns}</p>
        </div>
      </div>
    </div>
  );
};

export default TradeStatus;
