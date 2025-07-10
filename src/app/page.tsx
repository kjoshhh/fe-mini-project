import { Navigation } from "../components/NavigationBar";
import { HeroBanner } from "../components/HeroBanner";
import { EventSection } from "../components/EventSection";
import { PromoBanner } from "../components/PromoBanner";
import { Footer } from "../components/Footer";

// Mock data for events
const featuredEvents = [
  {
    id: "1",
    title: "Java Jazz Festival 2025",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    date: "5-7 Maret 2025",
    time: "19:00 WIB",
    location: "JIExpo Kemayoran, Jakarta",
    price: "Rp 750.000",
    rating: 4.8,
    category: "Musik",
    isFeatured: true
  },
  {
    id: "2",
    title: "Indonesia Comic Con 2025",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    date: "15-17 Februari 2025",
    time: "10:00 WIB",
    location: "ICE BSD, Tangerang",
    price: "Rp 125.000",
    rating: 4.6,
    category: "Hiburan",
    isFeatured: true
  },
  {
    id: "3",
    title: "Seminar Digital Marketing 2025",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    date: "20 Januari 2025",
    time: "09:00 WIB",
    location: "Hotel Mulia, Jakarta",
    price: "Rp 350.000",
    rating: 4.7,
    category: "Edukasi",
    isFeatured: true
  },
  {
    id: "4",
    title: "Konser Raisa Live in Concert",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop",
    date: "10 Februari 2025",
    time: "20:00 WIB",
    location: "Istora Senayan, Jakarta",
    price: "Rp 500.000",
    rating: 4.9,
    category: "Musik",
    isFeatured: true
  }
];

const topEvents = [
  {
    id: "5",
    title: "Liga 1 Indonesia: Persija vs Arema FC",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
    date: "25 Januari 2025",
    time: "19:30 WIB",
    location: "Stadion GBK, Jakarta",
    price: "Rp 75.000",
    rating: 4.5,
    category: "Olahraga"
  },
  {
    id: "6",
    title: "Stand Up Comedy: Raditya Dika",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    date: "12 Februari 2025",
    time: "20:00 WIB",
    location: "Balai Sarbini, Jakarta",
    price: "Rp 200.000",
    rating: 4.7,
    category: "Komedi"
  },
  {
    id: "7",
    title: "Pameran Seni Rupa Modern",
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
    date: "1-28 Februari 2025",
    time: "10:00 WIB",
    location: "Galeri Nasional, Jakarta",
    price: "Rp 25.000",
    rating: 4.3,
    category: "Seni"
  },
  {
    id: "8",
    title: "Festival Kuliner Nusantara",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    date: "18-20 Februari 2025",
    time: "11:00 WIB",
    location: "Lapangan Banteng, Jakarta",
    price: "Gratis",
    rating: 4.4,
    category: "Kuliner"
  }
];

const upcomingEvents = [
  {
    id: "9",
    title: "Konser Dewa 19 Reunion",
    image: "https://images.unsplash.com/photo-1571019613914-85e3d652739d?w=400&h=300&fit=crop",
    date: "15 Maret 2025",
    time: "19:00 WIB",
    location: "Stadion GBK, Jakarta",
    price: "Rp 400.000",
    rating: 4.8,
    category: "Musik"
  },
  {
    id: "10",
    title: "TED Talks Jakarta 2025",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    date: "22 Maret 2025",
    time: "14:00 WIB",
    location: "Kempinski Hotel, Jakarta",
    price: "Rp 450.000",
    rating: 4.6,
    category: "Edukasi"
  },
  {
    id: "11",
    title: "Indonesia Fashion Week 2025",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
    date: "5-10 April 2025",
    time: "16:00 WIB",
    location: "JCC Senayan, Jakarta",
    price: "Rp 150.000",
    rating: 4.5,
    category: "Fashion"
  },
  {
    id: "12",
    title: "Workshop Fotografi Profesional",
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=300&fit=crop",
    date: "28 Maret 2025",
    time: "09:00 WIB",
    location: "Creative Hub, Jakarta",
    price: "Rp 275.000",
    rating: 4.7,
    category: "Workshop"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <main>
        <HeroBanner />
        
        <EventSection 
          title="Event Unggulan"
          subtitle="Event terpopuler dan paling dinanti bulan ini"
          events={featuredEvents}
        />
        
        <EventSection 
          title="Event Terpopuler"
          subtitle="Pilihan terbaik berdasarkan rating dan ulasan pengguna"
          events={topEvents}
        />
        
        <PromoBanner />
        
        <EventSection 
          title="Event Mendatang"
          subtitle="Jangan sampai terlewat! Book tiket sekarang"
          events={upcomingEvents}
        />
      </main>
      
      <Footer />
    </div>
  );
}