import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextInput } from "../components/";
import Logo from '../assets/nomad-navigator-logo.png';
import { apiRequest } from '../utils';

const Signup = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  
  const { 
    register, handleSubmit, getValues, formState: {errors},
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async(data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/auth/signup",
        data: data,
        method: "POST",
      });
  
      if(res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace("/signin");
        }, 5000);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-slate-50 flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-white rounded-xl overflow-hidden shadow-xl '>
          <Link to="/signup"></Link>
        {/* LEFT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center'>
          <div className='relative w-full flex items-center justify-center'>
          <img src={Logo} alt="Logo Image" className='w-56 2xl:w-64 h-56 2xl:h-64 rounded-full object-cover'/>
          </div>
        </div>
       
        {/* RIGHT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>  
        <div className='w-full flex gap-2 items-center mb-6'>
            <span className='text-4xl text-[#1065A1] font-semibold text-center w-full'>Sign Up</span>
          </div>

          <form className="py-8 flex flex-col gap-5" 
          onSubmit={handleSubmit(onSubmit)}>
             <TextInput
            name="userName" placeholder="Username"
            label="Username"
            type="userName"
            register={register("userName", {
              required: "Username is required",
              maxLength: {
                value: 20,
                message: "Username cannot exceed 20 characters",
              },
            })}
            styles='w-full rounded-full'
            error={errors.userName ? errors.userName?.message : ""}
            />

             <TextInput
            name="email" placeholder="Email"
            label="Email Address"
            type="email"
            register={register("email", {
              required: "Email Address is required",
            })}
            styles='w-full rounded-full'
            error={errors.email ? errors.email.message : ""}
            />

            <TextInput
            name="password" placeholder="Password"
            label="Password"
            type="password"
            register={register("password", {
              required: "Password is required",
            })}
            styles='w-full rounded-full'
            error={errors.password ? errors.password.message : ""}
            />

            <TextInput
            name="confirmpassword" placeholder="Confirm Password"
            label="Confirm Password"
            type="password"
            styles='w-full rounded-full'
            register={register("cPassword", {
                validate: (value) => {
                    const { password } = getValues();

                    if (password != value) {
                        return "Passwords do not match";
                    }
                },
            })}
            error={errors.cPassword && errors.cPassword.type === "validate"
                ? errors.cPassword?.message : ""}
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
            } 

            <button className='inline-flex justify-center rounded-full bg-[#1065A1] px-8 py-3 text-sm font-medium text-white outline-none hover:scale-105'>
              <Link to = '/'> </Link>  Sign Up
            </button>
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