import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const Login = ({setIsLogin}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { username, password });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 w-2xl'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 space-y-8'>
          {/* Header */}
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg'>
              <Lock className='text-white' size={32} />
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
            <p className='text-gray-500'>Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Username Field */}
            <div>
              <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>
                Username
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='text-gray-400' size={20} />
                </div>
                <input
                  id='username'
                  type='text'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter your username'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='text-gray-400' size={20} />
                </div>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center hover:text-indigo-600 transition-colors hover:cursor-pointer'
                  aria-label='Toggle password visibility'
                >
                  {showPassword ? (
                    <EyeOff className='text-gray-400' size={20} />
                  ) : (
                    <Eye className='text-gray-400' size={20} />
                  )}
                </button>
              </div>
            </div>

            
            {/* Submit Button */}
            <button
              type='submit'
              className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 hover:cursor-pointer'
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className='text-center pt-4 border-t border-gray-200'>
            <p className='text-gray-600'>
              Don't have an account?{' '}
              <button className='text-indigo-600 hover:text-indigo-700 font-semibold transition-colors hover:cursor-pointer'
                      onClick={() => setIsLogin(false)}>
                  Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;