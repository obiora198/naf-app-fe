'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Calendar,
  Shield,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user as
    | { role?: string; name?: string; email?: string }
    | undefined;

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    // Non-homepage routes always get the scrolled/opaque style
    if (!isHomepage) {
      setIsScrolled(true);
      return;
    }

    // Homepage logic: transition on scroll
    const handleScroll = () => {
      const scrollThreshold = 10;
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage, pathname]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-white/90 backdrop-blur-xl rounded-xl border border-naf-cream-dark shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 sm:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform duration-700 group-hover:rotate-[360deg] p-1 rounded-2xl shadow-sm border border-naf-cream-dark">
            <Image
              src="/naf.svg"
              alt="NAF Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-lg font-heading font-bold tracking-tight leading-none ${
                isScrolled ? 'text-naf-navy' : 'text-white'
              }`}
            >
              NAF lodges
            </span>
            <span
              className={`text-[9px] font-medium tracking-[0.2em] uppercase leading-none mt-0.5 ${
                isScrolled ? 'text-naf-gold' : 'text-naf-gold-light'
              }`}
            >
              Guest Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLink
            href="/lodges"
            label="Our Lodges"
            active={pathname === '/lodges'}
            scrolled={isScrolled}
          />

          {user ? (
            <div className="flex items-center gap-5">
              {user.role === 'guest' && (
                <NavLink
                  href="/dashboard/bookings"
                  label="My Bookings"
                  active={pathname === '/dashboard/bookings'}
                  scrolled={isScrolled}
                />
              )}
              {(user.role === 'admin' || user.role === 'superadmin') && (
                <NavLink
                  href="/admin"
                  label="Admin"
                  active={pathname.startsWith('/admin')}
                  scrolled={isScrolled}
                />
              )}

              <div
                className={`h-6 w-px ${isScrolled ? 'bg-slate-200' : 'bg-white/20'}`}
              />

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-medium text-naf-gold capitalize">
                    {user.role}
                  </span>
                  <span
                    className={`text-sm font-medium ${isScrolled ? 'text-naf-navy' : 'text-white'}`}
                  >
                    {user.name?.split(' ')[0]}
                  </span>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center border border-white/10 active:scale-95 shadow-lgl ${
                    isScrolled
                      ? 'bg-naf-cream text-naf-gold border border-naf-cream-dark'
                      : 'bg-white/10 text-naf-gold border border-white/20'
                  }`}
                >
                  <User size={18} />
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`p-2.5 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? 'bg-red-50 hover:bg-red-500 text-red-400 hover:text-white'
                      : 'bg-red-500/10 hover:bg-red-500 text-white'
                  }`}
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-naf-navy/70 hover:text-naf-gold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-naf-gold hover:bg-naf-gold-dark text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-gold hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2.5 rounded-full transition-all ${
            isScrolled
              ? 'bg-naf-cream text-naf-navy border border-naf-cream-dark'
              : 'bg-white/10 text-white border border-white/20'
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-0 top-[64px] bg-white z-40 overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-4 max-w-md mx-auto">
              <MobileLink
                href="/lodges"
                label="Our Lodges"
                icon={<Calendar size={20} />}
                onClick={toggleMenu}
              />

              {user ? (
                <>
                  <MobileLink
                    href="/dashboard/bookings"
                    label="My Bookings"
                    icon={<LayoutDashboard size={20} />}
                    onClick={toggleMenu}
                  />
                  {(user.role === 'admin' || user.role === 'superadmin') && (
                    <MobileLink
                      href="/admin"
                      label="Admin Panel"
                      icon={<Shield size={20} />}
                      onClick={toggleMenu}
                    />
                  )}
                  <div className="pt-6 mt-6 border-t border-naf-cream-dark">
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        toggleMenu();
                      }}
                      className="flex items-center gap-3 w-full p-4 bg-red-50 text-red-500 rounded-2xl font-medium text-sm transition-all border border-red-100"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid gap-3 pt-4">
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className="flex items-center justify-center p-4 bg-naf-cream border border-naf-cream-dark rounded-2xl font-medium text-sm text-naf-navy"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={toggleMenu}
                    className="flex items-center justify-center p-4 bg-naf-gold text-white rounded-2xl font-medium text-sm shadow-gold"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              <div className="pt-8 text-center">
                <p className="text-xs text-slate-400">
                  Nigerian Air Force Hospitality
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
  scrolled,
}: {
  href: string;
  label: string;
  active: boolean;
  scrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative text-sm font-medium transition-all duration-300 ${
        active
          ? 'text-naf-gold'
          : scrolled
            ? 'text-naf-navy/70 hover:text-naf-gold'
            : 'text-white/80 hover:text-white'
      }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="nav-underline"
          className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-naf-gold rounded-full"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-naf-cream border border-naf-cream-dark rounded-2xl text-sm font-medium text-naf-navy hover:bg-naf-cream-dark transition-all group"
    >
      <span className="text-naf-gold group-hover:scale-110 transition-transform">
        {icon}
      </span>
      {label}
    </Link>
  );
}
