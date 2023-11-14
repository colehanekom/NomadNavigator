import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {Loading, CustomButton, TextInput} from "../components/";
import Logo from '../assets/nomad-navigator-logo.png';

const Signup = () => {
  const { 
    register, handleSubmit, formState: {errors},
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async(data) => {

  }

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
            <span className='text-4xl font-semibold'>Sign Up</span>
          </div>
          <form className="py-8 flex flex-col gap-5" 
          onSubmit={handleSubmit(onSubmit)}>
            {/* <TextInput
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
            } */}

            {/* {
              isSubmitting ? ( <Loading/> ) : <CustomButton 
              type= 'submit'
              containerStyles={`inline-flex justify-center rounded-full bg-[#1065A1] px-8 py-3 text-sm font-medium text-white outline-none`}
              title='Continue With email' Navigate to="/"
              />
            } */}
             <Link
            to='/email-signup'
            className='text-[#1065A1] font-semibold ml-2 cursor-pointer'>
              Continue with email
            </Link>
          </form>

          <p className='text-ascent-2 text-sm text-center'>Already have an account?
          <Link
            to='/signin'
            className='text-[#1065A1] font-semibold ml-2 cursor-pointer'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup