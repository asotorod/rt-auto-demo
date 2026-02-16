import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/inventory', label: 'Inventory' },
    { to: '/finance', label: 'Financing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-brand-darker border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs tracking-wider text-brand-muted">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-brand-gold" />
              469-473 Raymond Blvd, Newark, NJ 07105
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-brand-gold" />
              Mon–Sat 9AM–7PM
            </span>
          </div>
          <a href="tel:9738566355" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
            <Phone size={12} className="text-brand-gold" />
            (973) 856-6355
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="https://cdn.dealrimages.com/file-uploads/dealer452464/5K/MM/ZU/LKO6R9EYIRRCGZ.png"
              alt="RT Auto Center"
              className="h-12 w-auto object-contain brightness-110 group-hover:brightness-125 transition-all"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded ${
                  location.pathname === link.to
                    ? 'text-brand-gold'
                    : 'text-brand-text hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:9738566355"
              className="ml-4 px-5 py-2.5 bg-brand-gold text-brand-dark text-sm font-bold tracking-wider
                         hover:bg-brand-gold-light transition-all rounded"
            >
              CALL NOW
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-brand-text hover:text-brand-gold transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden glass border-t border-brand-border animate-in slide-in-from-top">
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded text-sm font-medium tracking-wide transition-colors ${
                    location.pathname === link.to
                      ? 'text-brand-gold bg-white/5'
                      : 'text-brand-text hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:9738566355"
                className="block mt-3 px-4 py-3 bg-brand-gold text-brand-dark text-sm font-bold
                           tracking-wider text-center rounded"
              >
                (973) 856-6355
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
