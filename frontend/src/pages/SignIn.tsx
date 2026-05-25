import React, { useState } from 'react';
import { Compass, Mail, Lock, ArrowRight } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';

interface SignInProps {
  onSwitch: () => void;
  onBack: () => void;
  onOwnerLogin: () => void;
}

import { authService } from '../services/authService';

const SignIn: React.FC<SignInProps & { setView: (v: any) => void }> = ({ onSwitch, onBack, setView }) => {
  const [loginMode, setLoginMode] = useState<'user' | 'owner' | 'admin'>('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await authService.login({ username, password });
      if (loginMode === 'owner') setView('owner');
      else if (loginMode === 'admin') setView('admin');
      else onBack(); // Redirect to home on success
    } catch (error: any) {
      console.error('Login failed:', error);
      alert(error.message || 'Login failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <HeroBackground />
      <button onClick={onBack} className="absolute top-10 left-10 flex items-center space-x-2 text-slate-600 font-bold hover:text-red-600 transition-colors">
        <Compass size={20} />
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white relative">
        <div className="absolute top-8 right-8 flex space-x-3">
          <button 
            onClick={() => setLoginMode('owner')} 
            className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${loginMode === 'owner' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            Owner
          </button>
          <button 
            onClick={() => setLoginMode('admin')} 
            className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${loginMode === 'admin' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            Admin
          </button>
        </div>

        <div className="text-center mb-10">
          <div className={`${loginMode === 'admin' ? 'bg-emerald-600' : 'bg-red-600'} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-colors`}>
            <Compass className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {loginMode === 'user' ? 'Welcome Back' : loginMode === 'owner' ? 'Owner Portal' : 'Admin Panel'}
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            {loginMode === 'user' ? 'Log in to your rebel account' : loginMode === 'owner' ? 'Manage your properties' : 'System oversight'}
          </p>
          
          {loginMode !== 'user' && (
            <button onClick={() => setLoginMode('user')} className="mt-4 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">
              Back to User Login
            </button>
          )}
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="rebel_soul" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
            </div>
          </div>
          <button disabled={isLoggingIn} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center justify-center space-x-2 active:scale-95 group uppercase tracking-widest">
            <span>{isLoggingIn ? 'Logging in...' : 'Sign In'}</span>
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
