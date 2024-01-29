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
    <div className='w-full flex items-center justify-between py-3 md:py-6 px-4 bg-white'>
      {/* Link to home page */}
      <Link to='/home' className='flex gap-2 items-center'>
        <div className='sm:flex'>
          <img src={Logo} alt="Logo Image" className='w-[80px] lg:ml-8'/>
        </div>
        <span className='text-xl md:text-2xl text-[#065ad8] font-semibold'>
          Nomad Navigator
        </span>
      </Link>

      {/* Search form */}
      <form
        className='hidden md:flex items-center justify-center'
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder='Search...'
          styles='w-[18rem] lg:w-[38rem]  rounded-l-full py-3 '
          register={register("search")}
        />
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#065ad8] text-white px-6 py-2.5 mt-2 rounded-r-full'
        />
      </form>

      {/*  icon for notifications */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <Link to='/notifications'>
          <IoMdNotificationsOutline/>
        </Link>
      </div>

      {/* icon for map */}
      <div className="hidden sm:flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <Link to='/map'>
          <IoMdMap />
        </Link>
      </div>

      {/* Sign Out button */}
      <div>
        <Link to='/signin' onClick={() => dispatch(Logout())} className="text-sm  text-white px-4 md:px-6 py-1 md:py-2 bg-[#065ad8] rounded-full">Sign Out</Link>
      </div>
    </div>
  );
};

export default TopBar;
