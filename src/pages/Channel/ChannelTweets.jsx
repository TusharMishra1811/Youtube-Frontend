import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../../redux/thunks/tweets";
import TweetAndComment from "../../components/TweetAndComment";
import TweetsList from "../../components/TweetsList";

const ChannelTweets = () => {
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.auth?.user?._id);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const tweets = useSelector((state) => state.tweets?.tweets);

  useEffect(() => {
    if (userId) {
      dispatch(getUserTweets(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      {authId === userId && <TweetAndComment tweet={true} />}

      {tweets?.map((tweet) => (
        <TweetsList
          key={tweet?._id}
          avatar={tweet?.ownerDetails?.avatar}
          content={tweet?.content}
          createdAt={tweet?.createdAt}
          likesCount={tweet?.likesCount}
          tweetId={tweet?._id}
          username={tweet?.ownerDetails?.username}
          isLiked={tweet?.isLiked}
        />
      ))}
    </>
  );
};

export default ChannelTweets;
