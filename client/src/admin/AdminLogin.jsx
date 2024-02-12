import React, { useState } from 'react';
import Logo from '../assets/nomad-navigator-logo.png';
import AdminDashboard from './AdminDashboard';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    // For simplicity, username and password are 'admin' and 'password'
    if (username === 'admin' && password === 'password') {
      // If authentication is successful, set the authenticated state to true
      setAuthenticated(true);
    } else {
      // If authentication fails, display an error message
      setError('Invalid username or password');
    }
  };

  // If authenticated, render the AdminDashboard component
  if (authenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-r from-[#1065A1] via-[#0693F9] to-[#6f9fb8] flex items-center justify-center p-6'>
      <div className='w-full lg:w-1/2 flex items-center justify-center lg:h-5/6 h-screen bg-white rounded-xl shadow-xl'>
        <div className='text-center mt-10'>
          <img
            className='w-56 2xl:w-64 h-56 2xl:h-64 rounded-full object-cover mb-4 ml-6'
            src={Logo}
            alt='Logo'
          />
          <h2 className='text-2xl font-bold mb-4'>Welcome to Admin Portal</h2>
          <form className='space-y-4' onSubmit={handleSignIn}>
            <div>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-md'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='w-full px-4 py-2 border rounded-md'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                className='absolute top-2 right-2 text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <div>
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
