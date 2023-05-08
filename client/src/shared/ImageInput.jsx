import React from "react";

const ImageInput = ({ register, labelName, errors }) => {
  return (
    <>
      <input {...register(`${labelName}`)} className="" type="file" name="image" id="image" />
      <p className="text-sm text-red-600">{errors[labelName]?.message}</p>
    </>
  );
};

export default ImageInput;
