import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

function Landing() {
  return (
    <>
        <Navbar/>
        {/* <h1 className="flex justify-center items-center w-64 h-64">Landing</h1> */}
        <Hero/>
    </>
  )
}

export default Landing