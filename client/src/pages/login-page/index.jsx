import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../shared/FormInput";
import FormButton from "../../shared/FormButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toast, Toaster } from "react-hot-toast";
import AuthService from "../../services/api/auth";
import Storage from "../../storage/storage";
import { AuthContext } from "../../context/AuthContext";

const schema = yup
  .object({
    email: yup.string().required("Email is required!"),
    password: yup.string().required("Password is required!"),
  })
  .required();

const LoginPage = () => {
  const _AuthService = new AuthService();
  const storage = new Storage();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await _AuthService.login(data);
    const token = response.token;
    const userId = response.userId;
    const userName = response.userName;
    const userImage = response.userImage;

    if (!token && !userId) {
      toast.error(response.message);
    } else {
      storage.setItem("token", token);
      storage.setItem("userId", userId);
      storage.setItem("userImage", userImage);
      storage.setItem("userName", userName);
      setUser({
        userId,
        userName,
        userImage,
        token,
      });
      navigate("/");
      reset();
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full max-w-[400px]"
      >
        <h1 className="font-semibold text-[2rem] text-pink-500">Blog Site</h1>
        <h1 className="font-semibold text-[1.8rem]">Login</h1>
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
        <FormButton title={"Login"} />
        <p className="text-sm underline font-medium cursor-pointer">
          <Link to={"/register"}>Don't have an account yet ? Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
