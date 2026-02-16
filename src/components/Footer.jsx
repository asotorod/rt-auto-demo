import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <img
              src="https://cdn.dealrimages.com/file-uploads/dealer452464/5K/MM/ZU/LKO6R9EYIRRCGZ.png"
              alt="RT Auto Center"
              className="h-14 w-auto object-contain mb-5"
            />
            <p className="text-sm text-brand-muted leading-relaxed">
              Newark's premier destination for quality pre-owned vehicles. 
              Over a decade of trust, transparency, and exceptional service.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.instagram.com/rtautocenternj/" target="_blank" rel="noreferrer"
                 className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center 
                            text-brand-muted hover:text-brand-gold hover:border-brand-gold transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center 
                            text-brand-muted hover:text-brand-gold hover:border-brand-gold transition-all">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-brand-gold mb-5 uppercase">Quick Links</h4>
            <div className="space-y-3">
              {[
                { to: '/inventory', label: 'Browse Inventory' },
                { to: '/finance', label: 'Apply for Financing' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/about', label: 'About Us' },
              ].map(link => (
                <Link key={link.to} to={link.to}
                  className="block text-sm text-brand-muted hover:text-white hover:translate-x-1 transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-brand-gold mb-5 uppercase">Contact</h4>
            <div className="space-y-4">
              <a href="tel:9738566355" className="flex items-start gap-3 text-sm text-brand-muted hover:text-white transition-colors">
                <Phone size={16} className="text-brand-gold mt-0.5 shrink-0" />
                (973) 856-6355
              </a>
              <a href="mailto:rtautollc@gmail.com" className="flex items-start gap-3 text-sm text-brand-muted hover:text-white transition-colors">
                <Mail size={16} className="text-brand-gold mt-0.5 shrink-0" />
                rtautollc@gmail.com
              </a>
              <div className="flex items-start gap-3 text-sm text-brand-muted">
                <MapPin size={16} className="text-brand-gold mt-0.5 shrink-0" />
                469-473 Raymond Blvd<br />Newark, NJ 07105
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-brand-gold mb-5 uppercase">Hours</h4>
            <div className="space-y-2 text-sm text-brand-muted">
              <div className="flex justify-between">
                <span>Mon – Fri</span>
                <span className="text-white">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-red-400">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} RT Auto Center. All rights reserved.
          </p>
          <p className="text-xs text-brand-muted">
            <span className="text-brand-gold">✦</span> Premium Pre-Owned Vehicles in Newark, NJ
          </p>
        </div>
      </div>
    </footer>
  );
}
