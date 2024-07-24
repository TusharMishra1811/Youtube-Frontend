import React, { useState } from "react";
import { timeAgo } from "../utils/convertTime";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  getPlaylistById,
  removeVideoFromPlaylist,
} from "../redux/thunks/playlist";
import toast from "react-hot-toast";
const PlaylistVideoCard = ({
  videoId,
  thumbnail,
  title,
  duration,
  views,
  ownerUsername,
  ownerAvatar,
  createdAt,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { playlistId } = useParams();

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleDeleteVideoFromPlaylist = async () => {
    await dispatch(removeVideoFromPlaylist({ playlistId, videoId }));
    dispatch(getPlaylistById(playlistId));
    setIsDialogOpen((prev) => !prev);
    toast.success("Video is removed successfully");
  };

  return (
    <>
      <div className="relative border">
        <IoEllipsisVertical
          className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 text-white text-lg sm:text-xl lg:text-2xl z-10 hover:cursor-pointer"
          onClick={toggleDialog}
        />
        {isDialogOpen && (
          <div className="absolute top-10 right-2 bg-white border border-gray-300 rounded shadow-lg p-2 z-20 ">
            <div className="flex items-center space-x-2 hover:cursor-pointer">
              <span>Remove</span>
              <MdDeleteForever
                className="text-2xl text-red-500 "
                onClick={handleDeleteVideoFromPlaylist}
              />
            </div>
          </div>
        )}
        <div className="w-full max-w-3xl gap-x-4 sm:flex">
          <div
            className="relative mb-2 w-full sm:mb-0 sm:w-5/12 hover:cursor-pointer"
            onClick={() => navigate(`/watch/${videoId}`)}
          >
            <div className="w-full pt-[56%]">
              <div className="absolute inset-0">
                <img src={thumbnail} alt={title} className="h-full w-full" />
              </div>
              <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm colo text-gray-200">
                {duration}
              </span>
            </div>
          </div>
          <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
            <div className="w-full">
              <h6
                className="mb-1 font-semibold sm:max-w-[75%] text-gray-200 hover:cursor-pointer"
                onClick={() => navigate(`/watch/${videoId}`)}
              >
                {title}
              </h6>

              <p
                className="flex text-sm text-gray-200 sm:mt-3 hover:cursor-pointer"
                onClick={() => navigate(`/watch/${videoId}`)}
              >
                {views} Views · {timeAgo(createdAt)}
              </p>
              <div
                className="flex items-center gap-x-4 hover:cursor-pointer"
                onClick={() => navigate(`/channel/${ownerUsername}`)}
              >
                <div className="mt-2 hidden h-10 w-10 shrink-0 sm:block">
                  <img
                    src={ownerAvatar}
                    alt={ownerUsername}
                    className="h-full w-full rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-200">{ownerUsername}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistVideoCard;
