"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroBanner } from "@/components/HeroBanner";
import Navbar from "@/components/Navbar";


export default function CreateEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("WELLNESS");
  const [location, setLocation] = useState("");
  const [salesStart, setSalesStart] = useState("");
  const [salesEnd, setSalesEnd] = useState("");
  const [tickets, setTickets] = useState([
    { name: "", price: "", quota: "" }
  ]);

  const HeroBanner = () => {
    return (
      <div className="w-full h-[200px] bg-gradient-to-r from-purple-500 to-indigo-500 flex rounded-[16px] items-center justify-center text-white text-3xl font-bold shadow mb-[32px]">
        Create Your Event
      </div>
    );
  };

  const handleAddTicket = () => {
    setTickets([...tickets, { name: "", price: "", quota: "" }]);
  };

  const handleTicketChange = (
    index: number,
    field: "name" | "price" | "quota",
    value: string
  ) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][field] = value;
    setTickets(updatedTickets);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      title,
      description,
      thumbnail,
      category,
      location,
      salesStart: salesStart ? new Date(salesStart).toISOString() : undefined,
      salesEnd: salesEnd ? new Date(salesEnd).toISOString() : undefined,
      tickets: tickets.map(t => ({
        name: t.name,
        price: Number(t.price),
        quota: Number(t.quota),
      })),
    };
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as Organizer to create an event.");
      return;
    }
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/create-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const err = await res.json();
        console.error("API ERROR RESPONSE:", err);
        throw new Error(err.error || "Failed to create event");
      }
  
      const data = await res.json();
      console.log("Event created:", data);
  
      alert("Event created successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Navbar variant="solid-light"/>
      <HeroBanner />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="url"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="WELLNESS">Wellness</option>
          <option value="CONCERT">Concert</option>
          <option value="SPORT">Sport</option>
          <option value="EDUCATION">Education</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <label className="block">
          Sales Start:
          <input
            type="datetime-local"
            value={salesStart}
            onChange={(e) => setSalesStart(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>
        <label className="block">
          Sales End:
          <input
            type="datetime-local"
            value={salesEnd}
            onChange={(e) => setSalesEnd(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>

        <div>
          <h2 className="text-lg font-semibold mb-2">Tickets</h2>
          {tickets.map((ticket, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Ticket Name"
                value={ticket.name}
                onChange={(e) =>
                  handleTicketChange(index, "name", e.target.value)
                }
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={ticket.price}
                onChange={(e) =>
                  handleTicketChange(index, "price", e.target.value)
                }
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Quota"
                value={ticket.quota}
                onChange={(e) =>
                  handleTicketChange(index, "quota", e.target.value)
                }
                required
                className="border px-3 py-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTicket}
            className="text-blue-600 hover:underline mt-2"
          >
            + Add Ticket
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}