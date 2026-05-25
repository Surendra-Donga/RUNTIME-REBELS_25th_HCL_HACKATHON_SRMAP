import React, { useState } from 'react';
import { Compass, Mail, Lock, User, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroBackground from '../components/HeroBackground';

interface SignUpProps {
  onSwitch: () => void;
  onBack: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitch, onBack }) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');

  const handleOtpChange = (element: any, index: number) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) element.nextSibling.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <HeroBackground />
      <button onClick={onBack} className="absolute top-10 left-10 flex items-center space-x-2 text-slate-600 font-bold hover:text-red-600 transition-colors">
        <Compass size={20} />
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Join the Rebels</h1>
                <p className="text-slate-500 font-medium mt-2">Start your journey with us today</p>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="rebel_soul" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
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
                    <input type="password" placeholder="••••••••" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                  <input type="number" min="18" placeholder="21" required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-100 outline-none font-medium" />
                </div>
                <div className="md:col-span-2 mt-4">
                  <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center space-x-2 active:scale-95 group uppercase tracking-widest">
                    <span>Get OTP</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                <ShieldCheck className="text-emerald-600" size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Verify Email</h2>
              <p className="text-slate-500 font-medium mb-10 text-nowrap">We've sent a code to <br /><span className="text-slate-900 font-bold">{email}</span></p>
              <div className="flex justify-between gap-2 mb-10">
                {otp.map((data, index) => (
                  <input key={index} type="text" maxLength={1} className="w-12 h-16 bg-slate-50 border-none rounded-xl text-center text-2xl font-black text-slate-900 focus:ring-2 focus:ring-emerald-400 outline-none transition-all shadow-sm" value={data} onChange={e => handleOtpChange(e.target, index)} onFocus={e => e.target.select()} />
                ))}
              </div>
              <button onClick={onBack} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all mb-6 uppercase tracking-widest">Verify & Register</button>
              <button onClick={() => setStep(1)} className="flex items-center justify-center space-x-2 text-slate-400 hover:text-red-600 font-bold transition-colors mx-auto text-sm">
                <RefreshCw size={14} />
                <span>Resend Code</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">Already have an account?</p>
          <button onClick={onSwitch} className="text-slate-900 font-black mt-2 hover:underline tracking-tight uppercase tracking-widest text-xs">Log In Instead</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
