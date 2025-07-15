"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface EventData {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  location: string;
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
    profileImg?: string;
  };
}


export function EventContent({ event }: { event: EventData }) {
  const { user } = useAuth();
  const descriptionRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const ticketsRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6 sticky top-0 bg-white z-10">
              <nav className="flex space-x-8">
                <button
                  onClick={() => handleScrollTo(descriptionRef)}
                  className="py-2 px-1 border-b-2 border-transparent font-medium text-sm hover:text-blue-600 hover:border-blue-500"
                >
                  Deskripsi
                </button>
                <button
                  onClick={() => handleScrollTo(termsRef)}
                  className="py-2 px-1 border-b-2 border-transparent font-medium text-sm hover:text-blue-600 hover:border-blue-500"
                >
                  Syarat & Ketentuan
                </button>
                <button
                  onClick={() => handleScrollTo(ticketsRef)}
                  className="py-2 px-1 border-b-2 border-transparent font-medium text-sm hover:text-blue-600 hover:border-blue-500"
                >
                  Tiket
                </button>
              </nav>
            </div>

            {/* Deskripsi */}
            <div ref={descriptionRef} className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold">Deskripsi</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Syarat & Ketentuan */}
            <div ref={termsRef} className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold">Syarat & Ketentuan</h2>
              <p className="text-gray-700 leading-relaxed">
                Semua tiket bersifat final dan tidak dapat refund. Penonton wajib mematuhi ketentuan penyelenggara.
              </p>
            </div>

            {/* Tiket */}
            <div ref={ticketsRef} className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold">Tiket</h2>
              <div className="grid gap-4">
                {event.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border p-4 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      <p className="text-gray-600">Rp {ticket.price.toLocaleString()}</p>
                      <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li>Tidak bisa refund</li>
                        <li>Berdiri / No seat</li>
                        <li>Tersisa: {ticket.quota - ticket.sold}</li>
                      </ul>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Pilih
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Harga mulai dari</div>
              <div className="text-2xl font-bold text-gray-900 mb-4">
                Rp
                {Math.min(...event.tickets.map((t) => t.price)).toLocaleString()}
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Lihat Tiket
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-3">Diselenggarakan oleh</div>
              <Link
                href={`/organizer/profile/${event.organizer.id}`}
                className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded transition"
              >
                <Avatar>
                  <AvatarImage
                    src={
                      event.organizer.profileImg
                        ? `${event.organizer.profileImg}?v=${Date.now()}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organizer.username)}`
                    }
                    alt={event.organizer.username}
                  />
                  <AvatarFallback>
                    {event.organizer.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>

                </Avatar>
                <div>
                  <div className="font-medium">{event.organizer.username}</div>
                  <div className="text-xs text-gray-500">{event.organizer.email}</div>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
