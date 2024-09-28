interface NoButtonProps {
    onClick: () => void;
  }
  
  const NoButton: React.FC<NoButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="bg-[#FF426E] text-white font-semibold rounded-[20px] w-32 h-10 font-sora"
      >
        No
      </button>
    );
  };
  
  export default NoButton;
  