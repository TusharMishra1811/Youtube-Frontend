import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import VideoList from "../components/VideoList";
import { getAllVideos } from "../redux/thunks/video";
import NoVideosFound from "../components/NoVideosFound";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { makeVideosNull } from "../redux/slice/videoSlice";

const SearchVideos = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const videos = useSelector((state) => state.video?.videos);
  const dispatch = useDispatch();
  const { query } = useParams();
  const loading = useSelector((state) => state.video?.loading);

  useEffect(() => {
    const sortType = searchParams.get("sortType");
    const sortBy = searchParams.get("sortBy");
    dispatch(getAllVideos({ query, sortBy, sortType }));
    setFilterOpen(false);
    return () => dispatch(makeVideosNull());
  }, [dispatch, query, searchParams]);

  const handleSortParams = (newSortBy, newSortType = "asc") => {
    setSearchParams({ sortBy: newSortBy, sortType: newSortType });
  };

  if (videos?.totalDocs === 0) {
    <NoVideosFound text={"Try searching something else"} />;
  }

  if (loading) return <HomeSkeleton />;

  return (
    <>
      <div
        className="w-full h-10 flex items-center font-bold justify-end cursor-pointer px-8"
        onClick={() => setFilterOpen((prev) => !prev)}
      >
        <span className="text-white hover:text-purple-500"> Filters</span>
        <FaFilter size={20} className="text-purple-500 hover:text-purple-800" />
      </div>
      <div className="w-full text-white">
        {filterOpen && (
          <div className="w-full absolute bg-transparent">
            <div className="max-w-sm border border-slate-800 rounded bg-[#222222] fixed mx-auto z-50 inset-x-0 h-96 p-5">
              <h1 className="font-semibold text-lg">Search Filters</h1>
              <IoCloseCircleOutline
                size={25}
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => setFilterOpen((prev) => !prev)}
              />
              <table className="mt-4">
                <tr className="w-full text-start border-b">
                  <th>SortBy</th>
                </tr>
                <tr className="flex flex-col gap-2 text-slate-400 cursor-pointer">
                  <td onClick={() => handleSortParams("createdAt", "desc")}>
                    Upload Date <span className="text-xs">(Latest)</span>
                  </td>
                  <td onClick={() => handleSortParams("createdAt", "asc")}>
                    Upload Date <span className="text-xs"> (Oldest)</span>
                  </td>
                  <td onClick={() => handleSortParams("views", "asc")}>
                    View Count <span className="text-xs"> (Low to High)</span>
                  </td>
                  <td onClick={() => handleSortParams("views", "desc")}>
                    View Count <span className="text-xs"> (High to Low)</span>
                  </td>
                  <td onClick={() => handleSortParams("duration", "desc")}>
                    Duration <span className="text-xs"> (High to Low)</span>
                  </td>
                  <td onClick={() => handleSortParams("duration", "asc")}>
                    Duration <span className="text-xs"> (Low to High)</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        )}
        <div className="grid h-screen xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-white overflow-y-scroll">
          {videos &&
            videos?.docs?.map((video) => (
              <VideoList
                key={video?._id}
                thumbnail={video?.thumbnail}
                duration={video?.duration}
                title={video?.title}
                views={video?.views}
                avatar={video?.ownerDetails?.avatar}
                channelName={video?.userDetails?.username}
                createdAt={video?.createdAt}
                videoId={video?._id}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchVideos;
