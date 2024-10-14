"use server";
import prisma from "@repo/db/client";

export async function getEventDetails(eventId: string) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
}
