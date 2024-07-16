import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

const GetImagePreview = ({
  name,
  control,
  label,
  defaultValue = "",
  className,
  cameraIcon = false,
  cameraSize = 20,
  image,
}) => {
  const [preview, setPreview] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handlePreview = (e, onChange) => {
    const files = e.target.files;
    if (files && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
      onChange(files[0]);
      setIsImageSelected(true);
    }
    return false;
  };

  return (
    <>
      <div>
        <label>
          {label && <label>{label}</label>}

          <img src={preview || image} className={`object-cover ${className}`} />
          {cameraIcon && !isImageSelected && (
            <FaCamera
              size={cameraSize}
              className="hover:text-purple-500 absolute inset-0 m-auto text-gray-600"
            />
          )}
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ""}
            render={({ field: { onChange } }) => (
              <input
                id={name}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePreview(e, onChange)}
              />
            )}
            rules={{ required: `${name} is required` }}
          />
        </label>
      </div>
    </>
  );
};

export default GetImagePreview;
