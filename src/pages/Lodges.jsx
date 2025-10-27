import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosClient from "../api/axios";

export default function LodgesPage() {
  const { data: lodges, isLoading } = useQuery({
    queryKey: ["lodges"],
    queryFn: async () => (await axiosClient.get("/admin/lodges")).data,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <div className="animate-spin h-10 w-10 border-4 border-naf-gold border-t-transparent rounded-full mb-3" />
        <p>Loading lodges...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-8">
      {/* Page Header */}
      <header className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-naf-dark mb-2">
          Lodge Management
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Browse, view, and manage all NAF-approved lodges.
        </p>

        
      </header>

      {/* Lodges Grid */}
      <main className="max-w-6xl mx-auto">
        {lodges?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lodges.map((lodge) => (
              <div
                key={lodge._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="h-48 sm:h-56 bg-gray-100 relative">
                  {lodge.imageUrl ? (
                    <img
                      src={lodge.imageUrl}
                      alt={lodge.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No image available
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-naf-dark text-naf-gold text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    ₦{lodge.pricePerNight.toLocaleString()}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col justify-between h-[210px]">
                  <div>
                    <h2 className="text-lg font-semibold text-naf-dark mb-1">
                      {lodge.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {lodge.location || "Location not specified"}
                    </p>
                    <p className="text-gray-500 text-xs line-clamp-3">
                      {lodge.description || "No description provided."}
                    </p>
                  </div>

                  <Link
                    to={`/admin/lodges/${lodge._id}`}
                    className="mt-4 inline-block text-center bg-naf-gold text-naf-dark font-semibold px-4 py-2 rounded-lg hover:bg-[#c9a94a] transition text-sm shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No lodges available yet.  
            <Link
              to="/admin/lodges/new"
              className="text-naf-gold font-semibold ml-1 hover:underline"
            >
              Add your first lodge
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
