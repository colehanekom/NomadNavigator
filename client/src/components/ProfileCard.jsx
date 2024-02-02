import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LiaEditSolid } from 'react-icons/lia';
import { BsPersonFillAdd } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { NoProfile } from '../assets';
import { UpdateProfile } from '../redux/userSlice';

const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='w-full bg-white flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
          <Link to={'/profile/' + user?._id} className='flex gap-2'>
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className='w-14 h-14 object-cover rounded-full'
            />
            <div className='flex flex-col justify-center'>
              <p className='text-lg font-medium text-ascent-1'>{user?.userName}</p>
              <span
                className='text-ascent-2'
                style={{ wordWrap: 'break-word', maxWidth: '200px' }}
              >
                {user?.bio ?? 'No Bio'}
              </span>
            </div>
          </Link>

          <div className=''>
            {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className='text-blue-900 cursor-pointer'
                onClick={() => dispatch(UpdateProfile(true))}
              />
            ) : (
              <button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                onClick={() => {}}
              >
                <BsPersonFillAdd size={20} className='text-blue-950' />
              </button>
            )}
          </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <div className='flex gap-2 items-center text-ascent-2'>
            <CiLocationOn className='text-xl text-ascent-1' />
            <span>{user?.location ?? 'Add Location'}</span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <p className='text-xl text-ascent-1 font-semibold'>{user?.friends?.length} Followers</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
