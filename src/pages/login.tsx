/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Input } from "@/components/common/Input";
import { PrimaryButton } from "@/components/common/Button/PrimaryButton";
import { apiHandler } from "@/helpers/api";
import { adminLogin } from "@/helpers/api/constants";
import { setCookies } from "@/helpers/cookies";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
interface EmailInterface {
  email: string;
  password: string;
}

const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .max(32, "Max password length is 32")
    .required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EmailSchema) });

  const submitHandler = async (data: EmailInterface) => {
    try {
      const res = await apiHandler(`${adminLogin}`, "POST", data);
      if (res.data.token) {
        const token = res.data.token;
        setCookies("jwtToken", token);
        router.push("/");
      } else {
        toast.error(res.data.error.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="absolute top-[20%] flex w-full items-center p-10">
      <div className="flex-1">
        <Image src="/loginCar.png" alt="login" width={500} height={500} />
      </div>
      <div className="flex-[.5]">
        <form
          className="flex flex-col gap-4 w-[60%]"
          onSubmit={handleSubmit((data) => submitHandler(data))}
        >
          <Input
            label="Email"
            name="email"
            type="text"
            error={errors.email?.message}
            register={register}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            error={errors.password?.message}
            register={register}
          />

          <PrimaryButton label="Submit" />
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
