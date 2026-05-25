import React from 'react';

interface VerificationMenuProps {
  currentView: string;
  setView: (view: any) => void;
}

const VerificationMenu: React.FC<VerificationMenuProps> = ({ currentView, setView }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col space-y-2">
      <div className="bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-slate-700 shadow-2xl flex flex-col space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-1">Verify Pages</p>
        <div className="flex space-x-2">
          <button onClick={() => setView('signin')} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${currentView === 'signin' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>LOGIN</button>
          <button onClick={() => setView('signup')} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${currentView === 'signup' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>SIGNUP</button>
          <button onClick={() => setView('home')} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${currentView === 'home' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>HOME</button>
          <button onClick={() => setView('owner')} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${currentView === 'owner' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>OWNER</button>
          <button onClick={() => setView('admin')} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${currentView === 'admin' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>ADMIN</button>
        </div>
      </div>
    </div>
  );
};

export default VerificationMenu;
