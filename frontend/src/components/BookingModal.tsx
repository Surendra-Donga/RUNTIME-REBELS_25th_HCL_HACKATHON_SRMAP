import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  room: any;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ room, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
        
        {step === 1 ? (
          <>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Reserve {room.type} Suite</h2>
            <p className="text-slate-500 font-medium mb-8">Confirm your dates for {room.location}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Check In</label>
                <input type="date" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none" defaultValue="2024-06-01" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Check Out</label>
                <input type="date" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none" defaultValue="2024-06-05" />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl mb-8 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Price</p>
                <p className="text-3xl font-black text-slate-900">₹{(room.price * 4).toLocaleString('en-IN')}</p>
              </div>
              <p className="text-slate-500 font-bold">4 Nights</p>
            </div>

            <button onClick={() => setStep(2)} className={`w-full py-4 text-white rounded-2xl font-black shadow-xl transition-all active:scale-95 ${room.color === 'emerald' ? 'bg-emerald-600' : room.color === 'amber' ? 'bg-amber-600' : 'bg-indigo-600'}`}>
              CONFIRM BOOKING
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-emerald-600" size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Booking Success!</h2>
            <p className="text-slate-500 font-medium mb-8">Your stay at the {room.type} Suite is confirmed. Check your email for details.</p>
            <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all">
              GO TO MY BOOKINGS
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingModal;
