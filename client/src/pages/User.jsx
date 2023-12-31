import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { UserContext } from "../App";
import { Link, useParams } from "react-router-dom";
import { MdOutlineCreate, MdOutlineDeleteOutline } from "react-icons/md";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { LuRepeat2, LuSend } from "react-icons/lu";
import { Comment } from "../components";

const User = () => {
  const { state, dispatch } = useContext(UserContext);
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${id}`, {})
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, []);
  return (
    <div className="container max-w-[620px] m-auto relative">
      <div className="container max-w-[620px] m-auto relative">
        <div className="my-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{profile?.user?.name}</h1>
              <div>@{profile?.user?.username}</div>
            </div>
            <img
              className="rounded-full w-20"
              src={profile?.user?.photo}
              alt=""
            />
          </div>
          <div className="my-5">
            <p className="text-base font-normal">{profile?.user?.bio}</p>
          </div>
          <div>
            <span className="text-base text-gray-500 font-normal cursor-pointer hover:underline">
              {profile?.posts?.length} threads
            </span>
          </div>
          {/* <div className="flex justify-between">
            <button className="flex items-center gap-1 my-5 bg-blue-600 py-1 px-3 rounded-md">
              Follow
            </button>
          </div> */}
        </div>
      </div>
      {profile?.posts?.map((post) => (
        <div
          key={post._id}
          className="flex gap-4 border-y border-solid dark:border-gray-100/20 py-6"
        >
          {/* <ToastContainer /> */}
          <div className="w-14">
            <img className="rounded-full w-14" src="/user.jpg" alt="" />
          </div>
          <div>
            <div className="hover:underline cursor-pointer font-semibold mb-2">
              {post?.postedBy?.name}
            </div>
            <p className="text-base text-justify mb-3">{post?.body}</p>
            <img
              className="w-[550px] rounded-xl mb-5"
              src={post?.photo}
              alt=""
            />
            <div className={`${"flex items-center justify-between"} `}>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                  {post.likes?.includes(state._id) ? (
                    <AiFillHeart
                      onClick={() => unLikePost(post._id)}
                      className="text-2xl cursor-pointer text-red-600"
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => likePost(post._id)}
                      className="text-2xl cursor-pointer"
                    />
                  )}

                  <span className="text-sm text-gray-400">
                    {post.likes?.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Link to={`/posts/${post._id}`}>
                    <FaRegComment className="text-xl cursor-pointer" />
                  </Link>
                  <span className="text-sm text-gray-400">
                    {post.comments?.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <LuRepeat2 className="text-2xl cursor-pointer" />
                  <span className="text-sm text-gray-400">110</span>
                </div>
                <div className="flex items-center gap-1">
                  <LuSend className="text-xl cursor-pointer" />
                  <span className="text-sm text-gray-400">110</span>
                </div>
              </div>
              <div>
                {post.postedBy?._id === state?._id && (
                  <MdOutlineDeleteOutline
                    onClick={() => deletePost(post._id)}
                    className="text-2xl cursor-pointer text-red-600"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
