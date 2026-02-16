import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-brand-darker">
      <div className="bg-brand-dark border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Contact Us</h1>
            <p className="mt-3 text-brand-muted">Visit our showroom or reach out \u2014 we're here to help.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[{ icon: MapPin, title: 'Address', lines: ['469-473 Raymond Blvd', 'Newark, NJ 07105'] }, { icon: Phone, title: 'Phone', lines: ['(973) 856-6355'], link: 'tel:9738566355' }, { icon: Mail, title: 'Email', lines: ['rtautollc@gmail.com'], link: 'mailto:rtautollc@gmail.com' }, { icon: Clock, title: 'Hours', lines: ['Mon\u2013Sat: 9AM\u20137PM', 'Sunday: Closed'] }].map(item => (
                <div key={item.title} className="p-5 bg-brand-card border border-brand-border rounded-lg">
                  <item.icon size={18} className="text-brand-gold mb-2" />
                  <h4 className="text-xs text-brand-muted tracking-wider uppercase mb-1">{item.title}</h4>
                  {item.lines.map((line, i) => (
                    item.link ? (<a key={i} href={item.link} className="block text-sm text-white hover:text-brand-gold transition-colors">{line}</a>) : (<p key={i} className="text-sm text-white">{line}</p>)
                  ))}
                </div>
              ))}
            </div>
            <div className="rounded-lg overflow-hidden border border-brand-border aspect-[16/10]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.1!2d-74.1725!3d40.7356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25153e17c07b5%3A0x9d5f6cc0e00b2e8a!2s469-473%20Raymond%20Blvd%2C%20Newark%2C%20NJ%2007105!5e0!3m2!1sen!2sus!4v1" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="RT Auto Center Location" />
            </div>
            <a href="https://maps.google.com/?q=469-473+Raymond+Blvd+Newark+NJ+07105" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm text-brand-gold hover:text-brand-gold-light transition-colors"><Navigation size={14} /> Get Directions</a>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card border border-brand-border rounded-lg p-8 h-fit">
            <h2 className="text-2xl font-display font-bold text-white mb-1">Send a Message</h2>
            <p className="text-sm text-brand-muted mb-6">We typically respond within a few hours during business hours.</p>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={28} className="text-green-500" /></div>
                <h3 className="text-lg font-display text-white font-bold">Message Sent!</h3>
                <p className="text-brand-muted text-sm mt-2">Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">First Name *</label><input type="text" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
                  <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Last Name *</label><input type="text" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
                </div>
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Phone *</label><input type="tel" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Email *</label><input type="email" required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50" /></div>
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Subject</label><select className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50"><option>General Inquiry</option><option>Vehicle Inquiry</option><option>Financing Question</option><option>Schedule Test Drive</option><option>Trade-In Appraisal</option><option>Service / Repair</option></select></div>
                <div><label className="block text-xs text-brand-muted mb-1.5 tracking-wider uppercase">Message *</label><textarea rows={4} required className="w-full px-4 py-3 bg-white/5 border border-brand-border rounded text-sm text-white focus:outline-none focus:border-brand-gold/50 resize-none" /></div>
                <button type="submit" className="w-full py-4 bg-brand-gold text-brand-dark font-bold text-sm tracking-wider hover:bg-brand-gold-light transition-all rounded">SEND MESSAGE</button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
