import React, { useState } from 'react';
import { Compass, Mail, Lock, User, ArrowRight } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import { authService } from '../services/authService';

interface SignUpProps {
  onSwitch: () => void;
  onBack: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitch, onBack }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18);
  const [role, setRole] = useState<'USER' | 'OWNER'>('USER');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      await authService.register({ username, email, password, age, role });
      alert('Registration successful! Please sign in.');
      onSwitch();
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert(error.message || 'Registration failed.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <HeroBackground />
      <button onClick={onBack} className="absolute top-10 left-10 flex items-center space-x-2 text-slate-600 font-bold hover:text-red-600 transition-colors">
        <Compass size={20} />
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Join the Rebels</h1>
          <p className="text-slate-500 font-medium mt-2">Start your journey with us today</p>
          
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mt-8 max-w-[240px] mx-auto">
            <button onClick={() => setRole('USER')} className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${role === 'USER' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>USER</button>
            <button onClick={() => setRole('OWNER')} className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${role === 'OWNER' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400'}`}>OWNER</button>
          </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="rebel_soul" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" placeholder="rebel@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
            <input type="number" min="18" placeholder="21" required value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
          </div>
          <div className="md:col-span-2 mt-4">
            <button type="submit" disabled={isRegistering} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center space-x-2 active:scale-95 group uppercase tracking-widest">
              <span>{isRegistering ? 'Registering...' : 'Sign Up'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">Already have an account?</p>
          <button onClick={onSwitch} className="text-slate-900 font-black mt-2 hover:underline tracking-tight uppercase tracking-widest text-xs">Log In Instead</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
