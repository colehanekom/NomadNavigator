import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditProfile, FriendsCard, ProfileCard } from '../components';
import { NoProfile } from '../assets';
import { useForm } from 'react-hook-form';
import { apiRequest, deletePost, fetchPosts, getUserInfo, handleFileUpload, likePost, sendFriendRequest } from '../utils/index.js';
import { UserLogin } from '../redux/userSlice.js';
import BottomBar from '../components/BottomBar.jsx';

const ProfilePage = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setErrMsg("");

    try {
      const uri = file && (await handleFileUpload(file));
      const newData = uri ? { ...data, image: uri } : data;

      const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
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

  const fetchPost = async () => {
    await fetchPosts(user?.token, dispatch);
    setLoading(false);
  };

  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await fetchPost();
  };

  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await fetchPost();
  };

  const fetchFriendRequests = async () => {
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

  const fetchSuggestedFriends = async () => {
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

  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFriendRequest(user.token, id);
      await fetchSuggestedFriends();
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequests = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: { rid: id, status },
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const res = await getUserInfo(user?.token);
    const newData = { token: user?.token, ...res };
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
      <div className='w-full px-4 lg:px-10 pb-20 2xl:px-40 bg-gradient-to-r from-[#1065A1] via-[#0693F9] to-[#6f9fb8] lg:rounded-lg min-h-screen overflow-hidden'>
        <div className='w-full flex flex-col gap-2 lg:gap-4 pt-5 pb-10'>
          
          <div className='w-full lg:w-1/4 flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>
        </div>
         {/* BOTTOM BAR (Visible on Mobile) */}
         <BottomBar user={user} />
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default ProfilePage;
