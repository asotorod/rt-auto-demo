import { Link } from 'react-router-dom';
import { Gauge, Fuel, Settings2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VehicleCard({ vehicle, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/inventory/${vehicle.id}`}
        className="group block bg-brand-card border border-brand-border rounded-lg overflow-hidden
                   hover:border-brand-gold/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,168,76,0.08)]"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <img
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {vehicle.featured && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-brand-gold text-brand-dark text-[10px] 
                          font-bold tracking-widest uppercase rounded">
              Featured
            </div>
          )}
          
          <div className="absolute bottom-3 right-3 px-3 py-1.5 glass rounded text-white text-sm font-bold">
            ${vehicle.price.toLocaleString()}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-bold text-base group-hover:text-brand-gold transition-colors">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-brand-muted text-xs mt-0.5 tracking-wide">{vehicle.trim}</p>

          <div className="mt-3 pt-3 border-t border-brand-border grid grid-cols-3 gap-2">
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Gauge size={13} className="text-brand-gold/70" />
              <span>{vehicle.mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Settings2 size={13} className="text-brand-gold/70" />
              <span>{vehicle.drivetrain}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Fuel size={13} className="text-brand-gold/70" />
              <span>{vehicle.fuelType}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
