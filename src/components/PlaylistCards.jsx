import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/convertTime";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlaylist,
  getPlaylistById,
  getPlaylistByUser,
} from "../redux/thunks/playlist";
import toast from "react-hot-toast";

const PlaylistCards = ({ playlist }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?._id);

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleDeleteVideoFromPlaylist = async () => {
    const playlistId = playlist._id;
    await dispatch(deletePlaylist(playlistId));
    dispatch(getPlaylistByUser(userId));
    setIsDialogOpen((prev) => !prev);
    toast.success("Video is removed successfully");
  };
  return (
    <div className="w-full" key={playlist?._id}>
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img
            src={
              playlist?.videos?.length > 0
                ? playlist?.videos[0]?.thumbnail
                : "No Image"
            }
            alt={playlist?.name}
            className="h-full w-full"
            onClick={() => navigate(`/playlist/${playlist?._id}`)}
          />
          <IoEllipsisVertical
            className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 text-white text-lg sm:text-xl lg:text-2xl z-10 hover:cursor-pointer"
            onClick={toggleDialog}
          />
          {isDialogOpen && (
            <div className="absolute top-10 right-2 bg-white border border-gray-300 rounded shadow-lg p-2 z-20 ">
              <div className="flex items-center space-x-2 hover:cursor-pointer">
                <span className="text-black">Delete</span>
                <MdDeleteForever
                  className="text-2xl text-red-500 "
                  onClick={handleDeleteVideoFromPlaylist}
                />
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0">
            <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
              <div className="relative z-[1]">
                <p className="flex justify-between">
                  <span className="inline-block">Playlist</span>
                  <span className="inline-block">
                    {playlist?.videos?.length} videos
                  </span>
                </p>
                <p className="text-sm text-gray-200">
                  {playlist?.totalViews} Views ·  {timeAgo(playlist?.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 className="mb-1 font-semibold">{playlist?.name}</h6>
      <p className="flex text-sm text-gray-200">{playlist.description}</p>
    </div>
  );
};

export default PlaylistCards;
