import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { MapPin, Tag, Search } from "lucide-react";
import { cn } from "./ui/utils";
import { getCategoryLabel } from "@/lib/categoryLabels";


interface Filters {
    keyword: string
    category: string
    location: string
}

export function EventSearch({
    onSearch,
}: {
    onSearch: (filters: Filters) => void
}) {
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")

    const handleSearch = () => {
        onSearch({ keyword, category, location})
    }

    return (
      <div className="w-full h-[64px] max-w-3xl mx-auto bg-white p-[8px] rounded-[24px] shadow flex flex-col md:flex-row items-center gap-[12px] md:gap-2 -mt-6 relative z-10">
          {/* Input Search */}
          <div className="w-[400px] h-full flex flex-grow rounded-[16px] overflow-hidden">
            <Input
              placeholder="Cari event..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full h-full md:flex-1 rounded-none border-none outline-transparent"
            />
      
            {/* Dropdown Category */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                variant="outline" 
                className={cn("w-full h-full md:w-[150px] flex-none rounded-none border-none outline-transparent",
                  !category ? "text-[#B1B1B1]" : "text-black"
                )}
                >
                  <Tag 
                  className={cn(
                    "size-4", 
                    !category ? "text-[#B1B1B1]" : "text-black"
                  )} />
                  {category ? getCategoryLabel(category) : "Pilih Kategori"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem onSelect={() => setCategory("")}>
                  Semua Kategori
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("CONCERT")}>
                  Concert
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("SEMINAR")}>
                  Seminar
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("WORKSHOP")}>
                  Workshop
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("SPORTS")}>
                  Sports
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("THEATRE")}>
                  Theatre
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("FESTIVAL")}>
                  Festival
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("WELLNESS")}>
                  Wellness
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("KIDS")}>
                  Kids
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCategory("EDUCATION")}>
                  Education
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
    
          {/* Dropdown Location */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
              variant="outline" 
              className={cn("w-full h-full md:w-[150px] flex-none rounded-[16px] shadow-none",
                !location ? "text-[#B1B1B1]" : "text-black"
                  )}
              >
                <MapPin className={cn("size-4", !location ? "text-[#B1B1B1]" : "text-black"
                  )} />
                {location ? location : "Pilih Lokasi"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuItem onSelect={() => setLocation("")}>
                Semua Lokasi
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLocation("Jakarta")}>
                Jakarta
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLocation("Bandung")}>
                Bandung
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLocation("Surabaya")}>
                Surabaya
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLocation("Yogyakarta")}>
                Yogyakarta
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLocation("Bali")}>
                Bali
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

    
          {/* Search Button */}
          <Button 
          onClick={handleSearch} 
          className="w-full h-full md:w-[150px] flex-none rounded-[16px]"
          >
            <Search className="size-4" />
            Search
          </Button>
        </div>
      )
    }