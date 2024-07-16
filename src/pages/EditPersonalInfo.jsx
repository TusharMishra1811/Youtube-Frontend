import React, { useEffect } from "react";
import { useUpdateUserDetailsMutation } from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input2 from "../components/Input2";
import { Button } from "../components";
import { setUser } from "../redux/slice/authSlice";
import toast from "react-hot-toast";

const EditPersonalInfo = () => {
  const [updateUserDetails, { isLoading }] = useUpdateUserDetailsMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const auth = useSelector((state) => state.auth?.user);

  useEffect(() => {
    setValue("fullName", auth?.fullName);
    setValue("email", auth?.email);
  }, [auth, setValue]);

  const saveChanges = async (data) => {
    try {
      const response = await updateUserDetails(data).unwrap();
      dispatch(setUser(response?.data));
      toast.success("User details are updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setValue("fullName", auth?.fullName);
    setValue("email", auth?.email);
  };

  return (
    <>
      <div className="w-full text-white flex justify-center items-center mt-5">
        <div className="bg-transparent p-5 border rounded shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">
            Personal Information
            <p className="font-light text-xs">
              Update your personal details here.
            </p>
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(saveChanges)}>
            <div className="flex flex-col">
              <Input2
                label="Full Name"
                type="text"
                className="rounded"
                {...register("fullName", {
                  required: "Full Name is required",
                })}
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">
                  {errors.fullName?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input2
                label="Email Address"
                type="email"
                className="rounded"
                {...register("email", {
                  required: "Email is Required",
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={(e) => reset(e)}
              >
                Reset
              </Button>
              <Button
                className="bg-purple-500 text-white px-4 py-2 rounded"
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPersonalInfo;
