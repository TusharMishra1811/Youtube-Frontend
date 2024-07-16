import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWatchHistory } from "../redux/thunks/user";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import Container from "../components/Container";
import NoVideosFound from "../components/NoVideosFound";
import VideoList from "../components/VideoList";

const History = () => {
  const loading = useSelector((state) => state.user?.loading);
  const videos = useSelector((state) => state.user?.history);

  const dispatch = useDispatch();
  //   window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(getUserWatchHistory());
  }, [dispatch]);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (videos?.length === 0) {
    return <NoVideosFound />;
  }

  if (videos && videos.length > 0) {
    return (
      <>
        <Container>
          <div className="grid max-h-screen mb-20 sm:m-0 overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 text-white">
            {videos.map((video) => (
              <VideoList
                key={video._id}
                avatar={video.owner?.avatar}
                duration={video.duration}
                title={video.title}
                thumbnail={video.thumbnail}
                createdAt={video.createdAt}
                views={video.views}
                channelName={video?.owner?.username}
                videoId={video?._id}
              />
            ))}
          </div>
        </Container>
      </>
    );
  }

  return <></>;
};

export default History;
