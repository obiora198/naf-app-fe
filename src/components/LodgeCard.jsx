import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function LodgeCard({ lodge }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = lodge.images?.length > 0 ? lodge.images : ["/images/default-lodge.jpg"];

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
      {/* Image Carousel */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={lodge.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price Tag */}
        <div className="absolute top-3 left-3 bg-naf-gold text-naf-dark text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow">
          ₦{lodge.pricePerNight.toLocaleString()} / night
        </div>

        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full transition"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full transition"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-naf-gold scale-110" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[180px] sm:min-h-[200px]">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-naf-dark mb-1 sm:mb-2">
            {lodge.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2 sm:mb-3">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-naf-blue" />
            <span>
              {lodge.base}, {lodge.state}
            </span>
          </div>
          <p className="text-gray-500 text-sm sm:text-base line-clamp-2 leading-snug">
            {lodge.description?.length > 80
              ? lodge.description.slice(0, 80) + "..."
              : lodge.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 sm:mt-5">
          <div className="flex items-center text-naf-gold">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-naf-gold" />
            <span className="ml-1 text-xs sm:text-sm font-medium">
              {lodge.rating || "4.8"}
            </span>
          </div>
          <Link
            to={`/lodges/${lodge._id}`}
            className="bg-naf-dark text-white text-xs sm:text-sm font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg hover:bg-naf-blue transition active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
