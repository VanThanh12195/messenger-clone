"use client";

import { signIn } from "next-auth/react";

import { useState } from "react";
import toast from "react-hot-toast";

import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import getRandomUserImageUrl from "@/utils/getRandomUserImageUrl";

import { PrismaClient } from "@prisma/client";

export default function LoginRegisterPage() {

  
  const prisma = new PrismaClient();

  async function main() {
    // const user = await prisma.user.create({
    //   data: {
    //     name: "Rich",
    //     email: "hello@prisma.com",
    //     posts: {
    //       create: {
    //         title: "My first post",
    //         body: "Lots of really interesting stuff",
    //         slug: "my-first-post",
    //       },
    //     },
    //   },
    // });
  }

  main()
    .then(async () => {})
    .catch(async (e) => {
      console.error(e);
    });





  const [loading, setLoading] = useState(false);

  const [variant, setVariant] = useState("LOGIN");

  function handleRegister() {
    variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
  }

  const handleSignInWithProvider = (providerId) => {
    signIn(providerId, { callbackUrl: "/chatroom" });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (variant === "REGISTER") {
      var bcrypt = require("bcryptjs");
      var passwordHash = bcrypt.hashSync(formData.password, 10);

      formData["password"] = passwordHash;

      const axios = require("axios");

      axios
        .post("/api/register", formData)
        .then(function (response) {
          if (response.status === 200) toast.success(response.data);
        })
        .catch(function (error) {
          if (error.response.status === 409) toast.error(error.response.data);
        })
        .finally(function () {
          setVariant("LOGIN");
          setLoading(false);
          setFormData({
            name: "",
            email: formData.email,
            password: "",
          });
        });
    } else {
      let response = await signIn("credentials", {
        callbackUrl: "/chatroom",
        email: formData.email,
        redirect: false,
        password: formData.password,
      });

      setLoading(false);

      if (response.url) {
        toast.success("You are successfully logged in");
        window.location.replace(response.url);
      } else toast.error("Please check your Email address or Password");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20 items-center">
      <div className="flex flex-col sm:mx-auto sm:w-full sm:max-w-sm items-center">
        <Image src="/logo.png" width={50} height={50} alt="Messenger logo" />
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 text-indigo-900">
          Welcome to Messenger Clone!
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {variant === "REGISTER" ? (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  disabled={loading}
                  autoComplete="name"
                  required
                  placeholder="Your Username"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-75"
                />
              </div>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                disabled={loading}
                type="email"
                autoComplete="email"
                required
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleChange}
                className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-75"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={loading}
                placeholder="••••••••••••••••••••"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-75"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center flex-grow flex-shrink-0 min-w-0 rounded-md bg-indigo-600 px-6 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75"
            >
              {variant === "LOGIN"
                ? loading
                  ? "Signing in..."
                  : "Sign In"
                : loading
                ? "Registering"
                : "Register"}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center my-1.5">
          <div className="bg-gray-300 h-0.5 w-44"></div>
          <span className="mx-4 text-gray-600">
            <strong>OR</strong>
          </span>
          <div className="bg-gray-300 h-0.5 w-44"></div>
        </div>
        {/* Add Facebook Sign In */}
        <button
          type="button"
          onClick={() => handleSignInWithProvider("facebook")}
          className="flex w-full justify-center rounded-md bg-sky-700 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
        >
          <BsFacebook size={25} className="mr-2" />
          Sign In with Facebook
        </button>

        {/* Add Google Sign In */}
        <button
          type="button"
          onClick={() => handleSignInWithProvider("google")}
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
        >
          <FcGoogle size={25} className="mr-2" />
          Sign In with Google
        </button>

        <div className="text-gray-600 text-lg mt-3 text-center">
          {variant === "LOGIN" ? (
            <p>
              New to Messenger?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors font-medium"
                onClick={handleRegister}
              >
                Create an account
              </span>
            </p>
          ) : (
            <p>
              Already has an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors font-medium"
                onClick={handleRegister}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
