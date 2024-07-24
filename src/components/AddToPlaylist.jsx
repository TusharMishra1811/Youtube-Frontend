import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addVideoToPlaylist,
  createPlaylist,
  getPlaylistByUser,
} from "../redux/thunks/playlist";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AddToPlaylist = () => {
  const { videoId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?._id);
  const playlists = useSelector((state) => state.playlist?.playlists);

  useEffect(() => {
    dispatch(getPlaylistByUser(userId));
  }, [dispatch]);

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const onSubmit = async (data) => {
    await dispatch(createPlaylist(data));
    dispatch(getPlaylistByUser(userId));
    toast.success("Playlist is created successfully");
  };

  const handleOnChange = async (event, playlistId) => {
    const { checked } = event.target;
    if (checked) {
      await dispatch(addVideoToPlaylist({playlistId, videoId}));
      toast.success("Video is added to the playlist");
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2 hover:cursor-pointer"
        onClick={toggleDialog}
      >
        <span>Save</span>
        <FaBookmark />
      </div>
      {isDialogOpen && (
        <div className="absolute top-10 right-2 bg-gray-900 border border-gray-300 rounded shadow-lg p-2 z-20 text-white w-52 ">
          <h1 className="font-bold text-center mb-2 mt-2">Save to Playlist</h1>
          <div className="flex flex-col space-y-2 ">
            {playlists?.map((playlist) => (
              <div key={playlist?._id} className="flex items-center space-x-2">
                <div>
                  <input
                    type="checkbox"
                    onChange={(event) => handleOnChange(event, playlist?._id)}
                  />{" "}
                  {playlist?.name}
                </div>
              </div>
            ))}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <Input
                label="Name"
                placeholder="Enter Playlist Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="mb-3"
              />

              <Button className="bg-purple-500 text-white ">
                Create New Playlist
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToPlaylist;
