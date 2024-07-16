import React, { useState } from "react";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import GetImagePreview from "./GetImagePreview";
import { useForm } from "react-hook-form";
import {
  useUpdateAvatarMutation,
  useUpdateCoverImageMutation,
} from "../redux/api/api";
import toast from "react-hot-toast";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { setUser } from "../redux/slice/authSlice";

const EditAvatar = ({ cover, preImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [updateCoverImage, { isLoading: isUpdatingCover }] =
    useUpdateCoverImageMutation();
  const [updateAvatar, { isLoading: isUpdatingAvatar }] =
    useUpdateAvatarMutation();

  const upload = async (data) => {
    setIsOpen(false);
    const myForm = new FormData();
    myForm.append(`${cover ? "coverImage" : "avatar"}`, data.avatar);

    if (data) {
      try {
        if (cover) {
          const response = await updateCoverImage(myForm).unwrap();
          dispatch(setUser(response?.data));
          toast.success("Cover image is updated successfully");
        } else {
          const response = await updateAvatar(myForm).unwrap();
          dispatch(setUser(response?.data));
          toast.success("User avatar is updated successfully");
        }
      } catch (error) {
        toast.error("Failed to update image");
      }
    }
  };

  if (isUpdatingAvatar || isUpdatingCover) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <form className="relative" onSubmit={handleSubmit(upload)}>
        <MdOutlineCloudUpload
          className="hover:text-gray-200 text-black rounded-md bg-white opacity-80 hover:opacity-100 p-1 cursor-pointer"
          size={35}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-black p-8 relative border shadow-lg w-full max-w-md">
              <button
                className="absolute top-5 right-5 text-white hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <MdClose size={20} />
              </button>
              <h2 className="text-lg font-bold text-white mb-4">
                Change {cover ? "Cover" : "Profile"} Picture
              </h2>
              <div className="flex flex-col items-center">
                <GetImagePreview
                  name={"avatar"}
                  control={control}
                  cameraIcon
                  cameraSize={30}
                  className={
                    "w-full h-full object-contain min-h-20 max-h-60 bg-[#222222"
                  }
                  image={preImage}
                />
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 mt-4 w-full"
                >
                  Upload
                </button>
              </div>
              {errors.avatar && (
                <span className="text-red-500">{errors.avatar.message}</span>
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default EditAvatar;
