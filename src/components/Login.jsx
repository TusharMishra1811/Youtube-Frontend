import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/api.js";
import { setIsAuthenticated, setUser } from "../redux/slice/authSlice.js";
import LoadingSkeleton from "../skeleton/LoadingSkeleton.jsx";
import { Button, Input, Logo } from "./index.js";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();

      dispatch(setIsAuthenticated(true));
      dispatch(setUser(response?.data?.user));
      navigate("/");
      toast.success(`Welcome back ${response?.data?.user?.fullName}`);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-full h-screen text-white p-3 flex justify-center items-start">
      <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
        <div className="flex items-center gap-2 mt-5">
          <Logo />
        </div>
        <form className="space-y-5 p-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email*"
            placeholder="Enter Your Email"
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
            label="Password*"
            placeholder="Enter Your Password"
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
            Login
          </Button>
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-purple-600 cursor-pointer hover:opacity-70"
            >
              Sign Up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
