import React, { useState } from 'react';
import InputField from '../input_field/page';
import Button from '../button/page';
import Logo from '../logo/page';
import Link from 'next/link';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt with:', { name, email, password, confirmPassword });
    // Add actual registration logic here
  };

 

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-sm p-5 md:p-8">
      <Logo className="mb-8" />
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#d9291a]">Daftar kITA BAYAR</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full space-y-1">
        <InputField
          label="Nama Lengkap"
          type="text"
          placeholder="Masukkan nama lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="contoh@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <InputField
          label="Password"
          type="password"
          placeholder="Minimal 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField
          label="Konfirmasi Password"
          type="password"
          placeholder="Masukkan password kembali"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-[#d9291a] hover:bg-[#ba2317] text-white"
        >
          Daftar
        </Button>
        
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="absolute px-3 bg-white text-gray-500 text-sm">atau</span>
        </div>
        

      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Sudah memiliki akun? 
          <Link href="/auth/login" className="text-[#d9291a] font-medium ml-1 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;