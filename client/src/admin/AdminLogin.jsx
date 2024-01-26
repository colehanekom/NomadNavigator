import React from 'react';
import Logo from '../assets/nomad-navigator-logo.png';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  return (
    <div className='w-full h-[100vh] bg-gradient-to-r from-[#1065A1] via-[#0693F9] to-[#6f9fb8] flex items-center justify-center p-6'>
      <div className='w-full lg:w-1/2 flex items-center justify-center lg:h-5/6 h-screen bg-white rounded-xl shadow-xl'>
        <div className='text-center mt-10'>
          <img
            className='w-56 2xl:w-64 h-56 2xl:h-64 rounded-full object-cover mb-4 ml-6' 
            src={Logo}
            alt="Logo"
          />
          <h2 className='text-2xl font-bold mb-4'>Welcome to Admin Portal</h2>
          <form className='space-y-4'>
            <div>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-md'
                placeholder='Username'
              />
            </div>
            <div>
              <input
                type='password'
                className='w-full px-4 py-2 border rounded-md'
                placeholder='Password'
              />
            </div>
            <div>
            <Link to="/admin-dashboard">
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
              >
                Sign In
              </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
