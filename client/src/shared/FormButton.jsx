import React from "react";

const FormButton = ({ title }) => {
  return (
    <button
      type="submit"
      className="p-2 text-lg bg-pink-500 text-white font-semibold hover:bg-pink-400 rounded-sm"
    >
      {title}
    </button>
  );
};

export default FormButton;
