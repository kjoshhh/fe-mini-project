import { ChevronDown, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function Sidebar() {
  return (
    <div className="w-64 bg-white p-6 border-r border-gray-200">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Filter</h3>
        <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Event Online Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Event Online</span>
          <Switch />
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
          <span className="text-sm font-medium text-gray-700">Lokasi</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Format Filter */}
      <div className="mb-6">
        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
          <span className="text-sm font-medium text-gray-700">Format</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Topic Filter */}
      <div className="mb-6">
        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
          <span className="text-sm font-medium text-gray-700">Topik</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Time Filter */}
      <div className="mb-6">
        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
          <span className="text-sm font-medium text-gray-700">Waktu</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
          <span className="text-sm font-medium text-gray-700">Harga</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Urutkan:</span>
        </div>
        <Select defaultValue="oldest">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Waktu Mulai (Terdekat)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oldest">Waktu Mulai (Terdekat)</SelectItem>
            <SelectItem value="newest">Waktu Mulai (Terjauh)</SelectItem>
            <SelectItem value="price-low">Harga (Terendah)</SelectItem>
            <SelectItem value="price-high">Harga (Tertinggi)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}