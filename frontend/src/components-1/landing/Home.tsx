import { eventData } from '@/lib/event-data';
import { EventCard } from "../../components/ui/EventCard";

export default function Home() {

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">All events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {eventData.map((event:any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

