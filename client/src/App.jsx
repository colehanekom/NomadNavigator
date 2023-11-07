import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Landing from './components/Landing'
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {

  return (
      <div>
       
        <Routes>
          <Route index element={<Landing/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
        
      </div>
  )
}

export default App