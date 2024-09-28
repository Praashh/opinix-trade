import Event from "@/components/Event";
import HomeNavbar from "@/components/HomeNavbar";
import { useState } from "react";

const HomePage = () => {
    const [category, setCategory] = useState("all");
  return (
    <div className="w-screen h-screen bg-bg">
      <HomeNavbar />
    
      {/* Category Tabs */}
      <div className="flex space-x-4 mb-6 text-white px-8">
        <button
          className={`font-sora text-gray font-semibold ${category === "all" ? "border-b-2 border-gray" : ""}`}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        <button
          className={`font-sora text-gray font-semibold ${category === "sports" ? "border-b-2 border-gray" : ""}`}
          onClick={() => setCategory("sports")}
        >
          Sports
        </button>
        <button
          className={`font-sora text-gray font-semibold ${category === "entertainment" ? "border-b-2 border-gray" : ""}`}
          onClick={() => setCategory("entertainment")}
        >
          Entertainment
        </button>
        <button
          className={`font-sora text-gray font-semibold ${category === "economy" ? "border-b-2 border-gray" : ""}`}
          onClick={() => setCategory("economy")}
        >
          Economy
        </button>
        <button
          className={`font-sora text-gray font-semibold ${category === "politics" ? "border-b-2 border-gray" : ""}`}
          onClick={() => setCategory("politics")}
        >
          Politics
        </button>
      </div>


      {/* Events Grid */}
      <div className="grid grid-cols-3 gap-6 px-8">
        <Event
          title="Will India win the 2nd test match against Bangladesh?"
          image="https://via.placeholder.com/150"
        />
        <Event
          title="Will India win the 2nd test match against Bangladesh?"
          image="https://via.placeholder.com/150"
        />
        <Event
          title="Will India win the 2nd test match against Bangladesh?"
          image="https://via.placeholder.com/150"
        />
        <Event
          title="Will India win the 2nd test match against Bangladesh?"
          image="https://via.placeholder.com/150"
        />
        <Event
          title="Will India win the 2nd test match against Bangladesh?"
          image="https://via.placeholder.com/150"
        />
        <Event
          title="Will India win the 2nd test match against Bangladesh?"
          image="https://via.placeholder.com/150"
        />
      </div>
    </div>
  );
};

export default HomePage;
