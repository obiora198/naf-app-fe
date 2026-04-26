'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  Star,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        if (res.error.includes('Configuration') || res.error.includes('CallbackRouteError')) {
          setError('A SERVICE CONNECTION ERROR OCCURRED. PLEASE TRY AGAIN LATER.');
        } else {
          setError('AUTHENTICATION FAILED. PLEASE VERIFY YOUR CREDENTIALS.');
        }
      } else {
        router.push(callbackUrl);
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
        {/* LEFT: FORM SIDE */}
        <div className="p-10 sm:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-heading text-naf-navy">
                Guest <span className="italic">Entry</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-sm">
                Welcome back to NAF lodges. Please provide your secure
                credentials for property access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {message && !error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 italic"
                  >
                    <CheckCircle size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {message}
                    </span>
                  </motion.div>
                )}

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
                    placeholder="SECURE PASSWORD"
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

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-naf-cream-dark text-naf-gold focus:ring-naf-gold/20"
                  />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Remember Device
                  </span>
                </label>
                <Link
                  href="#"
                  className="text-[10px] font-bold text-naf-gold uppercase tracking-widest hover:text-naf-navy transition-colors"
                >
                  Recover Access
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-naf-navy text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-naf-gold transition-all active:scale-95 shadow-lg shadow-naf-navy/20 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Enter NAF lodges{' '}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="pt-10 border-t border-naf-cream-dark text-center">
              <p className="text-sm font-medium text-slate-400">
                New member?{' '}
                <Link
                  href="/register"
                  className="text-naf-gold font-bold uppercase tracking-widest text-[10px] ml-2 hover:text-naf-navy transition-colors"
                >
                  Request Enrollment
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: BRAND SIDE */}
        <div className="hidden lg:block relative bg-naf-navy overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200"
            alt="Hospitality Branding"
            fill
            className="object-cover opacity-40 grayscale-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-naf-navy via-naf-navy/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-16 text-white space-y-6">
            <h2 className="text-5xl font-heading leading-tight">
              Securing <br />
              <span className="italic text-naf-gold">Hospitality</span>{' '}
              Excellence.
            </h2>

            {/* Floating reviews/stats */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-naf-navy bg-slate-800 overflow-hidden relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/150?u=${i + 10}`}
                      alt="avatar"
                      fill
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={10}
                      className="fill-naf-gold text-naf-gold"
                    />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest">
                  550+ Trusted Stays Monthly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-naf-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-naf-gold" size={32} />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
