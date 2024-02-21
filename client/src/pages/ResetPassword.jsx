import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { TextInput } from '../components';
import { Link } from 'react-router-dom';
import { apiRequest } from '../utils';

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const { 
    register, handleSubmit, formState: {errors},
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async(data) => {
    setIsSubmitting(true);

    try{
      const res = await apiRequest({
        url: "/users/request-passwordreset",
        data: data,
        method: "POST",
      });

      if(res?.status === "failed"){
        setErrMsg(res);
      } else {
        setErrMsg(res);
      }
      setIsSubmitting(false);
    }
      catch(error){
        console.log(error);
        setIsSubmitting(false);
      }
    };

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center p-6'>
      <div className='bg-white w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg'>
      {isSmallScreen && (
        <Link to='/signin' className="text-[#000000] text-sm mb-4 block">
          &lt; Back
        </Link>
      )}
<p className='text-ascent-1 text-lg font-semibold '>Email Address</p>
<span className='text-sm text-ascent-2'>Enter email address used when signing up</span>

<form onSubmit={handleSubmit(onSubmit)}
className='py-4 flex flex-col gap-5'
>
    <TextInput
        name="email" placeholder="Email"
        label="Email Address"
        type="email"
        register={register("email", {
          required: "Email Address is required",
        })}
        styles='w-full rounded-lg'
        labelStyle='ml-2'
        error={errors.email ? errors.email.message : ""}
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

        <button className='inline-flex bg-[#1065A1] justify-center items-center rounded-full px-8 py-3 text-sm font-medium text-white hover:scale-105'>
            <Link to='/'></Link> Send
        </button>
</form>
      </div>
    </div>
  )
}

export default ResetPassword