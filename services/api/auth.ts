// services/api/auth.ts
import api from './client';

export const register = async (data: {
  email: string;
  password: string;
  name: string;
  gender: 'male' | 'female' | 'other';
}) => {
  const response = await api.post('/auth/register', data); 
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password }); 
  return response.data;
};

export const validateToken = async (token: string) => {
  const response = await api.post('/auth/validate', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logout = async (token: string) => {
  const response = await api.post('/auth/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
