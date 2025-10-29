import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axios";
import { MapPin, Star, Bed, Bath, Wifi, Car, Home, Coffee } from "lucide-react";
import { LoadingSpinner } from "../components/Loader";

export default function LodgeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: lodge,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lodge", id],
    queryFn: async () => (await axiosClient.get(`/lodges/${id}`)).data,
  });

  // ✅ Safe defaults so hooks always run
  const images =
    lodge?.images?.length > 0
      ? lodge.images
      : [
          "/images/naf-conf-center.jpg",
          "/images/naf-lodge.jpg",
          "/images/lodge-room.jpg",
          "/images/lodge-hall.jpg",
          "/images/lodge-exterior.jpg",
        ];

  const [mainImage, setMainImage] = useState(images[0]);
  const remImages = images.filter((img) => img !== mainImage);

  // ✅ After hooks are declared, it's safe to conditionally return
  if (isLoading) return <LoadingSpinner text="Loading lodge details..." />;

  if (isError || !lodge)
    return (
      <div className="text-center py-20 text-red-600">
        Lodge not found or failed to load.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-3 h-[420px]">
            {/* Main Image */}
            <div className="md:col-span-2 relative">
              <img
                src={mainImage}
                alt="Main lodge"
                className="w-full h-full object-cover rounded-xl transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {remImages.slice(0, 2).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  onClick={() => setMainImage(img)}
                  className={`w-full h-1/2 object-cover rounded-xl cursor-pointer transition-transform duration-300 hover:scale-[1.03] ${
                    mainImage === img ? "ring-4 ring-naf-gold" : ""
                  }`}
                />
              ))}

              {images.length > 3 && (
                <div
                  className="relative h-1/2 cursor-pointer rounded-xl overflow-hidden group"
                  onClick={() => setMainImage(remImages[2] || images[3])}
                >
                  <img
                    src={remImages[2] || images[3]}
                    alt="More images"
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg bg-black/40 rounded-xl">
                    +{images.length - 3}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Title + Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-naf-dark mb-1">
                {lodge.name}
              </h1>
              <p className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1 text-naf-blue" />
                {lodge.base}, {lodge.state}
              </p>
            </div>
            <div className="text-right mt-3 sm:mt-0">
              <p className="text-3xl font-extrabold text-naf-gold">
                ₦{lodge.pricePerNight?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">per night</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center text-naf-gold">
            <Star className="w-5 h-5 fill-naf-gold" />
            <span className="ml-1 font-medium text-gray-700">
              {lodge.rating || "4.8"}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-naf-dark mb-2">
              Description:
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {lodge.description ||
                "Experience top-tier comfort in this premium NAF Lodge with spacious rooms, excellent service, and serene surroundings."}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold text-naf-dark mb-3">
              Key Features:
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <Amenity icon={<Bed />} label="2 Beds" />
              <Amenity icon={<Bath />} label="2 Baths" />
              <Amenity icon={<Home />} label="Balcony" />
              <Amenity icon={<Wifi />} label="Wi-Fi" />
              <Amenity icon={<Car />} label="Parking Area" />
              <Amenity icon={<Coffee />} label="Kitchen" />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <aside className="space-y-6">
          {/* Google Map Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            {/* Embedded Map */}
            {lodge.googleMapUrl ? (
              <iframe
                src={lodge.googleMapUrl}
                width="100%"
                height="250"
                className="rounded-lg mb-4"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${lodge.name} Location`}
              ></iframe>
            ) : (
              <div className="h-[250px] flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
                Map not available
              </div>
            )}

            {/* Contact Info */}
            {lodge.phone && (
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-naf-dark">Phone:</span>{" "}
                  {lodge.phone}
                </p>
              </div>
            )}
          </div>

          {/* Book Button */}
          <button className="w-full  bg-naf-dark text-white font-semibold py-2.5 rounded-lg hover:bg-[#f6d77a] transition">
            Book Now
          </button>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-naf-blue hover:underline font-medium text-sm"
            >
              ← Back to Lodges
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Amenity({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-gray-700">
      <div className="p-2 bg-naf-gold/10 rounded-lg text-naf-dark">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
}
