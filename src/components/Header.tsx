import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold">L</span>
              </div>
              <span className="text-xl font-bold">LOKET</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-blue-200">Mulai Jadi Event Creator</a>
              <a href="#" className="hover:text-blue-200">Biaya</a>
              <a href="#" className="hover:text-blue-200">Blog</a>
              <a href="#" className="hover:text-blue-200">LOKET X</a>
              <a href="#" className="hover:text-blue-200">LOKET Screen</a>
              <a href="#" className="hover:text-blue-200">Pusat Bantuan</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">🇮🇩 ID</span>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder="Cari event seru di sini"
              className="bg-white text-black pl-4 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <div className="flex space-x-2">
            <span className="text-sm bg-blue-700 px-2 py-1 rounded">#LoketMart</span>
            <span className="text-sm bg-blue-700 px-2 py-1 rounded">#Promo_Indodana</span>
            <span className="text-sm bg-blue-700 px-2 py-1 rounded">#LOKETScreen</span>
            <span className="text-sm bg-blue-700 px-2 py-1 rounded">#LOKET_Promo</span>
            <span className="text-sm bg-blue-700 px-2 py-1 rounded">#LoketAttraction</span>
          </div>
        </div>
      </div>
    </header>
  );
}