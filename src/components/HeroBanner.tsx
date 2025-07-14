import { Button } from "./ui/button";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=500&fit=crop"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Temukan Event Terbaik di Indonesia
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Dari konser musik, pertandingan olahraga, hingga seminar bisnis.
          Semua ada di sini!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6 cursor-pointer">
            Explore Event
          </Button>
          <Link href="/create-event">
            <Button size="lg" variant="outline" className="cursor-pointer text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-black">
              Create Event
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}