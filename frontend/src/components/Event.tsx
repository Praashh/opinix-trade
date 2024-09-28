import NoButton from "./NoButton";
import YesButton from "./YesButton";

interface EventProps {
  title: string;
  image: string;
}

const Event: React.FC<EventProps> = ({ title, image }) => {
  return (
    <div
    className="p-5 border rouded-2xl 
    shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
  >
      <div className="flex gap-6">
        <img src={image} alt="" className="w-10 h-10" />
        <p className="font-sora text-white text-sm">{title}</p>
      </div>

      <div className="flex gap-5 justify-between mt-5">
        <YesButton onClick={() => {}} />
        <NoButton onClick={() => {}} />
      </div>
    </div>
  );
};

export default Event;
