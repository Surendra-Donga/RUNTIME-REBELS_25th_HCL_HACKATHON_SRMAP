import { useState } from 'react'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import OwnerDashboard from './pages/OwnerDashboard'
import VerificationMenu from './components/VerificationMenu'
import './index.css'

import AdminDashboard from './pages/AdminDashboard'

function App() {
  const [view, setView] = useState<'home' | 'signin' | 'signup' | 'owner' | 'admin'>('signin');

  return (
    <div className="relative min-h-screen">
      {view === 'signin' && (
        <SignIn 
          onSwitch={() => setView('signup')} 
          onBack={() => setView('home')} 
          onOwnerLogin={() => setView('owner')} 
          setView={setView} 
        />
      )}
      {view === 'signup' && <SignUp onSwitch={() => setView('signin')} onBack={() => setView('home')} />}
      {view === 'owner' && <OwnerDashboard onLogout={() => setView('home')} />}
      {view === 'admin' && <AdminDashboard onLogout={() => setView('home')} />}
      {view === 'home' && <Home onAuthClick={() => setView('signin')} />}

      <VerificationMenu currentView={view} setView={setView} />
    </div>
  );
}

export default App
