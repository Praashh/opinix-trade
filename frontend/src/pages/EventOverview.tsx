import Navbar from "@/components/Navbar";
import PlaceOrder from "@/components/PlaceOrder";

const EventOverview = () => {
  return (
    <div className="w-screen h-screen bg-bg p-5">
      <Navbar />

      <div className="flex">
        <div className="w-2/3">
          <div className="flex gap-6">
            <img
              src="https://via.placeholder.com/150"
              alt=""
              className="w-32 h-32"
            />
            <p className="font-sora text-gray text-2xl">
              Will India win the 2nd test against Bangladesh
            </p>
          </div>
          <div className="mt-10">
            <p className="font-sora text-gray text-lg"> Order Book</p>
            <p className="font-sora text-gray text-lg">Probabilities Timeline</p>
            <p className="font-sora text-gray text-lg"> About the Event</p>
          </div>
        </div>

        <div className="w-1/3 pr-10">
          <PlaceOrder
            onClickYes={() => {}}
            onClickNo={() => {}}
            yesPrice={0}
            noPrice={0}
            price={0}
            availableQty={0}
            onClickPlaceOrder={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default EventOverview;
