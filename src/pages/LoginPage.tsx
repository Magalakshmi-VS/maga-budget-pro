import React from 'react';
// Assuming LoginForm exists and can be imported
// import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl rounded-lg bg-white shadow-xl overflow-hidden md:flex">
        {/* Left Column: Promotional Content */}
        <div className="w-full md:w-1/2 bg-pink-100 p-8 flex flex-col justify-center items-center text-center">
          <div className="mb-8">
            {/* Logo Placeholder */}
            <div className="h-16 w-16 bg-pink-300 rounded-full mx-auto mb-4"></div>
            <h1 className="text-3xl font-bold text-pink-800">Maga Budget Pro</h1>
          </div>
          <div className="mb-8">
            {/* Promotional Text */}
            <h2 className="text-2xl font-semibold text-pink-700 mb-4">Achieve Financial Freedom</h2>
            <p className="text-pink-600">
              Take control of your finances with our intuitive budgeting tools.
              Track expenses, set goals, and watch your savings grow.
            </p>
          </div>
          {/* Abstract Graphics Placeholder */}
          <div className="w-full h-48 bg-pink-200 rounded-lg">
            {/* Placeholder for abstract graphics */}
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
            {/* Login Form Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Replace with actual LoginForm component */}
              <p className="text-gray-600 text-center">Login form goes here.</p>
              {/* <LoginForm /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;