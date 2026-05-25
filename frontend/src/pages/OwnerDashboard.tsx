import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Settings, CheckCircle2, XCircle, 
  IndianRupee, Bed, Users, Star, Edit3, 
  BarChart3, LayoutDashboard, LogOut, Hotel, MapPin
} from 'lucide-react';
import { roomService } from '../services/roomService';
import { hotelService } from '../services/hotelService';
import AddHotelModal from '../components/AddHotelModal';

interface OwnerDashboardProps {
  onLogout: () => void;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'properties'>('rooms');
  const [rooms, setRooms] = useState<any[]>([]);
  const [myHotels, setMyHotels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'rooms') {
        const data = await roomService.getAllRooms();
        setRooms(data);
      } else {
        const data = await hotelService.getMyHotels();
        setMyHotels(data);
      }
    } catch (error) {
      console.error(`Failed to fetch ${activeTab}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const toggleStatus = async (id: number, currentAvailability: boolean) => {
    try {
      await roomService.updateRoom(id, { availability: !currentAvailability });
      fetchData();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const updatePrice = async (id: number, newPrice: number) => {
    try {
      await roomService.updateRoom(id, { pricePerNight: newPrice });
      fetchData();
    } catch (error) {
      console.error('Failed to update price:', error);
    }
  };

  const addNewRoom = async () => {
    const roomType = prompt('Enter Room Type (e.g., Nature, Coastal, Elite):');
    const price = prompt('Enter Price per Night:');
    if (roomType && price) {
      try {
        await roomService.addRoom({ 
          roomType, 
          pricePerNight: parseInt(price), 
          availability: true,
          hotel: { hotelId: 1 } // Simplified for now
        });
        fetchData();
      } catch (error) {
        console.error('Failed to add room:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 fixed inset-y-0 z-[150]">
        <div className="flex items-center space-x-3 mb-12">
          <div className="bg-red-600 p-2 rounded-xl"><LayoutDashboard className="text-white" size={24} /></div>
          <span className="font-black tracking-tighter text-xl uppercase">Owner<span className="text-red-500">Hub</span></span>
        </div>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'rooms' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Bed size={20} /><span>Manage Rooms</span>
          </button>
          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'properties' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Hotel size={20} /><span>My Properties</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl font-bold transition-all"><BarChart3 size={20} /><span>Analytics</span></button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl font-bold transition-all"><Settings size={20} /><span>Settings</span></button>
        </nav>
        <button onClick={onLogout} className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors font-bold mt-auto border-t border-slate-800 pt-6"><LogOut size={20} /><span>Exit Dashboard</span></button>
      </aside>

      <main className="flex-1 ml-64 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">
              {activeTab === 'rooms' ? 'Room Management' : 'Property Portfolio'}
            </h1>
            <p className="text-slate-500 font-bold">
              {activeTab === 'rooms' ? 'Control availability and pricing in real-time' : 'Track verification and registration of your hotels'}
            </p>
          </div>
          {activeTab === 'rooms' ? (
            <button onClick={addNewRoom} className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center space-x-2"><Plus size={20} /><span>ADD NEW ROOM</span></button>
          ) : (
            <button onClick={() => setIsAddHotelOpen(true)} className="bg-red-600 text-white px-6 py-4 rounded-2xl font-black shadow-xl hover:bg-red-700 transition-all flex items-center space-x-2"><Plus size={20} /><span>REGISTER HOTEL</span></button>
          )}
        </header>

        {isLoading ? (
          <p className="text-center py-20 font-bold text-slate-400">Loading data...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {activeTab === 'rooms' && rooms.map((room) => (
              <motion.div key={room.roomId} layout className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors"><Bed size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{room.roomType} Suite</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center text-slate-400 text-sm font-bold"><Users size={14} className="mr-1" /> 2 Guests</span>
                      <span className="flex items-center text-amber-500 text-sm font-black"><Star size={14} className="mr-1 fill-amber-500" /> {room.hotel?.rating || 4.5}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {[
                    { label: 'Available', value: true, icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
                    { label: 'Booked', value: false, icon: XCircle, color: 'text-indigo-500 bg-indigo-50' }
                  ].map((s) => (
                    <button key={s.label} onClick={() => toggleStatus(room.roomId, room.availability)} className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all border ${room.availability === s.value ? s.color + ' border-transparent shadow-sm scale-105' : 'bg-transparent text-slate-400 border-slate-100 hover:border-slate-300'}`}>
                      <s.icon size={14} /><span>{s.label.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-6 pl-8 border-l border-slate-100">
                  <div className="text-right">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Base Rate</p>
                    <div className="flex items-center justify-end text-2xl font-black text-slate-900">
                      <IndianRupee size={20} className="mr-0.5" />
                      <span>{room.pricePerNight.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <button onClick={() => { const price = prompt('Enter new price in INR:', room.pricePerNight.toString()); if (price) updatePrice(room.roomId, parseInt(price)); }} className="p-3 bg-slate-50 text-slate-400 hover:bg-red-600 hover:text-white rounded-xl transition-all"><Edit3 size={18} /></button>
                </div>
              </motion.div>
            ))}

            {activeTab === 'properties' && myHotels.map((hotel) => (
              <motion.div key={hotel.hotelId} layout className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors"><Hotel size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{hotel.hotelName}</h3>
                    <p className="text-slate-400 text-sm font-bold flex items-center space-x-2"><MapPin size={14} /> <span>{hotel.location}</span></p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${hotel.approved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {hotel.approved ? 'Verified' : 'Pending Verification'}
                  </div>
                  <button className="p-3 bg-slate-50 text-slate-400 hover:bg-red-600 hover:text-white rounded-xl transition-all"><Settings size={18} /></button>
                </div>
              </motion.div>
            ))}

            {((activeTab === 'rooms' && rooms.length === 0) || 
              (activeTab === 'properties' && myHotels.length === 0)) && (
              <div className="bg-white/40 backdrop-blur-lg border border-dashed border-slate-200 p-20 rounded-[3rem] text-center">
                <p className="text-slate-400 font-bold text-xl italic uppercase tracking-widest opacity-50">No data found in this category.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <AddHotelModal isOpen={isAddHotelOpen} onClose={() => setIsAddHotelOpen(false)} onSuccess={fetchData} />
    </div>
  );
};

export default OwnerDashboard;
