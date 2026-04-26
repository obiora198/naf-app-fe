import { Calendar, CreditCard, Home, ShieldCheck, ExternalLink } from "lucide-react";
import { SerializedBooking, SerializedLodge } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";

interface BookingCardProps {
  booking: SerializedBooking & { lodge?: SerializedLodge };
}

export default function BookingCard({ booking }: BookingCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'pending': return 'text-naf-gold-dark bg-naf-gold/10 border-naf-gold/20';
      case 'cancelled': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-5xl shadow-premium border border-slate-100 overflow-hidden hover:shadow-premium-hover transition-all duration-500 group flex flex-col"
    >
      {/* Top Tactical Banner */}
      <div className="h-2 bg-gradient-to-r from-naf-navy via-naf-navy-light to-naf-gold opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-naf-navy/5 rounded-xl text-naf-navy transition-colors group-hover:bg-naf-navy group-hover:text-white duration-500 shadow-sm">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[9px] font-black text-naf-sky uppercase tracking-[0.2em] mb-0.5">
                 <ShieldCheck size={9} />
                 Deployment
              </div>
              <h3 className="text-lg font-black text-naf-navy truncate max-w-[180px] tracking-tight uppercase">
                {booking.lodge?.name || "N/A Asset"}
              </h3>
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border shadow-sm ${getStatusColor(booking.status || 'active')}`}>
            {booking.status || 'Active'}
          </div>
        </div>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 gap-5 mb-8 pb-6 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-naf-gold">
               <Calendar size={16} />
            </div>
            <div>
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Rotation</span>
              <p className="text-xs font-bold text-naf-navy uppercase">
                 {formatDate(booking.checkIn)} <span className="text-slate-300 mx-1">—</span> {formatDate(booking.checkOut)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-naf-gold">
                <CreditCard size={16} />
              </div>
              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Allocation</span>
                <p className="text-lg font-black text-naf-navy tracking-tight">₦{booking.totalAmount?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Actions */}
        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/dashboard/bookings/${booking._id}`}
            className="flex-1 group/btn relative overflow-hidden bg-naf-navy text-white px-5 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-lg hover:shadow-naf-navy/10 flex items-center justify-center gap-2"
          >
            <span className="relative z-10">Access Receipt</span>
            <ExternalLink size={12} className="relative z-10 group-hover/btn:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-naf-gold scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-500" />
          </Link>

          <button className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all duration-300 group/cancel">
             <motion.div whileHover={{ scale: 1.1 }}>
                <X size={18} />
             </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function X({ size, className }: { size: number; className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
}
