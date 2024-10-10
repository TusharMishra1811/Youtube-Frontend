import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index.js";
import GetImagePreview from "./GetImagePreview.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../redux/api/api.js";
import { setIsAuthenticated, setUser } from "../redux/slice/authSlice.js";
import toast from "react-hot-toast";
import LoadingSkeleton from "../skeleton/LoadingSkeleton.jsx";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.append("avatar", data.avatar);
    myForm.append("fullName", data.fullName);
    myForm.append("username", data.username);
    myForm.append("email", data.email);
    myForm.append("password", data.password);
    if (data.coverImage) {
      myForm.append("coverImage", data.coverImage);
    }
    try {
      const response = await signup(myForm).unwrap();
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(response?.data));
      navigate("/");
      toast.success(`Welcome ${response?.data?.fullName}!!`);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-full h-screen text-white p-3 flex justify-center items-start sm:mt-8">
      <div className="flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-2 text-sm sm:w-96 w-full"
        >
          <div className="w-full relative h-28 bg-[#222222]">
            <div className="w-full h-full">
              <GetImagePreview
                name="coverImage"
                control={control}
                className="w-full h-28 object-cover border-none border-slate-900"
                cameraIcon={false}
              />
              <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">
                coverImage
              </div>
            </div>

            <div className="absolute left-2 bottom-2 rounded-full border-2">
              <GetImagePreview
                name="avatar"
                control={control}
                className=" rounded-full h-20 w-20 outline-none"
                cameraIcon={true}
              />
            </div>
          </div>
          {errors.avatar && (
            <div className="text-red-500">{errors.avatar.message}</div>
          )}
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            {...register("fullName", {
              required: true,
            })}
            className="h-8"
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName.message}</span>
          )}
          <Input
            label="Username"
            placeholder="Enter your username"
            type="text"
            {...register("username", {
              required: true,
            })}
            className="h-8"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
            className="h-8"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
            className="h-8"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <Button
            type="submit"
            bgColor="bg-purple-500"
            className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
          >
            Sign Up
          </Button>
          <p className="text-center text-sm">
            Aready have an account?{" "}
            <Link
              to={"/login"}
              className="text-purple-600 cursor-pointer hover:opacity-70"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
