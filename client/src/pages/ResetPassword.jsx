import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { TextInput } from '../components';

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, handleSubmit, formState: {errors},
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async(data) => {

  }

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center p-6'>
      <div className='bg-white w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg'>
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
</form>
      </div>
    </div>
  )
}

export default ResetPassword