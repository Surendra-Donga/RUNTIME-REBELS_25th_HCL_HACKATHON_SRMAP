import { useState, useEffect } from 'react'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import OwnerDashboard from './pages/OwnerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import { authService } from './services/authService'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [userRole, setUserRole] = useState(authService.getRole());
  const [view, setView] = useState<'home' | 'signin' | 'signup' | 'owner' | 'admin'>('home');

  // Sync state on mount and login
  useEffect(() => {
    const authStatus = authService.isAuthenticated();
    setIsAuthenticated(authStatus);
    const role = authService.getRole();
    setUserRole(role);

    if (!authStatus) {
      setView('signin');
    } else {
      if (role === 'ADMIN') setView('admin');
      else if (role === 'OWNER') setView('owner');
      else setView('home');
    }
  }, []);

  const handleLoginSuccess = (loginData: any) => {
    setIsAuthenticated(true);
    setUserRole(loginData.role);
    
    if (loginData.role === 'ADMIN') setView('admin');
    else if (loginData.role === 'OWNER') setView('owner');
    else setView('home');
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserRole(null);
    setView('signin');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* AUTHENTICATION PAGES */}
      {!isAuthenticated && view === 'signin' && (
        <SignIn 
          onSwitch={() => setView('signup')} 
          onBack={() => setView('home')} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {!isAuthenticated && view === 'signup' && (
        <SignUp onSwitch={() => setView('signin')} onBack={() => setView('home')} />
      )}

      {/* SECURED DASHBOARDS */}
      {isAuthenticated && userRole === 'ADMIN' && <AdminDashboard onLogout={handleLogout} />}
      {isAuthenticated && userRole === 'OWNER' && <OwnerDashboard onLogout={handleLogout} />}
      
      {/* PUBLIC/USER HOME */}
      {(view === 'home' || (isAuthenticated && userRole === 'USER')) && (
        <Home onAuthClick={() => setView('signin')} />
      )}
    </div>
  );
}

export default App
