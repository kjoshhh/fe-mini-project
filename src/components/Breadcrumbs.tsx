import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  return (
    <nav className="bg-white text-black py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm">
          <Home className="w-4 h-4" />
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span>Konser</span>
          <ChevronRight className="w-4 h-4" />
          <span>Musik</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">The Journey Continues - PETERPAN - Semua Tentang Kita</span>
        </div>
      </div>
    </nav>
  );
}