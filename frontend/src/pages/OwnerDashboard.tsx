import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Settings, Wrench, CheckCircle2, XCircle, 
  IndianRupee, Bed, Users, Star, Edit3, 
  BarChart3, LayoutDashboard, LogOut
} from 'lucide-react';

interface OwnerDashboardProps {
  onLogout: () => void;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onLogout }) => {
  const [rooms, setRooms] = useState([
    { id: 1, type: 'Nature Suite', price: 15000, status: 'Available', occupancy: 2, rating: 4.9 },
    { id: 2, type: 'Coastal Suite', price: 28000, status: 'Booked', occupancy: 2, rating: 4.8 },
    { id: 3, type: 'Elite Suite', price: 65000, status: 'Under Renovation', occupancy: 4, rating: 5.0 },
  ]);

  const toggleStatus = (id: number, newStatus: string) => {
    setRooms(rooms.map(room => room.id === id ? { ...room, status: newStatus } : room));
  };

  const updatePrice = (id: number, newPrice: number) => {
    setRooms(rooms.map(room => room.id === id ? { ...room, price: newPrice } : room));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 fixed inset-y-0 z-[150]">
        <div className="flex items-center space-x-3 mb-12">
          <div className="bg-red-600 p-2 rounded-xl"><LayoutDashboard className="text-white" size={24} /></div>
          <span className="font-black tracking-tighter text-xl uppercase">Owner<span className="text-red-500">Hub</span></span>
        </div>
        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-xl text-white font-bold transition-all"><Bed size={20} /><span>Manage Rooms</span></button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl font-bold transition-all"><BarChart3 size={20} /><span>Analytics</span></button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl font-bold transition-all"><Settings size={20} /><span>Settings</span></button>
        </nav>
        <button onClick={onLogout} className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors font-bold mt-auto border-t border-slate-800 pt-6"><LogOut size={20} /><span>Exit Dashboard</span></button>
      </aside>

      <main className="flex-1 ml-64 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">Room Management</h1>
            <p className="text-slate-500 font-bold">Control availability and pricing in real-time</p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center space-x-2"><Plus size={20} /><span>ADD NEW ROOM</span></button>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {rooms.map((room) => (
            <motion.div key={room.id} layout className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex items-center space-x-8">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors"><Bed size={32} /></div>
                <div><h3 className="text-2xl font-black text-slate-900 tracking-tight">{room.type}</h3><div className="flex items-center space-x-4 mt-1"><span className="flex items-center text-slate-400 text-sm font-bold"><Users size={14} className="mr-1" /> {room.occupancy} Guests</span><span className="flex items-center text-amber-500 text-sm font-black"><Star size={14} className="mr-1 fill-amber-500" /> {room.rating}</span></div></div>
              </div>
              <div className="flex items-center space-x-3">
                {[
                  { label: 'Available', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
                  { label: 'Booked', icon: XCircle, color: 'text-indigo-500 bg-indigo-50' },
                  { label: 'Under Renovation', icon: Wrench, color: 'text-amber-500 bg-amber-50' }
                ].map((s) => (
                  <button key={s.label} onClick={() => toggleStatus(room.id, s.label)} className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all border ${room.status === s.label ? s.color + ' border-transparent shadow-sm scale-105' : 'bg-transparent text-slate-400 border-slate-100 hover:border-slate-300'}`}>
                    <s.icon size={14} /><span>{s.label.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-6 pl-8 border-l border-slate-100">
                <div className="text-right"><p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Base Rate</p><div className="flex items-center justify-end text-2xl font-black text-slate-900"><IndianRupee size={20} className="mr-0.5" /><span>{room.price.toLocaleString('en-IN')}</span></div></div>
                <button onClick={() => { const price = prompt('Enter new price in INR:', room.price.toString()); if (price) updatePrice(room.id, parseInt(price)); }} className="p-3 bg-slate-50 text-slate-400 hover:bg-red-600 hover:text-white rounded-xl transition-all"><Edit3 size={18} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
