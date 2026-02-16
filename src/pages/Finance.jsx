import { motion } from 'framer-motion';
import { Shield, Clock, Check, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

export default function Finance() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-brand-darker">
      <div className="bg-brand-dark border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Financing</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Get Pre-Approved</h1>
            <p className="mt-3 text-brand-muted max-w-xl">We work with multiple lenders to find you the best rate. All credit types accepted \u2014 no credit, first-time buyer, or rebuilding credit.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[{ icon: Clock, title: 'Quick Approval', desc: 'Get a decision in minutes, not days. Our streamlined process gets you on the road fast.' }, { icon: Shield, title: 'All Credit Welcome', desc: 'No credit? Bad credit? First-time buyer? We have lenders for every situation.' }, { icon: BadgeCheck, title: 'Capital One Partner', desc: 'Pre-qualify with Capital One Auto Navigator right from our website \u2014 no impact to your score.' }].map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-6 bg-brand-card border border-brand-border rounded-lg">
              <b.icon size={24} className="text-brand-gold mb-3" />
              <h3 className="text-white font-bold mb-2">{b.title}</h3>
              <p className="text-sm text-brand-muted">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto bg-brand-card border border-brand-border rounded-lg p-8">
          <h2 className="text-2xl font-display font-bold text-white mb-1">Credit Application</h2>
          <p className="text-sm text-brand-muted mb-8">Fill out the form below and our finance team will contact you within 24 hours.</p>
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-green-500" /></div>
              <h3 className="text-xl font-display text-white font-bold">Application Received!</h3>
              <p className="text-brand-muted mt-2">Our finance team will review your application and contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">First Name *</label><input type="text" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Last Name *</label><input type="text" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Phone *</label><input type="tel" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Email *</label><input type="email" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
              </div>
              <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Employment Status</label><select className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50"><option>Employed Full-Time</option><option>Employed Part-Time</option><option>Self-Employed</option><option>Retired</option><option>Student</option><option>Other</option></select></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Monthly Income</label><input type="text" placeholder="$" className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Desired Down Payment</label><input type="text" placeholder="$" className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
              </div>
              <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Vehicle of Interest</label><input type="text" placeholder="e.g. 2021 Toyota Highlander" className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold/50" /></div>
              <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Additional Notes</label><textarea rows={3} className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50 resize-none" /></div>
              <button type="submit" className="w-full py-4 bg-brand-gold text-brand-dark font-bold text-sm tracking-wider hover:bg-brand-gold-light transition-all rounded">SUBMIT APPLICATION</button>
              <p className="text-[11px] text-brand-muted text-center">By submitting, you authorize RT Auto Center to obtain your credit report for financing purposes.</p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
