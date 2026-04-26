import connectDB from '@/lib/mongodb';
import Lodge from '@/models/Lodge';
import LodgeCard from '@/components/LodgeCard';
import {
  ShieldCheck,
  BedDouble,
  Users,
  ArrowRight,
  Star,
  Shield,
  Award,
  MapPin,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import * as motion from 'framer-motion/client';
import { SerializedLodge } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  await connectDB();

  // Fetch lodges directly on the server
  const lodgesRaw = await Lodge.find({ isAvailable: true }).limit(4).lean();
  const lodges = JSON.parse(JSON.stringify(lodgesRaw)) as SerializedLodge[];

  return (
    <div className="bg-naf-cream min-h-screen selection:bg-naf-gold selection:text-naf-navy">
      {/* LUXURY HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax effect feeling */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Hospitality"
            fill
            className="object-cover brightness-[0.7] transform scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-naf-navy/40 via-transparent to-naf-navy/80" />
        </div>

        <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-12 lg:px-16 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 py-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-naf-gold-light text-xs font-bold uppercase tracking-[0.3em]">
              <Star size={14} className="fill-naf-gold-light" />
              Exclusively Curated For You
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-medium leading-[1.05] tracking-tight text-balance">
              Experience <span className="italic font-normal">Refined</span>{' '}
              <br />
              <span className="text-naf-gold">Hospitality</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed font-body">
              The premier selection of luxury hospitality for members of the
              Nigerian Air Force. Secure your world-class stay at any NAF lodges
              location.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
              <Link
                href="/lodges"
                className="group relative flex items-center justify-center bg-naf-gold text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 hover:shadow-gold hover:-translate-y-1 active:scale-95 space-x-3"
              >
                <span className="text-sm uppercase tracking-widest leading-none">
                  Explore Our Collection
                </span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/register"
                className="flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-5 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm uppercase tracking-widest active:scale-95"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/40"
        >
          <div className="w-5 h-9 border-2 border-white/20 rounded-xl flex justify-center p-1">
            <div className="w-1 h-1.5 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* QUICK SEARCH SECTION */}
      <section className="relative z-20 max-w-[1000px] mx-auto -mt-16 px-6">
        <div className="bg-white rounded-2xl shadow-premium p-4 sm:p-2 border border-naf-cream-dark">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="p-4 border-b md:border-b-0 md:border-r border-naf-cream-dark">
              <div className="flex items-center gap-3 text-naf-gold mb-1">
                <MapPin size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Location
                </span>
              </div>
              <p className="text-sm font-bold text-naf-navy truncate">
                Anywhere in Nigeria
              </p>
            </div>
            <div className="p-4 border-b md:border-b-0 md:border-r border-naf-cream-dark">
              <div className="flex items-center gap-3 text-naf-gold mb-1">
                <Calendar size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Arrival
                </span>
              </div>
              <p className="text-sm font-bold text-naf-navy">Select Date</p>
            </div>
            <div className="p-4 border-b md:border-b-0 md:border-r border-naf-cream-dark">
              <div className="flex items-center gap-3 text-naf-gold mb-1">
                <Users size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Guests
                </span>
              </div>
              <p className="text-sm font-bold text-naf-navy">
                2 Adults, 1 Room
              </p>
            </div>
            <div className="p-2">
              <Link
                href="/lodges"
                className="w-full h-full flex items-center justify-center bg-naf-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-naf-gold transition-colors active:scale-95 py-4 md:py-0 shadow-lg"
              >
                Find Rooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REFINED EXPERIENCE SECTION */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-naf-cream relative overflow-hidden">
        {/* Background Dots Pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(#C9A84C 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-[1200px] mx-auto text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-naf-gold font-bold text-xs uppercase tracking-[0.4em] block">
              Our Excellence
            </span>
            <h2 className="text-naf-navy text-4xl sm:text-5xl lg:text-6xl font-heading leading-tight">
              Crafting <span className="italic">Unforgettable</span> Stays
            </h2>
            <div className="w-16 h-1 bg-naf-gold mx-auto mt-6" />
            <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-2xl mx-auto pt-6">
              Beyond traditional hospitality, we provide a sanctuary of luxury
              and security tailored exclusively for our guests.
            </p>
          </motion.div>
        </div>

        <div className="max-w-[1200px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <ShieldCheck className="w-8 h-8" />,
              title: 'Exclusive Security',
              desc: 'Strategically located within secured zones providing absolute peace of mind.',
            },
            {
              icon: <BedDouble className="w-8 h-8" />,
              title: 'Luxury Suites',
              desc: 'Elegantly designed rooms combining contemporary style with premium comfort.',
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: 'First-Class Service',
              desc: 'Dedicated personnel committed to providing a 5-star hospitality experience.',
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: 'Prime Access',
              desc: 'Find our premium properties in major cities and strategic hubs nationwide.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-naf-cream-dark transition-all duration-500 text-center relative z-10"
            >
              <div className="mb-8 mx-auto p-5 bg-naf-cream rounded-xl w-fit text-naf-gold group-hover:bg-naf-gold group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold mb-4 text-naf-navy">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-32 bg-naf-navy relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-naf-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-naf-sky/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
          }}
        />

        <div className="max-w-[1300px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-naf-gold font-bold text-xs uppercase tracking-[0.4em] block">
                Exclusive Selection
              </span>
              <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-heading leading-tight">
                Featured <span className="italic font-normal">Lodges</span>
              </h2>
            </div>
            <Link
              href="/lodges"
              className="group flex items-center gap-4 px-8 py-4 rounded-xl border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-naf-navy transition-all duration-500"
            >
              View All Locations{' '}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
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
        </div>
      </section>

      {/* PRIVATE CLUB BENEFTIS */}
      <section className="py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1618773928121-c32f3ee8a1e4?auto=format&fit=crop&q=80&w=1200"
                  alt="Lodge Interior"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Tag */}
              <div className="absolute -bottom-10 -right-10 bg-naf-gold p-10 rounded-3xl shadow-gold text-white max-w-xs hidden md:block">
                <p className="text-3xl font-heading font-medium mb-2 italic">
                  Standardized
                </p>
                <p className="text-sm font-medium text-white/80">
                  Every lodge follows our strict 5-star hospitality protocol for
                  quality and safety.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <span className="text-naf-gold font-bold text-xs uppercase tracking-[0.4em] block">
                  The Privilege
                </span>
                <h2 className="text-naf-navy text-4xl sm:text-5xl font-heading leading-tight">
                  A Home <span className="italic">Reserved</span> <br />
                  Only For the Best
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed font-medium pt-4">
                  Access to our nationwide hospitality network is a dedicated
                  privilege for NAF members and authorized delegates. Experience
                  consistent quality no matter where your duties take you.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  'Secure network access at all properties',
                  'Preferential member rates nationwide',
                  'Dedicated executive airport concierge',
                  '24/7 private operational support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-naf-gold/10 flex items-center justify-center text-naf-gold">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-naf-navy font-bold text-sm uppercase tracking-wider">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className="inline-flex items-center gap-4 px-10 py-5 bg-naf-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-naf-gold hover:shadow-gold transition-all duration-500 active:scale-95 shadow-lg"
              >
                Apply for Member Access <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-32 bg-naf-cream relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex justify-center text-naf-gold-light opacity-30">
              <Shield size={80} />
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading leading-[1.3] text-naf-navy italic">
              &quot;The attention to detail and level of security at the Abuja
              Suites redefined my expectations of what official lodging could
              be.&quot;
            </h3>

            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden relative">
                <Image
                  src="https://i.pravatar.cc/150?u=naf-hq"
                  alt="Guest"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-naf-navy font-bold text-sm uppercase tracking-[0.2em]">
                  Mr. A. Sani
                </p>
                <p className="text-naf-gold font-bold text-[10px] uppercase tracking-widest mt-1">
                  Guest Relations HQ
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL TRANSITION CTA */}
      <section className="relative py-48 bg-naf-navy flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1541979017773-51237ff290a3?auto=format&fit=crop&q=80&w=2000"
          alt="Refined Stay"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-naf-navy via-transparent to-naf-navy" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-heading text-white leading-none">
              Your <span className="italic">Elevated</span> <br />
              Experience Awaits
            </h2>
            <p className="text-xl text-white/60 leading-relaxed font-body max-w-xl mx-auto">
              Join the private network of NAF lodges today and experience the
              ultimate in refined hospitality.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/register"
                className="px-12 py-6 bg-naf-gold text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-gold hover:bg-white hover:text-naf-navy hover:shadow-xl transition-all duration-500 active:scale-95"
              >
                Join the Network
              </Link>
              <Link
                href="/lodges"
                className="px-12 py-6 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all duration-500 active:scale-95"
              >
                See all Locations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-naf-navy border-t border-white/5 relative">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-left">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="relative w-14 h-14 p-1 bg-white rounded-full shadow-lg">
                  <Image
                    src="/naf.svg"
                    alt="NAF Logo"
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-heading font-bold text-naf-gold tracking-tight leading-none">
                    NAF Lodge
                  </span>
                  <span className="text-[9px] font-bold text-white/40 tracking-[0.4em] uppercase mt-1.5">
                    Hospitality Intelligence
                  </span>
                </div>
              </Link>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed font-medium font-body italic">
                &quot;Excellence in service, precision in hospitality. Providing
                a secure home away from home for the defenders of Nigeria&apos;s
                skies.&quot;
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-naf-gold text-[10px] font-bold uppercase tracking-[0.4em]">
                Properties
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/lodges"
                    className="text-white/50 hover:text-naf-gold transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Our Directory
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lodges"
                    className="text-white/50 hover:text-naf-gold transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Featured Suites
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lodges"
                    className="text-white/50 hover:text-naf-gold transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Pricing Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-naf-gold text-[10px] font-bold uppercase tracking-[0.4em]">
                Guest Services
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/login"
                    className="text-white/50 hover:text-naf-gold transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Guest Entry
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-white/50 hover:text-naf-gold transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Membership Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-white/50 hover:text-naf-gold transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Concierge Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/10 text-[10px] font-bold tracking-[0.2em] uppercase">
              © {new Date().getFullYear()} NAF lodges GUEST SERVICES.
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-white/20 text-[10px] font-bold tracking-widest uppercase italic">
                  Private Guest Portal
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
