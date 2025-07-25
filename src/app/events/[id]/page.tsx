import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { EventDetails } from "@/components/EventDetails";
import { EventContent } from "@/components/EventContent";
import { Breadcrumb } from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";

import EventActionButtonsWrapper from "@/components/EventActionButtonsWrapper";

interface EventData {
  id: number;
  title: string;
  description: string;
  location: string;
  thumbnail: string;
  category: string;
  salesStart?: string;
  salesEnd?: string;
  tickets: {
    id: number;
    name: string;
    price: number;
    quota: number;
    sold: number;
  }[];
  organizer: {
    id: number;
    username: string;
    email: string;
  };
}

interface JwtPayload {
  id: number;
  username: string;
  email: string;
}

async function getEventDetail(id: string): Promise<EventData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/public/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  const data = await res.json();
  return data.data;
}

async function getCurrentUser(): Promise<JwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventDetail(params.id);
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="solid-light" />
      <Breadcrumb />
      <EventDetails event={event} />
      <EventContent event={event} />

      <EventActionButtonsWrapper
        eventId={event.id}
        currentUserId={currentUser?.id ?? null}
        organizerId={event.organizer.id}
      />
    </div>
  );
}
