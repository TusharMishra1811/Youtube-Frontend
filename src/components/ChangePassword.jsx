import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useUpdatePasswordMutation } from "../redux/api/api";
import Input2 from "./Input2";
import Button from "./Button";
import toast from "react-hot-toast";
import { setUser } from "../redux/slice/authSlice";

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    resetField,
  } = useForm();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await updatePassword({
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      }).unwrap();
      dispatch(setUser(response?.data?.user));
      resetField("oldPassword");
      resetField("newPassword");
      resetField("confirmPassword");
      toast.success("Password is updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full text-white flex justify-center items-center mt-2">
      <div className="bg-transparent p-8 border rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Change Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Input2
              label="Old Password"
              type="password"
              className="rounded"
              {...register("oldPassword", {
                required: "Old Password is required",
              })}
            />
            {errors.oldPassword && (
              <span className="text-sm text-red-500">
                {errors.oldPassword?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="New Password"
              type="password"
              className="rounded"
              {...register("newPassword", {
                required: "New Password is required",
              })}
            />
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="Confirm New Password"
              type="password"
              className="rounded"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: {
                  matchesNewPassword: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
