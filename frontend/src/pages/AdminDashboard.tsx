import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, CheckCircle2, XCircle, 
  Hotel, Users, LogOut, ShieldCheck
} from 'lucide-react';
import { apiFetch } from '../services/api';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'users' | 'owners'>('hotels');
  const [pendingHotels, setPendingHotels] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [owners, setOwners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'hotels') {
        const data = await apiFetch('/admin/pending-hotels');
        setPendingHotels(data);
      } else if (activeTab === 'users') {
        const data = await apiFetch('/admin/users');
        setUsers(data);
      } else if (activeTab === 'owners') {
        const data = await apiFetch('/admin/owners');
        setOwners(data);
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

  const handleApprove = async (id: number) => {
    try {
      await apiFetch(`/admin/approve-hotel/${id}`, { method: 'POST' });
      fetchData();
    } catch (error) {
      console.error('Failed to approve hotel:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await apiFetch(`/admin/reject-hotel/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Failed to reject hotel:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiFetch(`/admin/user/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 fixed inset-y-0 z-[150]">
        <div className="flex items-center space-x-3 mb-12">
          <div className="bg-emerald-600 p-2 rounded-xl"><ShieldCheck className="text-white" size={24} /></div>
          <span className="font-black tracking-tighter text-xl uppercase">Admin<span className="text-emerald-500">Panel</span></span>
        </div>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('hotels')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'hotels' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Hotel size={20} /><span>Verify Hotels</span>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Users size={20} /><span>Manage Users</span>
          </button>
          <button 
            onClick={() => setActiveTab('owners')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'owners' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <ShieldCheck size={20} /><span>Manage Owners</span>
          </button>
        </nav>
        <button onClick={onLogout} className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors font-bold mt-auto border-t border-slate-800 pt-6"><LogOut size={20} /><span>Exit Panel</span></button>
      </aside>

      <main className="flex-1 ml-64 p-12">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">
            {activeTab === 'hotels' ? 'Hotel Verification' : activeTab === 'users' ? 'User Management' : 'Owner Management'}
          </h1>
          <p className="text-slate-500 font-bold">
            {activeTab === 'hotels' ? 'Approve or reject new hotel registrations' : activeTab === 'users' ? 'Manage registered customers' : 'Manage registered property owners'}
          </p>
        </header>

        {isLoading ? (
          <p className="text-center py-20 font-bold text-slate-400">Loading data...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {activeTab === 'hotels' && pendingHotels.map((hotel) => (
              <motion.div key={hotel.hotelId} layout className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600"><Hotel size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{hotel.hotelName}</h3>
                    <p className="text-slate-400 text-sm font-bold">{hotel.location}</p>
                    <p className="text-slate-500 text-xs mt-2 italic">Owner: {hotel.owner?.username || 'Unknown'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handleApprove(hotel.hotelId)} className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-black shadow-lg hover:bg-emerald-700 transition-all active:scale-95"><CheckCircle2 size={18} /><span>APPROVE</span></button>
                  <button onClick={() => handleReject(hotel.hotelId)} className="flex items-center space-x-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-black border border-red-100 hover:bg-red-100 transition-all active:scale-95"><XCircle size={18} /><span>REJECT</span></button>
                </div>
              </motion.div>
            ))}

            {(activeTab === 'users' || activeTab === 'owners') && (activeTab === 'users' ? users : owners).map((user) => (
              <motion.div key={user.userId} layout className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center space-x-8">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${activeTab === 'users' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}><Users size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{user.username}</h3>
                    <p className="text-slate-400 text-sm font-bold">{user.email}</p>
                    <p className="text-slate-500 text-xs mt-1 font-bold">Age: {user.age}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteUser(user.userId)} className="flex items-center space-x-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-black border border-red-100 hover:bg-red-600 hover:text-white transition-all active:scale-95">
                  <XCircle size={18} /><span>DELETE {activeTab === 'users' ? 'USER' : 'OWNER'}</span>
                </button>
              </motion.div>
            ))}

            {((activeTab === 'hotels' && pendingHotels.length === 0) || 
              (activeTab === 'users' && users.length === 0) || 
              (activeTab === 'owners' && owners.length === 0)) && (
              <div className="bg-white/40 backdrop-blur-lg border border-dashed border-slate-200 p-20 rounded-[3rem] text-center">
                <p className="text-slate-400 font-bold text-xl italic uppercase tracking-widest opacity-50">Nothing to manage here.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
