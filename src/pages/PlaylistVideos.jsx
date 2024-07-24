import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlaylistById, updatePlaylist } from "../redux/thunks/playlist";
import { timeAgo } from "../utils/convertTime";
import { getUserChannelProfile } from "../redux/thunks/user";
import PlaylistVideoCard from "../components/PlaylistVideoCard";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button, Input } from "../components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PlaylistVideos = () => {
  const { playlistId } = useParams();

  const dispatch = useDispatch();
  const [playlist] = useSelector((state) => state.playlist?.playlist);
  const user = useSelector((state) => state.auth?.user);
  const userProfile = useSelector((state) => state.user?.profileData);
  const [openUpdatePlaylist, setOpenUpdatePlaylist] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    dispatch(getPlaylistById(playlistId));
    dispatch(getUserChannelProfile(user.username));
  }, [dispatch]);

  useEffect(() => {
    if (playlist) {
      reset({
        name: playlist?.name,
        description: playlist?.description,
      });
    }
  }, [playlist, reset]);

  const updateAPlaylist = async (data) => {
    const playlistId = playlist?._id;
    const updatedData = data;
    await dispatch(updatePlaylist({ playlistId, updatedData }));
    dispatch(getPlaylistById(playlistId));
    toast.success("Playlist updated successfully");
    setOpenUpdatePlaylist((prev) => !prev);
  };

  window.scroll(0, 0);

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
          <div className="relative mb-2 w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={playlist?.videos[0]?.thumbnail}
                alt={playlist?.videos[0]?.title}
                className="h-full w-full"
              />
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
                      {playlist?.totalViews} Views · 
                      {timeAgo(playlist?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h6 className="mb-1 font-semibold  text-gray-200">
            {playlist?.name}
          </h6>
          <p className="flex text-sm text-gray-200">{playlist?.description}</p>
          <Button
            className="bg-purple-500 text-sm p-2 mt-2"
            onClick={() => setOpenUpdatePlaylist((prev) => !prev)}
          >
            Update Playlist
          </Button>
          {openUpdatePlaylist && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-transparent z-40 text-white">
              <div className="relative w-full max-w-sm border bg-black">
                <form
                  onSubmit={handleSubmit(updateAPlaylist)}
                  className="w-full space-y-5 p-4"
                >
                  <h2 className="text-2xl font-bold ">Update Playlist</h2>
                  <IoCloseCircleOutline
                    size={30}
                    className="absolute -top-2 right-4 cursor-pointer"
                    onClick={() => setOpenUpdatePlaylist((prev) => !prev)}
                  />
                  <Input
                    label="Name:"
                    placeholder="Enter Playlist Name"
                    {...register("name", {
                      required: "name is required",
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                  <Input
                    label="Description:"
                    placeholder="Enter Playlist Description"
                    {...register("description", {
                      required: "description is required",
                    })}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm">
                      {errors.description.message}
                    </span>
                  )}
                  <Button className="bg-purple-500 text-sm" type="submit">
                    Update Playlist
                  </Button>
                </form>
              </div>
            </div>
          )}
          <div className="mt-6 flex items-center gap-x-3">
            <div className="h-16 w-16 shrink-0">
              <img
                src={userProfile?.avatar}
                alt=""
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="w-full">
              <h6 className="font-semibold  text-gray-300">
                {userProfile?.username}
              </h6>
              <p className="text-sm text-gray-300">
                {userProfile?.subscribersCount} Subscribers
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-4">
          {playlist?.videos?.length > 0
            ? playlist?.videos?.map((video) => (
                <PlaylistVideoCard
                  videoId={video._id}
                  key={video._id}
                  thumbnail={video.thumbnail}
                  title={video?.title}
                  duration={video.duration}
                  views={video.views}
                  ownerUsername={video?.owner[0]?.username}
                  ownerAvatar={video?.owner[0]?.avatar}
                  createdAt={video?.createdAt}
                />
              ))
            : "No Videos in the playlist"}
        </div>
      </div>
    </section>
  );
};

export default PlaylistVideos;
