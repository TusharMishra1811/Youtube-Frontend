import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import { Login, SignUp } from "./components/index.js";
import { server } from "./constants/constant.js";
import HomePage from "./pages/HomePage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser } from "./redux/slice/authSlice.js";
import HomeSkeleton from "./skeleton/HomeSkeleton.jsx";
import SearchVideos from "./pages/SearchVideos.jsx";
import Channnel from "./pages/Channel/Channnel.jsx";
import ChannelVideos from "./pages/Channel/ChannelVideos.jsx";
import ChannelPlaylist from "./pages/Channel/ChannelPlaylist.jsx";
import ChannelTweets from "./pages/Channel/ChannelTweets.jsx";
import ChannelSubscribers from "./pages/Channel/ChannelSubscribers.jsx";
import History from "./pages/History.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import MySubscriptions from "./pages/MySubscriptions.jsx";
import EditChannel from "./pages/EditChannel.jsx";
import EditPersonalInfo from "./pages/EditPersonalInfo.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import VideoDetail from "./pages/VideoDetail.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

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
