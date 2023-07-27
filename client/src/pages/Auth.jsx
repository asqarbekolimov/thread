import React, { useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FiAtSign } from "react-icons/fi";
import { BiHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";

const Auth = () => {
  const [auth, setAuth] = useState("signin");
  const [email, setEmail] = useState("");
  const toggleAuth = (state) => {
    setAuth(state);
  };
  return (
    <div className="container max-w-[620px] m-auto">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="border border-solid border-gray-300 rounded-lg py-5">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {auth === "signin" ? "Login Now!" : "Get started today!"}
            </h1>
          </div>

          <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            {auth === "signin" ? (
              ""
            ) : (
              <div>
                <label for="email" className="sr-only">
                  Name
                </label>

                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter name"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <HiOutlineDocumentText className="dark:text-slate-600" />
                  </span>
                </div>
              </div>
            )}
            <div>
              <label for="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <FiAtSign className="dark:text-slate-600" />
                </span>
              </div>
            </div>

            <div>
              <label for="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <RxEyeOpen className="dark:text-slate-600" />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {auth === "signin" ? (
                <p className="text-sm text-gray-500">
                  No account?
                  <span
                    onClick={() => toggleAuth("signup")}
                    className="underline cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Already have account
                  <span
                    onClick={() => toggleAuth("signin")}
                    className="underline cursor-pointer"
                  >
                    Sign in
                  </span>
                </p>
              )}

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                {auth === "signin" ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
