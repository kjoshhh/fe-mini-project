import { Calendar, MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/cards";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface EventCardProps {
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

export function EventCard({ 
  title, 
  image, 
  date, 
  time, 
  location, 
  price, 
  rating, 
  category, 
  isFeatured 
}: EventCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isFeatured && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            Featured
          </Badge>
        )}
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-white/90 text-black"
        >
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
          {rating && (
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">Mulai dari</span>
          <p className="font-semibold text-lg text-primary">{price}</p>
        </div>
        <Button size="sm" className="px-6">
          Beli Tiket
        </Button>
      </CardFooter>
    </Card>
  );
}