import React from "react";
import { BiHistory, BiLike } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { IoFolderOutline } from "react-icons/io5";
import { RiHome6Line } from "react-icons/ri";
import { TbUserCheck } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/api";
import { setIsAuthenticated, setUser } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = user?.username;
  const sidebarTopItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${username}`,
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];

  const bottomBarItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];

  const [logout, { isLoading }] = useLogoutMutation();

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
      <div className="sm:block hidden">
        <div className="text-white lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r h-screen flex flex-col justify-between">
          <div className="flex flex-col gap-4 mt-5">
            {sidebarTopItems.map((item) => (
              <NavLink
                to={item.url}
                key={item.url}
                className={({ isActive }) => (isActive ? "bg-purple-500" : "")}
              >
                <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600">
                  {item.icon}
                  <span className="text-base hidden md:block">
                    {item.title}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>

          <div>
            {username && (
              <div
                className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600"
                onClick={() => handleLogout()}
              >
                <IoMdLogOut size={25} />
                <span className="text-base hidden md:block">Logout</span>
              </div>
            )}
            <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600">
              <CiSettings size={25} />
              <span className="text-base hidden md:block">Settings</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]">
        {bottomBarItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.url}
            className={({ isActive }) => (isActive ? "text-purple-500" : "")}
          >
            <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
