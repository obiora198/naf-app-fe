import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axios";
import LodgeCard from "../components/LodgeCard";
import { ShieldCheck, BedDouble, MapPin, Users } from "lucide-react";
import { LoadingSpinner } from "../components/Loader";

export default function Home() {
  const { data: lodges, isLoading } = useQuery({
    queryKey: ["lodges"],
    queryFn: async () => (await axiosClient.get("/lodges")).data,
  });

  if (isLoading) return <LoadingSpinner text="Loading lodges..." />;

  return (
    <div className="bg-naf-light">
      {/* HERO SECTION */}
      <section className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-naf-dark/95 to-naf-dark text-white">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 lg:pl-32 py-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-[#f4c95d] drop-shadow-md">
            Welcome to NAF Lodge Booking
          </h1>

          <p className="text-lg sm:text-xl mb-6 max-w-lg text-gray-300 leading-relaxed">
            Book your stay at exclusive Nigerian Air Force lodges nationwide.
            Secure, comfortable, and tailored for personnel and guests.
          </p>

          <a
            href="#lodges"
            className="w-fit bg-naf-gold text-naf-dark font-semibold px-8 py-3 rounded-lg hover:bg-[#f6d77a] transition-transform duration-200 hover:scale-105 shadow-lg"
          >
            Explore Lodges
          </a>
        </div>

        {/* Right Image Section */}
        <div className="hidden md:block flex-1 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/naf-conf-center.jpg')" }}
          />
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-black/10" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 sm:px-16 lg:px-48 bg-white flex flex-col md:flex-row items-center gap-12">
        <img
          src="/images/naf-conf-cntr2.jpg"
          alt="NAF Conference Center"
          className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold text-naf-dark mb-4">
            About NAF Lodge Booking
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            NAF Lodge Booking is the official platform for reserving
            accommodations across Nigerian Air Force lodges. We combine
            convenience, security, and comfort—helping personnel and their
            families find the perfect stay with ease.
          </p>
          <a
            href="/about"
            className="text-naf-gold font-semibold hover:text-[#c4a030] transition"
          >
            Learn More →
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 sm:px-16 lg:px-48 bg-naf-light text-naf-dark text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-naf-dark">
          Why Choose NAF Lodges?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: (
                <ShieldCheck className="w-10 h-10 text-naf-gold mx-auto mb-4" />
              ),
              title: "Secure & Trusted",
              desc: "All lodges are managed under strict NAF standards for your safety.",
            },
            {
              icon: (
                <BedDouble className="w-10 h-10 text-naf-gold mx-auto mb-4" />
              ),
              title: "Comfort Guaranteed",
              desc: "Enjoy fully serviced, air-conditioned rooms at affordable rates.",
            },
            {
              icon: <MapPin className="w-10 h-10 text-naf-gold mx-auto mb-4" />,
              title: "Nationwide Access",
              desc: "Book stays across NAF bases in major cities nationwide.",
            },
            {
              icon: <Users className="w-10 h-10 text-naf-gold mx-auto mb-4" />,
              title: "For Personnel & Guests",
              desc: "Exclusive access for Air Force members, families, and visitors.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LODGES SECTION */}
      <section id="lodges" className="py-20 px-6 sm:px-16 lg:px-48 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-naf-dark">
          Explore Available Lodges
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {lodges?.map((lodge) => (
            <LodgeCard key={lodge._id} lodge={lodge} />
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gradient-to-br from-naf-dark to-naf-blue text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/naf-pattern.png')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-naf-gold">
            Ready to Book Your Stay?
          </h2>
          <p className="text-base sm:text-lg mb-10 text-gray-300 leading-relaxed">
            Experience world-class hospitality and Air Force-standard security.
          </p>
          <a
            href="/register"
            className="inline-block bg-naf-gold text-naf-dark font-semibold text-base sm:text-lg px-8 py-3 rounded-xl shadow-lg hover:bg-[#c4a030] transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
