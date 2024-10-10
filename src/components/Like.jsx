import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  toggleCommentLikes,
  toggleTweetLikes,
  toggleVideoLikes,
} from "../redux/thunks/like";

const Like = ({
  isLiked,
  likesCount = 0,
  tweetId,
  commentId,
  videoId,
  size,
}) => {
  const dispatch = useDispatch();

  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  const handleLikeToggle = () => {
    if (localIsLiked) {
      setLocalLikesCount((prev) => prev - 1);
    } else {
      setLocalLikesCount((prev) => prev + 1);
    }
    setLocalIsLiked((prev) => !prev);

    if (tweetId) {
      dispatch(toggleTweetLikes(tweetId));
    }

    if (commentId) {
      dispatch(toggleCommentLikes(commentId));
    }

    if (videoId) {
      dispatch(toggleVideoLikes(videoId));
    }
  };

  useEffect(() => {
    setLocalIsLiked(isLiked);
    setLocalLikesCount(likesCount);
  }, [likesCount, isLiked]);

  return (
    <>
      <div className="flex items-center gap-1">
        <BiSolidLike
          size={size}
          onClick={handleLikeToggle}
          className={`cursor-pointer ${localIsLiked ? "text-purple-500" : ""}`}
        />
        <span>{localLikesCount}</span>
        
      </div>
    </>
  );
};

export default Like;
