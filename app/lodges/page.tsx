import connectDB from '@/lib/mongodb';
import Lodge from '@/models/Lodge';
import LodgeCard from '@/components/LodgeCard';
import {
  Search,
  ArrowRight,
  MapPin,
  SlidersHorizontal,
  LayoutGrid,
  Star,
} from 'lucide-react';
import * as motion from 'framer-motion/client';
import { SerializedLodge } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function LodgesPage() {
  await connectDB();

  // Fetch all available lodges
  const lodgesRaw = await Lodge.find({ isAvailable: true })
    .sort({ rating: -1 })
    .lean();
  const lodges = JSON.parse(JSON.stringify(lodgesRaw)) as SerializedLodge[];

  return (
    <div className="min-h-screen bg-naf-cream pt-20 lg:pt-24 pb-10 selection:bg-naf-gold selection:text-naf-navy">
      {/* DIRECTORY HEADER */}
      <section className="bg-naf-navy pt-24 pb-32 px-6 sm:px-12 relative overflow-hidden">
        {/* VIBRANT MESH GRADIENT */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-naf-gold/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-naf-sky/20 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-white/5 blur-[80px] rounded-full" />
        </div>
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-naf-gold/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-naf-sky/5 blur-[100px] pointer-events-none" />

        <Image
          src="https://images.unsplash.com/photo-1541979017773-51237ff290a3?auto=format&fit=crop&q=80&w=2000"
          alt="Lodge Directory"
          fill
          className="object-cover opacity-10 absolute inset-0 pointer-events-none"
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-naf-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 backdrop-blur-md">
              <Star size={14} className="fill-naf-gold" />
              The Boutique Collection
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading text-white leading-tight">
              Our <span className="italic font-normal">Exquisite</span> <br />
              Locations
            </h1>

            {/* REFINED SEARCH CONSOLE */}
            <div className="relative max-w-2xl mx-auto mt-10 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-naf-gold/0 via-naf-gold/20 to-naf-gold/0 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
              <div className="relative flex items-center bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] focus-within:border-naf-gold/40 focus-within:bg-white/[0.08] transition-all duration-500">
                <div className="ml-4 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-naf-gold border border-white/10">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Find your perfect sanctuary..."
                  className="w-full bg-transparent px-6 py-4 text-white placeholder-white/20 font-medium text-sm outline-none"
                />
                <button className="hidden sm:flex items-center gap-3 bg-naf-gold hover:bg-white hover:text-naf-navy text-white px-8 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500 py-4 shadow-lg shadow-naf-gold/10 active:scale-95">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR SECTION */}
      <section className="sticky top-20 z-40 bg-white/70 backdrop-blur-2xl border-b border-naf-cream-dark/50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-3 text-naf-navy font-bold text-xs uppercase tracking-widest">
              <SlidersHorizontal size={18} className="text-naf-gold" />
              Filters
            </button>
            <div className="h-6 w-px bg-naf-cream-dark hidden md:block" />
            <div className="hidden md:flex items-center gap-6">
              {['Abuja HQ', 'Lagos Wing', 'Kaduna Estate'].map((tag) => (
                <button
                  key={tag}
                  className="text-[10px] font-bold text-slate-400 hover:text-naf-gold transition-colors uppercase tracking-widest"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
              Showing {lodges.length} Properties
            </p>
            <div className="flex items-center gap-4 text-naf-navy">
              <button className="p-2 bg-naf-cream rounded-lg text-naf-gold border border-naf-cream-dark">
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ASSET DIRECTORY LISTING */}
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-naf-cream-dark pb-8">
            <div className="space-y-2">
              <span className="text-naf-gold font-bold text-[10px] uppercase tracking-[0.4em]">
                Properties
              </span>
              <h2 className="text-4xl font-heading text-naf-navy">
                Select your <span className="italic">Standard.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-naf-navy bg-white px-6 py-3 rounded-full shadow-sm border border-naf-cream-dark">
              <span className="text-slate-400 uppercase tracking-widest">
                Sort:
              </span>
              <select className="bg-transparent border-none outline-none cursor-pointer hover:text-naf-gold transition-colors uppercase font-bold text-xs">
                <option>Curated Rating</option>
                <option>Price: Low to High</option>
                <option>Newest Lodge</option>
              </select>
            </div>
          </div>

          {lodges.length > 0 ? (
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {lodges.map((lodge, index: number) => (
                <motion.div
                  key={lodge._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <LodgeCard lodge={lodge} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-40 text-center bg-white rounded-[40px] border-2 border-dashed border-naf-cream-dark shadow-sm"
            >
              <div className="bg-naf-cream w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-naf-gold-light">
                <MapPin size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-heading text-naf-navy mb-4 italic">
                No Properties Found.
              </h3>
              <p className="text-slate-400 max-w-sm mx-auto font-medium text-sm leading-relaxed">
                We couldn&apos;t find any properties matching your current
                filters. Please try refining your parameters.
              </p>
            </motion.div>
          )}

          {/* PREMIUM PAGINATION */}
          {lodges.length > 0 && (
            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-naf-cream-dark pt-12">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">
                Page 01 of 01
              </p>
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 rounded-full border border-naf-cream-dark flex items-center justify-center text-naf-navy font-bold text-sm bg-white hover:bg-naf-gold hover:text-white transition-all duration-300 shadow-sm">
                  01
                </button>
                <button className="px-10 h-12 rounded-full bg-naf-navy text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-naf-gold transition-all duration-300 shadow-xl active:scale-95 group">
                  Next Page{' '}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* SUPPORT CTA SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 mb-20">
        <div className="relative overflow-hidden bg-naf-navy rounded-[40px] p-12 text-center border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-naf-gold/10 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-naf-sky/5 blur-[100px] -ml-32 -mb-32" />

          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <h3 className="text-3xl font-heading text-white">
              Need personal assistance?
            </h3>
            <p className="text-white/60 font-medium text-sm leading-relaxed">
              Our Guest Excellence team is available 24/7 to help you find the
              perfect property or manage complex group bookings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white text-naf-navy rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-naf-gold hover:text-white transition-all duration-300"
              >
                Contact Concierge
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                View Help Center
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - REVITALIZED */}
      <footer className="relative bg-gradient-to-b from-[#0F172A] to-naf-navy pt-20 pb-12 border-t border-white/5">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-naf-gold/30 to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16 items-start text-left">
            <div className="space-y-6 col-span-1">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="relative w-12 h-12 p-1.5 bg-white rounded-xl shadow-lg border border-white/10">
                  <Image
                    src="/naf.svg"
                    alt="NAF Logo"
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-heading font-bold text-naf-gold leading-none">
                    NAF lodges
                  </span>
                  <span className="text-[8px] font-bold text-white/30 tracking-[0.4em] uppercase mt-1">
                    Guest Excellence
                  </span>
                </div>
              </Link>
              <p className="text-white/40 text-xs leading-relaxed font-medium max-w-xs">
                Setting the global standard in boutique hospitality for NAF
                personnel and civilian guests.
              </p>
            </div>

            <div className="col-span-1 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Explore
                </h4>
                <div className="flex flex-col gap-2 text-white/40 text-[10px] font-medium uppercase tracking-[0.1em]">
                  <Link
                    href="/lodges"
                    className="hover:text-naf-gold transition-colors"
                  >
                    All Properties
                  </Link>
                  <Link
                    href="/about"
                    className="hover:text-naf-gold transition-colors"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/faq"
                    className="hover:text-naf-gold transition-colors"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Support
                </h4>
                <div className="flex flex-col gap-2 text-white/40 text-[10px] font-medium uppercase tracking-[0.1em]">
                  <Link
                    href="/login"
                    className="hover:text-naf-gold transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="hover:text-naf-gold transition-colors"
                  >
                    Membership
                  </Link>
                  <Link
                    href="/privacy"
                    className="hover:text-naf-gold transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-1 space-y-4 md:text-right">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
                Status
              </h4>
              <div className="flex items-center md:justify-end gap-3 italic">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-white/30 text-[10px] uppercase tracking-widest">
                  Private Guest Portal Active
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">
            <p>© {new Date().getFullYear()} NAF lodges GUEST SERVICES</p>
            <p>Built with uncompromising standards</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
