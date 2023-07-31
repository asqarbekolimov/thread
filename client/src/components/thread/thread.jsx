import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { LuRepeat2, LuSend } from "react-icons/lu";
import { UserContext } from "../../App";

const Thread = ({ post, data, setData }) => {
  const { state, dispatch } = useContext(UserContext);

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex gap-4 border-y border-solid dark:border-gray-100/20 py-6">
      <div className="w-14">
        <img className="rounded-full w-14" src="/user.jpg" alt="" />
      </div>
      <div>
        <div className="hover:underline cursor-pointer font-semibold mb-2">
          {post?.postedBy.name}
        </div>
        <p className="text-base text-justify mb-3">{post?.body}</p>
        <img className="w-[550px] rounded-xl mb-5" src={post?.photo} alt="" />
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            {post.likes.includes(state._id) ? (
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

            <span className="text-sm text-gray-400">{post.likes?.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegComment className="text-xl cursor-pointer" />
            <span className="text-sm text-gray-400">110</span>
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
      </div>
    </div>
  );
};

export default Thread;
