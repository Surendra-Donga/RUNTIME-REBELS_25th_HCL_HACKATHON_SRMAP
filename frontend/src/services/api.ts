const BASE_URL = 'http://localhost:8080/api';
const AUTH_URL = 'http://localhost:8080/auth';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${endpoint.startsWith('/auth') ? 'http://localhost:8080' : BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }

  if (response.status === 204) return null;
  return response.json();
};
