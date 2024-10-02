/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/events";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  category: string;
  avatar: string;
  yesPrice: number;
  noPrice: number;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => (
  <Card className="mb-4 bg-gray-800 text-white">
    <CardContent className="p-4">
      <div className="flex items-center space-x-4 mb-2">
        <Avatar>
          <img
            src={event.avatar}
            alt={event.category}
            className="rounded-full"
          />
        </Avatar>
        <div className="flex-grow">
          <Link href={`/event/${event.id}`}>
            <h3 className="font-semibold text-sm">{event.title}</h3>
          </Link>
          <Badge variant="secondary" className="mt-1 text-xs bg-[#854D0E]">
            {event.category}
          </Badge>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <Button variant="default">Yes {event.yesPrice} ₹</Button>
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
          No {event.noPrice} ₹
        </Button>
      </div>
    </CardContent>
  </Card>
);

const EventList = () => (
  <div className="min-h-screen p-6">
    <h1 className="font-medium text-center text-4xl text-white mb-6">
      All Events
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </div>
);

export default EventList;
