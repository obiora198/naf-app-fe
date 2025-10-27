import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    if (!isHomepage) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHomepage
          ? isScrolled
            ? "bg-naf-dark/95 shadow-md backdrop-blur-md"
            : "bg-transparent"
          : "bg-naf-dark"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-12 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-bold text-[#f4c95d]">
          NAF Lodge
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          <Link to="/lodges" className="hover:text-[#f4c95d] transition">
            Lodges
          </Link>

          {user ? (
            <>
            {user.role === "guest" && (
              <Link to="/bookings" className="hover:text-[#f4c95d] transition">
                My Bookings
              </Link>
            )}
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-[#f4c95d] transition">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-[#f4c95d] transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#f4c95d] text-naf-dark px-5 py-2 rounded font-semibold hover:bg-[#f6d77a] transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-naf-dark/95 backdrop-blur-md px-6 py-4 space-y-4 text-lg">
          <Link
            to="/lodges"
            className="block hover:text-[#f4c95d]"
            onClick={() => setMenuOpen(false)}
          >
            Lodges
          </Link>

          {user ? (
            <>
              <Link
                to="/bookings"
                className="block hover:text-[#f4c95d]"
                onClick={() => setMenuOpen(false)}
              >
                My Bookings
              </Link>
              {user.role !== "guest" && (
                <Link
                  to="/admin"
                  className="block hover:text-[#f4c95d]"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full bg-red-600 px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block hover:text-[#f4c95d]"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-[#f4c95d] text-naf-dark px-4 py-2 rounded font-semibold hover:bg-[#f6d77a] transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
