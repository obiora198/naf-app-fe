'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Award,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'ENROLLMENT FAILED. PLEASE VERIFY DATA.');
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push(
            '/login?message=Membership application successful. Please enter.',
          );
        }, 2000);
      }
    } catch {
      setError('A SECURE CONNECTION ERROR OCCURRED.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-naf-cream flex items-center justify-center p-6 pt-20 lg:pt-32 selection:bg-naf-gold selection:text-naf-navy">
      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-naf-cream-dark">
        {/* LEFT: BRAND SIDE (REVERSED ON REGISTER) */}
        <div className="hidden lg:block relative bg-naf-navy overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200"
            alt="Hospitality Benefits"
            fill
            className="object-cover opacity-40 grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-naf-navy/80 via-transparent to-naf-navy" />

          <div className="absolute inset-0 flex flex-col justify-between p-16 text-white">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="w-16 h-1 bg-naf-gold rounded-full" />
                <h2 className="text-5xl font-heading leading-tight">
                  Elevate your <br />
                  <span className="italic text-naf-gold">
                    Service Experience.
                  </span>
                </h2>
                <p className="text-white/60 text-sm font-medium leading-relaxed max-w-sm">
                  Join the private NAF lodges network and enjoy consistent
                  5-star quality across all our properties.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    icon: <Award className="text-naf-gold" />,
                    text: 'Preferential Member Rates',
                  },
                  {
                    icon: <ShieldCheck className="text-naf-gold" />,
                    text: 'Highest Security Protocols',
                  },
                  {
                    icon: <CheckCircle className="text-naf-gold" />,
                    text: 'Verified Quality Suites',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-2xl"
                  >
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[9px] font-bold text-white/30 tracking-[0.4em] uppercase">
              NAF lodges Guest Services
            </p>
          </div>
        </div>

        {/* RIGHT: FORM SIDE */}
        <div className="p-10 sm:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div>
              <p className="text-naf-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
                Request Access
              </p>
              <h1 className="text-4xl font-heading text-naf-navy">
                Membership <span className="italic">Application</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-sm mt-4">
                Please provide your details to initialize your NAF lodges
                profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-naf-gold/40 group-focus-within:text-naf-gold transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="FULL OFFICIAL NAME"
                    className="w-full bg-naf-cream border border-naf-cream-dark rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-naf-navy placeholder:text-slate-300 outline-none focus:border-naf-gold focus:ring-4 focus:ring-naf-gold/5 transition-all uppercase tracking-widest"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-naf-gold/40 group-focus-within:text-naf-gold transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="OFFICIAL EMAIL ADDRESS"
                    className="w-full bg-naf-cream border border-naf-cream-dark rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-naf-navy placeholder:text-slate-300 outline-none focus:border-naf-gold focus:ring-4 focus:ring-naf-gold/5 transition-all uppercase tracking-widest"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-naf-gold/40 group-focus-within:text-naf-gold transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="CHOOSE SECURE PASSWORD"
                    className="w-full bg-naf-cream border border-naf-cream-dark rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-naf-navy placeholder:text-slate-300 outline-none focus:border-naf-gold focus:ring-4 focus:ring-naf-gold/5 transition-all uppercase tracking-widest"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-500 italic">
                  <AlertCircle size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {error}
                  </span>
                </div>
              )}

              {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 italic">
                  <CheckCircle size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Membership Initialized Successfully.
                  </span>
                </div>
              )}

              <div className="space-y-6 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-naf-navy text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-naf-gold transition-all active:scale-95 shadow-lg shadow-naf-navy/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Complete Registration{' '}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>

                <p className="text-[9px] text-slate-400 font-bold text-center uppercase tracking-widest leading-relaxed">
                  Membership is exclusively reserved <br /> for verified NAF
                  members and invited guests.
                </p>
              </div>
            </form>

            <div className="pt-10 border-t border-naf-cream-dark text-center">
              <p className="text-sm font-medium text-slate-400">
                Existing member?{' '}
                <Link
                  href="/login"
                  className="text-naf-gold font-bold uppercase tracking-widest text-[10px] ml-2 hover:text-naf-navy transition-colors"
                >
                  Authorize Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
