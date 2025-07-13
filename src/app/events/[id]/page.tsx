import { EventDetails } from "@/components/EventDetails";
import { EventContent } from "@/components/EventContent";
import { Breadcrumb } from "@/components/Breadcrumbs";

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

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventDetail(params.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb />
      <EventDetails event={event} />
      <EventContent event={event} />
    </div>
  );
}
