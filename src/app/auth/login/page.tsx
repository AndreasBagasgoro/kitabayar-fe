import LoginForm from '@/app/components/login_form/page';
import React from 'react';


const LoginPage: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto min-h-screen flex p-4 md:p-12">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 p-8">
          <div className="h-full rounded-2xl overflow-hidden shadow-sm">
            <img 
              src="/image/auth-bg.svg" 
              alt="Payment services" 
              className="w-full h-full object-cover rounded-2xl priority" 
            />
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-4 md:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;