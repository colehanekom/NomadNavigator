import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, EditProfile, FriendsCard, Loading, PostCard, ProfileCard, TextInput, TopBar} from '../components';
import { NoProfile } from '../assets';
import { Link } from 'react-router-dom';
import {BsFiletypeGif, BsPersonFillAdd} from "react-icons/bs";
import {BiImages, BiSolidVideo} from "react-icons/bi";
import {useForm} from "react-hook-form";
import { apiRequest, deletePost, fetchPosts, getUserInfo, handleFileUpload, likePost, sendFriendRequest } from '../utils/index.js';
import { UserLogin } from '../redux/userSlice.js';
import Tooltip from '../components/Tooltip.jsx';
import BottomBar from '../components/BottomBar.jsx';

const Home = () => {
  const {user, edit} = useSelector((state) => state.user);
  const {posts} = useSelector((state) => state.posts);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const dispatch = useDispatch();

  const {register, handleSubmit, reset, formState: {errors},} = useForm();

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setErrMsg("");

    try {
      const uri = file && (await handleFileUpload(file));

      const newData = uri ? { ...data, image: uri} : data;

      const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      });

      if(res?.status === "failed"){
        setErrMsg(res);
      } else{
        reset({
          description: "",
        });
        setFile(null);
        setErrMsg("");
        await fetchPost();
      }
        setPosting(false);
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  };

  const fetchPost = async() => {
    await fetchPosts(user?.token, dispatch);
    setLoading(false);
  };

  const handleLikePost = async(uri) => {
    await likePost({uri:uri, token:user?.token});

    await fetchPost();
  };

  const handleDelete = async(id) => {
    await deletePost(id, user.token);
    await fetchPost();
  };

  const fetchFriendRequests = async() => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: user?.token,
        method: "POST",
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestedFriends = async() => {
   try {
      const res = await apiRequest({
        url: "/users/suggested",
        token: user?.token,
        method: "POST",
      });
      setSuggestedFriends(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendRequest = async(id) => {
    try {
      const res = await sendFriendRequest(user.token, id);
      await fetchSuggestedFriends();

       // Show pop-up message when the friend request is sent
       setAlertMessage('Friend request sent!');
       setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequests = async(id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data:{rid: id, status},
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async() => {
    const res = await getUserInfo(user?.token);
    const newData = {token: user?.token, ...res};
    dispatch(UserLogin(newData));
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    fetchPost();
    fetchFriendRequests();
    fetchSuggestedFriends();
  }, []);

  return (
   <>
    <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-gradient-to-r from-[#1065A1] via-[#0693F9] to-[#6f9fb8] lg:rounded-lg h-screen overflow-hidden'>
        <TopBar/>
        <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
          
          {/* LEFT */}
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends}/>
          </div>

          {/* CENTER */}
          <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg bg-white '>
            <form onSubmit={handleSubmit(handlePostSubmit)} className='bg-white px-4 rounded-lg'>
              <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
                <img src={user?.profileUrl ?? NoProfile} alt="User Image" className='w-14 h-14 rounded-full object-cover'/>
                <TextInput 
                styles="w-full rounded-full py-5" 
                placeholder="Share your journey..." 
                name="description" 
                register={register("description", {
                  required: "Write something about the post",
                })} 
                error={errors.description ? errors.description.message : ""} 
                tooltipText="
                Elevate your post with location details, images, and travel costs. Describe cultural significance, list must-visit places, and rate transportation options for a comprehensive experience!" 
                />
              </div>
              {errMsg?.message && (
                <span 
                role='alert' 
                className={`text-sm  ${
                  errMsg?.status === "failed" 
                  ? "text-[#f64949fe]" 
                  : "text-[#2ba150fe]"
                } mt-0.5`} >
                  {errMsg?.message}
                </span>
              )}

              <div className='flex items-center justify-between py-4'>
                <label htmlFor="imgUpload" className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} className='hidden' id="imgUpload" data-max-size="5120" accept='.jpg, .png, .jpeg'/>
                  <BiImages/>
                  <span>Image</span>
                </label>

                <label htmlFor="videoUpload" className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} className='hidden' id="videoUpload" data-max-size="5120" accept='.mp4 .wav'/>
                  <BiSolidVideo/>
                  <span>Video</span>
                </label>

                <label htmlFor="gifUpload" className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} className='hidden' id="gifUpload" data-max-size="5120" accept='.gif'/>
                  <BsFiletypeGif/>
                  <span>GIF</span>
                </label>

                <div>
                {posting ? (
                  <Loading/>
                ) : (
                  <CustomButton
                  type="submit"
                  title="Post"
                  containerStyles="bg-blue-600 text-white py-1 px-6 rounded-full font-semibold text-sm"/>
                )}
                </div>
              </div>
            </form>

            {loading ? (
            <Loading/>
             ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                key={post?._id} 
                post={post}
                user={user}
                deletePost={handleDelete}
                likePost= {handleLikePost}/>
              ))
            ):(
                <div className="flex w-full h-full items-center justify-center ">
                <p className='text-lg text-ascent-2'>No Post Available</p>
                </div>
              )}
          </div>

          {/* RIGHT */}
          <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
            {/* Follower request */}
            <div className='w-full bg-white shadow-sm rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span>Follower Request</span>
                <span>{friendRequest?.length}</span>
              </div>

              <div className='w-full flex flex-col gap-4 pt-4'>
                {
                  friendRequest?.map(({ _id, requestFrom: from }) => (
                    <div key={_id} className='flex items-center justify-between'>
                      <Link to={"/profile/" + from._id} className='w-full flex gap-4 items-center cursor-pointer'>
                        <img src={from?.profileUrl ?? NoProfile} alt={from?.userName} className='w-10 h-10 object-cover rounded-full'/>
                        <div className='flex-1 '>
                          <p className='text-base font-medium text-ascent-1'>
                            {from?.userName}
                          </p>
                        </div>
                      </Link>

                      <div className='flex gap-1'>
                        <CustomButton
                        title="Accept"
                        onClick={() => acceptFriendRequests(_id, "Accepted")}
                        containerStyles="rounded-full bg-black px-1.5 py-1 text-xs text-white" />
                      
                      <CustomButton
                        title="Deny"
                        onClick={() => acceptFriendRequests(_id, "Denied")}
                        containerStyles="rounded-full bg-black px-1.5 py-1 text-xs text-white" />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Suggested */}
            <div className='w-full bg-white shadow-sm rounded-lg px-5 py-5'>
              <div className='flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span>Suggested for you</span>
              </div>
              <div className='w-full flex flex-col gap-4 pt-4'>
                {
                  suggestedFriends?.map((friend) => (
                    <div className='flex items-center justify-between' key={friend._id}>
                      <Link to={"/profile/" + friend?._id }  key={friend?._id} className='w-full flex gap-4 items-center cursor-pointer'>
                        <img src={friend?.profileUrl ?? NoProfile} alt={friend?.userName} className='w-10 h-10 object-cover rounded-full'/>
                        <div className='flex-1 '>
                          <p className='text-base font-medium text-ascent-1'>
                            {friend?.userName}
                          </p>
                        </div>
                      </Link>

                      <div className='flex gap-1'>
                        <button className='bg-white text-sm text-white p-1 rounded'
                         onClick={() => handleFriendRequest(friend?._id)}>
                            <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        
        {/* BOTTOM BAR (Visible on Mobile) */}
        <BottomBar user={user} />
    </div>

  {/* Centered Pop-up for Friend Request */}
  {showAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg rounded-md">
          <p className="text-sm text-[#080808fe] mt-0.5">{alertMessage}</p>
          <button
            onClick={() => setShowAlert(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Close
          </button>
        </div>
      )}

    {edit && <EditProfile /> }
   </>
    
  );
};

export default Home;