import React from "react";
import Logo from '../assets/icon-logo.png';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { Logout } from "../redux/userSlice";
import { fetchPosts } from "../utils";
import { IoMdNotificationsOutline, IoMdMap } from "react-icons/io"; 

const TopBar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async (data) => {
    await fetchPosts(user.token, dispatch, "", data);
  };

  return (
    <div className='w-full flex flex-col sm:flex-row items-center justify-between py-3 md:py-6 px-4 bg-white'>

      {/* Logo and text for larger screens */}
      <Link to='/home' className='flex gap-2 items-center'>
        <div className='sm:flex'>
          <img src={Logo} alt="Logo Image" className='w-[80px] lg:ml-8'/>
        </div>
        <span className='text-xl md:text-2xl text-[#065ad8] font-semibold hidden sm:block'>
          Nomad Navigator
        </span>
      </Link>

      {/* Search form */}
      <form
        className='flex items-center justify-center w-full sm:w-auto'
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder='Search...'
          styles='w-full sm:w-[14rem] lg:w-[28rem] rounded-full py-2 text-md' 
          register={register("search")}
        />
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#065ad8] text-white px-4 py-2 sm:mt-1 rounded-full text-sm'
        />
      </form>

      {/* Icons for notifications and map (hidden on smaller screens) */}
      <div className="hidden sm:flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <Link to='/notifications'>
          <IoMdNotificationsOutline/>
        </Link>
        <Link to='/map'>
          <IoMdMap />
        </Link>
      </div>

      {/* Sign Out button */}
      <div className="mt-4 sm:mt-0">
        <Link to='/signin' onClick={() => dispatch(Logout())} className="text-md text-white px-4 py-2 bg-[#065ad8] rounded-full">
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
