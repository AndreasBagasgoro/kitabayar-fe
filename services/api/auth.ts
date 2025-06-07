// services/api/auth.ts
import api from './client';

interface User {
  id: string;
  email: string;
  name: string;
  gender: string;
}

interface LoginResponse {
  token: string;
  message: string;
  id?: string;
  email?: string;
  name?: string;
  gender?: string;
}

interface RegisterResponse {
  token: string;
  message: string;
  id?: string;
  email?: string;
  name?: string;
  gender?: string;
}

export const register = async (data: {
  email: string;
  password: string;
  name: string;
  gender: 'male' | 'female' | 'other';
}): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    console.log('Register response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Register error:', error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    console.log('Login response:', response.data);
    
    if (!response.data.token) {
      throw new Error('No token received from server');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const validateToken = async (token: string): Promise<User> => {
  try {
    const response = await api.post<User>('/auth/validate', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Token validation error:', error);
    throw new Error('Invalid token');
  }
};

export const logout = async (token: string): Promise<void> => {
  try {
    await api.post('/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error('Logout failed');
  }
};
