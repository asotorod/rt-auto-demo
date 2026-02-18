import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Star, Banknote, CarFront, ArrowRight, Loader2 } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import { useFeaturedVehicles, useVehicles } from '../lib/useInventory';

export default function Home() {
  const { vehicles: featuredVehicles, loading: featuredLoading } = useFeaturedVehicles(6);
  const { vehicles: allVehicles } = useVehicles();
  const heroImage = allVehicles[0]?.image || 'https://cdn.dealrimages.com/RT-AUTO-CENTER_NEWARK_NJ/2019-LAMBORGHINI-URUS-ZPBUA1ZL4KLA01776/cc_2024_1-edit.webp';
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Featured vehicle"
            className="w-full h-full object-cover scale-105"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Newark, New Jersey</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] tracking-tight">
              Drive<br />
              <span className="gold-gradient">Extraordinary</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-light">
              Curated pre-owned vehicles from the world's finest marques.
              Bentley. BMW. Porsche. At prices that defy expectations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/inventory" className="group inline-flex items-center gap-2 px-7 py-4 bg-brand-gold text-brand-dark font-bold text-sm tracking-wider hover:bg-brand-gold-light transition-all rounded">
                BROWSE INVENTORY
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/finance" className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-medium text-sm tracking-wider hover:bg-white/10 transition-all rounded">
                GET PRE-APPROVED
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 grid grid-cols-3 gap-px max-w-lg">
            {[{ value: `${allVehicles.length || '105'}+`, label: 'Vehicles' }, { value: '10+', label: 'Years' }, { value: '69K', label: 'Followers' }].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 tracking-wider uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <section className="py-20 bg-brand-darker">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-brand-gold" />
                <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Curated Selection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Featured Vehicles</h2>
            </div>
            <Link to="/inventory" className="hidden md:flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold-light transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLoading ? (
              <div className="col-span-full flex justify-center py-12"><Loader2 size={32} className="animate-spin text-brand-gold" /></div>
            ) : featuredVehicles.map((vehicle, i) => (<VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/inventory" className="inline-flex items-center gap-2 text-sm text-brand-gold">View All Inventory <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Why RT Auto</span>
              <div className="w-8 h-px bg-brand-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">The RT Experience</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ icon: Shield, title: 'Quality Assured', desc: 'Every vehicle undergoes a comprehensive multi-point inspection before it reaches our showroom floor.' }, { icon: Banknote, title: 'Flexible Financing', desc: 'All credit types welcome. We work with multiple lenders including Capital One to get you approved.' }, { icon: Star, title: 'Premium Selection', desc: 'From luxury marques to reliable daily drivers \u2014 105+ vehicles handpicked for quality and value.' }, { icon: CarFront, title: 'Transparent Pricing', desc: 'No hidden fees, no pressure. Competitive market pricing with complete vehicle history disclosure.' }].map((prop, i) => (
              <motion.div key={prop.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-lg border border-brand-border bg-brand-card card-shine hover:border-brand-gold/20 transition-all duration-500">
                <div className="w-11 h-11 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                  <prop.icon size={20} className="text-brand-gold" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{prop.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/10 via-brand-dark to-brand-gold/10" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 75% 50%, #c9a84c 0%, transparent 50%)' }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-5">
            Your Next Vehicle<br /><span className="gold-gradient">Awaits</span>
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Visit our showroom on Raymond Blvd in Newark or browse our complete inventory online. We speak English, Portuguese, and Spanish.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/inventory" className="px-7 py-4 bg-brand-gold text-brand-dark font-bold text-sm tracking-wider hover:bg-brand-gold-light transition-all rounded">BROWSE INVENTORY</Link>
            <a href="tel:9738566355" className="px-7 py-4 border border-brand-gold text-brand-gold font-bold text-sm tracking-wider hover:bg-brand-gold hover:text-brand-dark transition-all rounded">(973) 856-6355</a>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-14 bg-brand-darker border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-brand-muted/40 text-sm font-display tracking-widest uppercase">
            {['Bentley', 'BMW', 'Ferrari', 'Lamborghini', 'Porsche', 'Mercedes-Benz', 'Land Rover', 'Ford', 'Toyota', 'Jeep'].map(brand => (
              <span key={brand} className="hover:text-brand-gold/60 transition-colors cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
