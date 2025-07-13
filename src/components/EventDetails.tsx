import { Calendar, MapPin, Share2, Tag } from "lucide-react";
import { Button } from "./ui/button";

interface EventData {
  title: string;
  location: string;
  thumbnail: string;
  category: string;
  salesStart?: string;
  salesEnd?: string;
}

export function EventDetails({ event }: { event: EventData }) {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl lg:text-4xl mb-6">{event.title}</h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>
                  {event.salesStart
                    ? new Date(event.salesStart).toLocaleString("id-ID", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })
                    : "Tanggal belum tersedia"}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-blue-400" />
                <span>{event.category}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan Event
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img
                src={event.thumbnail}
                alt="Event Thumbnail"
                className="rounded-lg w-full max-w-md"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm">
                {event.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
