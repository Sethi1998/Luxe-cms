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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await apiHandler(`${adminLogin}`, "POST", formData);
      if (res.data.token) {
        const token = res.data.token;
        setCookies("jwtToken", token);
        router.push("/");
      } else {
        toast.error(res.data.message);
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
        <form className="flex flex-col gap-4 w-[60%]" onSubmit={handleSubmit}>
          <Input label="email" handleChange={handleChange} type="text" />
          <Input label="password" handleChange={handleChange} type="password" />
          <PrimaryButton label="Submit" />
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
