import React from 'react';
import { Compass, Calendar, Info, User, LogOut } from 'lucide-react';
import { authService } from '../services/authService';

interface SideNavbarProps {
  activeView?: string;
  setView: (view: string) => void;
  onProfileClick: () => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ activeView, setView, onProfileClick }) => {
  const isLoggedIn = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-20 md:w-24 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 flex flex-col items-center py-10 z-50 shadow-2xl">
      <div className="mb-12 cursor-pointer group" onClick={() => setView('home')}>
        <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-900/20 group-hover:scale-110 transition-transform">
          <Compass className="text-white" size={24} />
        </div>
      </div>
      <div className="flex-1 flex flex-col space-y-8">
        {[
          { id: 'bookings', icon: Calendar, color: 'hover:text-emerald-400 hover:bg-emerald-400/10' },
          { id: 'about', icon: Info, color: 'hover:text-amber-400 hover:bg-amber-400/10' }
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => setView(item.id)}
            className={`p-3 rounded-2xl transition-all group relative ${activeView === item.id ? 'text-white bg-slate-800' : 'text-slate-400 ' + item.color}`}
          >
            <item.icon size={24} />
            <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 uppercase tracking-widest font-bold">{item.id}</span>
          </button>
        ))}
      </div>
      
      {isLoggedIn && (
        <button onClick={handleLogout} className="p-3 mb-4 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all group relative">
          <LogOut size={24} />
          <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 uppercase tracking-widest font-bold">Logout</span>
        </button>
      )}

      <button onClick={onProfileClick} className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all group relative">
        <User size={24} />
        <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 uppercase tracking-widest font-bold">Account</span>
      </button>
    </nav>
  );
};

export default SideNavbar;
