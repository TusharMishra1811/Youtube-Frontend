import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../redux/thunks/video";
import { makeVideosNull } from "../redux/slice/videoSlice";
import Container from "../components/Container";
import InfiniteScroll from "../components/InfiniteScroll";
import VideoList from "../components/VideoList";
import HomeSkeleton from "../skeleton/HomeSkeleton";

const HomePage = () => {
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.video?.videos?.docs);
  const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage);
  const loading = useSelector((state) => state.video?.loading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllVideos({}));

    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  const fetchMoreVideos = useCallback(() => {
    if (hasNextPage) {
      dispatch(getAllVideos({ page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [page, hasNextPage, dispatch]);

  return (
    <Container>
      <InfiniteScroll fetchMore={fetchMoreVideos} hasNextPage={hasNextPage}>
        <div className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
          {videos?.map((video) => (
            <VideoList
              key={video._id}
              avatar={video.ownerDetails.avatar}
              duration={video.duration}
              title={video.title}
              thumbnail={video.thumbnail}
              createdAt={video.createdAt}
              views={video.views}
              channelName={video.ownerDetails.username}
              videoId={video._id}
            />
          ))}
        </div>
        {loading && <HomeSkeleton />}
      </InfiniteScroll>
    </Container>
  );
};

export default HomePage;
