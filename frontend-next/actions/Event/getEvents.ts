import prisma from "@/server/prisma";

export async function getEvents() {
  try {
    const events = await prisma.event.findMany();
    console.log(events);
    return events;
  } catch (error) {
    console.error("Error fetching events: ", error);
    return [];
  }
}
