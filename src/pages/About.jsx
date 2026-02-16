import { motion } from 'framer-motion';
import { Award, Users, Heart, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-darker">
      <div className="bg-brand-dark border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white">About RT Auto Center</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-display font-bold text-white mb-6">A Decade of Trust in<br /><span className="gold-gradient">Newark's Heart</span></h2>
            <div className="space-y-4 text-brand-text leading-relaxed">
              <p>RT Auto Center has been serving the Newark, New Jersey community for over a decade. Located at 469-473 Raymond Boulevard, we've built our reputation on trust, transparency, and an unwavering commitment to putting our customers in the right vehicle.</p>
              <p>What started as a small lot has grown into one of Newark's most respected pre-owned dealerships, with over 100 vehicles in stock at any given time \u2014 from reliable daily drivers to exotic luxury marques like Bentley, Ferrari, and Lamborghini.</p>
              <p>Our multilingual team speaks English, Portuguese, and Spanish, reflecting the vibrant diversity of our community. With 69,000+ Instagram followers and partnerships with Capital One Auto Navigator, we've modernized the car-buying experience while keeping the personal touch that our customers love.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-4">
            {[{ icon: Award, value: '10+', label: 'Years in Business', color: 'text-brand-gold' }, { icon: Users, value: '69K+', label: 'Instagram Followers', color: 'text-blue-400' }, { icon: Heart, value: '1000+', label: 'Happy Customers', color: 'text-red-400' }, { icon: TrendingUp, value: '105+', label: 'Vehicles in Stock', color: 'text-green-400' }].map(stat => (
              <div key={stat.label} className="p-6 bg-brand-card border border-brand-border rounded-lg text-center">
                <stat.icon size={24} className={`${stat.color} mx-auto mb-3`} />
                <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-xs text-brand-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{ title: 'Transparency', desc: 'No hidden fees, no surprises. Every vehicle comes with full disclosure of history, condition, and pricing. We believe trust is earned through honesty.' }, { title: 'Community', desc: 'We are proud members of the Newark community. Our multilingual team serves English, Portuguese, and Spanish-speaking customers with the same care and respect.' }, { title: 'Quality', desc: 'Every vehicle in our inventory undergoes a thorough inspection. We only sell vehicles we would drive ourselves. Your satisfaction is our reputation.' }].map((v, i) => (
            <div key={v.title} className="p-8 bg-brand-card border border-brand-border rounded-lg">
              <div className="text-5xl font-display text-brand-gold/20 font-bold mb-4">0{i + 1}</div>
              <h3 className="text-xl font-display font-bold text-white mb-3">{v.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
