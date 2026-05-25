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
  const [view, setView] = useState<'auth' | 'home' | 'owner' | 'admin'>('home');
  const [authSubView, setAuthSubView] = useState<'signin' | 'signup'>('signin');

  const updateRouting = () => {
    const authStatus = authService.isAuthenticated();
    const role = authService.getRole();
    
    setIsAuthenticated(authStatus);
    setUserRole(role);

    if (!authStatus) {
      setView('auth');
    } else {
      if (role === 'ADMIN') setView('admin');
      else if (role === 'OWNER') setView('owner');
      else setView('home');
    }
  };

  // On mount, set correct view
  useEffect(() => {
    updateRouting();
  }, []);

  const handleLoginSuccess = (loginData: any) => {
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('role', loginData.role);
    localStorage.setItem('username', loginData.username);
    updateRouting();
  };

  const handleLogout = () => {
    authService.logout();
    updateRouting();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* AUTHENTICATION FLOW */}
      {view === 'auth' && (
        authSubView === 'signin' ? (
          <SignIn 
            onSwitch={() => setAuthSubView('signup')} 
            onBack={() => setView('home')} 
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <SignUp 
            onSwitch={() => setAuthSubView('signin')} 
            onBack={() => setView('home')} 
          />
        )
      )}

      {/* DASHBOARDS (Only if Authenticated) */}
      {isAuthenticated && view === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      {isAuthenticated && view === 'owner' && <OwnerDashboard onLogout={handleLogout} />}
      
      {/* USER HOME (Authenticated or Not) */}
      {view === 'home' && (
        <Home onAuthClick={() => { setView('auth'); setAuthSubView('signin'); }} />
      )}
    </div>
  );
}

export default App
