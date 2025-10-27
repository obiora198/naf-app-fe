import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axios";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

export default function AdminDashboard() {
  const { data: lodges, isLoading: loadingLodges } = useQuery({
    queryKey: ["admin-lodges"],
    queryFn: async () => (await axiosClient.get("/admin/lodges")).data,
  });

  const { data: bookings, isLoading: loadingBookings } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => (await axiosClient.get("/admin/bookings")).data,
  });

  const isLoading = loadingLodges || loadingBookings;

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <div className="animate-spin h-10 w-10 border-4 border-naf-gold border-t-transparent rounded-full mb-3" />
        <p>Loading dashboard...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-8 text-naf-dark">
      {/* Header */}
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-naf-dark mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage lodges, bookings, and view performance.
        </p>
      </header>

      {/* Lodges Section */}
      <section className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-naf-dark">
            Lodges Overview
          </h2>

          <Link
            to="/admin/lodges/new"
            className="flex items-center justify-center gap-2 bg-naf-gold text-naf-dark px-4 py-2 rounded-lg hover:bg-[#c9a94a] transition font-semibold text-sm shadow-sm w-full sm:w-auto"
          >
            <PlusCircle size={18} />
            Add Lodge
          </Link>
        </div>

        {/* Lodges Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-naf-dark text-white uppercase text-xs">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Lodge</th>
                <th className="py-3 px-4 whitespace-nowrap">Location</th>
                <th className="py-3 px-4 whitespace-nowrap">Price (₦)</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lodges.map((lodge) => (
                <tr
                  key={lodge._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">{lodge.name}</td>
                  <td className="py-3 px-4">{lodge.location || "—"}</td>
                  <td className="py-3 px-4">
                    ₦{lodge.pricePerNight.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link
                      to={`/admin/lodges/${lodge._id}`}
                      className="inline-block bg-naf-gold text-naf-dark px-3 py-1.5 rounded-md font-semibold text-xs hover:bg-[#c9a94a] transition"
                    >
                      View / Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bookings Section */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-naf-dark">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-naf-dark text-white uppercase text-xs">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Guest</th>
                <th className="py-3 px-4 whitespace-nowrap">Lodge</th>
                <th className="py-3 px-4 whitespace-nowrap">Check-In</th>
                <th className="py-3 px-4 whitespace-nowrap">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium truncate max-w-[150px]">
                    {booking.user?.name || "—"}
                  </td>
                  <td className="py-3 px-4 truncate max-w-[150px]">
                    {booking.lodge?.name}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{booking.checkIn}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{booking.checkOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
