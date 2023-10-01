"use client";

import { signIn } from "next-auth/react";

import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import React from 'react'


export default function LoginRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [variant, setVariant] = useState("LOGIN");

  const searchParams = useSearchParams();

  function handleRegister() {
    variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
  }

  const handleSignInWithProvider = (providerId) => {
    signIn(providerId)
    // signIn(providerId, { callbackUrl: searchParams.get("callbackUrl") });
  };

  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError();
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    formData["_id"] = formData.email;

    let response = await signIn("credentials", {
      callbackUrl: searchParams.get("callbackUrl"),
      email: formData.email,
      redirect: false,
      password: formData.password,
    });

    setLoading(false);

    if (response.url) {
      console.log("url is " + response.url);
      // router.push(response.url);
      // window.location.href = response.url;
      window.location.replace(response.url);
    } else setError("Please check your email or password!");
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
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="flex justify-center items-center flex-grow flex-shrink-0 min-w-0 rounded-md bg-indigo-600 px-6 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {variant === "LOGIN"
                ? loading
                  ? "Signing in..."
                  : "Sign In"
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

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
