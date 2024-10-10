import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideo } from "../redux/thunks/video";
import { getChannelStats, getChannelVideos } from "../redux/thunks/dashboard";
import Navbar from "../components/Header/Navbar";
import Container from "../components/Container";
import UploadVideo from "../components/UploadVideo";
import EditVideo from "../components/EditVideo";
import DeleteConfirmation from "../components/DeleteConfirmation";
import Spinner from "../components/Spinner";
import HeaderSection from "../components/Dashboard/HeaderSection";
import StatsSection from "../components/Dashboard/StatsSection";
import VideoTable from "../components/Dashboard/VideoTable";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const username = useSelector((state) => state.auth?.user?.username);
  const dashboard = useSelector((state) => state.dashboard?.channelStats);
  const videos = useSelector((state) => state.dashboard?.channelVideos);
  const uploaded = useSelector((state) => state.video?.uploaded);
  const publishToggled = useSelector((state) => state.video?.publishToggled);
  const deleting = useSelector((state) => state.video?.loading);
  const dispatch = useDispatch();

  const [videoDetails, setVideoDetails] = useState(null);
  const [popUp, setPopUp] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });

  const handleDeleteVideo = async () => {
    dispatch(deleteVideo(videoDetails?._id));
    setPopUp((prev) => ({
      ...prev,
      deleteVideo: !prev.deleteVideo,
    }));
    toast.success("Video is Deleted Successfully!!!");
  };

  useEffect(() => {
    dispatch(getChannelStats());
  }, [dispatch, deleting, uploaded]);

  useEffect(() => {
    dispatch(getChannelVideos());
  }, [dispatch, uploaded, publishToggled, deleting]);

  return (
    <>
      <Navbar />
      <Container>
        <div className="w-full relative h-screen text-white space-y-5 z-10 py-4 px-1">
          {popUp.uploadVideo && <UploadVideo setUploadVideoPopup={setPopUp} />}
          {popUp.editVideo && (
            <div className="w-full flex justify-center top-24 fixed z-20">
              <EditVideo
                setEditVideoPopup={setPopUp}
                title={videoDetails?.title}
                description={videoDetails?.description}
                videoId={videoDetails?._id}
                thumbnail={videoDetails?.thumbnail}
              />
            </div>
          )}
          {popUp.deleteVideo && (
            <div className="w-full fixed top-52 flex justify-center z-20">
              <DeleteConfirmation
                video={true}
                onCancel={() =>
                  setPopUp((prev) => ({
                    ...prev,
                    deleteVideo: !prev.deleteVideo,
                  }))
                }
                onDelete={handleDeleteVideo}
              />
            </div>
          )}
          {deleting && (
            <div className="w-full fixed top-20 flex justify-center z-20">
              <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                <Spinner />
                <span className="text-md font-bold">Deleting video...</span>
              </div>
            </div>
          )}
          <HeaderSection username={username} setPopUp={setPopUp} />
          <StatsSection dashboard={dashboard} />
          <VideoTable
            videos={videos}
            setPopUp={setPopUp}
            setVideoDetails={setVideoDetails}
          />
        </div>
      </Container>
    </>
  );
};

export default AdminDashboard;
