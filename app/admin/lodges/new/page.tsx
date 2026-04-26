"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Banknote,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Shield
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AddLodge() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    base: "",
    state: "",
    pricePerNight: "",
    rating: "4.5",
    description: "",
    images: "", // Comma-separated for now
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        pricePerNight: Number(form.pricePerNight),
        rating: Number(form.rating),
        images: form.images.split(",").map(url => url.trim()).filter(url => url !== ""),
      };

      const res = await fetch("/api/admin/lodges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save lodge");
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-naf-slate selection:bg-naf-gold selection:text-naf-navy pb-32">
      {/* Header Section */}
      <section className="bg-naf-navy pt-28 pb-32 px-6 sm:px-12 relative overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-naf-sky/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-naf-gold/5 blur-[80px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Link
              href="/admin"
              className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-all backdrop-blur-md group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-naf-gold text-[9px] font-black uppercase tracking-[0.3em] mb-2 backdrop-blur-md mx-auto md:mx-0">
                <Shield size={12} className="fill-naf-gold" />
                Lodge Procurement
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">New Lodge <span className="text-naf-gold italic font-serif">Commission.</span></h1>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Administrative Logistics Unit</p>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-6 -mt-12 relative z-20">
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-slate-50 space-y-10"
        >
          {success && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl flex items-center gap-5 border border-emerald-100 shadow-sm"
            >
              <div className="bg-emerald-500 text-white p-2.5 rounded-xl shadow-lg">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="font-black text-lg tracking-tight uppercase">Lodge Added</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Property successfully added to our collection...</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-rose-50 text-rose-700 p-6 rounded-2xl flex items-center gap-5 border border-rose-100 shadow-sm"
            >
              <div className="bg-rose-500 text-white p-2.5 rounded-xl shadow-lg">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="font-black text-lg tracking-tight uppercase">Process Error</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{error}</p>
              </div>
            </motion.div>
          )}

          <div className="space-y-10">
            {/* Core Identity */}
            <div className="space-y-6">
              <h2 className="text-[10px] font-black text-naf-sky flex items-center gap-3 uppercase tracking-[0.3em]">
                <Building2 size={16} />
                Asset Identity
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Lodge Designation</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="E.G. NAF CONFERENCE CENTER"
                    required
                    className="w-full bg-naf-slate/30 border border-slate-100 p-4 rounded-xl focus:ring-4 focus:ring-naf-gold/5 focus:border-naf-gold outline-none transition-all font-bold text-naf-navy text-xs uppercase placeholder:text-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Command Base</label>
                  <input
                    type="text"
                    name="base"
                    value={form.base}
                    onChange={handleChange}
                    placeholder="E.G. ABUJA HQ"
                    required
                    className="w-full bg-naf-slate/30 border border-slate-100 p-4 rounded-xl focus:ring-4 focus:ring-naf-gold/5 focus:border-naf-gold outline-none transition-all font-bold text-naf-navy text-xs uppercase placeholder:text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-50" />

            {/* Parameters */}
            <div className="space-y-6">
              <h2 className="text-[10px] font-black text-naf-sky flex items-center gap-3 uppercase tracking-[0.3em]">
                <Banknote size={16} />
                Parameters
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Daily Rate (₦)</label>
                  <input
                    type="number"
                    name="pricePerNight"
                    value={form.pricePerNight}
                    onChange={handleChange}
                    placeholder="25000"
                    required
                    className="w-full bg-naf-slate/30 border border-slate-100 p-4 rounded-xl focus:ring-4 focus:ring-naf-gold/5 focus:border-naf-gold outline-none transition-all font-bold text-naf-navy text-xs uppercase placeholder:text-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">State Hub</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="KADUNA"
                    required
                    className="w-full bg-naf-slate/30 border border-slate-100 p-4 rounded-xl focus:ring-4 focus:ring-naf-gold/5 focus:border-naf-gold outline-none transition-all font-bold text-naf-navy text-xs uppercase placeholder:text-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    min="0"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full bg-naf-slate/30 border border-slate-100 p-4 rounded-xl focus:ring-4 focus:ring-naf-gold/5 focus:border-naf-gold outline-none transition-all font-bold text-naf-navy text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-50" />

            {/* Media & Brief */}
            <div className="space-y-6">
              <h2 className="text-[10px] font-black text-naf-sky flex items-center gap-3 uppercase tracking-[0.3em]">
                <ImageIcon size={16} />
                Asset Briefing
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Media Assets (URLs, identify with commas)</label>
                  <textarea
                    name="images"
                    value={form.images}
                    onChange={handleChange}
                    placeholder="HTTPS://..."
                    rows={2}
                    className="w-full bg-naf-slate/30 border border-slate-100 p-4 rounded-xl focus:ring-4 focus:ring-naf-gold/5 focus:border-naf-gold outline-none transition-all font-bold text-naf-navy text-[10px] font-mono placeholder:text-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Command Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="IDENTIFY KEY FACILITIES AND SECURITY SPECS..."
                    rows={4}
                    required
                    className="w-full bg-naf-slate/30 border border-slate-100 p-4 rounded-xl focus:ring-4 focus:ring-naf-gold/5 focus:border-naf-gold outline-none transition-all font-bold text-naf-navy text-xs uppercase placeholder:text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading || success}
              className={`group relative w-full py-6 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-4 overflow-hidden ${
                loading || success
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-100"
                  : "bg-naf-navy text-white"
              }`}
            >
              <span className="relative z-10 flex items-center gap-4">
                {loading ? (
                    <>SAVING DATA...</>
                ) : (
                    <><Save size={18} /> ADD LODGE</>
                )}
              </span>
              {!loading && !success && (
                  <div className="absolute inset-0 bg-naf-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              )}
            </button>
          </div>
        </motion.form>
      </main>

      <footer className="py-20 bg-naf-navy border-t border-white/5 text-center mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col items-center justify-center gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-4 group"
                >
                    <div className="relative w-10 h-10 p-1 bg-white rounded-full">
                        <Image src="/naf.svg" alt="NAF Logo" fill className="object-contain p-1" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-lg font-black text-naf-gold uppercase leading-none tracking-tighter">NAF Lodge</span>
                        <span className="text-[7px] font-bold text-naf-sky tracking-[0.3em] uppercase mt-1">Executive Management</span>
                    </div>
                </Link>
                <p className="text-white/10 text-[9px] font-black tracking-[0.2em] uppercase pt-6 border-t border-white/5 w-full max-w-xs">
                    &copy; {new Date().getFullYear()} NAF HOSPITALITY UNIT.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
