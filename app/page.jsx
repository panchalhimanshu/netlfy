"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/hooks/use-media-query";

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
  rememberMe: z.boolean(),
});

export default function Login() {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    setPasswordType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("rememberMe"));
    if (savedCredentials && !savedCredentials.fromLocalStorage) {
      setValue("email", savedCredentials.email);
      setValue("password", savedCredentials.password);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    startTransition(async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.176:126/api/v2/account/UserLogin",
          {
            emailid: data.email,
            password: data.password,
          }
        );

        if (response.status === 200) {
          const userData = response.data;
          sessionStorage.setItem("userData", JSON.stringify(userData));

          if (data.rememberMe) {
            localStorage.setItem(
              "rememberMe",
              JSON.stringify({ email: data.email, password: data.password, fromLocalStorage: false })
            );
          } else {
            localStorage.removeItem("rememberMe");
          }

          switch (userData.roleid) {
            case 4:
              toast.success("Login Successful");
              window.location.assign("/warehouse");
              break;
            case 5:
              toast.success("Login Successful");
              window.location.assign("/station/stationdashboard");
              break;
            case 1:
              toast.success("Login Successful");
              window.location.assign("/admin");
              break;
            default:
              toast.error("Invalid role ID.");
              break;
          }
          reset();
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[#113754]">
        <div className="w-full max-w-sm text-[15px]">
          <div className="mb-10 text-center">
            <Image
              src="/images/all-img/shopmystationlogo.svg"
              alt="Logo"
              width={387}
              height={75}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow bg-transparent appearance-none border border-white rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-1">
              <label
                className="block text-gray-400 text-sm mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow bg-transparent appearance-none border border-white rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={passwordType}
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
              <div className="text-right">
                <button
                  type="button"
                  onClick={togglePasswordType}
                  className="text-sm text-gray-400"
                >
                  {passwordType === "text" ? "Hide Password" : "Show Password"}
                </button>
              </div>
            </div>
            <div className="mb-5">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-[#f08434] bg-transparent border-gray-300 rounded"
                  {...register("rememberMe")}
                />
                <span className="ml-2 text-gray-400 text-sm">Remember Me</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-[#f08434] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
