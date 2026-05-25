import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Plus } from 'lucide-react';
import { bookingService } from '../services/bookingService';

interface ExtensionModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ExtensionModal: React.FC<ExtensionModalProps> = ({ booking, isOpen, onClose, onSuccess }) => {
  const [newDate, setNewDate] = useState(booking?.check_Out_Date || '');
  const [isExtending, setIsExtending] = useState(false);

  if (!isOpen || !booking) return null;

  const handleExtend = async () => {
    setIsExtending(true);
    try {
      // Calculate additional price - simplified
      const additionalPrice = booking.room.pricePerNight * 2; 
      await bookingService.extendStay(booking.booking_Id, newDate, additionalPrice);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Extension failed:', error);
      alert('Failed to extend stay.');
    } finally {
      setIsExtending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
        
        <h2 className="text-3xl font-black text-slate-900 mb-2">Extend Stay</h2>
        <p className="text-slate-500 font-medium mb-8">Choose your new check-out date for {booking.room.roomType}</p>
        
        <div className="space-y-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Current Check-out</span>
            <span className="font-black text-slate-700">{booking.check_Out_Date}</span>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Check-out Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="date" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none" 
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleExtend} 
          disabled={isExtending}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center justify-center space-x-2 active:scale-95"
        >
          <Plus size={18} />
          <span>{isExtending ? 'EXTENDING...' : 'CONFIRM EXTENSION'}</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ExtensionModal;
