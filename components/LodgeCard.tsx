"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ChevronLeft, ChevronRight, Bed, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LodgeCardProps {
  lodge: {
    _id: string;
    name: string;
    base: string;
    state?: string;
    description: string;
    pricePerNight: number;
    images?: string[];
    rating?: number;
    amenities?: string[];
  };
}

export default function LodgeCard({ lodge }: LodgeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images =
    lodge.images && lodge.images.length > 0
      ? lodge.images
      : ["/images/default-lodge.jpg"];

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden flex flex-col h-full border border-naf-cream-dark"
    >
      {/* Image Section */}
      <div className="relative h-72 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={lodge.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-naf-navy/60 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Rating & State Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white flex items-center gap-1.5 shadow-sm">
            <Star size={12} className="fill-naf-gold text-naf-gold" />
            <span className="text-xs font-bold text-naf-navy">{lodge.rating || "4.5"}</span>
          </div>
          {lodge.state && (
             <div className="bg-naf-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-gold">
               {lodge.state}
             </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={prevImage}
              className="w-8 h-8 bg-white/20 hover:bg-white/80 text-white hover:text-naf-navy rounded-xl backdrop-blur-md transition-all flex items-center justify-center border border-white/30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="w-8 h-8 bg-white/20 hover:bg-white/80 text-white hover:text-naf-navy rounded-xl backdrop-blur-md transition-all flex items-center justify-center border border-white/30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-lg transition-all duration-300 ${i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-naf-gold font-bold text-[10px] uppercase tracking-widest">
              <MapPin size={12} />
              {lodge.base}
            </div>
            <h3 className="text-2xl font-heading font-semibold text-naf-navy group-hover:text-naf-gold transition-colors duration-300">
              {lodge.name}
            </h3>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
            {lodge.description}
          </p>

          <div className="flex items-center gap-4 text-slate-400 text-xs py-2">
            <div className="flex items-center gap-1.5">
              <Bed size={14} className="text-naf-gold/60" />
              <span>Premium Suites</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-naf-gold/60" />
              <span>Secure Estate</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-naf-cream-dark flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Nightly rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-naf-navy">₦{lodge.pricePerNight.toLocaleString()}</span>
              {/* <span className="text-xs text-slate-400 font-medium">/ night</span> */}
            </div>
          </div>

          <Link
            href={`/lodges/${lodge._id}`}
            className="group/btn flex items-center gap-2 bg-naf-navy text-white hover:bg-naf-gold px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
          >
            Details
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
