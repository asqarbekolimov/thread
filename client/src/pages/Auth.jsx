import React, { useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FiAtSign } from "react-icons/fi";
import { BiHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegFileImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [auth, setAuth] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const postData = async () => {
    if (!reg.test(email)) {
      toast("Email not match");
      return;
    }
    await fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(`${data.error}`);
          // redirect("/");
        } else {
          toast.success(data.msg);
          navigate("/dashboard");
        }
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };
  const toggleAuth = (state) => {
    setAuth(state);
  };
  const notify = () => toast("Wow so easy!");
  return (
    <div className="container max-w-[620px] m-auto">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="border border-solid border-gray-300 rounded-lg py-5">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {auth === "signin" ? "Login Now!" : "Get started today!"}
            </h1>
          </div>
          <div>
            <ToastContainer />
          </div>

          <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            {auth === "signin" ? null : (
              <div className="upload">
                <img
                  src={selectedFile}
                  className="w-[150px] h-[100px] rounded-full"
                  alt=""
                />
                <div className="round flex items-center justify-center">
                  <input type="file" onChange={handleFileChange} />
                  <FaRegFileImage />
                </div>
              </div>
            )}
            {auth === "signin" ? (
              ""
            ) : (
              <div>
                <label htmlFor="email" className="sr-only">
                  Name
                </label>

                <div className="relative">
                  <input
                    type="text"
                    className="w-full text-black rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <HiOutlineDocumentText className="dark:text-slate-600" />
                  </span>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full text-black rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <FiAtSign className="dark:text-slate-600" />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full text-black rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <RxEyeOpen className="dark:text-slate-600" />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {auth === "signin" ? (
                <p className="text-sm text-gray-400">
                  No account?
                  <span
                    onClick={() => toggleAuth("signup")}
                    className="underline cursor-pointer ml-2 font-bold text-blue-500"
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Already have account
                  <span
                    onClick={() => toggleAuth("signin")}
                    className="underline cursor-pointer ml-2 font-bold text-blue-500"
                  >
                    Sign in
                  </span>
                </p>
              )}

              {auth === "signin" ? (
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={() => postData()}
                  type="button"
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
