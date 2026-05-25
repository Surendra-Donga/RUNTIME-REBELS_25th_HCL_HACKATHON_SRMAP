import React, { useState } from 'react';
import { Compass, Mail, Lock, ArrowRight } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import { authService } from '../services/authService';

interface SignInProps {
  onSwitch: () => void;
  onBack: () => void;
  onLoginSuccess?: (data: any) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitch, onBack, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const loginData = await authService.login({ username, password });
      if (onLoginSuccess) {
        onLoginSuccess(loginData);
      } else {
        window.location.reload(); // Fallback if no callback provided
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      alert(error.message || 'Login failed. Please check your credentials.');
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

      <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium mt-2">Log in to your rebel account</p>
        </div>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="rebel_soul" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" 
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isLoggingIn}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center space-x-2 active:scale-95 group uppercase tracking-widest"
          >
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
