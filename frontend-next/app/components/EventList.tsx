/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { getEvents } from "@/actions/Event/getEvents";

interface Event {
  id: string;
  title: string;
  description: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => (
  <Card className="mb-4 bg-gray-800 text-white">
    <CardContent className="p-4">
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex-grow">
          <Link href={`/event/${event.id}`}>
            <h3 className="font-semibold text-sm">{event.title}</h3>
          </Link>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <Button variant="default">Yes ₹</Button>
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
          No ₹
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default async function EventList() {
  const events = await getEvents();
  if (!events || events.length === 0) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <h2 className="text-xl text-white">No events available</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="font-medium text-center text-4xl text-white mb-6">
        All Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {events.map((event: Event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
