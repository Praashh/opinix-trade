import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import LiveNowIndicator from "./stream";
import { Button } from "./button";

export const EventCard = ({ event }:any) => (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar>
            <div className="text-2xl">{event.icon}</div>
          </Avatar>
          <span className="font-bold text-sm">{event.traders} traders</span>
        </div>
      </CardHeader>
      <CardContent>
        <Link to={event.url}><h3 className="font-bold text-lg mb-2">{event.title}</h3></Link>
        <p className="text-sm text-cyan-500">{event.status}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          {event.yesOption.text} {event.yesOption.price}
        </Button>
        <Button  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg">
          {event.noOption.text} {event.noOption.price}
        </Button>
        <LiveNowIndicator/>
      </CardFooter>
    </Card>
  );