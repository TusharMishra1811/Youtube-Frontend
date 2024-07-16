import React, { useState } from "react";
import { Button, Logo, SearchForSmallScreen } from "../index.js";
import Search from "./Search";
import { CiSearch } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/api.js";
import { setIsAuthenticated, setUser } from "../../redux/slice/authSlice.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const profileImage = user?.avatar;
  const username = user?.username;
  const navigate = useNavigate();

  const [logout, { isLoading }] = useLogoutMutation();

  const sidePanelItems = [
    {
      icon: <BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${username}`,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      navigate("/");
      toast.success("Logged Out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <nav className="w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <Logo />
        </div>
        <div className="w-full sm:w-1/3 hidden sm:block">
          <Search />
        </div>
        <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
          <CiSearch
            size={30}
            fontWeight={"bold"}
            onClick={() => setOpenSearch((prev) => !prev)}
          />
          {openSearch && (
            <SearchForSmallScreen
              open={openSearch}
              setOpenSearch={setOpenSearch}
            />
          )}
        </div>

        {isAuthenticated ? (
          <div className="rounded-full sm:block hidden">
            <img
              src={profileImage}
              alt="profileImage"
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>
        ) : (
          <div className="space-x-2 sm:block hidden">
            <Link to={"/login"}>
              <Button className=" font-semibold bg-purple-500 border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2 ">
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button className="font-semibold bg-purple-500 border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2 ">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
        <div className="sm:hidden block">
          <div className="text-white">
            <SlMenu size={24} onClick={() => setToggleMenu((prev) => !prev)} />
          </div>
        </div>
        {toggleMenu && (
          <div className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-[#0F0F0F] sm:hidden rounded-lg outline-none">
            <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <IoCloseCircleOutline
                size={35}
                onClick={setToggleMenu((prev) => !prev)}
              />
            </div>
            <div>
              <div>
                {sidePanelItems.map((item) => (
                  <NavLink
                    to={item.url}
                    key={item.title}
                    onClick={() => setToggleMenu((prev) => !prev)}
                    className={({ isActive }) =>
                      isActive ? "bg-purple-500" : ""
                    }
                  >
                    <div className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-purple-500">
                      <div>{item.icon}</div>
                      <span className="text-lg">{item.title}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-5 mb-3">
                  <Link to={"/login"}>
                    <Button className="w-full bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
                      Login
                    </Button>
                  </Link>
                  <Link to={"/signup"}>
                    <Button className=" w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3 ">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div
                  className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
                  onClick={() => handleLogout()}
                >
                  <IoMdLogOut size={25} />
                  <span className="text-base">Logout</span>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
