import React, { useState, useContext, useEffect } from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FiAtSign } from "react-icons/fi";
import { BiHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegFileImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Auth = () => {
  const { state, dispatch } = useContext(UserContext);
  const [auth, setAuth] = useState("signin");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(
    "http://res.cloudinary.com/dhv4bjkxh/image/upload/v1691394200/dpgfiotglhv2buf3qo3e.png"
  );

  const navigate = useNavigate();
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mern-project");
    data.append("cloud_name", "dhv4bjkxh");
    fetch("https://api.cloudinary.com/v1_1/dhv4bjkxh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ourFields = () => {
    if (!reg.test(email)) {
      toast("Email not match");
      return;
    }
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        photo: url,
        bio: bio,
        username: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(`${data.error}`);
        } else {
          toast.success(data.msg);
          navigate(0);
        }
      });
  };

  const postData = () => {
    if (image) {
      uploadPic();
    } else {
      ourFields();
    }
  };

  useEffect(() => {
    if (url) {
      ourFields();
    }
  }, [url]);

  const logData = async () => {
    if (!reg.test(email)) {
      toast("Email not match");
      return;
    }
    await fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(`${data.error}`);
        } else {
          toast.success("Success");
          navigate("/dashboard");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
        }
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
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
              <>
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
              </>
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
            {auth === "signup" ? (
              <>
                <div className="mt-3">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <FiAtSign className="dark:text-slate-600" />
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    rows=""
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
              </>
            ) : null}
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
                  onClick={() => logData()}
                  type="button"
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
