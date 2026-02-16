import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import { vehicles, makes, bodyTypes } from '../data/inventory';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedBody, setSelectedBody] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...vehicles];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(v => `${v.year} ${v.make} ${v.model} ${v.trim}`.toLowerCase().includes(q));
    }
    if (selectedMake) result = result.filter(v => v.make === selectedMake);
    if (selectedBody) result = result.filter(v => v.bodyType === selectedBody);
    switch (sortBy) {
      case 'price-low': return result.sort((a, b) => a.price - b.price);
      case 'price-high': return result.sort((a, b) => b.price - a.price);
      case 'year-new': return result.sort((a, b) => b.year - a.year);
      case 'mileage-low': return result.sort((a, b) => a.mileage - b.mileage);
      default: return result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [search, selectedMake, selectedBody, sortBy]);

  const activeFilters = [selectedMake, selectedBody].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-brand-darker">
      <div className="bg-brand-dark border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Our Collection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Inventory</h1>
            <p className="mt-3 text-brand-muted">{vehicles.length} vehicles available</p>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-20 z-40 glass border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input type="text" placeholder="Search by make, model, year..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-brand-border rounded text-sm text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50 transition-colors" />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <select value={selectedMake} onChange={e => setSelectedMake(e.target.value)}
                className="px-3 py-2.5 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50 appearance-none cursor-pointer min-w-[130px]">
                <option value="">All Makes</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={selectedBody} onChange={e => setSelectedBody(e.target.value)}
                className="px-3 py-2.5 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50 appearance-none cursor-pointer min-w-[130px]">
                <option value="">All Types</option>
                {bodyTypes.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="px-3 py-2.5 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50 appearance-none cursor-pointer min-w-[140px]">
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest</option>
                <option value="mileage-low">Mileage: Lowest</option>
              </select>
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="md:hidden relative px-3 py-2.5 bg-white/5 border border-brand-border rounded text-sm text-white">
              <SlidersHorizontal size={16} />
              {activeFilters > 0 && (<span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-gold text-brand-dark text-[10px] font-bold rounded-full flex items-center justify-center">{activeFilters}</span>)}
            </button>
          </div>
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-brand-border grid grid-cols-2 gap-3">
              <select value={selectedMake} onChange={e => setSelectedMake(e.target.value)} className="px-3 py-2.5 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none"><option value="">All Makes</option>{makes.map(m => <option key={m} value={m}>{m}</option>)}</select>
              <select value={selectedBody} onChange={e => setSelectedBody(e.target.value)} className="px-3 py-2.5 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none"><option value="">All Types</option>{bodyTypes.map(b => <option key={b} value={b}>{b}</option>)}</select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="col-span-2 px-3 py-2.5 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none"><option value="featured">Featured First</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="year-new">Year: Newest</option><option value="mileage-low">Mileage: Lowest</option></select>
            </div>
          )}
          {(selectedMake || selectedBody) && (
            <div className="flex items-center gap-2 mt-3">
              {selectedMake && (<button onClick={() => setSelectedMake('')} className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs rounded-full">{selectedMake} <X size={12} /></button>)}
              {selectedBody && (<button onClick={() => setSelectedBody('')} className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs rounded-full">{selectedBody} <X size={12} /></button>)}
              <button onClick={() => { setSelectedMake(''); setSelectedBody(''); }} className="text-xs text-brand-muted hover:text-white transition-colors">Clear all</button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vehicle, i) => (<VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">No vehicles match your search.</p>
            <button onClick={() => { setSearch(''); setSelectedMake(''); setSelectedBody(''); }} className="mt-4 text-brand-gold hover:text-brand-gold-light text-sm">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
