import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChannelHeader from "../components/Channel/ChannelHeader";
import ChannelNavigate from "../components/Channel/ChannelNavigate";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getUserChannelProfile } from "../redux/thunks/user";

const EditChannel = () => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.auth?.user?.username);
  const channel = useSelector((state) => state.user?.profileData);
  const loading = useSelector((state) => state.user?.loading);
  window.scrollTo(0, 0);

  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelProfile(channelId));
    }
  }, [channelId, dispatch]);

  return (
    <>
      {loading && (
        <div className="w-full fixed top-20 flex justify-center z-20">
          <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
            <Spinner />
            <span className="text-md font-bold text-white">Please Wait...</span>
          </div>
        </div>
      )}

      {!loading && channel && (
        <ChannelHeader
          username={channel?.username}
          coverImage={channel?.coverImage}
          avatar={channel?.avatar}
          subscribedCount={channel?.channelsSubscribedToCount}
          fullName={channel?.fullName}
          subscribersCount={channel?.subscribersCount}
          isSubscribed={channel?.isSubscribed}
          channelId={channel?._id}
          edit={true}
        />
      )}
      <ChannelNavigate edit={true} />
      <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
        <Outlet />
      </div>
    </>
  );
};

export default EditChannel;
