import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axios";
import BookingCard from "../components/BookingCard";

export default function Bookings() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => (await axiosClient.get("/bookings/my")).data,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <div className="animate-spin h-10 w-10 border-4 border-naf-gold border-t-transparent rounded-full mb-3" />
        <p>Loading your bookings...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-8">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-naf-dark mb-2">
          My Bookings
        </h1>
        <p className="text-gray-600">
          View your current and past lodge reservations.
        </p>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto">
        {bookings?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
            <img
              src="/images/empty-state.svg"
              alt="No bookings"
              className="w-40 mx-auto mb-4 opacity-80"
            />
            <p className="text-lg font-medium mb-2">No bookings yet</p>
            <p className="text-sm text-gray-500 mb-6">
              You haven’t booked any lodge yet. Browse and find your stay.
            </p>
            <a
              href="/lodges"
              className="inline-block bg-naf-gold text-naf-dark font-semibold px-6 py-2.5 rounded-lg hover:bg-[#c4a030] transition"
            >
              Explore Lodges
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
