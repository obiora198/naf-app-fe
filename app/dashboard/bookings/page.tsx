import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import BookingCard from "@/components/BookingCard";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Shield, Calendar, ArrowRight, LayoutDashboard, History, Bell, Settings } from "lucide-react";
import * as motion from "framer-motion/client";
import { SerializedBooking, SerializedLodge } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/bookings");
  }

  await connectDB();

  const bookingsRaw = await Booking.find({ user: session.user.id })
    .populate("lodge")
    .sort({ createdAt: -1 })
    .lean();

  const bookings = JSON.parse(JSON.stringify(bookingsRaw)) as (SerializedBooking & { lodge: SerializedLodge })[];

  return (
    <div className="min-h-screen bg-naf-slate selection:bg-naf-gold selection:text-naf-navy pb-32">
      {/* DASHBOARD HEADER */}
      <section className="bg-naf-navy pt-28 pb-32 px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-naf-sky/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-naf-gold/5 blur-[80px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-naf-gold text-[9px] font-black uppercase tracking-[0.4em] mb-2 backdrop-blur-md">
                <Shield size={12} className="fill-naf-gold" />
                Member Dashboard
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                MY <span className="text-naf-gold italic font-serif text-3xl sm:text-4xl lg:text-5xl">RESERVATIONS.</span>
              </h1>
              <p className="text-white/40 text-sm font-medium max-w-xl">
                View and manage your exclusive lodge bookings and upcoming visits.
              </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-5 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
            >
                <div className="w-12 h-12 rounded-xl bg-naf-gold flex items-center justify-center text-naf-navy shadow-sm">
                    <LayoutDashboard size={22} />
                </div>
                <div>
                    <p className="text-[8px] text-white/40 font-black uppercase tracking-widest mb-0.5 text-right uppercase">Session ID</p>
                    <p className="text-lg font-black text-white text-right tracking-tight">#{session.user.id?.slice(-6).toUpperCase() || 'OFFLINE'}</p>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN CONSOLE */}
      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-premium border border-slate-100">
                <div className="space-y-4">
                    <DashboardNavLink icon={<LayoutDashboard size={16} />} label="My Stays" active />
                    <DashboardNavLink icon={<History size={16} />} label="History" />
                    <DashboardNavLink icon={<Bell size={16} />} label="Notifications" badge="02" />
                    <div className="h-px bg-slate-50 my-6" />
                    <DashboardNavLink icon={<Settings size={16} />} label="Account Settings" />
                </div>
            </div>

            <div className="bg-naf-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                 <h3 className="text-[10px] font-black mb-6 text-naf-gold uppercase tracking-[0.2em] relative z-10 text-center border-b border-white/5 pb-4">Concierge</h3>
                 <div className="space-y-3 relative z-10">
                    <Link href="/lodges" className="flex items-center justify-center gap-2.5 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all group">
                        Book a Stay <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>
            </div>
          </aside>

          {/* BOOKINGS CONTENT AREA */}
          <div className="lg:w-3/4">
            {bookings && bookings.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {bookings.map((booking, index: number) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <BookingCard booking={booking} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-premium p-16 text-center border border-slate-100 max-w-2xl mx-auto flex flex-col items-center"
              >
                <div className="bg-naf-slate w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <Calendar className="w-10 h-10 text-slate-200" />
                </div>
                <h2 className="text-3xl font-black text-naf-navy mb-4 tracking-tight uppercase leading-none text-balance">NO ACTIVE BOOKINGS.</h2>
                <p className="text-slate-400 mb-10 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-xs">
                  You haven&apos;t reserved any lodges yet. Explore our collection to get started.
                </p>
                <Link
                  href="/lodges"
                  className="group relative inline-flex items-center gap-3 bg-naf-gold text-naf-navy font-black px-10 py-5 rounded-xl hover:scale-105 active:scale-95 shadow-xl uppercase tracking-widest text-[10px] transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Browse Collection <ArrowRight size={16} />
                  </span>
                  <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-20 bg-naf-navy border-t border-white/5 text-center mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col items-center justify-center gap-8">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative w-11 h-11 p-1 bg-white rounded-full">
                        <Image src="/naf.svg" alt="NAF Logo" fill className="object-contain p-1" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-xl font-black text-naf-gold uppercase leading-none">NAF Lodge</span>
                        <span className="text-[8px] font-bold text-naf-sky tracking-[0.3em] uppercase mt-1">Hospitality Console</span>
                    </div>
                </Link>
                <div className="pt-10 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black tracking-[0.2em] uppercase">
                    <p className="text-white/20">
                        &copy; {new Date().getFullYear()} NAF HOSPITALITY.
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-white/30 italic uppercase">Private Secure Terminal</span>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

function DashboardNavLink({ icon, label, active = false, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) {
    return (
        <button className={`flex items-center justify-between w-full p-4 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all group ${
            active ? "bg-naf-navy text-naf-gold shadow-lg" : "text-slate-400 hover:bg-naf-slate hover:text-naf-navy"
        }`}>
            <div className="flex items-center gap-4">
                <span className={active ? "text-naf-gold" : "text-slate-300 group-hover:text-naf-sky"}>{icon}</span>
                {label}
            </div>
            {badge && (
                <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black ${
                    active ? "bg-naf-gold text-naf-navy" : "bg-naf-sky/10 text-naf-sky"
                }`}>{badge}</span>
            )}
        </button>
    );
}
