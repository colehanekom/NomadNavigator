import { useState } from 'react'
import {Outlet, Navigate, Routes, Route, useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import { Landing, Signin, Signup, Home, Profile, ResetPassword, EmailSignUp } from './pages';
import {AdminDashboard, AdminLogin, Announcements, ContentManagement, ReportedIssues, UserProfiles} from './admin';
 
function Layout(){
  const {user} = useSelector((state) => state.user);
  const location = useLocation();

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
          <Route path='/reset-password' element={<ResetPassword/>}/> 
          <Route path='/email-signup' element={<EmailSignUp/>}/> 
          <Route path='/home' element={<Home/>}/> 

          <Route path="/admin" element={<AdminLogin />} />   
          <Route path="/admin-dashboard" element={<AdminDashboard />} />   
          <Route path="/content-management" element={<ContentManagement />} />   
          <Route path="/user-profiles" element={<UserProfiles />} />
           <Route path="/reported-issues" element={<ReportedIssues />} /> 
          <Route path="/announcements" element={<Announcements />} /> 

          <Route element={<Layout/>}>
          <Route path='/profile/:id?' element={<Profile/>} />
          </Route>
        </Routes>
        
      </div>
  )
}

export default App