import { LuShoppingBag, LuLogOut } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-24 top-0 bg-[#05071A]">
      {/* OpinioX Logo */}
      <div className="absolute left-9 top-7 text-white font-sora font-semibold text-4xl">
        OpinioX
      </div>

      {/* Search Bar */}
      <div className="absolute left-56 top-7 flex items-center bg-gray-300 border border-gray shadow-md rounded-full w-[439px] h-10">
        <IoIosSearch className="ml-4 text-white text-2xl" />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 bg-transparent w-full focus:outline-none placeholder-gray-500"
        />
      </div>

      {/* Right Section - Shopping Bag, Logout */}
      <div className="absolute right-0 top-7 flex items-center space-x-4 pr-10">
        {/* Balance Box */}
        <div className="flex items-center justify-center w-24 h-9 bg-[#05071A] border-3 border-white shadow-md">
          <span className="text-white text-xl font-semibold">₹ 100</span>
        </div>

        {/* Shopping Bag Icon */}
        <button 
        onClick={()=>{navigate('/portfolio')}}
        className="relative w-8 h-8 flex items-center justify-center bg-transparent">
          <LuShoppingBag className="text-white w-6 h-6" />
        </button>

        {/* Logout Icon */}
        <button className="relative w-8 h-8 flex items-center justify-center bg-transparent">
          <LuLogOut className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
