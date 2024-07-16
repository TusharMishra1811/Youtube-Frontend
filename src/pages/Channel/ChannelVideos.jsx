import React, { useEffect, useState } from "react";
import VideoList from "../../components/VideoList";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../../redux/thunks/video";
import { makeVideosNull } from "../../redux/slice/videoSlice";
import NoVideosFound from "../../components/NoVideosFound";

const ChannelVideos = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const videos = useSelector((state) => state.video?.videos?.docs);
  const [searchParams, setSearchParams] = useState();
  const [activeButton, setActiveButton] = useState("button1");

  useEffect(() => {
    const sortBy = searchParams?.sortBy;
    const sortType = searchParams?.sortType;
    dispatch(getAllVideos({ userId, sortBy, sortType }));

    return () => dispatch(makeVideosNull());
  }, [dispatch, userId, searchParams]);

  if (videos?.length == 0) {
    return <NoVideosFound />;
  }

  const handleSort = (sortBy, sortType = "asc") => {
    setSearchParams({ sortBy, sortType });
  };
  return (
    <>
      <div className="w-full p-2 text-white flex gap-4">
        <button
          onClick={() => {
            setActiveButton("button1");
            handleSort("createdAt", "desc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button1" ? "bg-purple-500" : "bg-[#222222]"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => {
            setActiveButton("button2");
            handleSort("views", "desc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button2" ? "bg-purple-500" : "bg-[#222222]"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => {
            setActiveButton("button3");
            handleSort("createdAt", "asc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button3" ? "bg-purple-500" : "bg-[#222222"
          }`}
        >
          Oldest
        </button>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white">
        {videos?.map((video) => (
          <VideoList
            key={video?._id}
            avatar={video?.avatar}
            duration={video?.duration}
            title={video?.title}
            thumbnail={video?.thumbnail}
            createdAt={video?.createdAt}
            views={video?.views}
            videoId={video?._id}
          />
        ))}
      </div>
    </>
  );
};

export default ChannelVideos;
