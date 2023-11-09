import { useState } from 'react'
import {Outlet, Navigate, Routes, Route, useLocation} from 'react-router-dom';
import { Landing, Signin, Signup, Home, Profile, ResetPassword } from './pages';

function Layout(){
  const user = null;
  const location = useLocation()

  return user?.token ? (
    <Outlet/>
  ): (
    <Navigate to="/signin" state={{ from: location}} replace />
  );
}

function App() {
  return (
      <div>
       
        <Routes>
          <Route index element={<Landing/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>

          <Route element={<Layout/>}>
          <Route path='/' element={<Home/>}/> 
          <Route path='/profile/:id?' element={<Profile/>} />
          </Route>
      
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/> 
        </Routes>
        
      </div>
  )
}

export default App