import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, Loading } from '../components';
import { NoProfile } from '../assets';
import { Link } from 'react-router-dom';
import { BsPersonFillAdd } from 'react-icons/bs';
import { apiRequest, getUserInfo, sendFriendRequest } from '../utils/index.js';
import { UserLogin } from '../redux/userSlice.js';
import BottomBar from '../components/BottomBar.jsx';

const FriendsPage = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  const dispatch = useDispatch();

  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchFriendRequests = async () => {
    try {
      const res = await apiRequest({
        url: '/users/get-friend-request',
        token: user?.token,
        method: 'POST',
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestedFriends = async () => {
    try {
      const res = await apiRequest({
        url: '/users/suggested',
        token: user?.token,
        method: 'POST',
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
      
       // Show pop-up message when the friend request is sent
       setAlertMessage('Friend request sent!');
       setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequests = async (id, status) => {
    try {
      const res = await apiRequest({
        url: '/users/accept-request',
        token: user?.token,
        method: 'POST',
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
    getUser();
    fetchFriendRequests();
    fetchSuggestedFriends();
  }, []);

  return (
    <>
      <div className="w-full px-4 lg:px-10 pb-20 2xl:px-40 bg-gradient-to-r from-[#1065A1] via-[#0693F9] to-[#6f9fb8] lg:rounded-lg h-screen overflow-hidden">
        <div className="w-full flex flex-col gap-2 pt-5 pb-10 h-full">
          <div className="w-full h-full flex flex-col gap-8 overflow-y-auto">
            {/* Follower request */}
            <div className="w-full bg-white shadow-sm rounded-lg px-6 py-5">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                <span>Follower Request</span>
                <span>{friendRequest?.length}</span>
              </div>

              <div className="w-full flex flex-col gap-4 pt-4">
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className="flex items-center justify-between">
                    <Link to={`/profile/${from._id}`} className="w-full flex gap-4 items-center cursor-pointer">
                      <img src={from?.profileUrl ?? NoProfile} alt={from?.userName} className="w-10 h-10 object-cover rounded-full" />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">{from?.userName}</p>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <CustomButton
                        title="Accept"
                        onClick={() => acceptFriendRequests(_id, 'Accepted')}
                        containerStyles="rounded-full bg-black px-1.5 py-1 text-xs text-white"
                      />

                      <CustomButton
                        title="Deny"
                        onClick={() => acceptFriendRequests(_id, 'Denied')}
                        containerStyles="rounded-full bg-black px-1.5 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested */}
            <div className="w-full bg-white shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                <span>Suggested for you</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div className="flex items-center justify-between" key={friend._id}>
                    <Link to={`/profile/${friend?._id}`} className="w-full flex gap-4 items-center cursor-pointer">
                      <img src={friend?.profileUrl ?? NoProfile} alt={friend?.userName} className="w-10 h-10 object-cover rounded-full" />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">{friend?.userName}</p>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <button
                        className="bg-white text-sm text-white p-1 rounded"
                        onClick={() => handleFriendRequest(friend?._id)}
                      >
                        <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR (Visible on Mobile) */}
        <BottomBar user={user} />
      </div>

      
    {/* Centered Pop-up */}
    {showAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg rounded-md">
          <p>{alertMessage}</p>
          <button
            onClick={() => setShowAlert(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default FriendsPage;
