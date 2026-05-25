import React, { useState } from 'react';
import { Compass, Mail, Lock, ArrowRight } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';

interface SignInProps {
  onSwitch: () => void;
  onBack: () => void;
  onOwnerLogin: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitch, onBack, onOwnerLogin }) => {
  const [loginMode, setLoginMode] = useState<'user' | 'owner'>('user');

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <HeroBackground />
      <button onClick={onBack} className="absolute top-10 left-10 flex items-center space-x-2 text-slate-600 font-bold hover:text-red-600 transition-colors">
        <Compass size={20} />
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white">
        <div className="text-center mb-10">
          <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-200">
            <Compass className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {loginMode === 'user' ? 'Welcome Back' : 'Owner Portal'}
          </h1>
          <p className="text-slate-500 font-medium mt-2 text-nowrap">
            {loginMode === 'user' ? 'Log in to your rebel account' : 'Manage your properties'}
          </p>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl mt-8">
            <button onClick={() => setLoginMode('user')} className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${loginMode === 'user' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>USER</button>
            <button onClick={() => setLoginMode('owner')} className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${loginMode === 'owner' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400'}`}>OWNER</button>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if (loginMode === 'owner') onOwnerLogin(); else onBack(); }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" placeholder="rebel@example.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
            </div>
          </div>
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center justify-center space-x-2 active:scale-95 group uppercase tracking-widest">
            <span>Sign In</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">Don't have an account?</p>
          <button onClick={onSwitch} className="text-red-600 font-black mt-2 hover:underline tracking-tight uppercase tracking-widest text-xs">Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
