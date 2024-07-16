import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getUserChannelProfile } from "../../redux/thunks/user";
import ChannelHeader from "../../components/Channel/ChannelHeader";
import ChannelNavigate from "../../components/Channel/ChannelNavigate";

const Channnel = () => {
  const dispatch = useDispatch();
  const { username } = useParams();

  const channel = useSelector((state) => state.user?.profileData);

  useEffect(() => {
    dispatch(getUserChannelProfile(username));
  }, [username, dispatch]);

  window.scrollTo(0, 0);

  return (
    <>
      {channel && (
        <ChannelHeader
          username={username}
          coverImage={channel?.coverImage}
          avatar={channel?.avatar}
          subscribedCount={channel?.channelsSubscribedToCount}
          fullName={channel?.fullName}
          subscribersCount={channel?.subscribersCount}
          isSubscribed={channel.isSubscribed}
          channelId={channel?._id}
        />
      )}
      <ChannelNavigate username={username} />
      <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
        <Outlet />
      </div>
    </>
  );
};

export default Channnel;
