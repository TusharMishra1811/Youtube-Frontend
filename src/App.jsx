import axios from "axios";
import { lazy, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import { Login, SignUp } from "./components/index.js";
import { server } from "./constants/constant.js";
import { setIsAuthenticated, setUser } from "./redux/slice/authSlice.js";
import HomeSkeleton from "./skeleton/HomeSkeleton.jsx";

const HomePage = lazy(() => import("./pages/HomePage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ChannelPlaylist = lazy(() => import("./pages/Channel/ChannelPlaylist.jsx"));
const ChannelSubscribers = lazy(() =>
  import("./pages/Channel/ChannelSubscribers.jsx")
);
const ChannelTweets = lazy(() =>
  import("./pages/Channel/ChannelTweets.jsx")
);
const ChannelVideos = lazy(() => import("./pages/Channel/ChannelVideos.jsx"));
const Channnel = lazy(() => import("./pages/Channel/Channnel.jsx"));
const EditChannel = lazy(() => import("./pages/EditChannel.jsx"));
const EditPersonalInfo = lazy(() => import("./pages/EditPersonalInfo.jsx"));
const History = lazy(() => import("./pages/History.jsx"));
const LikedVideos = lazy(() => import("./pages/LikedVideos.jsx"));
const MySubscriptions = lazy(() => import("./pages/MySubscriptions.jsx"));
const SearchVideos = lazy(() => import("./pages/SearchVideos.jsx"));
const VideoDetail = lazy(() => import("./pages/VideoDetail.jsx"));


function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${server}/api/v1/users/current-user`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(data?.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <AuthLayout authentication={false}>
                <HomePage />
              </AuthLayout>
            }
          />
          <Route
            path="/search/:query"
            element={
              <AuthLayout authentication={false}>
                <SearchVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/channel/:username"
            element={
              <AuthLayout authentication>
                <Channnel />
              </AuthLayout>
            }
          >
            <Route
              path="videos"
              element={
                <AuthLayout authentication>
                  <ChannelVideos />
                </AuthLayout>
              }
            />
            <Route
              path="playlists"
              element={
                <AuthLayout authentication>
                  <ChannelPlaylist />
                </AuthLayout>
              }
            />
            <Route
              path="tweets"
              element={
                <AuthLayout authentication>
                  <ChannelTweets />
                </AuthLayout>
              }
            />
            <Route
              path="subscribed"
              element={
                <AuthLayout authentication>
                  <ChannelSubscribers />
                </AuthLayout>
              }
            />
          </Route>
          <Route
            path="/history"
            element={
              <AuthLayout authentication>
                <History />
              </AuthLayout>
            }
          />
          <Route
            path="/liked-videos"
            element={
              <AuthLayout authentication>
                <LikedVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <AuthLayout authentication>
                <MySubscriptions />
              </AuthLayout>
            }
          />
          <Route
            path="/edit"
            element={
              <AuthLayout authentication>
                <EditChannel />
              </AuthLayout>
            }
          >
            <Route
              path="personalInfo"
              element={
                <AuthLayout authentication>
                  <EditPersonalInfo />
                </AuthLayout>
              }
            />
            <Route
              path="password"
              element={
                <AuthLayout authentication>
                  <ChangePassword />
                </AuthLayout>
              }
            />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <SignUp />
            </AuthLayout>
          }
        />
        <Route
          path="/watch/:videoId"
          element={
            <AuthLayout authentication>
              <VideoDetail />
            </AuthLayout>
          }
        />
        <Route
          path="/collections"
          element={
            <AuthLayout authentication>
              <AdminDashboard />
            </AuthLayout>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
