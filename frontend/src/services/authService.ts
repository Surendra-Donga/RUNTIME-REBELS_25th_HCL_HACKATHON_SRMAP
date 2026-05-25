import { apiFetch } from './api';

export const authService = {
  register: async (userData: any) => {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: any) => {
    const response = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // The backend returns { token, username, role } inside data
    const loginData = response.data;
    
    if (loginData && loginData.token) {
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('role', loginData.role);
      localStorage.setItem('username', loginData.username);
    }
    return loginData;
  },

  logout: () => {
    localStorage.clear(); // Wipe everything on logout
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getRole: () => {
    return localStorage.getItem('role');
  },

  getUsername: () => {
    return localStorage.getItem('username');
  }
};
