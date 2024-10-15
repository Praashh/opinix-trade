import { EventCard } from "@/components/EventCard";

const Page = () => {
  const events = [
    {
      icon: "/assets/event1.png",
      traders: 31823,
      question: "Centre to constitute the 8th Pay Commission?",
      yesValue: 4,
      noValue: 6,
    },
    {
      icon: "/assets/event2.png",
      traders: 6410,
      question:
        "Kane Williamson to announce his retirement from international T20 cricket?",
      yesValue: 4.5,
      noValue: 5.5,
    },
    {
      icon: "/assets/event3.png",
      traders: 7467,
      question:
        "Tesla to open their first showroom in India by the end of 2024?",
      yesValue: 2.5,
      noValue: 7.5,
    },
    {
      icon: "/assets/event4.png",
      traders: 1367,
      question: "Red Bull Racing to win the F1 Constructors Championship 2024?",
      yesValue: 5,
      noValue: 5,
    },
    {
      icon: "/assets/event1.png",
      traders: 31823,
      question: "Centre to constitute the 8th Pay Commission?",
      yesValue: 4,
      noValue: 6,
    },
    {
      icon: "/assets/event2.png",
      traders: 6410,
      question:
        "Kane Williamson to announce his retirement from international T20 cricket?",
      yesValue: 4.5,
      noValue: 5.5,
    },
    {
      icon: "/assets/event3.png",
      traders: 7467,
      question:
        "Tesla to open their first showroom in India by the end of 2024?",
      yesValue: 2.5,
      noValue: 7.5,
    },
    {
      icon: "/assets/event4.png",
      traders: 1367,
      question: "Red Bull Racing to win the F1 Constructors Championship 2024?",
      yesValue: 5,
      noValue: 5,
    },
  ];

  return (
    <>
    <div className="w-full lg:w-full p-8 flex justify-center items-center">
        {/* Events Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:w-1/2 w-full mt-8 lg:mt-0 overflow-y-auto">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    
    </>
  );
};


export default Page;