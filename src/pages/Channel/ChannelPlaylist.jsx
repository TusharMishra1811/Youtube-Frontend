import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../../components";
import PlaylistCards from "../../components/PlaylistCards";
import { createPlaylist, getPlaylistByUser } from "../../redux/thunks/playlist";

const ChannelPlaylist = () => {
  
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlist?.playlists);
  const authId = useSelector((state) => state.auth?.user?._id);
  const userId = useSelector((state) => state.user?.profileData?._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [openCreatePlaylist, setOpenCreatePlaylist] = useState(false);


  useEffect(() => {
    if (userId) {
      dispatch(getPlaylistByUser(userId));
    }
  }, [dispatch, userId]);

  const createAPlaylist = async (data) => {
    await dispatch(createPlaylist(data));
    dispatch(getPlaylistByUser(userId));
    setOpenCreatePlaylist((prev) => !prev);
  };

 

  return (
    <>
      <div className="w-full relative text-white sm:px-5 px-0">
        {playlists?.length === 0 && (
          <div className="text-center h-[5rem] flex justify-center items-center">
            <h1>No Playlist Found</h1>
          </div>
        )}
        {authId === userId && (
          <div className="w-full flex justify-center mt-5">
            <Button
              className="bg-purple-500 text-sm p-2"
              onClick={() => setOpenCreatePlaylist((prev) => !prev)}
            >
              Create Playlist
            </Button>
          </div>
        )}
        {openCreatePlaylist && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-transparent z-40">
            <div className="relative w-full max-w-sm border bg-black">
              <form
                onSubmit={handleSubmit(createAPlaylist)}
                className="w-full space-y-5 p-4"
              >
                <h2 className="text-2xl font-bold ">Create Playlist</h2>
                <IoCloseCircleOutline
                  size={30}
                  className="absolute -top-2 right-4 cursor-pointer"
                  onClick={() => setOpenCreatePlaylist((prev) => !prev)}
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
                  Create Playlist
                </Button>
              </form>
            </div>
          </div>
        )}
        {
          <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
            {playlists?.map((playlist) => (
              <PlaylistCards playlist={playlist} key={playlist._id} />
            ))}
          </div>
        }
      </div>
    </>
  );
};

export default ChannelPlaylist;
