import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Hotel, MapPin, ListPlus } from 'lucide-react';
import { hotelService } from '../services/hotelService';

interface AddHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddHotelModal: React.FC<AddHotelModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [hotelName, setHotelName] = useState('');
  const [location, setLocation] = useState('');
  const [amenities, setAmenities] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await hotelService.addHotel({
        hotelName,
        location,
        amenities,
        approved: false // Requires admin verification
      });
      alert('Hotel registration submitted! Waiting for Admin approval.');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to add hotel:', error);
      alert('Failed to register hotel.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
        
        <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Register Hotel</h2>
        <p className="text-slate-500 font-medium mb-8">Submit your property for administrative verification.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hotel Name</label>
            <div className="relative">
              <Hotel className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Grand Rebel Resort"
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none" 
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Bali, Indonesia"
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amenities (Comma separated)</label>
            <div className="relative">
              <ListPlus className="absolute left-4 top-5 text-slate-400" size={18} />
              <textarea 
                placeholder="WiFi, Infinity Pool, Spa, Gym"
                required
                rows={3}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none resize-none" 
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-100 hover:bg-red-700 transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'SUBMITTING...' : 'REGISTER PROPERTY'}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddHotelModal;
