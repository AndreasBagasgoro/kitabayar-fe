"use client";

import React, { useState } from 'react';
import InputField from '../input_field/page';
import Button from '../button/page';
import Logo from '../logo/page';
import Link from 'next/link';
import { login } from '../../../../services/api/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login with:', { email });
      const response = await login(email, password);
      console.log('Full login response:', response);

      // Check if response has token
      if (response.token) {
        console.log('Token received:', response.token);
        
        // Create user object from response data
        const userData = {
          id: response.id || '',
          email: response.email || email,
          name: response.name || email.split('@')[0],
          gender: response.gender || 'other'
        };
        
        console.log('User data to be saved:', userData);
        
        // Store token and user data
        authLogin(response.token, userData);
        
        // Force a small delay to ensure state is updated
        setTimeout(() => {
          console.log('Redirecting to dashboard...');
          router.push('/dashboard/menu');
        }, 100);
      } else {
        console.error('No token in response:', response);
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Login error details:', err);
      setError(err.message || 'Email atau password salah');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-sm p-5 md:p-8">
      <Logo className="mb-8" />
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#d9291a]">Selamat datang di kITA BAYAR</h1>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
      )}
      
      <form onSubmit={handleSubmit} className="w-full space-y-1">
        <InputField
          label="Email"
          type="email"
          placeholder="contoh@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        
        <InputField
          label="Password"
          type="password"
          placeholder="Minimal 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-[#d9291a] hover:bg-[#ba2317] text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Masuk'}
        </Button>
        
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="absolute px-3 bg-white text-gray-500 text-sm">atau</span>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Belum memiliki akun? 
          <Link href="/auth/register" className="text-[#d9291a] font-medium ml-1 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;