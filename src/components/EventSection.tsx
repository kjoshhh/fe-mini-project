import { EventCard } from "./EventCard";
import { Button } from "./ui/button";

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: string;
  rating?: number;
  category: string;
  isFeatured?: boolean;
}

interface EventSectionProps {
  title: string;
  subtitle?: string;
  events: Event[];
  showViewAll?: boolean;
}

export function EventSection({ title, subtitle, events, showViewAll = true }: EventSectionProps) {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground text-lg">{subtitle}</p>
            )}
          </div>
          {showViewAll && (
            <Button variant="outline">
              Lihat Semua
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}