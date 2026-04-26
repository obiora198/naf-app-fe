import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Lodge from "@/models/Lodge";
import Booking from "@/models/Booking";
import User from "@/models/User";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  CalendarCheck,
  PlusCircle,
  TrendingUp,
  ArrowUpRight,
  Shield,
  MapPin,
  ChevronRight,
  Users as UsersIcon,
  Activity,
  Terminal
} from "lucide-react";
import * as motion from "framer-motion/client";
import { SerializedBooking, SerializedLodge, SerializedUser } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();
  const userRole = (session?.user as { role?: string })?.role;

  if (userRole !== "admin" && userRole !== "superadmin") {
    redirect("/dashboard/bookings");
  }

  await connectDB();

  // Fetch data in parallel
  const [lodgesRaw, bookingsRaw, userCount] = await Promise.all([
    Lodge.find().sort({ createdAt: -1 }).lean(),
    Booking.find().populate("user lodge").sort({ createdAt: -1 }).limit(10).lean(),
    User.countDocuments()
  ]);

  const lodges = JSON.parse(JSON.stringify(lodgesRaw)) as SerializedLodge[];
  const bookings = JSON.parse(JSON.stringify(bookingsRaw)) as (SerializedBooking & { user: SerializedUser; lodge: SerializedLodge })[];

  const stats = [
    { label: "Active Fleet", value: lodges.length, icon: <Building2 size={20} />, color: "bg-naf-sky shadow-sm" },
    { label: "Deployments", value: await Booking.countDocuments(), icon: <CalendarCheck size={20} />, color: "bg-emerald-500 shadow-sm" },
    { label: "Staff Vetted", value: userCount, icon: <UsersIcon size={20} />, color: "bg-indigo-500 shadow-sm" },
    { label: "Revenue", value: `₦${lodges.reduce((acc, l) => acc + (l.pricePerNight || 0), 0).toLocaleString()}`, icon: <TrendingUp size={20} />, color: "bg-naf-gold shadow-sm" },
  ];

  return (
    <div className="min-h-screen bg-naf-slate selection:bg-naf-gold selection:text-naf-navy pb-32">
      {/* ADMIN CONTROL HEADER */}
      <section className="bg-naf-navy pt-28 pb-32 px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-naf-sky/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-naf-gold/5 blur-[80px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-naf-gold text-[9px] font-black uppercase tracking-[0.4em] mb-2 backdrop-blur-md">
                <Shield size={12} className="fill-naf-gold" />
                Administrative Console
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                EXECUTIVE <span className="text-naf-gold italic font-serif text-3xl sm:text-4xl lg:text-5xl">Hub.</span>
              </h1>
              <p className="text-white/40 text-sm font-medium max-w-xl">
                Exclusive oversight of our hospitality collection and member service logs.
              </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Link
                    href="/admin/lodges/new"
                    className="group relative flex items-center gap-3 bg-naf-gold text-naf-navy px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-naf-gold/10 overflow-hidden"
                >
                    <PlusCircle size={16} className="relative z-10" />
                    <span className="relative z-10 uppercase">Add New Lodge</span>
                    <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMMAND GRID */}
      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 -mt-12 space-y-10 relative z-20">
        {/* Statistics Interface */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-premium border border-slate-50 flex items-center gap-6 group hover:shadow-premium-hover transition-all duration-500"
            >
              <div className={`${stat.color} w-12 h-12 rounded-xl text-white flex items-center justify-center transition-transform duration-500 group-hover:rotate-6`}>
                {stat.icon}
              </div>
              <div className="space-y-0.5">
                <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-naf-navy tracking-tight uppercase">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Inventory Controller */}
          <section className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-black text-naf-navy tracking-tight flex items-center gap-3 uppercase">
                <div className="w-1.5 h-6 bg-naf-gold rounded-full" />
                Lodge Directory
              </h2>
              <Link href="/lodges" className="text-naf-sky text-[9px] font-black uppercase tracking-widest hover:text-naf-navy transition-colors flex items-center gap-2">
                View All <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-premium border border-slate-50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-naf-slate/50 text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] border-b border-slate-100">
                      <th className="py-8 px-10">Lodge Name</th>
                      <th className="py-8 px-8">Location Hub</th>
                      <th className="py-8 px-8 text-right">Daily Rate</th>
                      <th className="py-8 px-10 text-center">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {lodges.map((lodge) => (
                      <tr key={lodge._id} className="group hover:bg-naf-slate/30 transition-colors">
                        <td className="py-6 px-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-naf-navy/5 flex items-center justify-center text-naf-sky group-hover:bg-naf-navy group-hover:text-white transition-colors">
                                    <Building2 size={18} />
                                </div>
                                <span className="font-black text-naf-navy text-base tracking-tight uppercase leading-none">{lodge.name}</span>
                            </div>
                        </td>
                        <td className="py-6 px-8">
                            <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                                <MapPin size={12} className="text-naf-gold" />
                                {lodge.base}
                            </div>
                        </td>
                        <td className="py-6 px-8 text-right">
                            <span className="font-black text-naf-navy text-base tracking-tight">₦{lodge.pricePerNight?.toLocaleString()}</span>
                        </td>
                        <td className="py-6 px-10 text-center">
                          <Link
                            href={`/admin/lodges/${lodge._id}`}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-naf-navy text-white hover:bg-naf-gold hover:text-naf-navy rounded-lg text-[9px] font-black uppercase tracking-widest transition-all"
                          >
                            Modify <ChevronRight size={12} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Activity Logs Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <h2 className="text-xl font-black text-naf-navy tracking-tight uppercase flex items-center gap-3 px-1">
                <Activity size={20} className="text-naf-sky" />
                Recent Activity
            </h2>
            <div className="bg-white rounded-3xl shadow-premium border border-slate-50 p-10 space-y-10">
              {bookings.map((booking) => (
                <div key={booking._id} className="flex gap-6 pb-8 border-b border-slate-50 last:border-0 last:pb-0 group">
                  <div className="w-12 h-12 rounded-2xl bg-naf-slate flex items-center justify-center text-naf-navy font-black text-xs shrink-0 group-hover:bg-naf-navy group-hover:text-naf-gold transition-all duration-500 shadow-sm uppercase">
                    {booking.user && typeof booking.user === 'object' ? booking.user.name?.charAt(0) : "M"}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm font-black text-naf-navy truncate tracking-tight uppercase leading-none">{booking.user && typeof booking.user === 'object' ? booking.user.name : "Member"}</p>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest truncate">{booking.lodge && typeof booking.lodge === 'object' ? booking.lodge.name : "Lodge Collection"}</p>
                    <div className="pt-1.5 flex items-center gap-3">
                      <span className="text-[9px] font-black text-naf-gold uppercase tracking-widest">
                        ₦{booking.totalAmount?.toLocaleString()}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-slate-100" />
                      <span className="text-[9px] text-slate-300 font-bold uppercase">
                        {new Date(booking.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/admin/bookings"
                className="group flex items-center justify-center gap-3 w-full py-5 bg-naf-slate/50 hover:bg-naf-navy hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-400 transition-all duration-500 shadow-inner"
              >
                <Terminal size={12} className="group-hover:text-naf-gold" />
                Full Booking History
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-20 bg-naf-navy border-t border-white/5 text-center mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col items-center justify-center gap-8">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative w-10 h-10 p-1 bg-white rounded-full">
                        <Image src="/naf.svg" alt="NAF Logo" fill className="object-contain p-1" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-lg font-black text-naf-gold uppercase leading-none">NAF Lodge</span>
                        <span className="text-[7px] font-bold text-naf-sky tracking-[0.3em] uppercase mt-1">Executive Administration</span>
                    </div>
                </Link>
                <div className="pt-10 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black tracking-[0.2em] uppercase">
                    <p className="text-white/20">
                        &copy; {new Date().getFullYear()} NAF HUB.
                    </p>
                    <div className="flex items-center gap-3 text-white/30 italic">
                        <Terminal size={12} />
                        <span>Admin Console #ADM-882-NAF</span>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
