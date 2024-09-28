interface YesButtonProps {
    onClick: () => void;
  }
  
  const YesButton: React.FC<YesButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="bg-blue-600 text-white font-semibold rounded-[20px] w-32 h-10 font-sora"
      >
        Yes
      </button>
    );
  };
  
  export default YesButton;
  