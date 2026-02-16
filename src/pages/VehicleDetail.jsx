import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gauge, Fuel, Settings2, Palette, Calendar, Hash, Check, Phone, Mail } from 'lucide-react';
import { vehicles } from '../data/inventory';
import VehicleCard from '../components/VehicleCard';
import { useState } from 'react';

export default function VehicleDetail() {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === parseInt(id));
  const [formSent, setFormSent] = useState(false);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-brand-darker flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display text-white mb-4">Vehicle Not Found</h2>
          <Link to="/inventory" className="text-brand-gold hover:underline">Back to Inventory</Link>
        </div>
      </div>
    );
  }

  const similar = vehicles.filter(v => v.id !== vehicle.id && v.bodyType === vehicle.bodyType).slice(0, 3);
  const specs = [
    { icon: Calendar, label: 'Year', value: vehicle.year },
    { icon: Gauge, label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} mi` },
    { icon: Settings2, label: 'Transmission', value: vehicle.transmission },
    { icon: Fuel, label: 'Fuel', value: vehicle.fuelType },
    { icon: Palette, label: 'Exterior', value: vehicle.exteriorColor },
    { icon: Palette, label: 'Interior', value: vehicle.interiorColor },
    { icon: Hash, label: 'Drivetrain', value: vehicle.drivetrain },
    { icon: Hash, label: 'Stock #', value: vehicle.stock },
  ];

  const loanAmount = vehicle.price * 0.9;
  const rate = 0.069 / 12;
  const term = 60;
  const monthly = Math.round((loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1));

  return (
    <div className="min-h-screen bg-brand-darker">
      <div className="bg-brand-dark border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/inventory" className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-gold transition-colors">
            <ArrowLeft size={16} /> Back to Inventory
          </Link>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="relative aspect-[21/9] max-h-[500px] overflow-hidden bg-black">
        <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              {vehicle.featured && (
                <span className="inline-block px-3 py-1 bg-brand-gold text-brand-dark text-[10px] font-bold tracking-widest uppercase rounded mb-3">Featured</span>
              )}
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
              <p className="text-brand-gold text-lg mt-1">{vehicle.trim}</p>
              <div className="flex items-baseline gap-4 mt-4">
                <span className="text-4xl font-display font-bold text-white">${vehicle.price.toLocaleString()}</span>
                <span className="text-sm text-brand-muted">Est. ${monthly}/mo*</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {specs.map(spec => (
                <div key={spec.label} className="p-4 bg-brand-card border border-brand-border rounded-lg">
                  <spec.icon size={16} className="text-brand-gold mb-2" />
                  <p className="text-xs text-brand-muted tracking-wider uppercase">{spec.label}</p>
                  <p className="text-sm text-white font-medium mt-0.5">{spec.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase mb-3">Description</h3>
              <p className="text-brand-text leading-relaxed">{vehicle.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8">
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase mb-3">Features & Equipment</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {vehicle.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-brand-text">
                    <Check size={14} className="text-brand-gold shrink-0" />{f}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 p-6 bg-brand-card border border-brand-border rounded-lg">
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase mb-4">Payment Estimator</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div><p className="text-xs text-brand-muted">Vehicle Price</p><p className="text-white font-bold mt-1">${vehicle.price.toLocaleString()}</p></div>
                <div><p className="text-xs text-brand-muted">Down Payment</p><p className="text-white font-bold mt-1">${Math.round(vehicle.price * 0.1).toLocaleString()}</p></div>
                <div><p className="text-xs text-brand-muted">Term / Rate</p><p className="text-white font-bold mt-1">60 mo / 6.9%</p></div>
                <div><p className="text-xs text-brand-muted">Est. Monthly</p><p className="text-brand-gold font-bold text-xl mt-1">${monthly}</p></div>
              </div>
              <p className="text-[10px] text-brand-muted mt-4">*Estimated payment based on 10% down, 60 months at 6.9% APR. Actual terms may vary based on creditworthiness. Does not include taxes, registration, or fees.</p>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="sticky top-28 bg-brand-card border border-brand-border rounded-lg p-6">
              <h3 className="text-lg font-display font-bold text-white mb-1">Interested?</h3>
              <p className="text-sm text-brand-muted mb-5">Send us a message or call directly.</p>
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3"><Check size={24} className="text-green-500" /></div>
                  <p className="text-white font-bold">Message Sent!</p>
                  <p className="text-sm text-brand-muted mt-1">We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setFormSent(true); }} className="space-y-3">
                  <input type="text" placeholder="Full Name *" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50" />
                  <input type="tel" placeholder="Phone Number *" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50" />
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50" />
                  <textarea placeholder="I'm interested in this vehicle..." rows={3} className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50 resize-none" />
                  <button type="submit" className="w-full py-3 bg-brand-gold text-brand-dark font-bold text-sm tracking-wider hover:bg-brand-gold-light transition-all rounded">SEND INQUIRY</button>
                </form>
              )}
              <div className="mt-5 pt-5 border-t border-brand-border space-y-3">
                <a href="tel:9738566355" className="flex items-center gap-3 text-sm text-brand-text hover:text-brand-gold transition-colors"><Phone size={16} className="text-brand-gold" /> (973) 856-6355</a>
                <a href="mailto:rtautollc@gmail.com" className="flex items-center gap-3 text-sm text-brand-text hover:text-brand-gold transition-colors"><Mail size={16} className="text-brand-gold" /> rtautollc@gmail.com</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h3 className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase mb-6">Similar Vehicles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similar.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
