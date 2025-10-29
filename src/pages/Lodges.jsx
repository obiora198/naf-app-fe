import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axiosClient from "../api/axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoadingSpinner } from "../components/Loader";

export default function LodgesPage() {
  const { data: lodges, isLoading } = useQuery({
    queryKey: ["lodges"],
    queryFn: async () => (await axiosClient.get("/admin/lodges")).data,
  });

  if (isLoading) return <LoadingSpinner text="Loading lodges..." />;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <header className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-naf-dark mb-2">
          Explore NAF Lodges Nationwide
        </h1>
        <p className="text-gray-600">
          Secure, comfortable, and designed for personnel and guests.
        </p>
      </header>

      {/* Lodges List */}
      <main className="max-w-6xl mx-auto space-y-6">
        {lodges?.length ? (
          lodges.map((lodge, index) => (
            <div
              key={lodge._id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {/* Left: Image Carousel */}
              <div className="relative h-64 md:h-72">
                {lodge.images && lodge.images.length > 0 ? (
                  <Slider {...sliderSettings} className="h-full">
                    {lodge.images.map((img, i) => (
                      <div key={i}>
                        <img
                          src={img}
                          alt={`${lodge.name} ${i + 1}`}
                          className="w-full h-64 md:h-72 object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm bg-gray-100">
                    No images available
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-naf-dark text-naf-gold text-xs font-semibold px-3 py-1 rounded-full shadow">
                  ₦{lodge.pricePerNight.toLocaleString()} / night
                </div>
              </div>

              {/* Right: Lodge Details */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-naf-dark mb-2">
                    {lodge.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    📍 {lodge.location || "Location not specified"}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-4">
                    {lodge.description || "No description available."}
                  </p>
                  {lodge.amenities && lodge.amenities.length > 0 && (
                    <ul className="flex flex-wrap gap-2 text-xs text-gray-600">
                      {lodge.amenities.slice(0, 4).map((a, i) => (
                        <li
                          key={i}
                          className="bg-gray-200 px-2 py-1 rounded-full text-gray-700"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-5">
                  <Link
                    to={`/admin/lodges/${lodge._id}`}
                    className="inline-block bg-naf-gold text-naf-dark font-semibold px-6 py-2 rounded-lg hover:bg-[#c9a94a] transition shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
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
