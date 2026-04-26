'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  Users,
  Check,
  ShieldCheck,
  Star,
  ArrowLeft,
  Phone,
  ArrowRight,
  Wifi,
  Coffee,
  Car,
  Wind,
  Tv,
  Utensils,
  Dumbbell,
  Plane,
  Waves,
  Briefcase,
  Sparkles,
  Info,
  Award,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { SerializedLodge } from '@/lib/types';

interface LodgeDetailsClientProps {
  lodge: SerializedLodge;
}

export default function LodgeDetailsClient({ lodge }: LodgeDetailsClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingStatus, setBookingStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { data: session } = useSession();

  const images =
    lodge.images && lodge.images.length > 0
      ? lodge.images
      : ['/images/default-lodge.jpg'];

  const amenitiesMap: Record<string, React.ReactNode> = {
    'Free Wi-Fi': <Wifi size={18} />,
    'Swimming Pool': <Waves size={18} />,
    'Conference Halls': <Briefcase size={18} />,
    'Fine Dining': <Utensils size={18} />,
    'Fitness Centre': <Dumbbell size={18} />,
    '24/7 Room Service': <Coffee size={18} />,
    'Secure Parking': <Car size={18} />,
    'Business Centre': <Briefcase size={18} />,
    'Spa & Wellness': <Sparkles size={18} />,
    'Airport Shuttle': <Plane size={18} />,
    'Air Conditioning': <Wind size={18} />,
    'Satellite TV': <Tv size={18} />,
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      window.location.href = `/login?callbackUrl=/lodges/${lodge._id}`;
      return;
    }

    if (!checkIn || !checkOut) {
      setErrorMessage('Please select check-in and check-out dates.');
      return;
    }

    setBookingStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lodgeId: lodge._id,
          checkIn,
          checkOut,
          guests,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');

      setBookingStatus('success');
    } catch (err: unknown) {
      setBookingStatus('error');
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-naf-cream min-h-screen pt-20 pb-10 selection:bg-naf-gold selection:text-naf-navy">
      {/* LUXURY HERO GALLERY */}
      <section className="relative h-[60vh] sm:h-[80vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={lodge.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-naf-navy/80 to-transparent pointer-events-none" />

        {/* Navigation Actions */}
        <div className="absolute top-8 left-8 sm:left-12 z-20">
          <Link
            href="/lodges"
            className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all active:scale-95 group font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Collection
          </Link>
        </div>

        {/* Gallery Controls */}
        <div className="absolute bottom-12 right-8 sm:right-12 flex items-center gap-4 z-20">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-lg text-white text-[10px] font-bold tracking-[0.2em] uppercase">
            {currentIndex + 1} / {images.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevImage}
              className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-naf-gold transition-all active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-naf-gold transition-all active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Property Hero Title */}
        <div className="absolute bottom-12 left-8 sm:left-12 z-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-naf-gold font-bold text-xs uppercase tracking-[0.4em]">
              <MapPin size={16} />
              {lodge.base}
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading text-white leading-none">
              {lodge.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <main className="max-w-[1300px] mx-auto px-6 sm:px-12 lg:px-16 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* LEFT COLUMN: INFO */}
          <div className="lg:col-span-2 space-y-16">
            {/* OVERVIEW */}
            <section className="space-y-8">
              <div className="flex flex-wrap items-center gap-8 border-b border-naf-cream-dark pb-8">
                <div className="flex items-center gap-2.5">
                  <Star size={18} className="fill-naf-gold text-naf-gold" />
                  <span className="text-xl font-bold text-naf-navy">
                    {lodge.rating || 4.9}
                  </span>
                  <span className="text-sm font-medium text-slate-400 font-body">
                    Guest Rating
                  </span>
                </div>
                <div className="h-6 w-px bg-naf-cream-dark" />
                <div className="flex items-center gap-2.5 text-naf-navy font-bold text-xs uppercase tracking-widest">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  Verified Secure Estate
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-heading text-naf-navy mb-6 italic">
                  Property <span className="italic font-normal">Sojourn</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed font-medium font-body mb-8">
                  {lodge.description}
                </p>
                <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-naf-cream-dark shadow-sm">
                  <div className="p-3 bg-naf-cream rounded-2xl text-naf-gold">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Full Address
                    </p>
                    <p className="text-sm font-bold text-naf-navy font-body">
                      {lodge.address}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* AMENITIES */}
            <section className="space-y-10">
              <h3 className="text-2xl font-heading text-naf-navy tracking-tight">
                Refined <span className="italic">Amenities</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {lodge.amenities?.map((amenity: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-5 bg-white border border-naf-cream-dark rounded-2xl shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="p-2.5 bg-naf-cream rounded-xl text-naf-gold group-hover:bg-naf-gold group-hover:text-white transition-all duration-300">
                      {amenitiesMap[amenity] || <Check size={18} />}
                    </div>
                    <span className="text-xs font-bold text-naf-navy uppercase tracking-widest">
                      {amenity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ROOM TYPES (NEW) */}
            <section className="space-y-10">
              <h3 className="text-2xl font-heading text-naf-navy tracking-tight">
                Available <span className="italic">Accommodations</span>
              </h3>
              <div className="space-y-4">
                {lodge.roomTypes?.map((room: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-8 bg-white border border-naf-cream-dark rounded-3xl hover:border-naf-gold/30 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-naf-cream flex items-center justify-center text-naf-gold group-hover:scale-105 transition-transform">
                        <Sparkles size={32} strokeWidth={1} />
                      </div>
                      <div>
                        <h4 className="text-xl font-heading font-semibold text-naf-navy">
                          {room}
                        </h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                          Premium Standard
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Base Rate
                        </p>
                        <p className="text-lg font-bold text-naf-navy">
                          ₦{lodge.pricePerNight.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 bg-naf-cream rounded-full text-naf-gold">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: BOOKING CARD */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[40px] shadow-2xl border border-naf-cream-dark p-10 space-y-8 overflow-hidden relative"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-naf-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                    Exclusively Nightly
                  </span>
                  <div className="flex items-baseline gap-2 text-naf-navy">
                    <span className="text-4xl font-bold">
                      ₦{lodge.pricePerNight.toLocaleString()}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-naf-navy uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={12} className="text-naf-gold" /> Arrival
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-naf-cream border border-naf-cream-dark rounded-2xl p-4 text-sm font-bold text-naf-navy outline-none focus:border-naf-gold transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-naf-navy uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={12} className="text-naf-gold" />{' '}
                        Departure Date
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-naf-cream border border-naf-cream-dark rounded-2xl p-4 text-sm font-bold text-naf-navy outline-none focus:border-naf-gold transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-naf-navy uppercase tracking-widest flex items-center gap-2">
                        <Users size={12} className="text-naf-gold" /> Guest
                        Count
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-naf-cream border border-naf-cream-dark rounded-2xl p-4 text-sm font-bold text-naf-navy outline-none focus:border-naf-gold transition-all appearance-none"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} Guest{num > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 border border-red-100 italic">
                      <Info size={16} /> {errorMessage}
                    </div>
                  )}

                  {bookingStatus === 'success' ? (
                    <div className="p-6 bg-emerald-50 text-emerald-600 rounded-[30px] text-center space-y-4 border border-emerald-100">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Check size={32} />
                      </div>
                      <h4 className="text-xl font-heading font-semibold">
                        Booking Reserved
                      </h4>
                      <p className="text-xs font-bold uppercase tracking-widest leading-loose">
                        Your reservation at {lodge.name} has been successfully
                        initialized.
                      </p>
                      <Link
                        href="/dashboard/bookings"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-200"
                      >
                        My Bookings <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={bookingStatus === 'loading'}
                      className="w-full h-20 bg-naf-gold text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-naf-gold-dark transition-all active:scale-95 shadow-lg shadow-naf-gold/20 flex items-center justify-center gap-4 disabled:opacity-50 group"
                    >
                      {bookingStatus === 'loading' ? (
                        'Processing...'
                      ) : (
                        <>
                          Reserve Now{' '}
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  )}
                </form>

                <div className="pt-8 border-t border-naf-cream-dark text-center space-y-4">
                  <div className="flex items-center justify-center gap-3 text-naf-gold/40">
                    <ShieldCheck size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      End-to-End Secure Booking
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                    By reserving, you agree to our <br /> luxury guest
                    protocols.
                  </p>
                </div>
              </motion.div>

              {/* LOYALTY CARD MINI */}
              <div className="p-8 bg-naf-gold rounded-[40px] shadow-gold text-white flex items-center gap-6 group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Award size={100} />
                </div>
                <div className="p-4 bg-white/20 rounded-2xl text-white">
                  <Shield size={32} />
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">
                    Member Duty
                  </p>
                  <h4 className="text-xl font-heading font-medium">
                    Standardized Safety
                  </h4>
                  <p className="text-[10px] font-medium text-white/70 mt-1 uppercase tracking-widest">
                    Exclusively for the Nigerian Air Force.
                  </p>
                </div>
              </div>

              {/* CONTACT AD */}
              <div className="p-10 bg-white rounded-[40px] shadow-premium border border-naf-cream-dark text-center space-y-6">
                <div className="w-16 h-16 bg-naf-cream rounded-full flex items-center justify-center mx-auto text-naf-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-heading text-xl text-naf-navy">
                    Support Center
                  </h4>
                  <p className="text-slate-400 text-xs font-medium font-body mt-2">
                    Speak with our hospitality desk for special guest requests.
                  </p>
                </div>
                <p className="text-xl font-bold text-naf-gold font-body">
                  {lodge.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER SIMPLE */}
      <footer className="mt-32 pt-20 border-t border-naf-cream-dark text-center">
        <Link href="/" className="inline-flex items-center gap-4 group mb-10">
          <div className="relative w-10 h-10 p-1 bg-white rounded-full shadow-md border border-naf-cream-dark">
            <Image
              src="/naf.svg"
              alt="NAF Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg font-heading font-bold text-naf-navy leading-none">
              NAF lodges
            </span>
            <span className="text-[8px] font-bold text-naf-gold tracking-[0.4em] uppercase mt-1">
              Guest Excellence
            </span>
          </div>
        </Link>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-10">
          © {new Date().getFullYear()} NAF lodges GUEST SERVICES — PRIVATE
          ACCESS
        </p>
      </footer>
    </div>
  );
}
