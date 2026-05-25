import { apiFetch } from './api';

export const authService = {
  register: async (userData: any) => {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: any) => {
    const token = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (token) {
      localStorage.setItem('token', token);
      // We might want to decode the token to get user info or role
    }
    return token;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
