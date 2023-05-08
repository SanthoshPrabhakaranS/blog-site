import React, { useState } from "react";
import FormInput from "../../shared/FormInput";
import FormButton from "../../shared/FormButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImageInput from "../../shared/ImageInput";
import AuthService from "../../services/api/auth";
import toast, { Toaster } from "react-hot-toast";

const schema = yup
  .object({
    userName: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password Name is required"),
  })
  .required();

const RegisterPage = () => {
  const _AuthService = new AuthService();
  const [userImage, setUserImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const _onImageChange = (event) => {
    setUserImage(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("userImage", userImage);

    const response = await _AuthService.register(formData);
    toast.success(response.message);
    reset();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full max-w-[400px]"
      >
        <h1 className="font-semibold text-[2rem] text-pink-500">Blog Site</h1>
        <h1 className="font-semibold text-[1.8rem]">Register</h1>
        <FormInput
          type={"text"}
          placeholder={"Username"}
          register={register}
          labelName={"userName"}
          errors={errors}
        />
        <input
          type="file"
          onChange={_onImageChange}
          name="image"
          id="image"
          className=""
        />
        {/* <ImageInput
          register={register}
          labelName={"userImage"}
          errors={errors}
        /> */}
        <FormInput
          type={"text"}
          placeholder={"Email"}
          register={register}
          labelName={"email"}
          errors={errors}
        />
        <FormInput
          type={"password"}
          placeholder={"Password"}
          register={register}
          labelName={"password"}
          errors={errors}
        />
        <FormButton title={"Register"} />
        <p className="text-sm underline font-medium cursor-pointer">
          <Link to={"/login"}>Already have an account ? Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
