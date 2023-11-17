import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextInput } from "../components/";
import Logo from '../assets/nomad-navigator-logo.png';
import googleLogo from '../assets/googlelogo.svg';

const Signin = () => {
  const { 
    register, handleSubmit, formState: {errors},
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async(data) => {

  }

  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

  return (
    <div className='w-full h-[100vh] bg-slate-50 flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-white rounded-xl overflow-hidden shadow-xl '>
        {/* LEFT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center'>
          <div className='relative w-full flex items-center justify-center'>
          <img src={Logo} alt="Logo Image" className='w-56 2xl:w-64 h-56 2xl:h-64 rounded-full object-cover'/>
          </div>
        </div>
       
        {/* RIGHT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>  
          <div className='w-full flex gap-2 items-center mb-6'>
            <span className='text-4xl text-[#1065A1] font-semibold'>Nomad Navigator</span>
          </div>
          <form className="py-8 flex flex-col gap-5" 
          onSubmit={handleSubmit(onSubmit)}>
            <TextInput
            name="email" placeholder="Enter your email"
            label="Email Address"
            type="email"
            register={register("email", {
              required: "Email Address is required",
            })}
            styles='w-full rounded-full'
            labelStyle='ml-2'
            error={errors.email ? errors.email.message : ""}
            />

            <TextInput
            name="password" placeholder="Enter your password"
            label="Password"
            type="password"
            register={register("password", {
              required: "Password is required",
            })}
            styles='w-full rounded-full'
            labelStyle='ml-2'
            error={errors.password ? errors.password.message : ""}
            />

            <Link to='/reset-password' className='text-sm text-right text-[#1065A1] font-semibold'>Forgot Password?</Link>

            {errMsg?.message && (
                <span className={`text-sm ${
                  errMsg?.status == "failed"
                  ? "text-red-600"
                  : "text-green-600"
                } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )
            }

             <button className='inline-flex justify-center rounded-full bg-[#1065A1] px-8 py-3 text-sm font-medium text-white outline-none hover:scale-105'>
              <Link to = '/home'> Sign In</Link>
            </button>

            <div className='mt-3 grid grid-cols-3 items-center text-black'>
            <hr className='border-black'/>
            <p className='text-center'>OR</p>
            <hr className='border-black'/>
           </div>

           <button className='inline-flex justify-center items-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black outline hover:scale-105'>
          <Link to='/google'>
            <div className="flex items-center">
              <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" /> 
              Sign up with Google
            </div>
          </Link>
        </button>
          </form>

          <div>
          <p className='text-ascent-2 text-sm text-center'>Don't have an account?
          <Link
            to='/signup'
            className='text-[#1065A1] font-semibold ml-2 cursor-pointer'>
              Sign Up
            </Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin