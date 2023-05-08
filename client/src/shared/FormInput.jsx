import React from "react";

const FormInput = ({ type, placeholder, register, labelName, errors }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        {...register(`${labelName}`)}
        type={type}
        placeholder={placeholder}
        className="border-2 border-gray-400 p-2 rounded-sm focus:outline-none placeholder:text-gray-500 placeholder:text-sm"
      />
      <p className="text-sm text-red-600">{errors[labelName]?.message}</p>
    </div>
  );
};

export default FormInput;
