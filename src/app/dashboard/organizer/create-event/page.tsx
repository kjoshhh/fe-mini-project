"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function CreateEventPage() {
  const router = useRouter();

  // ✅ State input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [category, setCategory] = useState("WELLNESS");
  const [location, setLocation] = useState("");
  const [salesStart, setSalesStart] = useState("");
  const [salesEnd, setSalesEnd] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ state loading

  // ✅ price & quota number
  const [tickets, setTickets] = useState([{ name: "", price: 0, quota: 0 }]);

  const handleAddTicket = () => {
    setTickets([...tickets, { name: "", price: 0, quota: 0 }]);
  };

  const handleTicketChange = (
    index: number,
    field: "name" | "price" | "quota",
    value: string | number
  ) => {
    setTickets((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === "name" ? String(value) : Number(value),
      };
      return updated;
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnailFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!thumbnailFile) {
      alert("Thumbnail image is required");
      return;
    }

    setIsLoading(true); // ✅ start loading

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("salesStart", new Date(salesStart).toISOString());
      formData.append("salesEnd", new Date(salesEnd).toISOString());
      formData.append("thumbnail", thumbnailFile);
      formData.append("tickets", JSON.stringify(tickets));

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in as Organizer to create an event.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/create-event`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create event");
      }

      alert("Event created successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert(`Error: ${(err as Error).message}`);
    } finally {
      setIsLoading(false); // ✅ stop loading
    }
  };

  return (
    <>
      <Navbar variant="solid-light" />
      <div className="pt-14 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto p-6 space-y-4 bg-white shadow rounded">
          <h1 className="text-2xl font-bold text-gray-800">🎉 Buat Event Baru</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
              className="w-full border px-3 py-2 rounded"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isLoading}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              required
              disabled={isLoading}
              className="w-full border px-3 py-2 rounded"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={isLoading}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="NONE">None</option>
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
              disabled={isLoading}
              className="w-full border px-3 py-2 rounded"
            />

            <label className="block">
              Sales Start:
              <input
                type="datetime-local"
                value={salesStart}
                onChange={(e) => setSalesStart(e.target.value)}
                required
                disabled={isLoading}
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
                disabled={isLoading}
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
                    onChange={(e) => handleTicketChange(index, "name", e.target.value)}
                    required
                    disabled={isLoading}
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, "price", e.target.value)}
                    required
                    disabled={isLoading}
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Quota"
                    value={ticket.quota}
                    onChange={(e) => handleTicketChange(index, "quota", e.target.value)}
                    required
                    disabled={isLoading}
                    className="border px-3 py-2 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddTicket}
                disabled={isLoading}
                className="text-blue-600 hover:underline mt-2"
              >
                + Add Ticket
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
