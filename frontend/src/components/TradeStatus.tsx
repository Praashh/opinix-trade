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
    <div className="">
      <div className="bg-gradient-to-r from-[#212635] to-[#191B25] rounded-2xl flex gap-6 p-3">
        <div>
          <img src={image} alt="" className="w-10 h-10" />
          <p className="font-sora text-gray text-sm">{title}</p>
        </div>

        <div className="flex gap-20">
          <p className="font-sora text-gray text-sm">{investment}</p>
          <p className="font-sora text-gray text-sm">{returns}</p>
        </div>
      </div>
    </div>
  );
};

export default TradeStatus;
