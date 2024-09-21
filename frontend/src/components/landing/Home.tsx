import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { eventData } from '@/lib/event-data';

const client = new W3CWebSocket('http://localhost:8080');

const EventCard = ({ event }:any) => (
  <Card className="w-full max-w-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex items-center space-x-2">
        <Avatar>
          <div className="text-2xl">{event.icon}</div>
        </Avatar>
        <span className="font-bold text-sm">{event.traders} traders</span>
      </div>
    </CardHeader>
    <CardContent>
      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
      <p className="text-sm text-gray-500">{event.status}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
        {event.yesOption.text} {event.yesOption.price}
      </Badge>
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        {event.noOption.text} {event.noOption.price}
      </Badge>
    </CardFooter>
  </Card>
);

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

