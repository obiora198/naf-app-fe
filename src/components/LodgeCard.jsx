import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

export default function LodgeCard({ lodge }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative">
        <img
          src={lodge.images[(0 || 1 || 2)] || "/images/default-lodge.jpg"}
          alt={lodge.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-naf-gold text-naf-dark text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow">
          ₦{lodge.pricePerNight.toLocaleString()} / night
        </div>
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
