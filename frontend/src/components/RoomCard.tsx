import React from 'react';
import { Users, Bed, Star } from 'lucide-react';

interface RoomCardProps {
  type: string;
  price: number;
  rating: number;
  occupancy: number;
  amenities: string[];
  color: 'emerald' | 'amber' | 'indigo';
  icon: React.ElementType;
  onBook: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ type, price, rating, occupancy, amenities, color, icon: Icon, onBook }) => {
  const colorMap = { 
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100', 
    amber: 'bg-amber-50 text-amber-600 border-amber-100', 
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100' 
  };
  const btnMap = { 
    emerald: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100', 
    amber: 'bg-amber-600 hover:bg-amber-700 shadow-amber-100', 
    indigo: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' 
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-white group">
      <div className="h-56 bg-slate-50 relative overflow-hidden">
        <div className={`absolute inset-0 opacity-10 ${color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'}`}></div>
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
          <Icon size={80} className={`opacity-20 ${colorMap[color].split(' ')[1]}`} />
        </div>
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center space-x-1 shadow-sm border border-white">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-slate-800">{rating}</span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded-md mb-2 inline-block ${colorMap[color]}`}>
              {type}
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{type} Suite</h3>
          </div>
          <p className="text-2xl font-black text-slate-900">₹{price.toLocaleString('en-IN')}<span className="text-slate-400 text-sm font-medium">/nt</span></p>
        </div>
        <div className="flex items-center space-x-4 text-slate-500 text-sm mb-6 font-medium">
          <div className="flex items-center space-x-1.5"><Users size={16} className="text-slate-400" /><span>{occupancy} Guests</span></div>
          <div className="flex items-center space-x-1.5"><Bed size={16} className="text-slate-400" /><span>Luxury Bed</span></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {amenities.map((item) => (
            <span key={item} className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] uppercase tracking-wider font-bold text-gray-400 border border-slate-100">{item}</span>
          ))}
        </div>
        <button onClick={onBook} className={`w-full py-4 text-white rounded-2xl font-black transition-all shadow-xl active:scale-95 ${btnMap[color]}`}>
          RESERVE NOW
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
